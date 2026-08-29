##-------------Install Packages -------------
library(httr)       
library(readr)
library(dplyr)   
library(lme4)      
library(performance) 
library(see)
library(MuMIn)
library(ggplot2)
library(dplyr)
library(lmtest)
library(broom)
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


##-------------Clean and format data --------------------

# Discard trials where full-screen mode was exited and participants that reported to count.
df_data <- df_experiment_data  %>%
  filter(FullScreenExited == 0 & Counter ==0)



# Format the data

data_formatted <- df_data %>%
  mutate(
    ParticipantID = as.factor(ParticipantID),  # Convert ParticipantID to a factor (equivalent to 'category' in pandas)
    TT = GambleDeadline,  
    log_TT = log(GambleDeadline),
    TT_z = as.numeric(scale(TT)),
    TT_c = GambleDeadline - mean(GambleDeadline, na.rm = TRUE),
    log_TT = log(GambleDeadline),
    repro_t = ReproducedTime,
    Condition = as.factor(DeadlinePresentationOrder),
    log_repro_t = log(ReproducedTime),
    TT_f = as.factor(GambleDeadline),
    ExperimentRoundNumber_z = as.numeric(scale(ExperimentRoundNumber))
  )



##------------------------------------------------------------------
##-----------------------Fit model (S4 Table) ----------------------
##------------------------------------------------------------------

m_ct <- lmer(
  repro_t ~ TT_c*Condition + ExperimentRoundNumber_z + (1 + TT_c + ExperimentRoundNumber_z| ParticipantID),
  data = data_formatted,
  REML = TRUE,
  control = lmerControl(
    optimizer = "bobyqa",
    optCtrl = list(maxfun = 2e5)
  )
)

##------------------------- Model diagnostics ----------------------------------

# Plot general diagnostics
performance::check_model(m_ct)


coef_methods <- make_coef_methods_template(
  model = m_ct,
  default_method = "CR2"
)


# Check higher-level changes
sens <- dfbetas_sensitivity_tables(
  model = m_ct,
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
  model = m_ct,
  data = data_formatted,
  parameters = names(fixef(m_ct)),
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
  m_ct,
  vcov = "CR2",
  cluster = data_formatted$ParticipantID,
  test = "Satterthwaite"
)

#------------------Explained variance-------------------------

r2_values <- performance::r2_nakagawa(m_ct)

print(r2_values)







