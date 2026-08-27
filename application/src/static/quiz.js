function Quiz(quiznum){

    $('#explanations').empty().hide()
    $('#Quiz').empty().hide()

    if (quiznum == 1){
        
        var quiz_title = $('<h1 class="heading-instructions">'
            +String(quiz_questions.quiz1.heading)+'</h1>')

        var quiz_question = $('<p class="comprehension-check-text">'
            +String(quiz_questions.quiz1.question)+'</p>')

        var quiz_paragraph = $('<p class="comprehension-check-text"><strong>'
            +String(quiz_questions.quiz1.paragraph)+'</strong></p>')
	
        var quiz_snapshot = $('<img class = "snapshot">')
            .attr('src', "static/images/snapshot4.png")
            .css('width', '700px')
            .css('height', '350px')

        var quiz_answer_1 =  $('<div class = quiz-answers-subcontainer>')
            .append($('<input type="radio" id="quizanswer1" class="answerclick" name="quizanswer" value="1">'))
            .append($('<h2 style="line-height: 1px;">'+String(quiz_questions.quiz1.answerOptions[0])+'</h2>'))
        
        var quiz_answer_2 = $('<div class = quiz-answers-subcontainer>')
            .append($('<input type="radio" id="quizanswer2" class="answerclick" name="quizanswer" value="2">'))
            .append($('<h2 style="line-height: 1px;">'+String(quiz_questions.quiz1.answerOptions[1])+'</h2>'))

        var quiz_answer_3 = $('<div class = quiz-answers-subcontainer>')
            .append($('<input type="radio" id="quizanswer3" class="answerclick" name="quizanswer" value="3">'))
            .append($('<h2 style="line-height: 1px;">'+String(quiz_questions.quiz1.answerOptions[2])+'</h2>'))

        var quiz_answer_4 = $('<div class = quiz-answers-subcontainer>')
            .append($('<input type="radio" id="quizanswer4" class="answerclick" name="quizanswer" value="4">'))
            .append($('<h2 style="line-height: 1px;">'+String(quiz_questions.quiz1.answerOptions[3])+'</h2>'))

        
        var quiz_answers = $('<div>')
            .addClass("comprehension-check-answers-container-1")
            .append(quiz_answer_1, quiz_answer_2, quiz_answer_3, quiz_answer_4)
            
        var message_correct = $('<p style="line-height: 1px; color: green; font-size: 25px">'+
            '<strong>Correct! Click on <i>Next</i> to proceed.</strong></p>')        

        var isAnswerSelected = false;

        var isCorrectAnswerSelected = false;

        var quiz_button_back = $('<button class = "button-instructions">')
            .text('Back')
            .click(function() {
                $('html, body').animate({ scrollTop: 0 }, 'smooth'); 
                showExplanations(2,1)
            });  
        
        var quiz_button_next = $('<button class = "button-instructions">')
            .text('Next')
            .click(function() {
                $('html, body').animate({ scrollTop: 0 }, 'smooth'); 
                    if (isAnswerSelected) {
                    if (isCorrectAnswerSelected) {
                        completionTimeComprehensionCheck1 = performance.now() - startTimeComprehensionCheck1 
                        Quiz(quiznum+1)
                    } else {
                        quiz_message.empty();
                        alert =  $('<p style="line-height: 1px; color: red; font-size: 25px">'+
                            '<strong>Please select the correct answer before proceeding.</strong></p>')
                        quiz_message.append(alert);
                    }
                } else {
                    quiz_message.empty();
                    alert = $('<p style="line-height: 1px; color: red; font-size: 25px">'+
                        '<strong>Please select an answer before proceeding.</strong></p>')
                    quiz_message.append(alert);
                }
                    
            });

        var error2 = $('<p style="line-height: 1px; color: red; font-size: 25px">'+
            '<strong>If you wish to read the instructions again, click <i>Back</i>.</strong></p>')
        
        var quiz_Back_Next_buttons = $('<div>')
            .addClass("comprehension-check-buttons")
            .append(quiz_button_back,quiz_button_next) 
        
        var quiz_message = $('<h2 style="line-height: 1px;"></h2>');
        
        var quizBoxText = $('<div>')
            .addClass("explanationBoxText")
            .append(//quiz_title,
                quiz_question, 
                quiz_paragraph, 
                quiz_snapshot,
                quiz_message,
                quiz_answers, 
                quiz_Back_Next_buttons)
        
        quiz_answer_1.find('input[type="radio"]').click(function () {
            isAnswerSelected = true;
            attemptsLeftQuiz1 -= 1;
            if (attemptsLeftQuiz1 == 0) {
                failedComprehensionCheck()
        
            }
            if (attemptsLeftQuiz1 == 1) {
                var error1 = $('<p style="line-height: 1px; color: red; font-size: 25px; margin-bottom: 25px;">'+
                '<strong>Incorrect! <u>You have 1 attempt left. </u></strong></p>');
                quiz_message.empty();
                quiz_message.append(error1, error2);
            }
            if (attemptsLeftQuiz1 >= 1) {
                var error1 = $('<p style="line-height: 1px; color: red; font-size: 25px; margin-bottom: 25px;">'+
                '<strong>Incorrect! <u>You have ' + String(attemptsLeftQuiz1) + ' attempts left. </u></strong></p>')
            }
            quiz_message.empty();
            quiz_message.append(error1, error2);
        });

        quiz_answer_2.find('input[type="radio"]').click(function () {
            isAnswerSelected = true;
            attemptsLeftQuiz1 -= 1;
            if (attemptsLeftQuiz1 == 0) {
                failedComprehensionCheck()
        
            }
            if (attemptsLeftQuiz1 == 1) {
                var error1 = $('<p style="line-height: 1px; color: red; font-size: 25px; margin-bottom: 25px;">'+
                '<strong>Incorrect! <u>You have 1 attempt left. </u></strong></p>');
                quiz_message.empty();
                quiz_message.append(error1, error2);
            }
            if (attemptsLeftQuiz1 >= 1) {
                var error1 = $('<p style="line-height: 1px; color: red; font-size: 25px; margin-bottom: 25px;">'+
                '<strong>Incorrect! <u>You have ' + String(attemptsLeftQuiz1) + ' attempts left. </u></strong></p>')            
            }
            quiz_message.empty();
            quiz_message.append(error1, error2);
        });
    

        quiz_answer_3.find('input[type="radio"]').click(function () {
            isAnswerSelected = true;
            isCorrectAnswerSelected = true;
            quiz_message.empty();
            quiz_message.append(message_correct);
        });

        quiz_answer_4.find('input[type="radio"]').click(function () {
            isAnswerSelected = true;
            attemptsLeftQuiz1 -= 1;
            if (attemptsLeftQuiz1 == 0) {
                failedComprehensionCheck()
                
            }
            if (attemptsLeftQuiz1 == 1) {
                var error1 = $('<p style="line-height: 1px; color: red; font-size: 25px; margin-bottom: 25px;">'+
                '<strong>Incorrect! <u>You have 1 attempt left. </u></strong></p>');
                quiz_message.empty();
                quiz_message.append(error1, error2);
            }
            if (attemptsLeftQuiz1 >= 1) {
                var error1 = $('<p style="line-height: 1px; color: red; font-size: 25px; margin-bottom: 25px;">'+
                '<strong>Incorrect! <u>You have ' + String(attemptsLeftQuiz1) + ' attempts left. </u></strong></p>')
            }
            quiz_message.empty();
            quiz_message.append(error1, error2);
        });

        $('#explanations').append(quiz_title,quizBoxText).scrollTop(0).show()

        var startTimeComprehensionCheck1 = performance.now()
    } 

    if (quiznum == 2){

        var quiz_title = $('<h1 class="heading-instructions">'+
            String(quiz_questions.quiz2.heading)+'</h1>')

        var quiz_question = $('<p class="comprehension-check-text">'+
            String(quiz_questions.quiz2.question)+'</p>')

        var quiz_paragraph = $('<p class="comprehension-check-text"><strong>'+
            String(quiz_questions.quiz2.paragraph)+'</strong></p>')
	
        var quiz_snapshot = $('<img class = "snapshot">')
            .attr('src', "static/images/snapshot5.png")
            .css('width', '700px')
            .css('height', '350px')

        var quiz_answer_1 =  $('<div class = quiz-answers-subcontainer>')
            .append($('<input type="radio" id="quizanswer1" class="answerclick" name="quizanswer" value="1">'))
            .append($('<h2 style="line-height: 1px;">'+String(quiz_questions.quiz2.answerOptions[0])+'</h2>'))
            
        var quiz_answer_2 = $('<div class = quiz-answers-subcontainer>')
            .append($('<input type="radio" id="quizanswer2" class="answerclick" name="quizanswer" value="2">'))
            .append($('<h2 style="line-height: 1px;">'+String(quiz_questions.quiz2.answerOptions[1])+'</h2>'))

        var quiz_answer_3 = $('<div class = quiz-answers-subcontainer>')
            .append($('<input type="radio" id="quizanswer3" class="answerclick" name="quizanswer" value="3">'))
            .append($('<h2 style="line-height: 1px;">'+String(quiz_questions.quiz2.answerOptions[2])+'</h2>'))

        var quiz_answer_4 = $('<div class = quiz-answers-subcontainer>')
            .append($('<input type="radio" id="quizanswer4" class="answerclick" name="quizanswer" value="4">'))
            .append($('<h2 style="line-height: 1px;">'+String(quiz_questions.quiz2.answerOptions[3])+'</h2>'))
        
        
        var quiz_answers = $('<div>')
            .addClass("comprehension-check-answers-container")
            .append(quiz_answer_1, quiz_answer_2, quiz_answer_3, quiz_answer_4)
        
        var message_correct = $('<p style="line-height: 1px; color: green; font-size: 25px">'+
            '<strong>Correct! Click on <i>Next</i> to proceed.</strong></p>')        

        var isAnswerSelected = false;

        var isCorrectAnswerSelected = false;

        var quiz_button_back = $('<button class = "button-instructions">')
            .text('Back')
            .click(function() {
                $('html, body').animate({ scrollTop: 0 }, 'smooth'); 
                 showExplanations(2,2)
            });  
        
        var quiz_button_next = $('<button class = "button-instructions">')
            .text('Next')
            .click(function() {
                $('html, body').animate({ scrollTop: 0 }, 'smooth'); 
                 if (isAnswerSelected) {
                    if (isCorrectAnswerSelected) {
                        completionTimeComprehensionCheck2 = performance.now() - startTimeComprehensionCheck2 
                    
                        showExplanations(3,quiznum + 1)
                    } else {
                        quiz_message.empty();
                        alert =  $('<p style="line-height: 1px; color: red; font-size: 25px">'+
                            '<strong>Please select the correct answer before proceeding.</strong></p>')
                        quiz_message.append(alert);
                    }
                } else {
                    quiz_message.empty();
                    alert = $('<p style="line-height: 1px; color: red; font-size: 25px">'+
                        '<strong>Please select an answer before proceeding.</strong></p>')
                    quiz_message.append(alert);
                }
                 
            });
   
        var error2 = $('<p style="line-height: 1px; color: red; font-size: 25px">'+
            '<strong>If you wish to read the instructions again, click <i>Back</i>.</strong></p>')
        
        var quiz_Back_Next_buttons = $('<div>')
	        .addClass("comprehension-check-buttons")
	        .append(quiz_button_back,quiz_button_next) 
        
        var quiz_message = $('<h2 style="line-height: 1px;"></h2>');
        
        var quizBoxText = $('<div>')
            .addClass("explanationBoxText")
            .append(//quiz_title,
                quiz_question, 
                quiz_paragraph, 
                quiz_snapshot,
                quiz_message,
                quiz_answers, 
                quiz_Back_Next_buttons)
        
        quiz_answer_1.find('input[type="radio"]').click(function () {
            isAnswerSelected = true;
            attemptsLeftQuiz2 -= 1;
            if (attemptsLeftQuiz2 == 0) {
                failedComprehensionCheck()

            }
            if (attemptsLeftQuiz2 == 1) {
                var error1 = $('<p style="line-height: 1px; color: red; font-size: 25px; margin-bottom: 25px;">'+
                    '<strong>Incorrect! <u>You have 1 attempt left. </u></strong></p>');
                quiz_message.empty();
                quiz_message.append(error1, error2);
            }
            if (attemptsLeftQuiz2 >= 2) {
                var error1 = $('<p style="line-height: 1px; color: red; font-size: 25px; margin-bottom: 25px;">'+
                    '<strong>Incorrect! <u>You have ' + String(attemptsLeftQuiz2) + ' attempts left. </u></strong></p>')
            }
            quiz_message.empty();
            quiz_message.append(error1, error2);
        });

        quiz_answer_2.find('input[type="radio"]').click(function () {
            isAnswerSelected = true;
            attemptsLeftQuiz2 -= 1;
            if (attemptsLeftQuiz2 == 0) {
                failedComprehensionCheck()
                
            }
            if (attemptsLeftQuiz2 == 1) {
                var error1 = $('<p style="line-height: 1px; color: red; font-size: 25px; margin-bottom: 25px;">'+
                    '<strong>Incorrect! <u>You have 1 attempt left. </u></strong></p>');
                quiz_message.empty();
                quiz_message.append(error1, error2);
            }
            if (attemptsLeftQuiz2 >= 1) {
                var error1 = $('<p style="line-height: 1px; color: red; font-size: 25px; margin-bottom: 25px;">'+
                    '<strong>Incorrect! <u>You have ' + String(attemptsLeftQuiz2) + ' attempts left. </u></strong></p>')            
            }
            quiz_message.empty();
            quiz_message.append(error1, error2);
        });
       
        quiz_answer_3.find('input[type="radio"]').click(function () {
            isAnswerSelected = true;
            attemptsLeftQuiz2 -= 1;
            if (attemptsLeftQuiz2 == 0) {
                failedComprehensionCheck()
    
            }
            if (attemptsLeftQuiz2 == 1) {
                var error1 = $('<p style="line-height: 1px; color: red; font-size: 25px; margin-bottom: 25px;">'+
                    '<strong>Incorrect! <u>You have 1 attempt left. </u></strong></p>');
                quiz_message.empty();
                quiz_message.append(error1, error2);
            }
            if (attemptsLeftQuiz2 >= 1) {
                var error1 = $('<p style="line-height: 1px; color: red; font-size: 25px; margin-bottom: 25px;">'+
                    '<strong>Incorrect! <u>You have ' + String(attemptsLeftQuiz2) + 
                    ' attempts left. </u></strong></p>')
            }
            quiz_message.empty();
            quiz_message.append(error1, error2);
        });

        quiz_answer_4.find('input[type="radio"]').click(function () {
            isAnswerSelected = true;
            isCorrectAnswerSelected = true;
            quiz_message.empty();
            quiz_message.append(message_correct);
        });

        $('#explanations').append(quiz_title,quizBoxText).scrollTop(0).show()

        var startTimeComprehensionCheck2 = performance.now()
    }

    if (quiznum == 3){

        var quiz_title = $('<h1 class="heading-instructions">'+
            String(quiz_questions.quiz3.heading)+'</h1>')
    
        var quiz_question = $('<p class="comprehension-check-text">'+
            String(quiz_questions.quiz3.question)+'</p>').css('font-size','25px')
    
        
        var quiz_answer_1 =  $('<div class = quiz-answers-subcontainer>')
            .append($('<input type="radio" id="quizanswer1" class="answerclick" name="quizanswer" value="1">'))
            .append($('<div class = quiz-3-answer-subcontainer>'+
                '<p class="comprehension-check-text">'+String(quiz_questions.quiz3.answerOptions[0])+'</p></div>'))
                
        var quiz_answer_2 = $('<div class = quiz-answers-subcontainer>')
            .append($('<input type="radio" id="quizanswer2" class="answerclick" name="quizanswer" value="2">'))
            .append($('<div class = quiz-3-answer-subcontainer>'+
                '<p class="comprehension-check-text">'+String(quiz_questions.quiz3.answerOptions[1])+'</p></div>'))
    
        var quiz_answer_3 = $('<div class = quiz-answers-subcontainer>')
            .append($('<input type="radio" id="quizanswer3" class="answerclick" name="quizanswer" value="3">'))
            .append($('<div class = quiz-3-answer-subcontainer>'+
                '<p class="comprehension-check-text">'+String(quiz_questions.quiz3.answerOptions[2])+'</p></div>'))
    
        var quiz_answers = $('<div>')
            .addClass("comprehension-check-answers-container-1")
            .append(quiz_answer_1, quiz_answer_2, quiz_answer_3)

        var quiz_paragraph = $('<p class="comprehension-check-text"><strong>'+
            String(quiz_questions.quiz3.paragraph)+'</strong></p>')
            
        var message_correct = $('<p style="line-height: 1px; color: green; font-size: 25px">'+
            '<strong>Correct! Click on <i>Next</i> to proceed.</strong></p>')        
    
        var isAnswerSelected = false;
    
        var isCorrectAnswerSelected = false;
    
        var quiz_button_back = $('<button class = "button-instructions">')
            .text('Back')
            .click(function() {
                $('html, body').animate({ scrollTop: 0 }, 'smooth'); 
                showExplanations(3,quiznum)
            });  
            
        var quiz_button_next = $('<button class = "button-instructions">')
            .text('Next')
            .click(function() {
                $('html, body').animate({ scrollTop: 0 }, 'smooth'); 
                if (isAnswerSelected) {
                    if (isCorrectAnswerSelected) {
                        completionTimeComprehensionCheck3 = performance.now() - startTimeComprehensionCheck3
                        showExplanations(4,quiznum+1)

                    } else {
                        quiz_message.empty();
                        alert =  $('<p style="line-height: 1px; color: red; font-size: 25px">'+
                            '<strong>Please select the correct answer before proceeding.</strong></p>')
                        quiz_message.append(alert);
                    }
                } else {
                    quiz_message.empty();
                    alert = $('<p style="line-height: 1px; color: red; font-size: 25px">'+
                        '<strong>Please select an answer before proceeding.</strong></p>')
                    quiz_message.append(alert);
                }
                     
            });
       
            var error2 = $('<p style="line-height: 1px; color: red; font-size: 25px">'+
                '<strong>If you wish to read the instructions again, click <i>Back</i>.</strong></p>')
            
            var quiz_Back_Next_buttons = $('<div>')
                .addClass("comprehension-check-buttons")
                .append(quiz_button_back,quiz_button_next) 
            
            var quiz_message = $('<h2 style="line-height: 1px;"></h2>');
            
            var quizBoxText = $('<div>')
                .addClass("explanationBoxText")
                .append(//quiz_title,
                    quiz_question,  
                    quiz_message,
                    quiz_answers, 
                    quiz_paragraph,
                    quiz_Back_Next_buttons)

            quiz_answer_1.find('input[type="radio"]').click(function () {
                isAnswerSelected = true;
                isCorrectAnswerSelected = true;
                quiz_message.empty();
                quiz_message.append(message_correct);
            });
    
            quiz_answer_2.find('input[type="radio"]').click(function () {
                isAnswerSelected = true;
                attemptsLeftQuiz3 -= 1;
                if (attemptsLeftQuiz3 == 0) {
                    failedComprehensionCheck()
                    
                }
                if (attemptsLeftQuiz3 == 1) {
                    var error1 = $('<p style="line-height: 1px; color: red; font-size: 25px; margin-bottom: 25px;">'+
                        '<strong>Incorrect! <u>You have 1 attempt left. </u></strong></p>');
                    quiz_message.empty();
                    quiz_message.append(error1, error2);
                }
                if (attemptsLeftQuiz3 >= 1) {
                    var error1 = $('<p style="line-height: 1px; color: red; font-size: 25px; margin-bottom: 25px;">'+
                        '<strong>Incorrect! <u>You have ' + String(attemptsLeftQuiz3) + ' attempts left. </u></strong></p>')            
                }
                quiz_message.empty();
                quiz_message.append(error1, error2);
            });
           
            quiz_answer_3.find('input[type="radio"]').click(function () {
                isAnswerSelected = true;
                attemptsLeftQuiz3 -= 1;
                if (attemptsLeftQuiz3 == 0) {
                    failedComprehensionCheck()
        
                }
                if (attemptsLeftQuiz3 == 1) {
                    var error1 = $('<p style="line-height: 1px; color: red; font-size: 25px; margin-bottom: 25px;">'+
                        '<strong>Incorrect! <u>You have 1 attempt left. </u></strong></p>');
                    quiz_message.empty();
                    quiz_message.append(error1, error2);
                }
                if (attemptsLeftQuiz3 >= 1) {
                    var error1 = $('<p style="line-height: 1px; color: red; font-size: 25px; margin-bottom: 25px;">'+
                        '<strong>Incorrect! <u>You have ' + String(attemptsLeftQuiz3) + 
                        ' attempts left. </u></strong></p>')
                }
                quiz_message.empty();
                quiz_message.append(error1, error2);
            });
    
    
            $('#explanations').append(quiz_title,quizBoxText).scrollTop(0).show()
    
            var startTimeComprehensionCheck3 = performance.now()

    }
                         
}

function failedComprehensionCheck() {

    $('#explanations').empty().hide()

    var failTitle = $('<h1 class =red-text>You failed 3 times</h1>')

    var failText1 = $("<h3>Unfortunately, you failed the comprehension check 3 times, "+
        "which means that you cannot complete the study.</h3>")
    
    var failText2 = $("<h3>You will now be redirected to Prolific's platform.</h3>")

    var failTextBox = $('<div>')
        .addClass('thank-you-text-box')
        .append(failText1,failText2)

    $('#thankYouMessage').addClass('thank-you-message').append(failTitle,failTextBox).show();
    setTimeout(function() {
        var urlToRedirect = "https://app.prolific.com/submissions/complete?cc=C1DPNU5N";
        window.location.href = urlToRedirect;
    }, 6000);
}
