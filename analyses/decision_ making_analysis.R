##----------------Load required libraries----------------------
library(httr)       
library(readr)      
library(dplyr)     
library(lme4)      
library(performance)  
library(see)
library(MuMIn)
library(ggplot2)
library(dplyr)
library(broom)
library(emmeans)
library(dplyr)
library(ordinal)
library(lmerTest)
library(clubSandwich)
library(glmmTMB)
source("influential_observations.R")

##------------------------------------------------------------------------------
##---------------------- Download and format data ------------------------------
##------------------------------------------------------------------------------

data_path <- "../dataset/behavioural_data/processed_experiment_data.csv"

df_experiment_data <- tryCatch(
  {
    read_csv(data_path)   # or read.csv(processed_path)
  },
  error = function(e) {
    message("File not found. Please run the preprocessing pipeline first to generate 'processed_reproduction_task_data.csv'.")
    stop(e)
  }
)

# Discard trials where full-screen mode was exited and participants that reported to count.
df_data <- df_experiment_data %>%
  filter(FullScreenExited == 0 & Counter == 0)

#Format the data

data_formatted <- df_data %>%
  mutate(
    ParticipantID = as.factor(ParticipantID),
    RT = GambleResponseTime,
    log_RT = log(RT),
    dX_c = dX - mean(dX, na.rm = TRUE),
    dP_c = dP - mean(dP, na.rm = TRUE),
    dEV_c = dEV - mean(dEV, na.rm = TRUE),
    RiskAttitudeScore = RiskAttitudeScore,
    dX_z = as.numeric(scale(dX)),
    dP_z = as.numeric(scale(dP)),
    dEV_z = as.numeric(scale(dEV)),
    SubjDiff3 = SubjectiveDifficulty3Lev
  )

##------------------------------------------------------------------------------
##---------------------- Fit Attributes model (S3 Table) ------------------
##------------------------------------------------------------------------------

m_attributes <- lmer(
  log_RT ~ dX_z*dP_z*dEV_z + (1 | ParticipantID),
  data = data_formatted,
  REML = TRUE,
  control = lmerControl(
    optimizer = "bobyqa",
    optCtrl = list(maxfun = 2e5)
  )
)

##------------------------- Model diagnostics ----------------------------------

# Plot general diagnostics
performance::check_model(m_attributes)


coef_methods <- make_coef_methods_template(
  model = m_attributes,
  default_method = "CR2"
)


##------------------------- Check model estimates ---------------------------

# Check estimates with Robust Standard Errors
coef_test(
  m_attributes,
  vcov = "CR2",
  cluster = data_formatted$ParticipantID,
  test = "Satterthwaite"
)


##------------------------ Explained Variance ----------------------------------
r2_values <- performance::r2_nakagawa(m_attributes)

print(r2_values)




# Check higher-level changes
sens <- dfbetas_sensitivity_tables(
  model = m_attributes,
  data = data_formatted,
  group = "ParticipantID",
  coef_methods = coef_methods,
  #hypotheses = hypotheses,
  alpha = 0.05,
  cr2_cluster = "ParticipantID",
  cr2_test = "Satterthwaite",
  refit_control = lmerControl(
    optimizer = "bobyqa",
    optCtrl = list(maxfun = 2e5)
  )
)

# Check lower-level (i.e. influential rows) changes in significance

obs_sig <- observation_significance_changes(
  model = m_attributes,
  data = data_formatted,
  parameters = names(fixef(m_attributes)),
  obs_id_col = NULL,
  coef_methods = coef_methods,
  hypotheses = hypotheses,
  alpha = 0.05,
  cr2_cluster = "ParticipantID",
  cr2_test = "Satterthwaite",
  refit_control = lmerControl(
    optimizer = "bobyqa",
    optCtrl = list(maxfun = 2e5)
  ),
  progress = TRUE
)


##------------------------------------------------------------------------------
## S5 Appendix: Subjective difficulty and choice response time using clmm2()
##------------------------------------------------------------------------------

df_subjdiff <- data_formatted %>%
  mutate(
    RT = GambleResponseTime,
    
    SubjDiff_3 = factor(
      SubjDiff3,
      levels = c(1, 2, 3),
      labels = c("Low", "Medium", "High"),
      ordered = TRUE
    ),
    
    ParticipantID = factor(ParticipantID)
  ) %>%
  filter(
    !is.na(SubjDiff_3),
    !is.na(RT),
    !is.na(ParticipantID),
    RT > 0
  )

table(df_subjdiff$SubjDiff_3)


## Null model: random intercept only
m_subjdiff_null <- clmm2(
  SubjDiff_3 ~ 1,
  random = ParticipantID,
  data = df_subjdiff,
  link = "logistic",
  Hess = TRUE,
  nAGQ = 10
)

## Main model: RT as location effect + participant random intercept
m_subjdiff_rt <- clmm2(
  SubjDiff_3 ~ RT,
  random = ParticipantID,
  data = df_subjdiff,
  link = "logistic",
  Hess = TRUE,
  nAGQ = 10
)

anova(m_subjdiff_null, m_subjdiff_rt)
summary(m_subjdiff_rt)

coef_table <- coef(summary(m_subjdiff_rt))

rt_effect <- coef_table["RT", ]

beta_RT <- rt_effect["Estimate"]
SE_RT   <- rt_effect["Std. Error"]
z_RT    <- rt_effect["z value"]
p_RT    <- rt_effect["Pr(>|z|)"]

OR_RT <- exp(beta_RT)
OR_CI <- exp(beta_RT + c(-1, 1) * 1.96 * SE_RT)

rt_results <- data.frame(
  Effect = "RT",
  Beta = beta_RT,
  SE = SE_RT,
  z = z_RT,
  p = p_RT,
  OR = OR_RT,
  OR_low_95 = OR_CI[1],
  OR_high_95 = OR_CI[2]
)

rt_results

## Model allowing the RT effect to differ across ordinal thresholds
m_subjdiff_nominal <- clmm2(
  SubjDiff_3 ~ RT,
  nominal = ~ RT,
  random = ParticipantID,
  data = df_subjdiff,
  link = "logistic",
  Hess = TRUE,
  nAGQ = 10
)

anova(m_subjdiff_rt, m_subjdiff_nominal)
summary(m_subjdiff_nominal)

m_subjdiff_scale <- tryCatch(
  {
    clmm2(
      SubjDiff_3 ~ RT,
      scale = ~ RT,
      random = ParticipantID,
      data = df_subjdiff,
      link = "logistic",
      Hess = TRUE,
      nAGQ = 10
    )
  },
  error = function(e) {
    message("Scale model failed to fit:")
    message(e$message)
    return(NULL)
  }
)

if (!is.null(m_subjdiff_scale)) {
  summary(m_subjdiff_scale)
  anova(m_subjdiff_rt, m_subjdiff_scale)
}
















