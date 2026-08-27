function Countdown() {

    completionTimeAllInstructions = performance.now() - startTimeStudy

    saveInstructionsCompletionTimes()

    $('#bonusFeedback').empty().hide()
    
    $('#CountdownText').show();

    var number3 = $('<h2>3</h2>')
    var number2 = $('<h2>2</h2>')
    var number1 = $('<h2>1</h2>')
    var go = $('<h2>Go!</h2>')

    setTimeout(function() {
        $('#Countdown').append(number3).show();
    }, 1000);

    setTimeout(function() {
        $('#Countdown').empty().append(number2).show();
    }, 2000);

    setTimeout(function() {
        $('#Countdown').empty().append(number1).show();
    }, 3000);

    setTimeout(function() {
        $('#CountdownText').hide().empty();
        $('#Countdown').hide().empty();
        $('#Countdown-centre').append(go).show();
    }, 4000);

    setTimeout(function() {
        $('#Countdown-centre').hide();
        showOptions();
        startTimeBlock = performance.now()
    }, 5000);

}

function showOptions() {

    $('#explanations').empty().hide()
    $('#consentForm').empty().hide()
    $('#questionnaire').hide();
    $('#takeBreak').empty().hide()
    $('#blockEndQuestionnaire').empty().hide()
    $('#progressBar').empty().hide();


    $('body').css('background-color', 'lightgrey');

    // Clean up old listeners
    $(document).off('keydown.start');
    $(document).off('keydown.choice');
    $(document).off('keydown', handleSpacebar);


    // Reset round-level flags and variables
    dataExperiment = {}
    secondaryChoices = [];
    secondaryChoicesTimes = [];
    choice = "None";
    choiceMade = false
    missedDeadline = false;


    const trial_with_attention_check = attention_checks.includes(roundNumber);
    const trial_with_break = rounds_starting_block.includes(roundNumber);

    //console.log("TRIAL: ", roundNumber)

    //console.log("Trial with break?", trial_with_break)
    //console.log("Trial with attention check?", trial_with_attention_check)    

    //if (trial_with_break && breakHappened == 0) {
    if (trial_with_break && !breakHappened) {

        blockEndQuestionnaire() 
    
    } else {    

        //if (trial_with_attention_check && attention_check_happened == 0) {
        if (trial_with_attention_check && !attentionCheckHappened) {
	        showAttentionCheck(roundNumber)
        } else { 
	    
	        if (roundNumber === totalRounds + 1) {
	            
                blockEndQuestionnaire() 
	    
	        } else {

                // Hide cursor
                hideCursor() 

		        $('body').css('background-color', 'lightgrey');

                // -----------------------------
                // Get round data
                // -----------------------------

                // Retrieve the gamble index for this round
                var gambleIndex = gamblesPresentationOrder[roundNumber - 1];

                // Retrieve which lottery should appear on the left and right
                var leftLotteryIndex = lotteriesPresentationOrder[roundNumber - 1]["Left"];
                var rightLotteryIndex = lotteriesPresentationOrder[roundNumber - 1]["Right"];

                // Retrieve the value of the options for this round,
                // in the actual left/right presentation order
                var optionsVals = [
                    gamblesValues[gambleIndex][leftLotteryIndex],
                    gamblesValues[gambleIndex][rightLotteryIndex]
                ];

                // Retrieve the probabilities of the options for this round,
                // in the actual left/right presentation order
                var optionsPercentages = [
                    gamblesPercentages[gambleIndex][leftLotteryIndex],
                    gamblesPercentages[gambleIndex][rightLotteryIndex]
                ];

                // Retrieve the preset deadline for this experiment round
                roundDeadline = gamblesDeadlines[gamblesPresentationOrder[roundNumber - 1]] 


                //console.log("DEADLINE:", roundDeadline)

                //console.log("gambl index:", gambleIndex)
                //console.log("options val left:", optionsVals[0])
                //console.log("options val right:", optionsVals[1])

                //console.log("options percentage left:", optionsPercentages[0])
                //console.log("options percentage right:", optionsPercentages[1])

                //console.log("lotteries presentation order:", lotteriesPresentationOrder[roundNumber - 1])    
                


                 // -----------------------------
                // Build LEFT lottery panel
                // -----------------------------
                var subcontainerOptionLeft = $('<div class="option-subcontainer" id="subcontainerOptionLeft"></div>');

                var optionButtonLeft = $('<div>')
                    .addClass('option-button-left')
                    .attr('id', 'button-left')
                    .attr('data-value', 'Left')
                    .css({
                        cursor: 'default'
                    });

                var upSubcontainerLeft = $('<div class="option-subsubcontainer">' +
                    '<h1 class="numbers">' + String(optionsPercentages[0]) + '</h1>' +
                    '<p class="symbol">%</p>' +
                    '<p class="options-text">of</p>' +
                    '</div>');

                var downSubcontainerLeft = $('<div class="option-subsubcontainer">' +
                    '<p class="options-text">winning</p>' +
                    '<h1 class="numbers">' + String(optionsVals[0]) + '</h1>' +
                    '<p class="symbol">$</p>' +
                    '</div>');

                subcontainerOptionLeft.append(upSubcontainerLeft, downSubcontainerLeft);
                optionButtonLeft.append(subcontainerOptionLeft);

                // -----------------------------
                // Build RIGHT lottery panel
                // -----------------------------
                var subcontainerOptionRight = $('<div class="option-subcontainer" id="subcontainerOptionRight"></div>');

                var optionButtonRight = $('<div>')
                    .addClass('option-button-right')
                    .attr('id', 'button-right')
                    .attr('data-value', 'Right')
                    .css({
                        cursor: 'default'
                    });

                var upSubcontainerRight = $('<div class="option-subsubcontainer">' +
                    '<h1 class="numbers">' + String(optionsPercentages[1]) + '</h1>' +
                    '<p class="symbol">%</p>' +
                    '<p class="options-text">of</p>' +
                    '</div>');

                var downSubcontainerRight = $('<div class="option-subsubcontainer">' +
                    '<p class="options-text">winning</p>' +
                    '<h1 class="numbers">' + String(optionsVals[1]) + '</h1>' +
                    '<p class="symbol">$</p>' +
                    '</div>');

                subcontainerOptionRight.append(upSubcontainerRight, downSubcontainerRight);
                optionButtonRight.append(subcontainerOptionRight);

                // -----------------------------
                // Start screen
                // -----------------------------
                var startMessageContainer = $('<div class="start-message-container"></div>').css({
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    textAlign: 'center'
                });
                var startMessage = $('<h1>Press <strong>SPACE BAR</strong> to start</h1>').css({
                    margin: 0,
                    color: 'black'
                });

                startMessageContainer.append(startMessage);

                // -----------------------------
                // Screen render helpers
                // -----------------------------
                function showStartScreen() {
                    $('#bigContainer').empty().append(startMessageContainer).show();
                }

                function showFixationScreen() {
                    var $cross = $('#fixation-cross-template')
                        .clone()
                        .removeAttr('id')
                        .addClass('fixation-cross')
                        .css('display', 'block');

                    $cross.find('.cross-line').show();

                    $('#bigContainer').empty().append($cross).show();
                }
                function showChoiceScreen() {

                    optionButtonLeft.css({
                        position: 'static',
                        top: 'auto',
                        left: 'auto',
                        right: 'auto',
                        bottom: 'auto',
                        margin: 0
                    });

                    optionButtonRight.css({
                        position: 'static',
                        top: 'auto',
                        left: 'auto',
                        right: 'auto',
                        bottom: 'auto',
                        margin: 0
                    });

                    var triangle = $('#fixation-triangle-template')
                        .clone()
                        .removeAttr('id')
                        .addClass('fixation-triangle')
                        .css({
                            position: 'static',
                            top: 'auto',
                            left: 'auto',
                            right: 'auto',
                            bottom: 'auto',
                            transform: 'none',
                            display: 'block',
                            margin: 0,
                            alignSelf: 'center',
                            justifySelf: 'center'
                        })
                        .show();

                    var optionButtonsContainer = $('<div class="option-buttons-container"></div>').css({
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 'min(800px, 100vw)',
                        display: 'grid',
                        gridTemplateColumns: '1fr auto 1fr',
                        alignItems: 'center',
                        justifyItems: 'center',
                        boxSizing: 'border-box'
                
                    });

                    var leftWrap = $('<div></div>').css({
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }).append(optionButtonLeft);

                    var centerWrap = $('<div></div>').css({
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }).append(triangle);

                    var rightWrap = $('<div></div>').css({
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                    }).append(optionButtonRight);

                    optionButtonsContainer.append(leftWrap, centerWrap, rightWrap);

                    $('#bigContainer').empty().append(optionButtonsContainer).show();
                }

                // -----------------------------
                // Choice handler
                // -----------------------------
                function handleArrowChoice(selectedSide) {

                    if (!roundStarted) return;

                    var $selectedButton = selectedSide === 'Left' ? optionButtonLeft : optionButtonRight;

                    
                    if (!choiceMade) {

                        $selectedButton.addClass('blue-flash');
                        setTimeout(function () {
                            $selectedButton.removeClass('blue-flash');
                        }, 500);


                        // Reaction time measured from appearance of lotteries + triangle
                        timePickGamble = performance.now() - roundStartTime;

                        deactivateSecondTimeLimit();

                        choiceMade = true;
                        choice = selectedSide;

                        //console.log("Choice made:", choice)

                        // Hide the numbers after the first choice
                        optionButtonLeft.empty();
                        optionButtonRight.empty();

                    } else {
                        timePickSecondaryGamble = performance.now() - roundStartTime;
                        secondaryChoicesTimes.push(timePickSecondaryGamble / 1000);
                        secondaryChoices.push(selectedSide);
                    }
                }

                // -----------------------------
                // Start choice phase
                // -----------------------------
                function startChoicePhase() {

                    //$('#fixation-triangle').show();
                    showChoiceScreen();

                    roundStartTime = performance.now();

                    $(document).on('keydown.choice', function(event) {
                        if (event.which === 37) {
                            event.preventDefault();
                            handleArrowChoice('Left');
                        } else if (event.which === 39) {
                            event.preventDefault();
                            handleArrowChoice('Right');
                        }
                    });

                    decision_deadline = setTimeout(function() {

                        $(document).off('keydown.choice');

                        if (!choiceMade) {
                            missedDeadline = true;
                            lotteriesChosenMissedDeadline.push(true);
                        } else {
                            lotteriesChosenMissedDeadline.push(false);
                        }

                        lotteriesChosen.push(choice);

                        if (timePerceptionMeasureMethod === 'ReproTaskMethod1') {
                            reproductionTaskMethod1();
                        } else {
                            showQuestions();
                        }

                    }, roundDeadline * 1000);

                }

                // -----------------------------
                // Show start screen
                // -----------------------------
                showStartScreen();

                var startDeadlineWarning = setTimeout(function() {

                    if (!roundStarted) {
                        timeLimitWarning("no_start_round", 60);
                    }

                }, start_deadline * 1000);

                // -----------------------------
                // SPACE BAR starts the round
                // -----------------------------
                $(document).on('keydown.start', function(event) {

                    if (timeLimitMessageShown) return;

                    if (event.which === 32 && !roundStarted) { // Spacebar
                        event.preventDefault();

                        clearTimeout(startDeadlineWarning);
                        clearTimeout(timeLimitAfterWarning);
                        clearTimeout(secondTimeLimitID);

                        roundStarted = true;

                        $(document).off('keydown.start');

                        // Replace start message with fixation cross
                        showFixationScreen();

                        setTimeout(function() {
                            startChoicePhase();
                        }, 500);
                    }
                });
            }

      
        }
    }
}
