function timeEstimationInstructions() {

    $('#questionnaire').hide();
    $('#explanations').empty().hide()
    
    var timingInstructionsHeading = $('<h1>'+
        String(explanations.timing_instructions.heading)+'</h1>') 

    var timingInstructionsText1 =  $('<p class= explanationText>'
        +String(explanations.timing_instructions.text1)+'</p>')


    var timingInstructionsButtonNext = $('<button class = "button-instructions">')
        .text('Continue')
        .click(function() {
            if (!timing_instruction_visited) {
                timing_instruction_visited = true;
                completionTimeTimingInstructions = performance.now() - startTimeTimingInstructions
            }
            if (timingQuizCompleted) {
                practiceRound = 3
                showPracticeOptions()
            } else {
                $('html, body').animate({ scrollTop: 0 }, 'smooth'); 
                timeEstimationQuiz()
            }
            
        }) 
        
    var timingInstructionsContainer = $('<div class ="timing-instructions-container">')
        .append(timingInstructionsHeading,
                timingInstructionsText1,
                timingInstructionsButtonNext)
    
    var startTimeTimingInstructions = performance.now()
        
    $('#explanations').empty().append(timingInstructionsContainer).show();

}

function timeEstimationQuiz() {

    $('#mainContainer').empty()
    $('#explanations').empty().hide()

    var quizTitle = $('<h1 class="heading-instructions">'+
        String(quiz_questions.quiz4.heading)+'</h1>')

    var quizQuestion = $('<p class="comprehension-check-text">'+
        String(quiz_questions.quiz4.question)+'</p>').css('font-size','25px')

    
    var quizAnswer1 =  $('<div class = quiz-answers-subcontainer>')
        .append($('<input type="radio" id="quizanswer1" class="answerclick" name="quizanswer" value="1">'))
        .append($('<div class = quiz-3-answer-subcontainer>'+
            '<p class="comprehension-check-text">'+String(quiz_questions.quiz4.answerOptions[0])+'</p></div>'))
            
    var quizAnswer2 = $('<div class = quiz-answers-subcontainer>')
        .append($('<input type="radio" id="quizanswer2" class="answerclick" name="quizanswer" value="2">'))
        .append($('<div class = quiz-3-answer-subcontainer>'+
            '<p class="comprehension-check-text">'+String(quiz_questions.quiz4.answerOptions[1])+'</p></div>'))

    var quizAnswer3 = $('<div class = quiz-answers-subcontainer>')
        .append($('<input type="radio" id="quizanswer3" class="answerclick" name="quizanswer" value="3">'))
        .append($('<div class = quiz-3-answer-subcontainer>'+
            '<p class="comprehension-check-text">'+String(quiz_questions.quiz4.answerOptions[2])+'</p></div>'))

    var quizAnswer4 = $('<div class = quiz-answers-subcontainer>')
        .append($('<input type="radio" id="quizanswer4" class="answerclick" name="quizanswer" value="4">'))
        .append($('<div class = quiz-3-answer-subcontainer>'+
            '<p class="comprehension-check-text">'+String(quiz_questions.quiz4.answerOptions[3])+'</p></div>'))

    var quizAnswers = $('<div>')
        .addClass("comprehension-check-answers-container-1")
        .append(quizAnswer1, quizAnswer2, quizAnswer3,quizAnswer4)

    var quizParagraph = $('<p class="comprehension-check-text"><strong>'+
        String(quiz_questions.quiz4.paragraph)+'</strong></p>')
        
    var messageCorrect = $('<p style="line-height: 1px; color: green; font-size: 25px">'+
        '<strong>Correct! Click on <i>Continue practicing</i> to proceed.</strong></p>')        

    var isAnswerSelected = false;

    var isCorrectAnswerSelected = false;

    var quizButtonBack = $('<button class = "button-instructions">')
        .text('Back')
        .click(function() {
            $('html, body').animate({ scrollTop: 0 }, 'smooth'); 
            timeEstimationInstructions()
        });  
        
    var quizButtonNext = $('<button class = "button-instructions">')
        .text('Continue practicing')
        .click(function() {
            if (isAnswerSelected) {
                if (isCorrectAnswerSelected) {
                    completionTimeComprehensionCheck4 = performance.now() - startTimeComprehensionCheck4
                    resetGlobalVariables()
                    practiceRound +=1
                    showPracticeOptions()

                } else {
                    quizMessage.empty();
                    alert =  $('<p style="line-height: 1px; color: red; font-size: 25px">'+
                        '<strong>Please select the correct answer before proceeding.</strong></p>')
                    quizMessage.append(alert);
                }
            } else {
                quizMessage.empty();
                alert = $('<p style="line-height: 1px; color: red; font-size: 25px">'+
                    '<strong>Please select an answer before proceeding.</strong></p>')
                quizMessage.append(alert);
            }
                 
        });
   
        var error2 = $('<p style="line-height: 1px; color: red; font-size: 25px">'+
            '<strong>If you wish to read the instructions again, click <i>Back</i>.</strong></p>')
        
        var quizBackNextButtons = $('<div>')
            .addClass("comprehension-check-buttons")
            .append(quizButtonBack,quizButtonNext) 
        
        var quizMessage = $('<h2 style="line-height: 1px;"></h2>');
        
        var quizBoxText = $('<div>')
            .addClass("explanationBoxText")
            .append(//quizTitle,
                quizQuestion,  
                quizMessage,
                quizAnswers, 
                quizParagraph,
                quizBackNextButtons)

        quizAnswer2.find('input[type="radio"]').click(function () {
            isAnswerSelected = true;
            isCorrectAnswerSelected = true;
            timingQuizCompleted = true;
            quizMessage.empty();
            quizMessage.append(messageCorrect);
        });

        quizAnswer1.find('input[type="radio"]').click(function () {
            isAnswerSelected = true;
            attemptsLeftQuiz4 -= 1;
            if (attemptsLeftQuiz4 == 0) {
                failedComprehensionCheck()
                
            }
            if (attemptsLeftQuiz4 == 1) {
                var error1 = $('<p style="line-height: 1px; color: red; font-size: 25px; margin-bottom: 25px;">'+
                    '<strong>Incorrect! <u>You have 1 attempt left. </u></strong></p>');
                quizMessage.empty();
                quizMessage.append(error1, error2);
            }
            if (attemptsLeftQuiz4 >= 1) {
                var error1 = $('<p style="line-height: 1px; color: red; font-size: 25px; margin-bottom: 25px;">'+
                    '<strong>Incorrect! <u>You have ' + String(attemptsLeftQuiz4) + ' attempts left. </u></strong></p>')            
            }
            quizMessage.empty();
            quizMessage.append(error1, error2);
        });
       
        quizAnswer3.find('input[type="radio"]').click(function () {
            isAnswerSelected = true;
            attemptsLeftQuiz4 -= 1;
            if (attemptsLeftQuiz4 == 0) {
                failedComprehensionCheck()
    
            }
            if (attemptsLeftQuiz4 == 1) {
                var error1 = $('<p style="line-height: 1px; color: red; font-size: 25px; margin-bottom: 25px;">'+
                    '<strong>Incorrect! <u>You have 1 attempt left. </u></strong></p>');
                quizMessage.empty();
                quizMessage.append(error1, error2);
            }
            if (attemptsLeftQuiz4 >= 1) {
                var error1 = $('<p style="line-height: 1px; color: red; font-size: 25px; margin-bottom: 25px;">'+
                    '<strong>Incorrect! <u>You have ' + String(attemptsLeftQuiz4) + 
                    ' attempts left. </u></strong></p>')
            }
            quizMessage.empty();
            quizMessage.append(error1, error2);
        });

        quizAnswer4.find('input[type="radio"]').click(function () {
            isAnswerSelected = true;
            attemptsLeftQuiz4 -= 1;
            if (attemptsLeftQuiz4 == 0) {
                failedComprehensionCheck()
    
            }
            if (attemptsLeftQuiz4 == 1) {
                var error1 = $('<p style="line-height: 1px; color: red; font-size: 25px; margin-bottom: 25px;">'+
                    '<strong>Incorrect! <u>You have 1 attempt left. </u></strong></p>');
                quizMessage.empty();
                quizMessage.append(error1, error2);
            }
            if (attemptsLeftQuiz4 >= 1) {
                var error1 = $('<p style="line-height: 1px; color: red; font-size: 25px; margin-bottom: 25px;">'+
                    '<strong>Incorrect! <u>You have ' + String(attemptsLeftQuiz4) + 
                    ' attempts left. </u></strong></p>')
            }
            quizMessage.empty();
            quizMessage.append(error1, error2);
        });

        var startTimeComprehensionCheck4 = performance.now()

        $('#explanations').append(quizTitle,quizBoxText).scrollTop(0).show()

}