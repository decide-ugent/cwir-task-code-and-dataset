function showConsentForm() {
    
    startTimeStudy = performance.now()
    

    var consentFormHeading = $('<h1>CONSENT FORM</h1>')
    
    var consentFormText = $('<div>' +
    '<h1>'+String(consent_form_information.introduction.heading)+'</h1>'+
        '<p class = "consent-form-paragraph">'+String(consent_form_information.introduction.paragraph1)+'</p>'+
        '<p class = "consent-form-paragraph">'+String(consent_form_information.introduction.paragraph2)+'</p>'+
    '<h1>'+String(consent_form_information.summary.heading)+'</h1>'+
        '<ul>' +
            '<li class = "consent-form-paragraph">'+String(consent_form_information.summary.paragraph1)+'</li><br>' +
            '<li class = "consent-form-paragraph">'+String(consent_form_information.summary.paragraph2)+'</li><br>' +
            '<li class = "consent-form-paragraph">'+String(consent_form_information.summary.paragraph3)+'</li><br>' +
            '<li class = "consent-form-paragraph">'+String(consent_form_information.summary.paragraph4)+'</li><br>' +
        '</ul>' +
    '<h1>'+String(consent_form_information.risks.heading)+'</h1>'+
        '<p class = "consent-form-paragraph">'+String(consent_form_information.risks.paragraph1)+'</p>'+
    '<h1>'+String(consent_form_information.dataInfo.heading)+'</h1>'+
        '<p class = "consent-form-paragraph">'+String(consent_form_information.dataInfo.paragraph1)+'</p>'+
        '<p class = "consent-form-paragraph">'+String(consent_form_information.dataInfo.paragraph2)+'</p>'+
        '<p class = "consent-form-paragraph">'+String(consent_form_information.dataInfo.paragraph3)+'</p>'+
        '<p class = "consent-form-paragraph">'+String(consent_form_information.dataInfo.paragraph4)+'</p>'+
        '<p class = "consent-form-paragraph">'+String(consent_form_information.dataInfo.paragraph5)+'</p>'+
        '<p class = "consent-form-paragraph">'+String(consent_form_information.dataInfo.paragraph6)+'</p>'+
    '<h1>'+String(consent_form_information.compensation.heading)+'</h1>'+
        '<ul>' +
            '<li class = "consent-form-paragraph">'+String(consent_form_information.compensation.point1)+'</li><br>' +
            '<li class = "consent-form-paragraph">'+String(consent_form_information.compensation.point2)+'</li><br>' +
            '<li class = "consent-form-paragraph">'+String(consent_form_information.compensation.point3)+'</li><br>' +
            '<li class = "consent-form-paragraph">'+String(consent_form_information.compensation.point4)+'</li><br>' +
	    '<li class = "consent-form-paragraph">'+String(consent_form_information.compensation.point5)+'</li><br>' +
            '<li class = "consent-form-paragraph">'+String(consent_form_information.compensation.point6)+'</li><br>' +
            '<li class = "consent-form-paragraph">'+String(consent_form_information.compensation.point7)+'</li><br>' +
            '<li class = "consent-form-paragraph">'+String(consent_form_information.compensation.point8)+'</li><br>' +
            '<li class = "consent-form-paragraph">'+String(consent_form_information.compensation.point9)+'</li><br>' +
            '<li class = "consent-form-paragraph">'+String(consent_form_information.compensation.point10)+'</li><br>' +
        '</ul>' +
    '<h1>'+String(consent_form_information.contactInformation.heading)+'</h1>'+
        '<p class = "consent-form-paragraph">'+String(consent_form_information.contactInformation.paragraph1)+
        '<u>'+String(consent_form_information.contactInformation.name)+'</u>, at ' +
         '<u>'+String(consent_form_information.contactInformation.email)+'</u></p>'+
    '<h1>'+String(consent_form_information.statementOfConsent.heading)+'</h1>'+
        '<p class = "consent-form-paragraph">'+String(consent_form_information.statementOfConsent.paragraph1)+'</p>'+
	'<ul>' +
    	    '<li class = "consent-form-paragraph">'+String(consent_form_information.statementOfConsent.point1)+'</li>' +
            '<li class = "consent-form-paragraph">'+String(consent_form_information.statementOfConsent.point2)+'</li>' +
            '<li class = "consent-form-paragraph">'+String(consent_form_information.statementOfConsent.point3)+'</li>' +
            '<li class = "consent-form-paragraph">'+String(consent_form_information.statementOfConsent.point4)+'</li>' +
        '</ul>' +
    '</div>');
        
    var consent = $('<div class = "consent-subcontainer">')
        .append($('<input type="radio" id="consent" name="consent" class = "answerclick" value="1">'))
	    .append($('<h2 style="line-height: 0px;">I consent to participate</h2>'))

    var noConsent = $('<div class = "consent-subcontainer">')
        .append($('<input type="radio" id="noConsent" name="consent" class = "answerclick" value="2">'))
	    .append($('<h2 style="line-height: 0px;">I do not consent to participate</h2>'))    
    
    consent.find('input[type="radio"]').change(function() {
        
        var welcomeHeading = $('<h1>Welcome!</h1>')

        var welcomeText = $('<h2>To start the experiment, please click on <i>Continue</i>. '+
            'If you wish to read the Consent Form again, click on <i>Back</i>.</h2>')
        
        var buttonBack = $('<button class = "button">')
            .text('Back')
            .click(function() {
                visitsConsentForm +=1
                $('#welcome').empty().hide()
                consent.find('input[type="radio"]').prop('checked', false);
            })
        
        var buttonContinue = $('<button class = "button">')
            .text('Continue')
            .click(function() {
                                
                requestExperimentFullscreen().catch(function() {
                    // If the initial fullscreen request is denied, the checker will show the retry prompt.
                });
                
                if (fullScreenCheckingON) {
                    startFullscreenChecking();    
                }
                
                completionTimeConsentForm = performance.now() - startTimeConsentForm 

                //Hide consent form and welcome message
                $('#welcome').empty().hide()
                $('#consentForm').empty().hide()
                
                saveExperimentMetaData();
                showIntroduction();
                

            })
        var buttons = $('<div>').addClass('buttons_areyousure').append(buttonBack,buttonContinue)
        $('#welcome').append(welcomeHeading,welcomeText,buttons).show()
    });

    noConsent.find('input[type="radio"]').click(function() {
	    
        var areyousureHeading = $('<h1>Are you sure?</h1>')
        
        var areyousureText = $('<h3>If you do not give your consent, you will be asked to return '+
            'your submission and you will not be able to complete the study.'+ 
			' Please, click on <i>Exit</i> if that is what you wish. If not, click on <i>Back</i>.</h3>')
        
        var buttonBack = $('<button class = "button">')
	        .text('Back')
            .click(function() {
		        $('#areyousure').empty().hide()
                visitsConsentForm +=1
                noConsent.find('input[type="radio"]').prop('checked', false);
            })

        var buttonExit = $('<button class = "button">')
            .text('Exit')
            .click(function() {
		        var urlToRedirect = "https://app.prolific.com/submissions/complete?cc=CSHRZKF9";
          	    window.location.href = urlToRedirect;	    
            })
        var buttons = $('<div>').addClass('buttons_areyousure').append(buttonBack,buttonExit)

	    $('#areyousure').append(areyousureHeading,areyousureText,buttons).show()
    });
    
    $('#consentFormBoxText').append(consentFormText, consent, noConsent)
    $('#consentForm').append(consentFormHeading,consentFormBoxText).show();
    
    var startTimeConsentForm = performance.now()

}
