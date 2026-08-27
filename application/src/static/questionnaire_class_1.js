function showSubjectiveDifficultyQuestion() {
 
    $('body').css('background-color', 'white');
    $('#mainContainer').empty().hide();
    $('#progressBar').hide();
    $('.questionnaire').empty();
    
    // Create the question elements

    var questionnaireTitle = $('<h1>ROUND '
        +String(roundNumber)+'/'+String(totalRounds)+'</h1>')    

    var questionElement = $('<div>')
        .addClass('questionElement');
        
    var questionText = $('<h3>')
        .addClass('question-text')
        .text(questionnaire_class_1.text);
  
    var questionRateScale = $('<div class="rating">'+
        '<div class = "rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_1" name="subj_diff_rating" '+
                    'value=1>'+
                '<label for="circle_1"></label></div><h4 class = "rate-text">'+
			String(questionnaire_class_1.answerOptions[0])+'</h4></div>'+
        '<div class= "rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_2" name="subj_diff_rating" '+
                    'value=2>'+
                '<label for="circle_2"></label></div><h4 class = "rate-text">'+
			String(questionnaire_class_1.answerOptions[1])+'</h4></div>'+
        '<div class ="rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_3" name="subj_diff_rating" '+
                    'value=3>'+
                '<label for="circle_3"></label></div><h4 class = "rate-text">'+
			String(questionnaire_class_1.answerOptions[2])+'</h4></div>'+
        '<div class ="rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_4" name="subj_diff_rating" '+
                    'value=4>'+
                '<label for="circle_4"></label></div><h4 class = "rate-text">'+
			String(questionnaire_class_1.answerOptions[3])+'</h4></div>'+
        '<div class ="rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_5" name="subj_diff_rating" '+
                    'value=5>'+
                '<label for="circle_5"></label></div><h4 class = "rate-text">'+
			String(questionnaire_class_1.answerOptions[4])+'</h4></div>'+
        '</div>')
  
    questionElement.append(questionText,questionRateScale);
    

    // Record the start time before showing the questions
    questionStartTime = performance.now();

    questionRateScale.find('input[type="radio"]').click(function () {
        timeClickedQuestion = performance.now();
        timeToAnswerSubjDiff = timeClickedQuestion - questionStartTime;
        //console.log('Subjective Difficulty Question (milliseconds):', timeToAnswerSubjDiff);
    });

    var submitButton = $('<button>')
        .addClass('button')
        .text('Submit answer')
        .click(function() {

            clearTimeout(answerQuestionnaireWarning)
	
            answerSubjDiff = $('input[name="subj_diff_rating"]:checked').val();
	    
            var errorText = $('<h4>')
                .text('Please, answer the question')
                .css('color', 'red');  	    

            questionElement.empty().append(questionText,questionRateScale);
	    
            if (!answerSubjDiff) {
                    questionElement.empty().append(questionText, errorText, questionRateScale);
            } else {

                timeToAnswerQuestionnaireClass1 = performance.now() - questionStartTime
                
                if (timePerceptionMeasureMethod === 'ReproTaskMethod1'){
                    saveExperimentReproTaskMethod1Quest1()
                }

                resetGlobalVariables()
                
                //Update roundNumber
                roundNumber += 1

                showOptions();

                breakHappened = false;
        }
        });  
    
    $('#questionnaire')
        .addClass(questionnaire)
        .append(questionnaireTitle, 
            questionElement, 
            submitButton).show(); 

    var answerQuestionnaireWarning = setTimeout(function() {    
        timeLimitQuestionnaireWarning()
    },answerQuestionnaireDeadline*1000)
    
}  

function showPracticeSubjectiveDifficultyQuestion() {
 
    $('body').css('background-color', 'white');
    $('#mainContainer').empty().hide();
    $('#progressBar').hide();
    $('.questionnaire').empty();
    
    // Create the question elements

    var questionnaireTitle = $('<h1>PRACTICE ROUND '
        +String(practiceRound)+'/'+String(totalPracticeRounds)+'</h1>')
    
    var roundsLeftInfo = $('<h1 class = "red-text">← Here you can see how many rounds are left</h1>')
        .css('margin-left','30px')

    var questionTitleElement = $('<div>')
        .append(questionnaireTitle,roundsLeftInfo)
        .addClass('question-title-element');

    var questionElement = $('<div>')
        .addClass('questionElement');
        
    var questionText = $('<h3>')
        .addClass('question-text')
        .text(questionnaire_class_1.text);
  
    var questionRateScale = $('<div class="rating">'+
        '<div class = "rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_1" name="subj_diff_rating" '+
                    'value=1>'+
                '<label for="circle_1"></label></div><h4 class = "rate-text">'+
			String(questionnaire_class_1.answerOptions[0])+'</h4></div>'+
        '<div class= "rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_2" name="subj_diff_rating" '+
                    'value=2>'+
                '<label for="circle_2"></label></div><h4 class = "rate-text">'+
			String(questionnaire_class_1.answerOptions[1])+'</h4></div>'+
        '<div class ="rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_3" name="subj_diff_rating" '+
                    'value=3>'+
                '<label for="circle_3"></label></div><h4 class = "rate-text">'+
			String(questionnaire_class_1.answerOptions[2])+'</h4></div>'+
        '<div class ="rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_4" name="subj_diff_rating" '+
                    'value=4>'+
                '<label for="circle_4"></label></div><h4 class = "rate-text">'+
			String(questionnaire_class_1.answerOptions[3])+'</h4></div>'+
        '<div class ="rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_5" name="subj_diff_rating" '+
                    'value=5>'+
                '<label for="circle_5"></label></div><h4 class = "rate-text">'+
			String(questionnaire_class_1.answerOptions[4])+'</h4></div>'+
        '</div>')
  
    questionElement.append(questionText,questionRateScale);
    
    // Record the start time before showing the questions
    questionStartTime = performance.now();

    questionRateScale.find('input[type="radio"]').click(function () {
        timeClickedQuestion = performance.now();
        timeToAnswerSubjDiff = timeClickedQuestion - questionStartTime;
        //console.log('Subjective Difficulty Question (milliseconds):', timeToAnswerSubjDiff);
    });

    var submitButton = $('<button>')
        .addClass('button')
        .text('Submit answer')
        .click(function() {

            clearTimeout(answerQuestionnaireWarning)
	
            answerSubjDiff = $('input[name="subj_diff_rating"]:checked').val();
	    
            var errorText = $('<h4>')
                .text('Please, answer the question')
                .css('color', 'red');  	    

            questionElement.empty().append(questionText,questionRateScale);
	    
            if (!answerSubjDiff) {
                questionElement.empty().append(questionText, errorText, questionRateScale);
            } else {

                timeToAnswerQuestionnaireClass1 = performance.now() - questionStartTime
                
                if (timePerceptionMeasureMethod === 'ReproTaskMethod1'){
                    //console.log("timeToAnswerSubjDiff", timeToAnswerSubjDiff)
                    savePracticeReproTaskMethod1Quest1()
                }

                resetGlobalVariables()

                if (practiceRound == 2) {
                    timeEstimationInstructions()
                } else if (practiceRound == 1) {
                    onlyOneChoiceMessage()
                } else {
                    practiceRound += 1
                    showPracticeOptions()
                }
        }
        });  
    
    $('#questionnaire')
        .addClass(questionnaire)
        .append(questionTitleElement, 
            questionElement, 
            submitButton).show(); 

    var answerQuestionnaireWarning = setTimeout(function() {    
        timeLimitQuestionnaireWarning()
    },answerQuestionnaireDeadline*1000)
    
}  
