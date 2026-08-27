function timeLimitWarning(warning_class, second_no_activity_deadline) {

    timeLimitMessageShown = true;

    $('.button').prop('disabled', true);
    $('.option-button-left').prop('disabled', true);
    $('.option-button-right').prop('disabled', true);
    $('.start-button').prop('disabled', true);

    $(document).off('keydown.timeLimitWarning');

    if (warning_class === "no_start_round") {
        var timeLimitWarningHeading = $('<h1 class="time-limit-warning-text">Please start the round</h1>');
        var timeLimitWarningText1 = $('<p class="time-limit-warning-text">You can take a small rest before starting each round. '+
            'But the rest should not take longer than 1 minute. Press <i>SPACE BAR</i> to close this warning and then press <i>SPACE BAR</i> again to begin the round.</p>');
        var timeLimitWarningText2 = $('<p class="time-limit-warning-text">If you do not start the next round in less than 1 minute, '+
            'you will be redirected to Prolific\'s platform and will not be able to proceed.</p>');
     } else if (warning_class === "no_timing_activity") { 
        var timeLimitWarningHeading = $('<h1 class="time-limit-warning-text">No Activity Detected</h1>');
        var timeLimitWarningText1 = $('<p class="time-limit-warning-text">We have detected that you have not been active for a while. '+
            'Press <i>SPACE BAR</i> to close this warning and continue the experiment.</p>');
        var timeLimitWarningText2 = $('<p class="time-limit-warning-text">If you remain inactive for more than 1 minute, '+
            'you will be redirected to Prolific\'s platform and will not be able to proceed.</p>');
     }

    function closeWarning() {
        $('#timeLimitWarningMessage').empty().hide();

        timeLimitMessageShown = false;

        $('.button').prop('disabled', false);
        $('.option-button-left').prop('disabled', false);
        $('.option-button-right').prop('disabled', false);
        $('.start-button').prop('disabled', false);

        clearTimeout(timeLimitAfterWarning);
        $(document).off('keydown.timeLimitWarning');

        secondTimeLimitID = setTimeout(function() {

            $('body').css('background-color', 'white');
            $('#mainContainer').hide();
            $('#timeLimitWarningMessage').empty().hide();

            var failTitle = $('<h1 class="red-text">It took you too much time!</h1>');

            var failText1 = $('<h3>Unfortunately, despite the warning we have not recorded any activity from your side, which means that you cannot complete the study.</h3>');

            var failText2 = $('<h3>You will now be redirected to Prolific\'s platform.</h3>');

            var failTextBox = $('<div>')
                .addClass('thank-you-text-box')
                .append(failText1, failText2);

            $('#thankYouMessage').empty().addClass('thank-you-message').append(failTitle, failTextBox).show();

            setTimeout(function() {
                var urlToRedirect = "https://app.prolific.com/submissions/complete?cc=CQ3UGRXC";
                window.location.href = urlToRedirect;
            }, 12000);

        }, second_no_activity_deadline * 1000);
    }

    $('#timeLimitWarningMessage')
        .empty()
        .append(timeLimitWarningHeading, timeLimitWarningText1, timeLimitWarningText2)
        .show();

    $(document).on('keydown.timeLimitWarning', function(event) {
        if (event.which === 32) {
            event.preventDefault();
            closeWarning();
        }
    });

    timeLimitAfterWarning = setTimeout(function() {

        $(document).off('keydown.timeLimitWarning');

        $('body').css('background-color', 'white');
        $('#mainContainer').hide();
        $('#timeLimitWarningMessage').empty().hide();

        var failTitle = $('<h1 class="red-text">It took you too much time!</h1>');

        var failText1 = $('<h3>Unfortunately, despite the warning we have not recorded any activity from your side, which means that you cannot complete the study.</h3>');

        var failText2 = $('<h3>You will now be redirected to Prolific\'s platform.</h3>');

        var failTextBox = $('<div>')
            .addClass('thank-you-text-box')
            .append(failText1, failText2);

        $('#thankYouMessage').empty().addClass('thank-you-message').append(failTitle, failTextBox).show();

        setTimeout(function() {
            var urlToRedirect = "https://app.prolific.com/submissions/complete?cc=CQ3UGRXCF";
            window.location.href = urlToRedirect;
        }, 12000);

    }, no_activity_after_warning_deadline * 1000);
}


