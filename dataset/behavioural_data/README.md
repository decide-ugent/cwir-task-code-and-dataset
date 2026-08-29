# Behavioural data

The file `practice_trials.csv` contains the behavioural data from the practice trials, while the file `experiment_trials.csv` contains the behavioural data from the experiment trials. The latter includes the following columns:

- **ParticipantID**: The anonymised participant ID
- **DeadlinePresentationOrder**: Experiment condition, which can either be `Random` or `Block`
- **BlockNumber**: The experiment was divided into 3 blocks of 20 trials each. This number indicates which block the trial belonged to.
- **ExperimentRoundNumber**: For each participant, this represents the order in which the trials were presented. For example, if a row shows `ExperimentRoundNumber = 2`, it contains data from the participant's second trial.
- **ExperimentGambleNumber**: The label for the specific gamble. Each gamble consists of two lotteries ("Lottery 0" and "Lottery 1") and is a unique combination of four values: the probability and payoff for Lottery 0, and the probability and payoff for Lottery 1. For example, `ExperimentGambleNumber = 3` indicates the participant was presented with Gamble 3 on that specific trial. Note that while all participants saw the same gambles, the presentation order was randomised.
- **LotteryLeft**: Which of the two lotteries  (Lottery 0 or Lottery 1) was presented on the left side
- **LotteryRight**: Which of the two lotteries  (Lottery 0 or Lottery 1) was presented on the right side
- **GambleChoice**: Which lottery was selected, the one presented on the left, or the one presented on the right
- **GambleResponseTime**: The lottery choice reaction time
- **GambleSecondaryChoices**: A list of lotteries selected on a given trial after the first choice was made. For example, if this list contains: ['Left', 'Right'], it means that after the first choice, followed by the lottery on the right
- **GambleSecondaryChoicesTimes**: The reaction times for the secondary choices (i.e., lotteries that were clicked after the first choice was made on a given trial)
- **GambleDeadline**: The gamble choice deadline (which is also the target time that must be reproduced)
- **FullScreenExited**: Whether full-screen mode was exited (1) or not (0), on that trial.
- **ReproducedTime**: The reproduced time on that trial
- **MissedDeadline**: Whether the deadline (i.e., 10 seconds) for choosing a lottery was missed (1) or not (0)
- **SubjectiveDifficulty**:  The reported perceived difficulty of selecting a lottery, measured on a 5-point Likert scale (1 = Very easy, 2 = Easy, 3 = Medium, 4 = Hard, 5 = Very hard)  
- **ResponseTimeSubjectiveDifficulty**: The time it took for a participant to rate the difficulty (starting from the moment the subjective difficulty question was presented)
- **ResponseTimeSubmitAnswersQuestionnaire**: The time it took for a participant to submit the answers to the subjective difficulty questionnaire (starting from the moment the questions were presented)
- **Counter**: Whether the participant reported to have done chronometric counting in many or most trials (1) or not (0)
- **Age**: Age of the participant
- **Sex**: Sex of the participant, which may be `Female` or `Male`
- **SubjectiveDifficulty3Lev**: The reported perceived difficulty of selecting a lottery, measured on a 5-point Likert scale but binned into three categories (1 = Easy, 2 = Medium, 3 = Hard)  
- **lot_0_val**: Payoff value of Lottery 0
- **lot_0_prob**: Payoff probability of Lottery 0
- **lot_0_ev**: Expected value of Lottery 0
- **lot_1_val**: Payoff value of Lottery 1
- **lot_1_prob**: Payoff probability of Lottery 1
- **lot_1_ev**: Expected value of Lottery 1
- **dX**: Difference in payoff values between Lottery 0 and Lottery 1
- **dP**: Difference in payoff probabilities between Lottery 0 and Lottery 1
- **dEV**: Difference in expected values between Lottery 0 and Lottery 1
- **RiskyChoice**: Whether the riskier Lottery was chosen in this trial
- **BlockRoundNumber**: Serial presentation position of the trial within its block
- **AbsoluteError**: Absolute relative error. That is, absolute value of the difference between target duration and reproduced time, divided by the target duration.
- **RiskAttitudeScore**: Fraction of the total number of trials (throughout the experiment). in which the participant chose the riskier Lottery


