function isCurrentlyFullscreen() {
    return !!(
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
    );
}

function requestExperimentFullscreen() {
    const element = document.documentElement;

    if (element.requestFullscreen) {
        return element.requestFullscreen();
    }
    if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
        return Promise.resolve();
    }
    if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        return Promise.resolve();
    }
    if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
        return Promise.resolve();
    }

    return Promise.reject(new Error('Fullscreen API is not supported.'));
}

function queueFullscreenStatusCheck() {
    setTimeout(checkFullscreenStatus, 0);
}

function clearFullscreenRetryKeys() {
    if (fullscreenRetryKeyHandler !== null) {
        document.removeEventListener('keydown', fullscreenRetryKeyHandler, true);
        fullscreenRetryKeyHandler = null;
    }
}

function bindFullscreenRetryKeys(onProceed) {
    clearFullscreenRetryKeys();

    fullscreenRetryKeyHandler = function(event) {
        if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter' || event.which === 32 || event.which === 13) {
            event.preventDefault();
            event.stopPropagation();
            if (typeof event.stopImmediatePropagation === 'function') {
                event.stopImmediatePropagation();
            }
            onProceed();
        }
    };

    document.addEventListener('keydown', fullscreenRetryKeyHandler, true);
}

function startFullscreenChecking() {
    if (!fullscreenCheckEventsAttached) {
        document.addEventListener('fullscreenchange', queueFullscreenStatusCheck);
        document.addEventListener('webkitfullscreenchange', queueFullscreenStatusCheck);
        document.addEventListener('mozfullscreenchange', queueFullscreenStatusCheck);
        document.addEventListener('MSFullscreenChange', queueFullscreenStatusCheck);
        document.addEventListener('visibilitychange', queueFullscreenStatusCheck);
        window.addEventListener('focus', queueFullscreenStatusCheck);
        window.addEventListener('blur', queueFullscreenStatusCheck);
        fullscreenCheckEventsAttached = true;
    }

    if (fullscreenCheckIntervalId === null) {
        // Keep a light fallback poll because focus/fullscreen events can be flaky across browsers.
        fullscreenCheckIntervalId = setInterval(checkFullscreenStatus, 250);
    }

    checkFullscreenStatus();
}

function checkFullscreenStatus() {

    if (!isCurrentlyFullscreen()) {

        // The user is not in full-screen mode
        
        $('.button').prop('disabled', true);
        $('.start-button').prop('disabled', true);
        $('.next-block-button').prop('disabled', true);
        $('.option-button-left').prop('disabled', true);
        $('.option-button-right').prop('disabled', true);
        $('.submit-answers-button').prop('disabled', true);
        $('.missed-deadline-button').prop('disabled', true); 
        $('.screen-size-top-left-button').prop('disabled', true); 
        $('.screen-size-top-right-button').prop('disabled', true); 
        $('.screen-size-bottom-left-button').prop('disabled', true); 
        $('.screen-size-bottom-right-button').prop('disabled', true); 
        

        if (!fullscreenMessageShown) {

            fullscreenMessageShown = true; // Set the flag to true

            if (full_screen_exited === 4) {
                fullScreenRedirectToProlific()  
            } else {
                showFullScreenMessage()
            }     
        }   

    } else if (!document.hasFocus()){

        hideFullScreenMessage()

        // The user is not in focused
        
        $('.button').prop('disabled', true);
        $('.start-button').prop('disabled', true);
        $('.next-block-button').prop('disabled', true);
        $('.option-button-left').prop('disabled', true);
        $('.option-button-right').prop('disabled', true);
        $('.submit-answers-button').prop('disabled', true);
        $('.missed-deadline-button').prop('disabled', true); 
        $('.screen-size-top-left-button').prop('disabled', true); 
        $('.screen-size-top-right-button').prop('disabled', true); 
        $('.screen-size-bottom-left-button').prop('disabled', true); 
        $('.screen-size-bottom-right-button').prop('disabled', true); 

        //console.log("full_screen_exited", full_screen_exited)
        

        if (!switchWindowMessageShown) {

            switchWindowMessageShown = true; // Set the flag to true

            if (full_screen_exited === 4) {
                fullScreenRedirectToProlific() 
            } else {
                showSwitchWindowMessage()
            }
        } 
    
    } else {
        if (messageSwitchedWindowClicked) {
            hideSwitchWindowMessage()
        }

        hideFullScreenMessage()

     }
        
}

