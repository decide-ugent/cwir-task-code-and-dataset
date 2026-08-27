function dontCountMessage() {

    $('#bonusFeedback').empty().hide()


    var dontCountMessageTitle = $('<h1> REMEMBER TO NOT COUNT TIME </h1>')

    var dontCountMessageText1 = $('<h3> Please remember that you are not allowed to use watches or other devices '+
        'to estimate time. You should also avoid counting time in your head or using rhythmic movements to '+
        'help you estimate or reproduce time intervals. </h3>') 

    var dontCountMessageText2 = $('<h3> When asked to reproduce the triangle duration, '+
        'simply reproduce the time duration that you felt. </h3>') 


    var dontCountMessageTextBox = $('<div>')
        .addClass('bonus-feedback-text-box')
        .append(dontCountMessageText1,dontCountMessageText2);

    var startExperimentButton = $('<button class = "button">')
        .text('Ok')
        .click(function() {
            $('#startExperiment').hide();   
            Countdown(); 
        })

    $('#bonusFeedback')
        .addClass('bonus-feedback')
        .append(dontCountMessageTitle,
            dontCountMessageTextBox,
            startExperimentButton).show()
}

