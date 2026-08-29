# influential_observations.R
# Influence diagnostics for lme4 mixed models.
#
# Two separate diagnostics:
#
# 1. Estimate influence:
#    - Uses DFBETAS.
#    - Flags groups whose deletion changes coefficient estimates.
#    - Prints coefficient estimates for:
#        full model
#        each DFBETAS-flagged group removed one at a time
#        all DFBETAS-flagged groups removed together
#
# 2. Significance influence:
#    - Checks every group, not only DFBETAS-flagged groups.
#    - Identifies groups whose deletion changes statistical significance.
#    - Uses either model-based SEs or CR2 robust SEs, depending on coef_methods.
#
# Requires:
# install.packages("lme4")
# install.packages("influence.ME")
# install.packages("clubSandwich") # only needed if using CR2


# ------------------------------------------------------------
# Hypothesis template
# ------------------------------------------------------------

#make_hypotheses_template <- function(
#    model,
#    default_hypothesis = "two_sided"
#) {
#  allowed <- c("negative", "positive", "two_sided")
  
#  if (!default_hypothesis %in% allowed) {
#    stop("`default_hypothesis` must be one of: ", paste(allowed, collapse = ", "))
#  }
  
#  params <- names(lme4::fixef(model))
  
#  hypotheses <- rep(default_hypothesis, length(params))
#  names(hypotheses) <- params
  
#  hypotheses
#}


# ------------------------------------------------------------
# Coefficient-method template
# ------------------------------------------------------------

make_coef_methods_template <- function(
    model,
    default_method = "model"
) {
  allowed <- c("model", "CR2")
  
  if (!default_method %in% allowed) {
    stop("`default_method` must be one of: ", paste(allowed, collapse = ", "))
  }
  
  params <- names(lme4::fixef(model))
  
  coef_methods <- rep(default_method, length(params))
  names(coef_methods) <- params
  
  coef_methods
}

# ------------------------------------------------------------
# Classification Logic
# ------------------------------------------------------------

classify_inference_state <- function(
    beta,
    stat,
    p,
    alpha = 0.05,
    sig_cut = 1.96
) {
  if (is.na(beta) || is.na(stat)) {
    return(NA_character_)
  }
  
  is_sig <- if (!is.na(p)) {
    p < alpha
  } else {
    abs(stat) > sig_cut
  }
  
  if (!is_sig) {
    return("not_significant")
  }
  
  if (beta < 0) {
    return("significant_negative")
  }
  
  if (beta > 0) {
    return("significant_positive")
  }
  
  "significant_zero"
}

# ------------------------------------------------------------
# Main function
# ------------------------------------------------------------