function timeLimitQuestionnaireWarning() {

    console.log("TIME LIMIT QUESTIONNAIRE WARNING CALLED")

    timeLimitQuestionnaireMessageShown = true;
    
    $('.button').prop('disabled', true);
    $('.option-button-left').prop('disabled', true);
    $('.option-button-right').prop('disabled', true);
    $('.start-button').prop('disabled', true);

    
    var timeLimitQuestionnaireWarningHeading = $('<h1 class = time-limit-warning-text>'+
        'Please answer the questionnaire</h1>');
    var timeLimitQuestionnaireWarningText = $("<p class = time-limit-warning-text>"+
            "If you do not submit the answers in less than 1 minute, "+
            "you will be redirected to Prolific's platform and will not be able to proceed.</p>");

    var timeLimitQuestionnaireWarningButton = $('<button class="full-screen-button">')
        .text('Ok')
        .click(function() {
            
            $('#timeLimitQuestionnaireWarningMessage').empty().hide();

            timeLimitQuestionnaireMessageShown = false;
            
            $('.button').prop('disabled', false);
            $('.option-button-left').prop('disabled', false);
            $('.option-button-right').prop('disabled', false);
            $('.start-button').prop('disabled', false);

            clearTimeout(timeLimitQuestionnaireAfterWarning);

            secondTimeLimitID = setTimeout(function() {  

                $('body').css('background-color', 'white');

                $('#mainContainer').hide();

                $('#questionnaire').hide();

                $('#timeLimitQuestionnaireWarningMessage').empty().hide();

                var failTitle = $('<h1 class =red-text>It took you too much time!</h1>')

                var failText1 = $("<h3>Unfortunately, "+
                    "despite the warning we have not recorded any activity from your side, "+
                    "which means that you cannot complete the study.</h3>")
    
                var failText2 = $("<h3>You will now be redirected to Prolific's platform.</h3>")

                var failTextBox = $('<div>')
                    .addClass('thank-you-text-box')
                    .append(failText1,failText2)

                $('#thankYouMessage').addClass('thank-you-message').append(failTitle,failTextBox).show();

                setTimeout(function() {
                    var urlToRedirect = "https://app.prolific.com/submissions/complete?cc=CQ3UGRXC";
                    window.location.href = urlToRedirect;
                }, 12000);

            },60*1000)
        });

    $('#timeLimitQuestionnaireWarningMessage')
        .empty()
        .append(timeLimitQuestionnaireWarningHeading,
            timeLimitQuestionnaireWarningText, 
            timeLimitQuestionnaireWarningButton).show();

    timeLimitQuestionnaireAfterWarning = setTimeout(function() {  

        $('body').css('background-color', 'white');

        $('#mainContainer').hide();

        $('#timeLimitQuestionnaireWarningMessage').empty().hide();
            
        var failTitle = $('<h1 class =red-text>It took you too much time!</h1>')

        var failText1 = $("<h3>Unfortunately, despite the warning we have not recorded any activity from your side, "+
                    "which means that you cannot complete the study.</h3>")
    
        var failText2 = $("<h3>You will now be redirected to Prolific's platform.</h3>")

        var failTextBox = $('<div>')
            .addClass('thank-you-text-box')
            .append(failText1,failText2)

        $('#thankYouMessage').empty().addClass('thank-you-message').append(failTitle,failTextBox).show();

        setTimeout(function() {
            var urlToRedirect = "https://app.prolific.com/submissions/complete?cc=CQ3UGRXCF";
            window.location.href = urlToRedirect;
        }, 12000);

    },no_activity_after_questionnaire_warning_deadline*1000)

}


function deactivateSecondTimeLimit() {
    if (secondTimeLimitID) {
        clearTimeout(secondTimeLimitID);
        secondTimeLimitID = null;
    }
}
