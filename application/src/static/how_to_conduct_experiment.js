function showHowToConductExperiment() {

    $('#explanations').empty().hide()

    var experimentSetupHeading = $('<h1 class="introduction-heading">Experiment setup</h1>')
    
    var experimentSetupText1 = $('<p class = "introduction-text">'+String(experiment_setup.text1)+'</p>') 
    var experimentSetupText2 = $('<p class = "introduction-text">'+String(experiment_setup.text2)+'</p>')
    var experimentSetupText3 = $('<p class = "introduction-text">'+String(experiment_setup.text3)+'</p>')

 
    var ContinueButton = $('<button class = "button-instructions-understood">')
        .text('Understood!')
        .click(function() {
            $('html, body').animate({ scrollTop: 0 }, 'smooth'); 

            showExplanations(1,1)
        
        })

    var experimentSetup_boxtext = $('<div>')
        .addClass("explanationBoxText")
        .append(experimentSetupText1, 
            experimentSetupText2, 
            experimentSetupText3,
            ContinueButton)
    
    $('#explanations').append(experimentSetupHeading, 
        experimentSetup_boxtext).show();


}
