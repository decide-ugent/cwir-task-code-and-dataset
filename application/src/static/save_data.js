function getPresentedMetadataSeries(sourceArray, optionIndex) {
    return gamblesPresentationOrder.map(function(gambleIndex) {
        return sourceArray[gambleIndex][optionIndex];
    }).join(', ');
}

function getPresentedDeadlinesMetadata() {
    return gamblesPresentationOrder.map(function(gambleIndex) {
        return gamblesDeadlines[gambleIndex];
    }).join(', ');
}

function saveExperimentMetaData() {

    const gamblesReady = totalRounds > 0 &&
        Array.isArray(gamblesPresentationOrder) &&
        gamblesPresentationOrder.length === totalRounds &&
        gamblesValues.length === totalRounds &&
        gamblesPercentages.length === totalRounds &&
        gamblesDeadlines.length === totalRounds &&
        lotteriesPresentationOrder.length === totalRounds;

    if (!gamblesReady) {
        setTimeout(saveExperimentMetaData, 100);
        return;
    }

    metaDataArray = {};
    const presentedDeadlines = getPresentedDeadlinesMetadata();

    metaDataArray['StudyID'] = studyID;
    metaDataArray['SessionID'] = sessionID;
    metaDataArray['ParticipantID'] = participantID;
    metaDataArray['TimePerceptionMeasureMethod'] = timePerceptionMeasureMethod;
    metaDataArray['QuestionnaireClass'] = questionnaireClass;
    metaDataArray['NumberOfRounds'] = totalRounds;
    metaDataArray['DeadlinePresentationOrder'] = presentationOrder + ' | ' + presentedDeadlines;
    metaDataArray['NumberOfRoundsPerBlock'] = getRoundsPerBlockMetadata();
    metaDataArray['Lot0Probabilities'] = getPresentedMetadataSeries(gamblesPercentages, 0);
    metaDataArray['Lot1Probabilities'] = getPresentedMetadataSeries(gamblesPercentages, 1);
    metaDataArray['Lot0Values'] = getPresentedMetadataSeries(gamblesValues, 0);
    metaDataArray['Lot1Values'] = getPresentedMetadataSeries(gamblesValues, 1);
    metaDataArray['ObjectiveTimeIntervals'] = presentedDeadlines; 

    // Send the data to the Flask application
    $.ajax({
        url: urlPath+'save-experiment-metadata',
        type: 'POST',
        data: JSON.stringify(metaDataArray),
        contentType: 'application/json',
        success: function(response) {
            //console.log("Experiment metadata sent")
            console.log("");
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
            }
    });
}


