function showQuestions() {
  
    //counterBlock += 1

    $('body').css('background-color', 'white');
    $('#mainContainer').empty().hide();
    $('#progressBar').hide();
    $('.questionnaire').empty();
    
    // Create the question elements

    var questionnaireTitle = $('<h1>QUESTIONNAIRE '
        +String(roundNumber)+'/'+String(totalRounds)+'</h1>')    
    
    var question1Element = $('<div>')
        .addClass('questionElement');

    var question2Element = $('<div>')
        .addClass('questionElement');

    var question3Element = $('<div>')
        .addClass('questionElement');

    
    var question1Text = $('<h3>')
        .addClass('question-text')
        .text(questions.question1.text);

    answer1Input = $('<input type="text" class = "writing-box" name="answer1" '+
        'id="answer1" required autocomplete="off" placeholder="Type your answer in seconds">')
    
    question1Element.append(question1Text,answer1Input)

    var question2Text = $('<h3>')
        .addClass('question-text')
        .text(questions.question2.text);

    var question2RateScale = $('<div class="rating">'+
        '<div class = "rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_2_1" name="rating2" value="1">'+
                '<label for="circle_2_1"></label></div><h4 class = "rate-text">'+ 
			String(questions.question2.answerOptions[0])+'</h4></div>'+
        '<div class= "rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_2_2" name="rating2" value="2">'+
                '<label for="circle_2_2"></label></div><h4 class = "rate-text">'+ 
			String(questions.question2.answerOptions[1])+'</h4></div>'+
        '<div class= "rateblock">'+
                '<div class="circle-label">'+
                    '<input type="radio" id="circle_2_3" name="rating2" value="3">'+
                    '<label for="circle_2_3"></label></div><h4 class = "rate-text">'+
                            String(questions.question2.answerOptions[2])+'</h4></div>'+
        '<div class= "rateblock">'+
                '<div class="circle-label">'+
                    '<input type="radio" id="circle_2_4" name="rating2" value="4">'+
                    '<label for="circle_2_4"></label></div><h4 class = "rate-text">'+
                            String(questions.question2.answerOptions[3])+'</h4></div>'+
        '<div class= "rateblock">'+
                '<div class="circle-label">'+
                    '<input type="radio" id="circle_2_5" name="rating2" value="5">'+
                    '<label for="circle_2_5"></label></div><h4 class = "rate-text">'+
                            String(questions.question2.answerOptions[4])+'</h4></div>'+		
        '</div>')
    
    question2Element.append(question2Text,question2RateScale);

        
    var question3Text = $('<h3>')
        .addClass('question-text')
        .text(questions.question3.text);
  
    var question3RateScale = $('<div class="rating">'+
        '<div class = "rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_3_1" name="rating3" value="1">'+
                '<label for="circle_3_1"></label></div><h4 class = "rate-text">'+
			String(questions.question3.answerOptions[0])+'</h4></div>'+
        '<div class= "rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_3_2" name="rating3" value="2">'+
                '<label for="circle_3_2"></label></div><h4 class = "rate-text">'+
			String(questions.question3.answerOptions[1])+'</h4></div>'+
        '<div class ="rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_3_3" name="rating3" value="3">'+
                '<label for="circle_3_3"></label></div><h4 class = "rate-text">'+
			String(questions.question3.answerOptions[2])+'</h4></div>'+
        '<div class ="rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_3_4" name="rating3" value="4">'+
                '<label for="circle_3_4"></label></div><h4 class = "rate-text">'+
			String(questions.question3.answerOptions[3])+'</h4></div>'+
        '<div class ="rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_3_5" name="rating3" value="5">'+
                '<label for="circle_3_5"></label></div><h4 class = "rate-text">'+
			String(questions.question3.answerOptions[4])+'</h4></div>'+
        '</div>')
  
    question3Element.append(question3Text,question3RateScale);
    

    // Record the start time before showing the questions
    questionStartTime = performance.now();
    
    //let timeToAnswerQuestion1;
    let typingTimerQuestion1;
    const typingTimeoutDelay = 1000; // Adjust as needed

    answer1Input.on('keyup', function () {
        if (Event.keyCode === 8 || Event.keyCode === 46) {
            return; // Do nothing if backspace or delete is pressed
        }
        // Clear the previous timer for question 1
        clearTimeout(typingTimerQuestion1);
        timeToAnswerQuestion1 = performance.now() - questionStartTime;
        // Start a new timer for question 1
        typingTimerQuestion1 = setTimeout(function () {
                // Typing has stopped for question 1
                attemptsAnswerQuestion1 +=1
                
                if (attemptsAnswerQuestion1 == 1) {
                    firstTimeToAnswerQuestion1 = timeToAnswerQuestion1
                }
                // Perform your desired action here for question 1
        }, typingTimeoutDelay);
    });

    question2RateScale.find('input[type="radio"]').click(function () {
        timeClickedQuestion2 = performance.now();
        timeToAnswerQuestion2 = timeClickedQuestion2 - questionStartTime;
        //console.log('Question 2 (milliseconds):', timeToAnswerQuestion2);
    });

    question3RateScale.find('input[type="radio"]').click(function () {
        timeClickedQuestion3 = performance.now();
        timeToAnswerQuestion3 = timeClickedQuestion3 - questionStartTime;
        //console.log('Question 3 (milliseconds):', timeToAnswerQuestion3);
    });


    var submitButton = $('<button>')
        .addClass('button')
        .text('Submit answers')
        .click(function() {

            clearTimeout(answerQuestionnaireWarning)
	    

            answer1 = $('#answer1').val();
            answer2 = $('input[name="rating2"]:checked').val();
            answer3 = $('input[name="rating3"]:checked').val();
	    
	        var error1Text = $('<h4>').text('Please, answer the question').css('color', 'red');
            var error2Text = $('<h4>').text('Please, answer the question').css('color', 'red');
            var error3Text = $('<h4>').text('Please, answer the question').css('color', 'red');  	    
	    
	        question1Element.empty().append(question1Text,answer1Input);
            question2Element.empty().append(question2Text,question2RateScale);
            question3Element.empty().append(question3Text,question3RateScale);
	    
            if (answer1 == 0 || answer2 == 0 || answer3 == 0) {

                //if (!answer1) {
                if (answer1 == 0) {
                    question1Element.empty().append(question1Text,error1Text,answer1Input);
                }

                //if (!answer2) {
                if (answer2 == 0) {
                    question2Element.empty().append(question2Text, error2Text, question2RateScale);
                }

                if (answer3 == 0) {
                    question3Element.empty().append(question3Text, error3Text, question3RateScale);
                }

            } else {

                if (/^\s*\d+\s*$/.test(answer1)) {

                    if (attemptsAnswerQuestion1 == 0) {
                        firstTimeToAnswerQuestion1 = timeToAnswerQuestion1
                        attemptsAnswerQuestion1 += 1
                    }

                    timeToAnswerQuestionnaire = performance.now() - questionStartTime
                    
               
                    //saveExperimentQuestion(dataExperiment)
                    saveExperimentQuestion()

                    resetGlobalVariables()
                    
                    //Update roundNumber
                    roundNumber += 1

                    showOptions();

                    breakHappened = false;

                } else {
                    
                    var errorNoIntegerText = $('<h4>')
                        .text('Invalid answer. Please type a number here.')
                        .css('color', 'red');

                    question1Element.empty().append(question1Text,errorNoIntegerText,answer1Input);
                }
            }
        });  
    
    $('#questionnaire')
        .addClass(questionnaire)
        .append(questionnaireTitle,
            question1Element,
            question2Element, 
            question3Element, 
            submitButton).show(); 

    //if (deadline_flag) {
        // Show the missed deadline warning 
        // (where the true flag indicates that it was a practice round)
    //    showMissedDeadlineWarning(false)
    //}

    var answerQuestionnaireWarning = setTimeout(function() {    
        timeLimitQuestionnaireWarning()
    },answerQuestionnaireDeadline*1000)
    
}  
