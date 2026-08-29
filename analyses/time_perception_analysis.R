##------------------------Load required libraries--------------------------
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
library(lmerTest)
library(glmmTMB)
library(influence.ME)
library(clubSandwich)
library(ordinal)

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
    message("File not found.")
    stop(e)
  }
)

# Discard trials where full-screen mode was exited and participants that reported to count.
df_data <- df_experiment_data %>%
  filter(FullScreenExited == 0 & Counter == 0)

#Format the data

data_formatted <- df_data %>%
  mutate(
    ParticipantID = as.factor(ParticipantID),  # Convert ParticipantID to a factor (equivalent to 'category' in pandas)
    TT_factor = as.factor(GambleDeadline),  # Convert Deadline to a factor
    TT = GambleDeadline,  # Convert Deadline to a factor
    TT_c = GambleDeadline - mean(GambleDeadline, na.rm = TRUE),
    Delta = ReproducedTime - GambleDeadline,
    RE = (ReproducedTime - GambleDeadline)/GambleDeadline,
    log_TT = log(TT),
    log_TT_z = as.numeric(scale(log_TT)),
    log_ratio_RT_TT = log(GambleResponseTime / GambleDeadline),  # Compute log_ratio_RT_TT
    log_ratio_z = as.numeric(scale(log_ratio_RT_TT)),
    log_djr = log(ReproducedTime / GambleDeadline), # Compute log_djr
    repro_t = ReproducedTime,
    T_frac = GambleResponseTime / GambleDeadline,  # Compute log_ratio_RT_TT
    T_frac_z = as.numeric(scale(T_frac)),
    log_ratio_RT_TT = log(GambleResponseTime / GambleDeadline),
    djr = ReproducedTime / GambleDeadline, # Compute log_djr
    inv_djr = 1 / djr,
    Condition = as.factor(DeadlinePresentationOrder),
    SubjDiff = SubjectiveDifficulty,
    SubjDiff_z = as.numeric(scale(SubjectiveDifficulty)),
    T_frac_c = T_frac - mean(T_frac, na.rm = TRUE),
    log_ratio_RT_TT_z = as.numeric(scale(log_ratio_RT_TT)),
    SubjDiff_c = SubjDiff - mean(SubjDiff, na.rm = TRUE),
    TT_z = as.numeric(scale(TT)),
    AbsErr = AbsoluteError,
    AbsErr_z =as.numeric(scale(AbsoluteError)),
    log_abs_err = log(AbsoluteError),
    BlockRoundNumber = BlockRoundNumber,
    BlockRoundNumber_z = as.numeric(scale(BlockRoundNumber)),
    log_RT = log(GambleResponseTime),
    RT_c = GambleResponseTime - mean(GambleResponseTime, na.rm = TRUE),
    RiskAttitudeScore = RiskAttitudeScore,
    RiskAttitudeScore_c = RiskAttitudeScore - mean(RiskAttitudeScore, na.rm = TRUE),
    ExperimentRoundNumber_z = as.numeric(scale(ExperimentRoundNumber))
    
  )

data_formatted$SubjDiff_ord <- ordered(data_formatted$SubjDiff, levels = 1:5)

data_formatted$SubjDiff3_ord <- ordered(data_formatted$SubjectiveDifficulty3Lev, levels = 1:5)

data_block <- data_formatted %>%
  filter(Condition == "Block")
data_formatted$T_frac_c2 <- data_formatted$T_frac_c^2

##------------------------------------------------------------------------------
##--Fit model on whether Thinking Fraction Modulates Time perception (Table 1)--
##------------------------------------------------------------------------------

# Fit model
m_full <- lmer(
  Delta ~ T_frac_c*TT_c*Condition +
    ExperimentRoundNumber_z + 
    (1 + T_frac_c + TT_c + ExperimentRoundNumber_z | ParticipantID), 
  data = data_formatted,
  REML = FALSE,
  control = lmerControl(
    optimizer = "bobyqa",
    optCtrl = list(maxfun = 2e5)
  )
)


##------------------------- Model diagnostics ----------------------------------

# Plot general diagnostics
performance::check_model(m_full)
performance::check_singularity(m_full)

coef_methods <- make_coef_methods_template(
  model = m_full,
  default_method = "CR2"
)


