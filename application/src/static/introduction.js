function showIntroduction() {
    
    $('#welcome').empty().hide()
    $('#consentForm').empty().hide()

    var logo_Ugent = $('<img class = logo-ugent>')
        .attr('src', "static/images/logo_Ugent.png")
        .css('width', '150px')
        .css('height', '120px')

    var logo_ChronoPilot = $('<img class = "logo-chronopilot">')
        .attr('src', "static/images/logo_ChronoPilot.png")
        .css('width', '170px')
        .css('height', '120px')

    var logo_EU_funded = $('<img class = "logo-EU-funded">')
        .attr('src', "static/images/logo_EU_funded.png")
        .css('width', '340px')
        .css('height', '120px')

    var introductionHeadingLogos= $('<div>')
        .addClass('introduction-heading-box')
        .append(logo_ChronoPilot,logo_Ugent)

    var introductionLowerLogos= $('<div>')
        .addClass('introduction-heading-box')
        .append(logo_EU_funded)

    var introductionHeading = $('<h1 class="introduction-heading">INTRODUCTION</h1>')
    
    var introductionText1 = $('<p class = "introduction-text">'+String(intro.text1)+'</p>') 
    var introductionText2 = $('<p class = "introduction-text">'+String(intro.text2)+'</p>')
    var introductionText3 = $('<p class = "introduction-text">'+String(intro.text3)+'</p>')
 
    var ContinueButton = $('<button class = "button-instructions">')
        .text('Continue')
        .click(function() {
            $('html, body').animate({ scrollTop: 0 }, 'smooth'); 
            completionTimeIntroduction = performance.now() - startTimeIntroduction

            showHowToConductExperiment()
        
        })

    var introduction_boxtext = $('<div>')
        .addClass("explanationBoxText")
        .append(introductionText1, 
            introductionText2, 
            introductionText3, 
            ContinueButton)
    
    $('#explanations').append(introductionHeadingLogos,
        introductionHeading, 
        introduction_boxtext,
        introductionLowerLogos).show();
    
    var startTimeIntroduction = performance.now()

}

