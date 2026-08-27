function resetGlobalVariables () {

    //Make secondary choices and times list empty again.
    secondaryChoices = [];
    secondaryChoicesTimes = [];

    //Empty the mouse tracking dictionary
    dataMouseTracking = {};

    // Empty experiment data dictionary
    dataExperiment = {}

    //Empty the practice mouse tracking dictionary
    dataPracticeMouseTracking = {}

    //Empty the practice data dictionary
    dataPractice = {}

    //Reset answer values for long Questionnaire
    answer1 = 0;
    answer2 = 0;
    answer3 = 0;

    firstTimeToAnswerQuestion1 = 0;
    timeToAnswerQuestion1 = 0;
    timeToAnswerQuestion2 = 0;
    timeToAnswerQuestion3 = 0;
    attemptsAnswerQuestion1 = 0;

    timeToAnswerQuestionnaire = 0

    // Reset variables for questionnaire class 1
    if (questionnaireClass === 1) {
        answerSubjDiff = 0;
        timeToAnswerSubjDiff = 0;
        timeToAnswerQuestionnaireClass1 = 0;   
    }

    // Reset reproduced time if reproduction task
    if (timePerceptionMeasureMethod === 'ReproTaskMethod1') {
        reproducedTime = 0
        fullScreenExitedWhileInRound = false
    }

    //Reset choice to None in case next trial no chioce is made
    choice = "None"

    //Reset deadlines:
    roundPresetDeadline = 0;
    practiceRoundPresetDeadline = 0;
    roundFinalDeadline = 0;

    //Reset flags
    missedMaxDeadline = false;
}

function resetBlockEndVariables() {

    dataBlockEndQ = {};

    timeToAnswerBlockEndQuestion1 = 0;
    timeToAnswerBlockEndQuestion2 = 0;
    timeToAnswerBlockEndQuestion3 = 0;
    attemptsAnswerBlockEndQuestion1 = 0;
    firstTimeToAnswerBlockEndQuestion1 = 0;
    blockEndAnswer1 = 0;
    blockEndAnswer2 = 0;
    blockEndAnswer3 = 0;
    totalTimeBlock = 0;

}