dfbetas_sensitivity_tables <- function(
    model,
    data = NULL,
    group = "ParticipantID",
    infl = NULL,
    parameters = NULL,
    dfbetas_cutoff = NULL,
    
    # Per-parameter coefficient extraction method
    coef_methods = NULL,
    default_coef_method = "model",
    
    # CR2 settings
    cr2_cluster = group,
    cr2_test = "Satterthwaite",
    
    # Significance settings
    #hypotheses = NULL,
    #default_hypothesis = "two_sided",
    alpha = 0.05,
    sig_cut = 1.96,
    
    refit_control = NULL,
    print_tables = TRUE,
    print_estimate_tables = TRUE,
    print_significance_tables = TRUE
) {
  if (!requireNamespace("lme4", quietly = TRUE)) {
    stop("Package 'lme4' is required.")
  }
  
  if (!requireNamespace("influence.ME", quietly = TRUE)) {
    stop("Package 'influence.ME' is required.")
  }
  
  if (!inherits(model, "merMod")) {
    stop("This function is designed for lme4 models: lmer() or glmer().")
  }
  
  if (is.null(data)) {
    data <- model.frame(model)
  }
  
  if (!group %in% names(data)) {
    stop("The grouping variable '", group, "' was not found in data.")
  }
  
  # ------------------------------------------------------------
  # Influence object and DFBETAS
  # ------------------------------------------------------------
  
  if (is.null(infl)) {
    infl <- stats::influence(
      model,
      group = group
    )
  }
  
  dfb <- as.matrix(stats::dfbetas(infl))
  
  if (is.null(parameters)) {
    parameters <- colnames(dfb)
  }
  
  missing_params <- setdiff(parameters, colnames(dfb))
  
  if (length(missing_params) > 0) {
    stop(
      "These parameters were not found in the DFBETAS output: ",
      paste(missing_params, collapse = ", ")
    )
  }
  
  n_groups <- nrow(dfb)
  all_group_ids <- rownames(dfb)
  
  if (is.null(dfbetas_cutoff)) {
    dfbetas_cutoff <- 2 / sqrt(n_groups)
  }
  
  # ------------------------------------------------------------
  # Hypotheses per parameter
  # ------------------------------------------------------------
  
  #allowed_hypotheses <- c("negative", "positive", "two_sided")
  
  #if (!default_hypothesis %in% allowed_hypotheses) {
  #  stop(
  #    "`default_hypothesis` must be one of: ",
  #    paste(allowed_hypotheses, collapse = ", ")
  #  )
  #}
  
  #if (is.null(hypotheses)) {
  #  hypotheses <- rep(default_hypothesis, length(parameters))
  #  names(hypotheses) <- parameters
  #} else {
  #  if (is.null(names(hypotheses))) {
  #    stop("`hypotheses` must be a named character vector.")
  #  }
    
  #  if (!all(hypotheses %in% allowed_hypotheses)) {
  #    stop(
  #      "`hypotheses` values must be one of: ",
  #      paste(allowed_hypotheses, collapse = ", ")
  #    )
  #  }
    
  #  tmp <- rep(default_hypothesis, length(parameters))
  #  names(tmp) <- parameters
    
  #  overlap <- intersect(names(hypotheses), parameters)
  #  tmp[overlap] <- hypotheses[overlap]
    
  #  hypotheses <- tmp
  #}
  
  # ------------------------------------------------------------
  # Coefficient methods per parameter
  # ------------------------------------------------------------
  
  allowed_coef_methods <- c("model", "CR2")
  
  if (!default_coef_method %in% allowed_coef_methods) {
    stop(
      "`default_coef_method` must be one of: ",
      paste(allowed_coef_methods, collapse = ", ")
    )
  }
  
  if (is.null(coef_methods)) {
    coef_methods <- rep(default_coef_method, length(parameters))
    names(coef_methods) <- parameters
  } else {
    if (is.null(names(coef_methods))) {
      stop("`coef_methods` must be a named character vector.")
    }
    
    if (!all(coef_methods %in% allowed_coef_methods)) {
      stop(
        "`coef_methods` values must be one of: ",
        paste(allowed_coef_methods, collapse = ", ")
      )
    }
    
    tmp <- rep(default_coef_method, length(parameters))
    names(tmp) <- parameters
    
    overlap <- intersect(names(coef_methods), parameters)
    tmp[overlap] <- coef_methods[overlap]
    
    coef_methods <- tmp
  }
  
  if (any(coef_methods == "CR2")) {
    if (!requireNamespace("clubSandwich", quietly = TRUE)) {
      stop("Package 'clubSandwich' is required for parameters using CR2.")
    }
    
    if (!cr2_cluster %in% names(data)) {
      stop("The CR2 cluster variable '", cr2_cluster, "' was not found in data.")
    }
  }
  
  # ------------------------------------------------------------
  # Model refitting with cache
  # ------------------------------------------------------------
  
  model_cache <- new.env(parent = emptyenv())
  
  refit_without <- function(ids_to_drop) {
    ids_to_drop <- as.character(ids_to_drop)
    
    if (length(ids_to_drop) == 0) {
      return(list(
        model = model,
        data = data
      ))
    }
    
    key <- paste(sort(ids_to_drop), collapse = "||")
    
    if (exists(key, envir = model_cache, inherits = FALSE)) {
      return(get(key, envir = model_cache, inherits = FALSE))
    }
    
    data_sub <- data[
      !(as.character(data[[group]]) %in% ids_to_drop),
      ,
      drop = FALSE
    ]
    
    data_sub <- droplevels(data_sub)
    
    mod_refit <- if (is.null(refit_control)) {
      tryCatch(
        update(model, data = data_sub),
        error = function(e) e
      )
    } else {
      tryCatch(
        update(model, data = data_sub, control = refit_control),
        error = function(e) e
      )
    }
    
    out <- list(
      model = mod_refit,
      data = data_sub
    )
    
    assign(key, out, envir = model_cache)
    
    out
  }
  
  # ------------------------------------------------------------
  # Extract coefficient information
  # ------------------------------------------------------------
  
  get_param_stats <- function(mod, data_used, term, method) {
    if (inherits(mod, "error")) {
      return(data.frame(
        beta = NA_real_,
        SE = NA_real_,
        statistic = NA_real_,
        df = NA_real_,
        p = NA_real_,
        coef_method = method,
        fit_note = conditionMessage(mod)
      ))
    }
    
    # ----------------------------
    # CR2 via clubSandwich::coef_test()
    # ----------------------------
    if (method == "CR2") {
      ct <- tryCatch(
        as.data.frame(
          clubSandwich::coef_test(
            mod,
            vcov = "CR2",
            cluster = data_used[[cr2_cluster]],
            test = cr2_test
          )
        ),
        error = function(e) e
      )
      
      if (inherits(ct, "error")) {
        return(data.frame(
          beta = NA_real_,
          SE = NA_real_,
          statistic = NA_real_,
          df = NA_real_,
          p = NA_real_,
          coef_method = method,
          fit_note = conditionMessage(ct)
        ))
      }
      
      coef_names <- if ("Coef" %in% names(ct)) {
        as.character(ct$Coef)
      } else {
        rownames(ct)
      }
      
      row_i <- which(coef_names == term)
      
      if (length(row_i) == 0) {
        return(data.frame(
          beta = NA_real_,
          SE = NA_real_,
          statistic = NA_real_,
          df = NA_real_,
          p = NA_real_,
          coef_method = method,
          fit_note = "Parameter not estimated in coef_test()"
        ))
      }
      
      row_i <- row_i[1]
      
      beta_col <- intersect(c("beta", "Estimate", "est"), names(ct))[1]
      se_col <- intersect(c("SE", "Std. Error", "Std.Error"), names(ct))[1]
      stat_col <- intersect(c("tstat", "zstat", "t value", "z value"), names(ct))[1]
      df_col <- grep("^(df|d\\.f|df_)", names(ct), value = TRUE)[1]
      p_col <- grep("^p", names(ct), value = TRUE)[1]
      
      return(data.frame(
        beta = if (!is.na(beta_col)) unname(ct[row_i, beta_col]) else NA_real_,
        SE = if (!is.na(se_col)) unname(ct[row_i, se_col]) else NA_real_,
        statistic = if (!is.na(stat_col)) unname(ct[row_i, stat_col]) else NA_real_,
        df = if (!is.na(df_col)) unname(ct[row_i, df_col]) else NA_real_,
        p = if (!is.na(p_col)) unname(ct[row_i, p_col]) else NA_real_,
        coef_method = method,
        fit_note = ""
      ))
    }
    
    # ----------------------------
    # Regular model summary
    # ----------------------------
    sm <- tryCatch(
      coef(summary(mod)),
      error = function(e) e
    )
    
    if (inherits(sm, "error")) {
      return(data.frame(
        beta = NA_real_,
        SE = NA_real_,
        statistic = NA_real_,
        df = NA_real_,
        p = NA_real_,
        coef_method = method,
        fit_note = conditionMessage(sm)
      ))
    }
    
    if (!term %in% rownames(sm)) {
      return(data.frame(
        beta = NA_real_,
        SE = NA_real_,
        statistic = NA_real_,
        df = NA_real_,
        p = NA_real_,
        coef_method = method,
        fit_note = "Parameter not estimated in model summary"
      ))
    }
    
    stat_col <- grep("^(t|z) value$", colnames(sm), value = TRUE)
    df_col <- grep("^(df|d\\.f)", colnames(sm), value = TRUE)
    p_col <- grep("^Pr\\(", colnames(sm), value = TRUE)
    
    data.frame(
      beta = unname(sm[term, "Estimate"]),
      SE = unname(sm[term, "Std. Error"]),
      statistic = if (length(stat_col) > 0) unname(sm[term, stat_col[1]]) else NA_real_,
      df = if (length(df_col) > 0) unname(sm[term, df_col[1]]) else NA_real_,
      p = if (length(p_col) > 0) unname(sm[term, p_col[1]]) else NA_real_,
      coef_method = method,
      fit_note = ""
    )
  }
  
  # ------------------------------------------------------------
  # Significance rule
  # ------------------------------------------------------------
  
  #is_significant_by_hypothesis <- function(stat, p, hypothesis) {
  #  if (is.na(stat)) {
  #    return(NA)
  #  }
    
  #  has_p <- !is.na(p)
    
  #  if (hypothesis == "negative") {
  #    if (has_p) {
  #      return(stat < 0 & p < alpha)
  #    } else {
  #      return(stat < -sig_cut)
  #    }
  #  }
    
  #  if (hypothesis == "positive") {
  #    if (has_p) {
  #      return(stat > 0 & p < alpha)
  #    } else {
  #      return(stat > sig_cut)
  #    }
  #  }
    
  #  if (hypothesis == "two_sided") {
  #    if (has_p) {
  #      return(p < alpha)
  #    } else {
  #      return(abs(stat) > sig_cut)
  #    }
  #  }
    
  #  NA
  #}
  
  # ------------------------------------------------------------
  # Estimate-change table using DFBETAS-flagged groups only
  # ------------------------------------------------------------
  
  make_estimate_table_for_parameter <- function(term) {
    method <- coef_methods[[term]]
    
    flagged_ids <- rownames(dfb)[
      !is.na(dfb[, term]) &
        abs(dfb[, term]) > dfbetas_cutoff
    ]
    
    full_obj <- refit_without(character(0))
    
    full_stats <- get_param_stats(
      mod = full_obj$model,
      data_used = full_obj$data,
      term = term,
      method = method
    )
    
    make_row <- function(model_label, ids_to_drop, dfbetas_value = NA_real_) {
      refit_obj <- refit_without(ids_to_drop)
      
      stats <- get_param_stats(
        mod = refit_obj$model,
        data_used = refit_obj$data,
        term = term,
        method = method
      )
      
      signed_pc <- if (
        !is.na(stats$beta) &&
        !is.na(full_stats$beta) &&
        abs(full_stats$beta) > .Machine$double.eps
      ) {
        100 * (stats$beta - full_stats$beta) / abs(full_stats$beta)
      } else {
        NA_real_
      }
      
      data.frame(
        diagnostic = "estimate_change_dfbetas",
        Parameter = term,
        coef_method = method,
        Model = model_label,
        Dropped_IDs = paste(ids_to_drop, collapse = ", "),
        n_dropped = length(ids_to_drop),
        DFBETAS = dfbetas_value,
        beta = stats$beta,
        SE = stats$SE,
        statistic = stats$statistic,
        df = stats$df,
        p = stats$p,
        signed_percent_change = signed_pc,
        abs_percent_change = abs(signed_pc),
        fit_note = stats$fit_note
      )
    }
    
    rows <- list(
      make_row(
        model_label = "full",
        ids_to_drop = character(0),
        dfbetas_value = NA_real_
      )
    )
    
    if (length(flagged_ids) > 0) {
      for (id in flagged_ids) {
        rows[[length(rows) + 1]] <- make_row(
          model_label = paste0("without_", id),
          ids_to_drop = id,
          dfbetas_value = dfb[id, term]
        )
      }
      
      rows[[length(rows) + 1]] <- make_row(
        model_label = "without_all_dfbetas_flagged",
        ids_to_drop = flagged_ids,
        dfbetas_value = NA_real_
      )
    }
    
    tab <- do.call(rbind, rows)
    rownames(tab) <- NULL
    
    list(
      parameter = term,
      flagged_ids = flagged_ids,
      table = tab
    )
  }
  
  # ------------------------------------------------------------
  # Significance-change table using all groups
  # This is separate from DFBETAS.
  # ------------------------------------------------------------
  
  make_significance_table_for_parameter <- function(term) {
    method <- coef_methods[[term]]
    
    full_obj <- refit_without(character(0))
    
    full_stats <- get_param_stats(
      mod = full_obj$model,
      data_used = full_obj$data,
      term = term,
      method = method
    )
    
    full_state <- classify_inference_state(
      beta = full_stats$beta,
      stat = full_stats$statistic,
      p = full_stats$p,
      alpha = alpha,
      sig_cut = sig_cut
    )
    
    make_sig_row <- function(id) {
      refit_obj <- refit_without(id)
      
      stats <- get_param_stats(
        mod = refit_obj$model,
        data_used = refit_obj$data,
        term = term,
        method = method
      )
      
      without_state <- classify_inference_state(
        beta = stats$beta,
        stat = stats$statistic,
        p = stats$p,
        alpha = alpha,
        sig_cut = sig_cut
      )
      
      changed_state <- ifelse(
        is.na(full_state) || is.na(without_state),
        NA,
        full_state != without_state
      )
      
      data.frame(
        diagnostic = "inference_state_change_all_groups",
        Parameter = term,
        coef_method = method,
        Dropped_IDs = id,
        
        beta_full = full_stats$beta,
        SE_full = full_stats$SE,
        statistic_full = full_stats$statistic,
        df_full = full_stats$df,
        p_full = full_stats$p,
        inference_state_full = full_state,
        
        beta_without = stats$beta,
        SE_without = stats$SE,
        statistic_without = stats$statistic,
        df_without = stats$df,
        p_without = stats$p,
        inference_state_without = without_state,
        
        changed_inference_state_from_full = changed_state,
        
        fit_note = stats$fit_note
      )
    }
    
    rows <- lapply(all_group_ids, make_sig_row)
    tab_all <- do.call(rbind, rows)
    rownames(tab_all) <- NULL
    
    tab_changed <- tab_all[
      !is.na(tab_all$changed_inference_state_from_full) &
        tab_all$changed_inference_state_from_full,
      ,
      drop = FALSE
    ]
    
    list(
      parameter = term,
      table_all = tab_all,
      table_changed = tab_changed
    )
  }
  
  
  # ------------------------------------------------------------
  # Run estimate-change diagnostics
  # ------------------------------------------------------------
  
  estimate_results <- lapply(parameters, make_estimate_table_for_parameter)
  names(estimate_results) <- parameters
  
  estimate_tables <- lapply(estimate_results, `[[`, "table")
  dfbetas_flagged <- lapply(estimate_results, `[[`, "flagged_ids")
  
  estimate_combined <- do.call(rbind, estimate_tables)
  rownames(estimate_combined) <- NULL
  
  # ------------------------------------------------------------
  # Run significance-change diagnostics
  # ------------------------------------------------------------
  
  significance_results <- lapply(parameters, make_significance_table_for_parameter)
  names(significance_results) <- parameters
  
  significance_tables_all <- lapply(significance_results, `[[`, "table_all")
  significance_tables_changed <- lapply(significance_results, `[[`, "table_changed")
  
  significance_combined_all <- do.call(rbind, significance_tables_all)
  rownames(significance_combined_all) <- NULL
  
  significance_combined_changed <- do.call(rbind, significance_tables_changed)
  rownames(significance_combined_changed) <- NULL
  
  # ------------------------------------------------------------
  # Printing
  # ------------------------------------------------------------
  
  if (print_tables) {
    cat("\nDFBETAS cutoff:", round(dfbetas_cutoff, 4), "\n")
    cat("Number of groups:", n_groups, "\n")
    cat("Alpha for significance checks:", alpha, "\n")
    cat("Statistic cutoff when p-values are unavailable:", sig_cut, "\n")
    
    if (print_estimate_tables) {
      cat("\n\n##################################################\n")
      cat("ESTIMATE-CHANGE DIAGNOSTIC: DFBETAS\n")
      cat("##################################################\n")
      
      for (term in parameters) {
        cat("\n========================================\n")
        cat("Parameter:", term, "\n")
        cat("Coefficient method:", coef_methods[[term]], "\n")
        cat("Inference-state reference: full model\n")
        
        if (length(dfbetas_flagged[[term]]) == 0) {
          cat("DFBETAS-flagged groups: none\n")
        } else {
          cat("DFBETAS-flagged groups:", paste(dfbetas_flagged[[term]], collapse = ", "), "\n")
        }
        
        print(estimate_tables[[term]], row.names = FALSE)
      }
    }
    
    if (print_significance_tables) {
      cat("\n\n##################################################\n")
      cat("SIGNIFICANCE-CHANGE DIAGNOSTIC: ALL GROUPS\n")
      cat("##################################################\n")
      
      for (term in parameters) {
        changed_tab <- significance_tables_changed[[term]]
        
        cat("\n========================================\n")
        cat("Parameter:", term, "\n")
        cat("Coefficient method:", coef_methods[[term]], "\n")
        cat("Inference-state reference: full model\n")
        
        if (nrow(changed_tab) == 0) {
          cat("No groups changed the inference state.\n")
        } else {
          cat("Groups that changed the inference state:\n")
          print(changed_tab, row.names = FALSE)
        }
      }
    }
  }
  
  invisible(list(
    cutoff = dfbetas_cutoff,
    n_groups = n_groups,
    dfbetas = dfb,
    dfbetas_flagged = dfbetas_flagged,
    coef_methods = coef_methods,
    hypotheses = hypotheses,
    
    estimate_tables = estimate_tables,
    estimate_combined = estimate_combined,
    
    significance_tables_all = significance_tables_all,
    significance_tables_changed = significance_tables_changed,
    significance_combined_all = significance_combined_all,
    significance_combined_changed = significance_combined_changed,
    
    influence = infl
  ))
}