function hideSwitchWindowMessage() {
    // The user is in full-screen mode
    $('#switchWindowMessage').empty().hide();
    clearFullscreenRetryKeys();
    //fullscreenMessageShown = false; // Reset the flag when entering full-screen
    messageSwitchedWindowClicked = false;

    if (timePerceptionMeasureMethod === 'ReproTaskMethod1') {
        if (reproTaskOn) {
            hideCursor()
        }
    }

    if (!missedDeadlineMessageShown){
        $('.submit-answers-button').prop('disabled', false); 
    }
    if (!timeLimitMessageShown){
        $('.start-button').prop('disabled', false);
        $('.option-button-left').prop('disabled', false);
        $('.option-button-right').prop('disabled', false);
    } 
    
    if (minRestHappened){
        $('.next-block-button').prop('disabled', false);
    }
    
    $('.button').prop('disabled', false);
    $('.missed-deadline-button').prop('disabled', false); 
    $('.screen-size-top-left-button').prop('disabled', false); 
    $('.screen-size-top-right-button').prop('disabled', false); 
    $('.screen-size-bottom-left-button').prop('disabled', false); 
    $('.screen-size-bottom-right-button').prop('disabled', false); 
}



function hideFullScreenMessage() {
    // The user is in full-screen mode
    $('#fullscreenMessage').empty().hide();
    clearFullscreenRetryKeys();
    fullscreenMessageShown = false; // Reset the flag when entering full-screen
    //messageSwitchedWindowClicked = false;
    
    if (timePerceptionMeasureMethod === 'ReproTaskMethod1') {
        if (reproTaskOn) {
            if (switchWindowMessageShown) {
                if (messageSwitchedWindowClicked) {
                    hideCursor() 
                }

            } else {
                hideCursor()  
            }
            
        }
    }

    if (!missedDeadlineMessageShown){
        $('.submit-answers-button').prop('disabled', false); 
    }
    if (!timeLimitMessageShown){
        $('.start-button').prop('disabled', false);
        $('.option-button-left').prop('disabled', false);
        $('.option-button-right').prop('disabled', false);
    } 
    
    if (minRestHappened){
        $('.next-block-button').prop('disabled', false);
    }
    
    $('.button').prop('disabled', false);
    $('.missed-deadline-button').prop('disabled', false); 
    $('.screen-size-top-left-button').prop('disabled', false); 
    $('.screen-size-top-right-button').prop('disabled', false); 
    $('.screen-size-bottom-left-button').prop('disabled', false); 
    $('.screen-size-bottom-right-button').prop('disabled', false); 
}


function fullScreenRedirectToProlific() {
    $('body').css('background-color', 'white');
    $('#thankYouMessage').empty().hide();
    $('#explanations').empty().hide();
    $('#mainContainer').empty().hide();
    $('.questionnaire').empty().hide();
    $('#takeBreak').empty().hide();
    $('#Quiz').empty().hide();
    $('#instructionsMessage').hide();
    
    var failTitle = $('<h2>You exited full-screen mode or switched windows more than 3 times</h2>')
        .css('color', 'red').css('width', '10cm'); 

    var failText1 = $("<h3>Unfortunately, you exited full-screen mode or switched windows more than 3 times, "+
        "which means that you cannot complete the study.</h3>")

    var failText2 = $("<h3>You will now be redirected to Prolific's platform.</h3>")

    var failTextBox = $('<div>')
        .addClass('thank-you-text-box')
        .append(failText1,failText2)

    $('#thankYouMessage').addClass('thank-you-message').append(failTitle,failTextBox).show();

    setTimeout(function() {
        var urlToRedirect = "https://app.prolific.com/submissions/complete?cc=C1H70N6Y";
        window.location.href = urlToRedirect;
    }, 12000);
}

