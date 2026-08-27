function reproductionTaskMethod1() {

    reproTaskOn = true;

    $('#explanations').empty().hide()
    $('#consentForm').empty().hide()
    $('#consentFormBoxText').empty().hide()
    $('#mainContainer').empty()
    $('#bigContainer').empty().hide()

    $('body').css('background-color', 'lightgrey')

    $('#dotContainer').append($('#fixation-cross').show()).show();
    //$('#horizontal-line').show();
    //$('#vertical-line').show();

    // Create a canvas element using jQuery
    var $canvas = $('<canvas id="myCanvas" width="200" height="100"></canvas>');
    
    // Get the raw DOM element from the jQuery object
    var canvas = $canvas[0]; // This gives you the raw canvas DOM element
    
    // Get the 2D drawing context
    const ctx = canvas.getContext("2d");

    // Draw a red circle without an outline
    ctx.beginPath();
    ctx.arc(95, 50, 40, 0, 2 * Math.PI); // Center at (95, 50) with radius 40
    ctx.lineWidth = 8; // Set the width of the outline
    ctx.stroke(); // Draw only the outline (circumference)

    
    hideCursor() 

    randomInterval = setTimeout(function() {
        // Hide fixation cross and show red dot
        $('#fixation-cross').hide();
        //$('#horizontal-line').hide();
        //$('#vertical-line').hide();
        $('#dotContainer').empty().append($canvas).show();

        reproductionStartTime = performance.now()

        reproducedTimeDone = false;

        $(document).off('keydown', handleSpacebar);
        $(document).on('keydown', handleSpacebar);

        clearTimeout(timingInactivityWarning);
        timingInactivityWarning = setTimeout(function() {
            timeLimitWarning("no_timing_activity", 60);
        }, timing_inactivity_deadline * 1000);

    },preReproTaskInterval[roundNumber-1]*1250)

    
}

function practiceReproductionTaskMethod1() {

    reproTaskOn = true;

    $('#explanations').empty().hide()
    $('#consentForm').empty().hide()
    $('#consentFormBoxText').empty().hide()
    $('#mainContainer').empty()
    $('#bigContainer').empty().hide()

    $('body').css('background-color', 'lightgrey')

    $('#dotContainer').append($('#fixation-cross').show()).show();
    //$('#horizontal-line').show();
    //$('#vertical-line').show();

    // Create a canvas element using jQuery
    var $canvas = $('<canvas id="myCanvas" width="200" height="100"></canvas>');
    
    // Get the raw DOM element from the jQuery object
    var canvas = $canvas[0]; // This gives you the raw canvas DOM element
    
    // Get the 2D drawing context
    const ctx = canvas.getContext("2d");

    // Draw a red circle without an outline
    ctx.beginPath();
    ctx.arc(95, 50, 40, 0, 2 * Math.PI); // Center at (95, 50) with radius 40
    ctx.lineWidth = 8; // Set the width of the outline
    ctx.stroke(); // Draw only the outline (circumference)

    hideCursor() 

    randomInterval = setTimeout(function() {
        // Hide fixation cross and show red dot
        $('#fixation-cross').hide();
        //$('#horizontal-line').hide();
        //$('#vertical-line').hide();

        var messageReproTask1 = $('<h1 class="red-text">'+
            'Press the space bar when you think the circle has been on the screen for as long as the triangle was.</h1>')

        var messageReproTask2 = $('<h3 class="red-text">'+
            '(This message will only be shown in the first practice rounds)</h3>')

        //var messagesContainer = $('#reproductionMessageContainer')
        //$('#reproductionMessageContainer').empty()

        var messagesContainer = $('<div class = "reproduction-message-container"><div/>')
            .append(messageReproTask1)
            .append(messageReproTask2)

        if (practiceRound < 4) {
            $('#dotContainer').empty().append(messagesContainer,$canvas).show();
        } else {
            $('#dotContainer').empty().append($canvas).show();  
        }

        reproductionStartTime = performance.now()

        reproducedTimeDone = false;

        $(document).off('keydown', handleSpacebarPractice);
        $(document).on('keydown', handleSpacebarPractice);

        clearTimeout(timingInactivityWarning);
        timingInactivityWarning = setTimeout(function() {
            timeLimitWarning("no_timing_activity", 60);
        }, timing_inactivity_deadline * 1000);

    },preReproTaskIntervalPractice[practiceRound-1]*1250)
}


function handleSpacebarPractice(event) {
    if (event.which === 32) { // Spacebar key code
        event.preventDefault();

        clearTimeout(timingInactivityWarning);
        timingInactivityWarning = null;
        $(document).off('keydown', handleSpacebarPractice);

        if (!reproducedTimeDone) {

            reproTaskOn = false;

            reproducedTimeDone = true;

            //Record reproduced time
            reproducedTime = performance.now() - reproductionStartTime
            //console.log("Reproduced time: ",reproducedTime)

            showCursor()

            // Hide the canvas
            $('#dotContainer').empty();
            
            clearInterval(randomInterval);

            // Call the function to show questionnaire 
            // or next round
            if (questionnaireClass == 0) {
                //Update practice round number
                practiceRound += 1
                setTimeout(function() {
                    $('#dotContainer').hide()
                    showPracticeOptions();
                },500)
            } else if (questionnaireClass == 1) {
                //Reset flag to indicate if the round started
                roundStarted = false; 

                setTimeout(function() {
                    $('#dotContainer').hide()
                    showPracticeSubjectiveDifficultyQuestion();
                },500)
            }
        }
    }
}

// Define the event handler as a named function
function handleSpacebar(event) {
    if (event.which === 32) { // Spacebar key code
        event.preventDefault();

        clearTimeout(timingInactivityWarning);
        timingInactivityWarning = null;
        $(document).off('keydown', handleSpacebar);

        if (!reproducedTimeDone) {
            
            reproTaskOn = false;

            reproducedTimeDone = true;

            //Record reproduced time
            reproducedTime = performance.now() - reproductionStartTime
            //console.log("Reproduced time: ",reproducedTime)

            showCursor()


            // Hide the canvas
            $('#dotContainer').empty();
            
            clearInterval(randomInterval);
            // Call the function to show questionnaire 
            // or next round
            if (questionnaireClass == 0) {
                //Update roundNumber
                roundNumber += 1
                setTimeout(function() {
                    $('#dotContainer').hide()
                    showOptions()
                },500)
            } else if (questionnaireClass == 1) {
                //Reset flag to indicate if the round started
                roundStarted = false; 
                setTimeout(function() {
                    $('#dotContainer').hide()
                    showSubjectiveDifficultyQuestion();
                },500)
            }
        }
    }
}