function saveInstructionsCompletionTimes() {

    dataInstructionsCompletionTimes['StudyID'] = studyID;
    dataInstructionsCompletionTimes['SessionID'] = sessionID;
    dataInstructionsCompletionTimes['ParticipantID'] = participantID;

    dataInstructionsCompletionTimes['CompletionTimeConsentForm'] = completionTimeConsentForm/1000;
    dataInstructionsCompletionTimes['CompletionTimeIntroduction'] = completionTimeIntroduction/1000;
    dataInstructionsCompletionTimes['CompletionTimeInstruction1'] = completionTimeInstruction1/1000;
    dataInstructionsCompletionTimes['CompletionTimeInstruction2'] = completionTimeInstruction2/1000;
    dataInstructionsCompletionTimes['CompletionTimeInstruction3'] = completionTimeInstruction3/1000;
    dataInstructionsCompletionTimes['CompletionTimeInstruction4'] = completionTimeInstruction4/1000;
    dataInstructionsCompletionTimes['CompletionTimeInstruction5'] = completionTimeInstruction5/1000;
    dataInstructionsCompletionTimes['CompletionTimeInstruction6'] = completionTimeInstruction6/1000;
    dataInstructionsCompletionTimes['CompletionTimeInstructionsCompleted'] = completionTimeInstructionsCompleted/1000;
    dataInstructionsCompletionTimes['CompletionTimeTimingInstructions'] = completionTimeTimingInstructions/1000;
    dataInstructionsCompletionTimes['CompletionTimeAllInstructions'] = completionTimeAllInstructions/1000;

    dataInstructionsCompletionTimes['CompletionTimeComprehensionCheck1'] = completionTimeComprehensionCheck1/1000;
    dataInstructionsCompletionTimes['CompletionTimeComprehensionCheck2'] = completionTimeComprehensionCheck2/1000;
    dataInstructionsCompletionTimes['CompletionTimeComprehensionCheck3'] = completionTimeComprehensionCheck3/1000;
    dataInstructionsCompletionTimes['CompletionTimeComprehensionCheck4'] = completionTimeComprehensionCheck4/1000;
  
    dataInstructionsCompletionTimes['AttemptsLeftComprehensionCheck1'] = attemptsLeftQuiz1;
    dataInstructionsCompletionTimes['AttemptsLeftComprehensionCheck2'] = attemptsLeftQuiz2;
    dataInstructionsCompletionTimes['AttemptsLeftComprehensionCheck3'] = attemptsLeftQuiz3;
    dataInstructionsCompletionTimes['AttemptsLeftComprehensionCheck4'] = attemptsLeftQuiz4;

    dataInstructionsCompletionTimes['VisitsConsentForm'] = visitsConsentForm;
    dataInstructionsCompletionTimes['VisitsInstruction1'] = visitsInstruction1;
    dataInstructionsCompletionTimes['VisitsInstruction2'] = visitsInstruction2;
    dataInstructionsCompletionTimes['VisitsInstruction3'] = visitsInstruction3;
    dataInstructionsCompletionTimes['VisitsInstruction4'] = visitsInstruction4;
    dataInstructionsCompletionTimes['VisitsInstruction5'] = visitsInstruction5;
    dataInstructionsCompletionTimes['VisitsInstruction6'] = visitsInstruction6;
   

    $.ajax({
        url: urlPath +'save-instructions-completion-times',
        type: 'POST',
        data: JSON.stringify(dataInstructionsCompletionTimes),
        contentType: 'application/json',
        success: function(response) {
            console.log("");
            //console.log("Instructions completion times sent");
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
        }

    });

}

function saveBlockEndQuestionnaire() {

    dataBlockEndQ['StudyID'] = studyID;
    dataBlockEndQ['SessionID'] = sessionID;
    dataBlockEndQ['ParticipantID'] = participantID;
    dataBlockEndQ['BlockNumber'] = blockNumber;
    dataBlockEndQ['BlockEndAnswer1'] = blockEndAnswer1;
    dataBlockEndQ['TimeToAnswerBlockEndQ1'] = timeToAnswerBlockEndQuestion1/1000;
    dataBlockEndQ['FirstTimeToAnswerBlockEndQ1'] = firstTimeToAnswerBlockEndQuestion1/1000;
    dataBlockEndQ['AttemptsSubjectiveBlockTime'] = attemptsAnswerBlockEndQuestion1;
    dataBlockEndQ['BlockEndAnswer2'] = blockEndAnswer2;
    dataBlockEndQ['TimeToAnswerBlockEndQ2'] = timeToAnswerBlockEndQuestion2/1000;
    dataBlockEndQ['BlockEndAnswer3'] = blockEndAnswer3;
    dataBlockEndQ['TimeToAnswerBlockEndQ3'] = timeToAnswerBlockEndQuestion3/1000;
    dataBlockEndQ['TotalTimeBlock'] = totalTimeBlock/1000;

    $.ajax({
        url: urlPath +'save-block-end-questionnaire',
        type: 'POST',
        data: JSON.stringify(dataBlockEndQ),
        contentType: 'application/json',
        success: function(response) {
            console.log("");
            //console.log("Block end questionnaire sent");
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
        }

    });

}

function saveBreakData(dataBreak) {

    $.ajax({
        //url: '/cognitive_load/save-break-data',
        url: urlPath+'save-break-data',
        type: 'POST',
        data: JSON.stringify(dataBreak),
        contentType: 'application/json',
        success: function(response) {
            console.log("");
            //console.log("Data break sent");
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
        }

    });
}


