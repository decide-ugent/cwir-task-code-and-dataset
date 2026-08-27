function showPracticeOptions() {

    $('#InstructionsCompleted').empty().hide();
    $('#questionnaire').hide();
    $('#progressBar').empty().hide();
    $('#explanations').empty().hide();
    $('#timingInstructions').hide();
    $('#mainContainer').empty().hide()

    $('body').css('background-color', 'lightgrey');

    // Clean up old listeners
    $(document).off('keydown.practiceStart');
    $(document).off('keydown.practiceChoice');
    $(document).off('keydown', handleSpacebarPractice);

    // Hide cursor
    hideCursor() 

    // Reset round-level flags
    dataPractice = {};
    secondaryChoices = [];
    secondaryChoicesTimes = [];
    choice = "None";
    choiceMade = false;
    missedDeadline = false;
    roundStarted = false;

    if (practiceRound === totalPracticeRounds + 1) {

        $(document).off('keydown.practiceStart');
        $(document).off('keydown.practiceChoice');
        $(document).off('keydown', handleSpacebarPractice);

        $('body').css('background-color', 'white');
        showCursor();
        getBonusPractice();
        return;
    }

    // -----------------------------
    // Get round data
    // -----------------------------
    var optionsVals = [
        practiceGamblesValues[practiceRound - 1][0],
        practiceGamblesValues[practiceRound - 1][1]
    ];

    var optionsPercentages = [
        practiceGamblesPercentages[practiceRound - 1][0],
        practiceGamblesPercentages[practiceRound - 1][1]
    ];

    practiceRoundDeadline = practiceGamblesDeadlines[practiceRound - 1];


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

        var messagePractice = $('<h1 class="red-text">'+
            'Use the left, or right arrow key to choose a lottery.</h1>')

        var practice_arrow_keys_snapshot = $('<img class = "snapshot-instructions-arrow-keys">')
            .attr('src', "static/images/arrow_keys_practice.svg") 
        
        var messageContainer = $('<div class = "arrow-keys-message-container"><div/>')
            .append(messagePractice)
            .append(practice_arrow_keys_snapshot)
      

        if (practiceRound < 4) {
            $('#bigContainer').empty().append(optionButtonsContainer, messageContainer).show();
        } else {
            $('#bigContainer').empty().append(optionButtonsContainer).show();
        }

    }

    // -----------------------------
    // Choice handler
    // -----------------------------
    function handlePracticeArrowChoice(selectedSide) {

        if (!roundStarted) return;

        var $selectedButton = selectedSide === 'Left' ? optionButtonLeft : optionButtonRight;

  
        if (!choiceMade) {

            // Reaction time measured from appearance of lotteries + triangle
            timePickGamble = performance.now() - roundStartTime;

            deactivateSecondTimeLimit();

            choiceMade = true;
            choice = selectedSide;

            // Hide the numbers after the first choice
            optionButtonLeft.empty();
            optionButtonRight.empty();

            $selectedButton.addClass('blue-flash');
            setTimeout(function () {
                $selectedButton.removeClass('blue-flash');
            }, 500);


        } else {
            timePickSecondaryGamble = performance.now() - roundStartTime;
            secondaryChoicesTimes.push(timePickSecondaryGamble / 1000);
            secondaryChoices.push(selectedSide);
        }
    }

    // -----------------------------
    // Start choice phase
    // -----------------------------
    function startPracticeChoicePhase() {

        //$('#fixation-triangle').show();
        showChoiceScreen();

        roundStartTime = performance.now();

        $(document).on('keydown.practiceChoice', function(event) {
            if (event.which === 37) {
                event.preventDefault();
                handlePracticeArrowChoice('Left');
            } else if (event.which === 39) {
                event.preventDefault();
                handlePracticeArrowChoice('Right');
            }
        });

        decision_deadline = setTimeout(function() {

            $(document).off('keydown.practiceChoice');

            if (!choiceMade) {
                missedDeadline = true;
                practice_lotteries_chosen_missed_deadline.push(true);
            } else {
                practice_lotteries_chosen_missed_deadline.push(false);
            }

            practice_lotteries_chosen.push(choice);

            //$('#fixation-triangle').hide();

            if (timePerceptionMeasureMethod === 'ReproTaskMethod1') {
                practiceReproductionTaskMethod1();
            } else {
                showQuestions();
            }

        }, practiceRoundDeadline * 1000);
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

    $(document).on('keydown.practiceStart', function(event) {

    if (timeLimitMessageShown) return;

    if (event.which === 32 && !roundStarted) { // Spacebar
        event.preventDefault();

        clearTimeout(startDeadlineWarning);
        clearTimeout(timeLimitAfterWarning);
        clearTimeout(secondTimeLimitID);

        roundStarted = true;

        $(document).off('keydown.practiceStart');

        // Replace start message with fixation cross
        showFixationScreen();

        setTimeout(function() {
            startPracticeChoicePhase();
        }, 500);
    }
});
}