# Check higher-level changes
sens <- dfbetas_sensitivity_tables(
  model = m_full,
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
  model = m_full,
  data = data_formatted,
  parameters = names(fixef(m_quad)),
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
##------------------------- Check model estimates ---------------------------

# Check estimates with Robust Standard Errors
coef_test(
  m_full,
  vcov = "CR2",
  cluster = data_formatted$ParticipantID,
  test = "Satterthwaite"
)

#------------------Explained variance-------------------------
r2_values <- performance::r2_nakagawa(m_full)

print(r2_values)

#----- Pick-a-point simple slopes analysis (S1 Table) -------- 


# Specify covariance matrix (Robust)
V_CR2 <- vcovCR(
  m_full,
  cluster = data_formatted$ParticipantID,
  type = "CR2"
)

# Number of participant clusters (Degrees of Freedom)
df_CR <- length(unique(data_formatted$ParticipantID)) - 1


tf_slopes_CR2 <- emtrends(
  m_full,
  ~ Condition | TT_c,
  var = "T_frac_c",
  at = list(TT_c = c(-2, 0, 2)),
  vcov. = V_CR2,
  df = df_CR
)

tf_out <- as.data.frame(summary(tf_slopes_CR2, infer = c(TRUE, TRUE)))

tf_out

#-- Save to csv 

library(emmeans)
library(clubSandwich)
library(dplyr)

V_CR2 <- vcovCR(
  m_full,
  cluster = data_formatted$ParticipantID,
  type = "CR2"
)

pred_grid <- emmeans(
  m_full,
  ~ T_frac_c | Condition * TT_c,
  at = list(
    T_frac_c = seq(
      min(data_formatted$T_frac_c, na.rm = TRUE),
      max(data_formatted$T_frac_c, na.rm = TRUE),
      length.out = 100
    ),
    TT_c = c(-2, 0, 2),
    ExperimentRoundNumber_z = 0
  ),
  vcov. = V_CR2,
  df = length(unique(data_formatted$ParticipantID)) - 1
)

pred_df <- as.data.frame(summary(pred_grid, infer = c(TRUE, TRUE)))

tf_mean <- mean(data_formatted$T_frac, na.rm = TRUE)

pred_df <- pred_df %>%
  mutate(
    TargetTime = case_when(
      TT_c == -2 ~ "6 s",
      TT_c == 0  ~ "8 s",
      TT_c == 2  ~ "10 s"
    ),
    TF = T_frac_c + tf_mean
  ) %>%
  select(
    TargetTime,
    TT_c,
    Condition,
    T_frac_c,
    TF,
    emmean,
    SE,
    lower.CL,
    upper.CL
  )


write.csv(
  pred_df,
  "simple_slopes_analysis.csv",
  row.names = FALSE
)




##------------------------------------------------------------------------------
##----------- Check for different Reaction Times between conditions ------------
##------------------------------------------------------------------------------


# Fit model
m_RT_diff <- lmer(
  log_RT ~ TT_factor+ TT_factor:Condition + (1| ParticipantID), 
  data = data_formatted,
  REML = TRUE,
  control = lmerControl(
    optimizer = "bobyqa",
    optCtrl = list(maxfun = 2e5)
  )
)


# Plot general diagnostics
performance::check_model(m_RT_diff)


coef_test(
  m_RT_diff,
  vcov = "CR2",
  cluster = data_formatted$ParticipantID,
  test = "Satterthwaite"
)

r2_values <- performance::r2_nakagawa(m_RT_diff)

print(r2_values)

coef_methods <- make_coef_methods_template(
  model = m_RT_diff,
  default_method = "CR2"
)



# Check higher-level changes
sens <- dfbetas_sensitivity_tables(
  model = m_RT_diff,
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
  model = m_RT_diff,
  data = data_formatted,
  parameters = names(fixef(m_RT_diff)),
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
##---------- Check for possible Attenuation Effect (S2 Table) ---------------------
##------------------------------------------------------------------------------



m_attenuation_effect <- lmer(
  Delta ~ T_frac_c*BlockRoundNumber_z*TT_c +
    (1 + T_frac_c | ParticipantID), 
  data = data_block)
  



performance::check_model(m_attenuation_effect)

coef_methods <- make_coef_methods_template(
  model = m_attenuation_effect,
  default_method = "CR2"
)


# Check higher-level changes
sens <- dfbetas_sensitivity_tables(
  model = m_attenuation_effect,
  data = data_block,
  group = "ParticipantID",
  coef_methods = coef_methods,
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
  model = m_attenuation_effect,
  data = data_block,
  parameters = names(fixef(m_attenuation_effect)),
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

coef_test(
  m_attenuation_effect,
  vcov = "CR2",
  cluster = data_block$ParticipantID,
  test = "Satterthwaite"
)


r2_values <- performance::r2_nakagawa(m_attenuation_effect)

print(r2_values)


## -------------------- Get random slopes----------------------------


library(dplyr)
library(tibble)

# Extract participant-level random effects
re_pid <- ranef(m_full)$ParticipantID

# Create random-effects data frame
df_random_slopes <- re_pid %>%
  as.data.frame() %>%
  rownames_to_column("ParticipantID") %>%
  select(
    ParticipantID,
    random_intercept = `(Intercept)`,
    random_slope_T_frac_c = T_frac_c
  )

# Extract one condition value per participant
df_condition <- data_formatted %>%
  distinct(ParticipantID, Condition)

# Add fixed TF slope and compute full participant-specific TF slope
df_random_slopes <- df_random_slopes %>%
  left_join(df_condition, by = "ParticipantID") %>%
  mutate(
    fixed_slope_T_frac_c = fixef(m_full)["T_frac_c"],
    participant_slope_T_frac_c = fixed_slope_T_frac_c + random_slope_T_frac_c
  ) %>%
  select(
    ParticipantID,
    Condition,
    random_intercept,
    random_slope_T_frac_c,
    fixed_slope_T_frac_c,
    participant_slope_T_frac_c
  )

# Save to CSV
write.csv(
  df_random_slopes,
  "random_and_participant_T_frac_slopes.csv",
  row.names = FALSE
)



##------------------------------------------------------------------------------
##------- Risk Attitude and Time Perception (S6 Appendix and S8 Table)----------
##------------------------------------------------------------------------------


m_risk_attitude <- lmer(
  Delta ~ RiskAttitudeScore_c*TT_c + (1 + TT_c| ParticipantID), 
  data = data_formatted,
  REML = TRUE,
  control = lmerControl(
    optimizer = "bobyqa",
    optCtrl = list(maxfun = 2e5)
  )
  
)

performance::check_model(m_risk_attitude)

coef_methods <- make_coef_methods_template(
  model = m_risk_attitude,
  default_method = "CR2"
)


# Check higher-level changes
sens <- dfbetas_sensitivity_tables(
  model = m_risk_attitude,
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
  model = m_risk_attitude,
  data = data_formatted,
  parameters = names(fixef(m_risk_attitude)),
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

coef_test(
  m_risk_attitude,
  vcov = "CR2",
  cluster = data_formatted$ParticipantID,
  test = "Satterthwaite"
)


r2_values <- performance::r2_nakagawa(m_risk_attitude)

print(r2_values)


### -----------------------TEST

tf_iqr_df <- data_formatted %>%
  filter(
    Condition %in% c("Block", "Random"),
    TT %in% c(6, 8, 10)
  ) %>%
  group_by(ParticipantID, Condition, TT_factor, TT) %>%
  summarise(
    TF_iqr = IQR(T_frac, na.rm = TRUE),
    TF_sd = sd(T_frac, na.rm = TRUE),
    n_trials = sum(!is.na(T_frac)),
    .groups = "drop"
  ) %>%
  filter(n_trials >= 3) %>%
  mutate(
    ParticipantID = as.factor(ParticipantID),
    Condition = as.factor(Condition),
    TT_factor = as.factor(TT_factor),
    TT_c = TT - mean(TT, na.rm = TRUE)
  )

# Inspect descriptive statistics
tf_iqr_summary <- tf_iqr_df %>%
  group_by(Condition, TT) %>%
  summarise(
    n = n(),
    mean_TF_iqr = mean(TF_iqr, na.rm = TRUE),
    sd_TF_iqr = sd(TF_iqr, na.rm = TRUE),
    median_TF_iqr = median(TF_iqr, na.rm = TRUE),
    mean_TF_sd = mean(TF_sd, na.rm = TRUE),
    sd_TF_sd = sd(TF_sd, na.rm = TRUE),
    .groups = "drop"
  )

print(tf_iqr_summary)

# LME using participant-level IQR as the outcome
m_tf_iqr <- lmer(
  TF_iqr ~ TT_factor * Condition + (1 | ParticipantID),
  data = tf_iqr_df,
  REML = TRUE,
  control = lmerControl(
    optimizer = "bobyqa",
    optCtrl = list(maxfun = 2e5)
  )
)

summary(m_tf_iqr)
anova(m_tf_iqr)

# Model diagnostics
performance::check_model(m_tf_iqr)
performance::check_singularity(m_tf_iqr)

# Estimated marginal means for each target time x condition
emm_tf_iqr <- emmeans(
  m_tf_iqr,
  ~ Condition | TT_factor
)

summary(emm_tf_iqr)

# Block vs Random contrast at each target time
contrast_tf_iqr <- contrast(
  emm_tf_iqr,
  method = "pairwise",
  by = "TT_factor"
)

summary(contrast_tf_iqr, infer = c(TRUE, TRUE))

# Optional: test the target-time trend separately by condition
emm_tf_iqr_by_condition <- emmeans(
  m_tf_iqr,
  ~ TT_factor | Condition
)

contrast(
  emm_tf_iqr_by_condition,
  method = "pairwise",
  by = "Condition"
)

#----------------------------------------------------------------------
#---Test if including quadratic terms improve the fit (S4 Appendix)----
#----------------------------------------------------------------------

m_quad_full <- lmer(
  Delta ~ (T_frac_c + T_frac_c2)*TT_c*Condition +
    ExperimentRoundNumber_z + 
    (1 + T_frac_c + TT_c| ParticipantID), 
  data = data_formatted,
  REML = FALSE,
  control = lmerControl(
    optimizer = "bobyqa",
    optCtrl = list(maxfun = 2e5)
  )
)


m_quad_semi_full <- lmer(
  Delta ~ T_frac_c*TT_c*Condition + T_frac_c2 +
    ExperimentRoundNumber_z + 
    (1 + T_frac_c + TT_c| ParticipantID), 
  data = data_formatted,
  REML = FALSE,
  control = lmerControl(
    optimizer = "bobyqa",
    optCtrl = list(maxfun = 2e5)
  )
)

m_quad <- lmer(
  Delta ~ T_frac_c2*TT_c*Condition +
    ExperimentRoundNumber_z + 
    (1 + T_frac_c2 + TT_c| ParticipantID), 
  data = data_formatted,
  REML = FALSE,
  control = lmerControl(
    optimizer = "bobyqa",
    optCtrl = list(maxfun = 2e5)
  )
)


m_full <- lmer(
  Delta ~ T_frac_c*TT_c*Condition +
    ExperimentRoundNumber_z + 
    (1 + T_frac_c + TT_c| ParticipantID), 
  data = data_formatted,
  REML = FALSE,
  control = lmerControl(
    optimizer = "bobyqa",
    optCtrl = list(maxfun = 2e5)
  )
)

# Compare models

anova(m_full, m_quad_semi_full)
AIC(m_full, m_quad, m_quad_full,m_quad_semi_full)
BIC(m_full, m_quad, m_quad_full,m_quad_semi_full)

performance::check_model(m_quad_semi_full)
performance::check_singularity(m_quad_semi_full)



r2_values <- performance::r2_nakagawa(m_quad_semi_full)

print(r2_values)


m_quad_semi_full <- lmer(
  Delta ~ T_frac_c*TT_c*Condition + T_frac_c2 +
    ExperimentRoundNumber_z + 
    (1 + T_frac_c + TT_c| ParticipantID), 
  data = data_formatted,
  REML = TRUE,
  control = lmerControl(
    optimizer = "bobyqa",
    optCtrl = list(maxfun = 2e5)
  )
)


coef_methods <- make_coef_methods_template(
  model = m_quad_semi_full,
  default_method = "CR2"
)


# Check higher-level changes
sens <- dfbetas_sensitivity_tables(
  model = m_quad_semi_full,
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
  model = m_quad_semi_full,
  data = data_formatted,
  parameters = names(fixef(m_quad_semi_full)),
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

#-Check again pick-a-point analysis but for model with quadratic term
# (S7 Table)


# Specify covariance matrix (Robust)
V_CR2 <- vcovCR(
  m_quad_semi_full,
  cluster = data_formatted$ParticipantID,
  type = "CR2"
)

# Number of participant clusters (Degrees of Freedom)
df_CR <- length(unique(data_formatted$ParticipantID)) - 1


tf_slopes_CR2 <- emtrends(
  m_quad_semi_full,
  ~ Condition | TT_c,
  var = "T_frac_c",
  at = list(TT_c = c(-2, 0, 2)),
  vcov. = V_CR2,
  df = df_CR
)

tf_out <- as.data.frame(summary(tf_slopes_CR2, infer = c(TRUE, TRUE)))

tf_out



coef_test(
  m_quad_semi_full,
  vcov = "CR2",
  cluster = data_formatted$ParticipantID,
  test = "Satterthwaite"
)