function showFullScreenMessage() {

    showCursor() 
    $('#switchWindowMessage').empty().hide();
    switchWindowMessageShown = false;
    messageSwitchedWindowClicked = false;

    // Create and show the message
    var fullScreenHeading = $('<h1>FULL-SCREEN MODE</h1>');
    var fullScreenText1 = $('<h2>'+
        'It is important that you complete the study in full-screen mode and without switching windows.</h2>');
    var fullScreenText2 = $('<h2>If you exit full-screen mode or switch windows more than 3 times, '+
        'you will be unable to complete the study.</h2>');
    var fullScreenText3 = $('<h2>Please, '+
        'press <i>SPACE BAR</i> or click on <i>full-screen</i> to proceed with the experiment.</h2>');
    var fullScreenButton = $('<button class="full-screen-button">')
        .text('Full-screen')
        .click(function() {

            full_screen_exited += 1

            requestExperimentFullscreen()
                .then(function() {
                    fullscreenMessageShown = false;
                    queueFullscreenStatusCheck();
                })
                .catch(function() {
                    // If the browser rejects the fullscreen request, keep the prompt available.
                    fullscreenMessageShown = false;
                    showCursor();
                    queueFullscreenStatusCheck();
                });
  
    });

    $('#fullscreenMessage')
        .empty()
        .append(fullScreenHeading, 
            fullScreenText1, 
            fullScreenText2, 
            fullScreenText3,
            fullScreenButton).show();

    setTimeout(function() {
        fullScreenButton.trigger('focus');
    }, 0);

    bindFullscreenRetryKeys(function() {
        fullScreenButton.trigger('click');
    });
    
    timeFullScreenMessageAppeared = performance.now() - startTimeStudy          
    
    if (roundStarted) {
        fullScreenExitedWhileInRound = true
    }

    var dataFullScreenMessage = {
            study_id: studyID,
            session_id: sessionID,
            participant_id: participantID,
            timeFullScreenMessageAppeared: timeFullScreenMessageAppeared/1000,
            experimentRoundNumber: roundNumber + 1,
            whileInRound: fullScreenExitedWhileInRound,
        };

    saveFullScreenMessage(dataFullScreenMessage)
}


function showSwitchWindowMessage() {
    
    showCursor()

    // Create and show the message
    var fullScreenHeading = $('<h1>FULL-SCREEN MODE</h1>');
    var fullScreenText1 = $('<h2>'+
        'It is important that you complete the study in full-screen mode and without switching windows.</h2>');
    var fullScreenText2 = $('<h2>If you exit full-screen mode or switch windows more than 3 times, '+
        'you will be unable to complete the study.</h2>');
    var fullScreenText3 = $('<h2>Please, '+
        'press <i>SPACE BAR</i> or click on <i>full-screen</i> to proceed with the experiment.</h2>');
    var fullScreenButton = $('<button class="full-screen-button">')
        .text('Full-screen')
        .click(function() {

            full_screen_exited += 1
            
            messageSwitchedWindowClicked = true;

            switchWindowMessageShown = false; // Reset the flag when going back to full-screen
  
    });

    $('#switchWindowMessage')
        .empty()
        .append(fullScreenHeading, 
            fullScreenText1, 
            fullScreenText2, 
            fullScreenText3,
            fullScreenButton).show();

    setTimeout(function() {
        fullScreenButton.trigger('focus');
    }, 0);

    bindFullscreenRetryKeys(function() {
        fullScreenButton.trigger('click');
    });
    
    timeFullScreenMessageAppeared = performance.now() - startTimeStudy          
    
    if (roundStarted) {
        fullScreenExitedWhileInRound = true
    }

    var dataFullScreenMessage = {
            study_id: studyID,
            session_id: sessionID,
            participant_id: participantID,
            timeFullScreenMessageAppeared: timeFullScreenMessageAppeared/1000,
            experimentRoundNumber: roundNumber + 1,
            whileInRound: fullScreenExitedWhileInRound,
        };

    saveFullScreenMessage(dataFullScreenMessage)

}