function saveExperimentReproTaskMethod1Quest1() {
    
    // Record data of the current round number
    dataExperiment['StudyID'] = studyID;
    dataExperiment['SessionID'] = sessionID;
    dataExperiment['ParticipantID'] = participantID;
    dataExperiment['DeadlinePresentationOrder'] = presentationOrder;
    dataExperiment['BlockNumber'] = blockNumber;
    dataExperiment['ExperimentRoundNumber'] = roundNumber;
    dataExperiment['ExperimentGambleNumber'] = gamblesPresentationOrder[roundNumber-1]+1;
    dataExperiment['LotteryLeft'] = lotteriesPresentationOrder[roundNumber-1]["Left"];
    dataExperiment['LotteryRight'] = lotteriesPresentationOrder[roundNumber-1]["Right"];
    dataExperiment['GambleChoice'] = choice;
    dataExperiment['GambleResponseTime'] = timePickGamble/1000;
    dataExperiment['GambleSecondaryChoices'] = secondaryChoices.join(', ');
    dataExperiment['GambleSecondaryChoicesTimes'] = secondaryChoicesTimes.join(', ');
    dataExperiment['GambleDeadline'] = roundDeadline;
    dataExperiment['MissedDeadline'] = missedDeadline;
    dataExperiment['FullScreenExited'] = fullScreenExitedWhileInRound;
    dataExperiment['ReproducedTime'] = reproducedTime/1000;
    dataExperiment['SubjectiveDifficulty'] = answerSubjDiff;
    dataExperiment['ResponseTimeSubjectiveDifficulty'] = timeToAnswerSubjDiff/1000;
    dataExperiment['ResponseTimeSubmitAnswersQuestionnaire'] = timeToAnswerQuestionnaireClass1/1000;

    // Send the data to the Flask application
    $.ajax({
        //url: '/cognitive_load/save-experimentdata-reprotaskmethod1-quest1',
        url: urlPath +'save-experimentdata-reprotaskmethod1-quest1',
        type: 'POST',
        data: JSON.stringify(dataExperiment),
        contentType: 'application/json',
        success: function(response) {
            console.log("");
            //console.log("Experiment trial data sent")
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
            }
    });
}

function savePracticeReproTaskMethod1Quest1() {

    // Record data of the current practice round
    dataPractice['StudyID'] = studyID;
    dataPractice['SessionID'] = sessionID;
    dataPractice['ParticipantID'] = participantID;
    dataPractice['PracticeGambleNumber'] = practiceRound;
    dataPractice['GambleChoice'] = choice;
    dataPractice['GambleResponseTime'] = timePickGamble/1000;
    dataPractice['GambleSecondaryChoices'] = secondaryChoices.join(', ');
    dataPractice['GambleSecondaryChoicesTimes'] = secondaryChoicesTimes.join(', ');
    dataPractice['GambleDeadline'] = practiceRoundDeadline;
    dataPractice['MissedDeadline'] = missedDeadline;
    dataPractice['FullScreenExited'] = fullScreenExitedWhileInRound;
    dataPractice['ReproducedTime'] = reproducedTime/1000;
    dataPractice['SubjectiveDifficulty'] = answerSubjDiff;
    dataPractice['ResponseTimeSubjectiveDifficulty'] = timeToAnswerSubjDiff/1000;
    dataPractice['ResponseTimeSubmitAnswersQuestionnaire'] = timeToAnswerQuestionnaireClass1/1000;

    // Send the data to the Flask application
    $.ajax({
        //url: '/cognitive_load/save-practicedata-reprotaskmethod1-quest1',
        url: urlPath + 'save-practicedata-reprotaskmethod1-quest1',
        type: 'POST',
        data: JSON.stringify(dataPractice),
        contentType: 'application/json',
        success: function(response) {
            //console.log("Practice trial data sent")
            console.log("");
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
            }
    });

}

function saveFullScreenMessage(dataFullScreenMessage) {

    $.ajax({
        //url: '/cognitive_load/save-full-screen-message',
        url: urlPath + 'save-full-screen-message',
        type: 'POST',
        data: JSON.stringify(dataFullScreenMessage),
        contentType: 'application/json',
        success: function(response) {
            //console.log("Data full screen message sent");
            console.log("");
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
        }

    });
}

function saveFinalQuestionnaire(dataFinalQ, callbacks = {}) {
     
    $.ajax({
        //url: '/cognitive_load/save-final-questionnaire',
        url: urlPath + 'save-final-questionnaire',
        type: 'POST',
        data: JSON.stringify(dataFinalQ),
        contentType: 'application/json',
        success: function(response) {
            console.log("");
            //console.log("Final questionnaire sent");
            if (callbacks.onSuccess) {
                callbacks.onSuccess(response);
            }
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
            if (callbacks.onError) {
                callbacks.onError(xhr, status, error);
            }
        }

    });
                
}
   