observation_significance_changes <- function(
    model,
    data = NULL,
    parameters = NULL,
    
    # Optional label for observations
    obs_id_col = NULL,
    
    # Coefficient extraction
    coef_methods = NULL,
    default_coef_method = "model",
    
    # CR2 settings
    cr2_cluster = "ParticipantID",
    cr2_test = "Satterthwaite",
    
    # Hypothesis/significance settings
    hypotheses = NULL,
    default_hypothesis = "two_sided",
    alpha = 0.05,
    sig_cut = 1.96,
    
    refit_control = NULL,
    print_changed = TRUE,
    progress = TRUE
) {
  if (!requireNamespace("lme4", quietly = TRUE)) {
    stop("Package 'lme4' is required.")
  }
  
  if (!inherits(model, "merMod")) {
    stop("This function is designed for lme4 models: lmer() or glmer().")
  }
  
  if (is.null(data)) {
    data <- model.frame(model)
  }
  
  if (is.null(parameters)) {
    parameters <- names(lme4::fixef(model))
  }
  
  n_obs <- nrow(data)
  
  if (!is.null(obs_id_col) && !obs_id_col %in% names(data)) {
    stop("`obs_id_col` was not found in data.")
  }
  
  # ------------------------------------------------------------
  # Hypotheses
  # ------------------------------------------------------------
  
  #allowed_hypotheses <- c("negative", "positive", "two_sided")
  
  #if (!default_hypothesis %in% allowed_hypotheses) {
  #  stop(
  #    "`default_hypothesis` must be one of: ",
  #    paste(allowed_hypotheses, collapse = ", ")
  #  )
  #}
  
  #if (is.null(hypotheses)) {
  #  hypotheses <- rep(default_hypothesis, length(parameters))
  #  names(hypotheses) <- parameters
  #} else {
  #  tmp <- rep(default_hypothesis, length(parameters))
  #  names(tmp) <- parameters
    
  #  overlap <- intersect(names(hypotheses), parameters)
  #  tmp[overlap] <- hypotheses[overlap]
    
  #  hypotheses <- tmp
  #}
  
  # ------------------------------------------------------------
  # Coefficient methods
  # ------------------------------------------------------------
  
  allowed_coef_methods <- c("model", "CR2")
  
  if (!default_coef_method %in% allowed_coef_methods) {
    stop(
      "`default_coef_method` must be one of: ",
      paste(allowed_coef_methods, collapse = ", ")
    )
  }
  
  if (is.null(coef_methods)) {
    coef_methods <- rep(default_coef_method, length(parameters))
    names(coef_methods) <- parameters
  } else {
    tmp <- rep(default_coef_method, length(parameters))
    names(tmp) <- parameters
    
    overlap <- intersect(names(coef_methods), parameters)
    tmp[overlap] <- coef_methods[overlap]
    
    coef_methods <- tmp
  }
  
  if (any(coef_methods == "CR2")) {
    if (!requireNamespace("clubSandwich", quietly = TRUE)) {
      stop("Package 'clubSandwich' is required for CR2.")
    }
    
    if (!cr2_cluster %in% names(data)) {
      stop("The CR2 cluster variable '", cr2_cluster, "' was not found in data.")
    }
  }
  
  # ------------------------------------------------------------
  # Significance rule
  # ------------------------------------------------------------
  
  #is_significant_by_hypothesis <- function(stat, p, hypothesis) {
  #  if (is.na(stat)) {
  #    return(NA)
  #  }
    
  #  has_p <- !is.na(p)
    
  #  if (hypothesis == "negative") {
  #    if (has_p) {
  #      return(stat < 0 & p < alpha)
  #    } else {
  #      return(stat < -sig_cut)
  #    }
  #  }
    
  #  if (hypothesis == "positive") {
  #    if (has_p) {
  #      return(stat > 0 & p < alpha)
  #    } else {
  #      return(stat > sig_cut)
  #    }
  #  }
    
  #  if (hypothesis == "two_sided") {
  #    if (has_p) {
  #      return(p < alpha)
  #    } else {
  #      return(abs(stat) > sig_cut)
  #    }
  #  }
    
  #  NA
  #}
  
  # ------------------------------------------------------------
  # Extract coefficient stats for all parameters
  # ------------------------------------------------------------
  
  extract_all_stats <- function(mod, data_used) {
    out <- data.frame(
      Parameter = parameters,
      coef_method = unname(coef_methods[parameters]),
      beta = NA_real_,
      SE = NA_real_,
      statistic = NA_real_,
      df = NA_real_,
      p = NA_real_,
      fit_note = "",
      stringsAsFactors = FALSE
    )
    
    if (inherits(mod, "error")) {
      out$fit_note <- conditionMessage(mod)
      return(out)
    }
    
    # Model summary stats
    model_params <- parameters[coef_methods[parameters] == "model"]
    
    if (length(model_params) > 0) {
      sm <- tryCatch(
        coef(summary(mod)),
        error = function(e) e
      )
      
      if (inherits(sm, "error")) {
        out$fit_note[out$Parameter %in% model_params] <- conditionMessage(sm)
      } else {
        stat_col <- grep("^(t|z) value$", colnames(sm), value = TRUE)
        df_col <- grep("^(df|d\\.f)", colnames(sm), value = TRUE)
        p_col <- grep("^Pr\\(", colnames(sm), value = TRUE)
        
        for (term in model_params) {
          row_out <- which(out$Parameter == term)
          
          if (!term %in% rownames(sm)) {
            out$fit_note[row_out] <- "Parameter not estimated in model summary"
          } else {
            out$beta[row_out] <- unname(sm[term, "Estimate"])
            out$SE[row_out] <- unname(sm[term, "Std. Error"])
            
            if (length(stat_col) > 0) {
              out$statistic[row_out] <- unname(sm[term, stat_col[1]])
            }
            
            if (length(df_col) > 0) {
              out$df[row_out] <- unname(sm[term, df_col[1]])
            }
            
            if (length(p_col) > 0) {
              out$p[row_out] <- unname(sm[term, p_col[1]])
            }
          }
        }
      }
    }
    
    # CR2 stats
    cr2_params <- parameters[coef_methods[parameters] == "CR2"]
    
    if (length(cr2_params) > 0) {
      ct <- tryCatch(
        as.data.frame(
          clubSandwich::coef_test(
            mod,
            vcov = "CR2",
            cluster = data_used[[cr2_cluster]],
            test = cr2_test
          )
        ),
        error = function(e) e
      )
      
      if (inherits(ct, "error")) {
        out$fit_note[out$Parameter %in% cr2_params] <- conditionMessage(ct)
      } else {
        coef_names <- if ("Coef" %in% names(ct)) {
          as.character(ct$Coef)
        } else {
          rownames(ct)
        }
        
        beta_col <- intersect(c("beta", "Estimate", "est"), names(ct))[1]
        se_col <- intersect(c("SE", "Std. Error", "Std.Error"), names(ct))[1]
        stat_col <- intersect(c("tstat", "zstat", "t value", "z value"), names(ct))[1]
        df_col <- grep("^(df|d\\.f|df_)", names(ct), value = TRUE)[1]
        p_col <- grep("^p", names(ct), value = TRUE)[1]
        
        for (term in cr2_params) {
          row_out <- which(out$Parameter == term)
          row_ct <- which(coef_names == term)
          
          if (length(row_ct) == 0) {
            out$fit_note[row_out] <- "Parameter not estimated in coef_test()"
          } else {
            row_ct <- row_ct[1]
            
            if (!is.na(beta_col)) out$beta[row_out] <- unname(ct[row_ct, beta_col])
            if (!is.na(se_col)) out$SE[row_out] <- unname(ct[row_ct, se_col])
            if (!is.na(stat_col)) out$statistic[row_out] <- unname(ct[row_ct, stat_col])
            if (!is.na(df_col)) out$df[row_out] <- unname(ct[row_ct, df_col])
            if (!is.na(p_col)) out$p[row_out] <- unname(ct[row_ct, p_col])
          }
        }
      }
    }
    
    out
  }
  
  # ------------------------------------------------------------
  # Full model stats
  # ------------------------------------------------------------
  
  full_stats <- extract_all_stats(
    mod = model,
    data_used = data
  )
  
  full_stats$inference_state_full <- mapply(
    classify_inference_state,
    beta = full_stats$beta,
    stat = full_stats$statistic,
    p = full_stats$p,
    MoreArgs = list(
      alpha = alpha,
      sig_cut = sig_cut
    )
  )
  
  # ------------------------------------------------------------
  # Leave-one-observation-out checks
  # ------------------------------------------------------------
  
  all_rows <- vector("list", n_obs)
  
  for (i in seq_len(n_obs)) {
    if (progress && (i %% 25 == 0 || i == 1 || i == n_obs)) {
      message("Checking observation ", i, " of ", n_obs, "...")
    }
    
    data_sub <- data[-i, , drop = FALSE]
    data_sub <- droplevels(data_sub)
    
    mod_i <- if (is.null(refit_control)) {
      tryCatch(
        update(model, data = data_sub),
        error = function(e) e
      )
    } else {
      tryCatch(
        update(model, data = data_sub, control = refit_control),
        error = function(e) e
      )
    }
    
    stats_i <- extract_all_stats(
      mod = mod_i,
      data_used = data_sub
    )
    
    obs_label <- if (!is.null(obs_id_col)) {
      as.character(data[[obs_id_col]][i])
    } else {
      rn <- rownames(data)[i]
      if (is.null(rn) || is.na(rn) || rn == "") {
        as.character(i)
      } else {
        as.character(rn)
      }
    }
    
    merged <- merge(
      full_stats,
      stats_i,
      by = c("Parameter", "coef_method"),
      suffixes = c("_full", "_without"),
      all.x = TRUE,
      sort = FALSE
    )
    
    merged$diagnostic <- "lower_level_observation_significance"
    merged$Dropped_obs_index <- i
    merged$Dropped_obs_id <- obs_label
    
    merged$inference_state_without <- mapply(
      classify_inference_state,
      beta = merged$beta_without,
      stat = merged$statistic_without,
      p = merged$p_without,
      MoreArgs = list(
        alpha = alpha,
        sig_cut = sig_cut
      )
    )
    
    merged$changed_inference_state_from_full <- ifelse(
      is.na(merged$inference_state_full) |
        is.na(merged$inference_state_without),
      NA,
      merged$inference_state_without != merged$inference_state_full
    )
    
    all_rows[[i]] <- merged
  }
  
  combined_all <- do.call(rbind, all_rows)
  rownames(combined_all) <- NULL
  
  combined_changed <- combined_all[
    !is.na(combined_all$changed_inference_state_from_full) &
      combined_all$changed_inference_state_from_full,
    ,
    drop = FALSE
  ]
  
  if (print_changed) {
    cat("\n##################################################\n")
    cat("LOWER-LEVEL OBSERVATION SIGNIFICANCE CHECKS\n")
    cat("##################################################\n")
    
    if (nrow(combined_changed) == 0) {
      cat("No lower-level observations changed the significance conclusion.\n")
    } else {
      print(combined_changed, row.names = FALSE)
    }
  }
  
  invisible(list(
    full_stats = full_stats,
    all = combined_all,
    changed = combined_changed
  ))
}
