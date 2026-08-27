function finalQuestionnaire() {
  
    $('body').css('background-color', 'white');
    $('#mainContainer').hide();
    $('#blockEndQuestionnaire').empty().hide()
    $('#bonusFeedback').hide()

    var finalQuestionnaireTitle = $('<h1>FINAL QUESTIONNAIRE</h1>')    

    var question1Element = $('<div>')
        .addClass('questionElement');

    var question2Element = $('<div>')
        .addClass('questionElement');

    var question3Element = $('<div>')
        .addClass('questionElement');

    var question4Element = $('<div>')
        .addClass('questionElement');

    var question1Text = $('<h3>')
        .addClass('question-text')
        .text(final_questions.question1.text);


    var question1RateScale = $('<div class="rating">'+
        '<div class = "rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_1_1_fq" name="rating1_fq" value="1">'+
                '<label for="circle_1_1_fq"></label></div><h4 class = "rate-text">'+
			String(final_questions.question1.answerOptions[0])+'</h4></div>'+
        '<div class= "rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_1_2_fq" name="rating1_fq" value="2">'+
                '<label for="circle_1_2_fq"></label></div><h4 class = "rate-text">'+
			String(final_questions.question1.answerOptions[1])+'</h4></div>'+
        '<div class ="rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_1_3_fq" name="rating1_fq" value="3">'+
                '<label for="circle_1_3_fq"></label></div><h4 class = "rate-text">'+
			String(final_questions.question1.answerOptions[2])+'</h4></div>'+
        '<div class ="rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_1_4_fq" name="rating1_fq" value="4">'+
                '<label for="circle_1_4_fq"></label></div><h4 class = "rate-text">'+
			String(final_questions.question1.answerOptions[3])+'</h4></div>'+
        '</div>')
    
    question1Element.append(question1Text,question1RateScale);

    var question2Text = $('<h3>')
        .addClass('question-text')
        .text(final_questions.question2.text);

    var answer2Input = $('<textarea name="answer2" id="answer2" '+
        'class = "small-writing-box" rows="4" cols="50"></textarea>');

    question2Element.append(question2Text,answer2Input);

    var question3Text = $('<h3>')
        .addClass('question-text')
        .text(final_questions.question3.text);

    var question3RateScale = $('<div class="rating">'+
        '<div class = "rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_3_1_fq" name="rating3_fq" value="1">'+
                '<label for="circle_3_1_fq"></label></div><h4 class = "rate-text">'+
            String(final_questions.question3.answerOptions[0])+'</h4></div>'+
        '<div class= "rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_3_2_fq" name="rating3_fq" value="2">'+
                '<label for="circle_3_2_fq"></label></div><h4 class = "rate-text">'+
            String(final_questions.question3.answerOptions[1])+'</h4></div>'+
        '<div class ="rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_3_3_fq" name="rating3_fq" value="3">'+
                '<label for="circle_3_3_fq"></label></div><h4 class = "rate-text">'+
            String(final_questions.question3.answerOptions[2])+'</h4></div>'+
        '<div class ="rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_3_4_fq" name="rating3_fq" value="4">'+
                '<label for="circle_3_4_fq"></label></div><h4 class = "rate-text">'+
            String(final_questions.question3.answerOptions[3])+'</h4></div>'+
        '<div class ="rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_3_5_fq" name="rating3_fq" value="5">'+
                '<label for="circle_3_5_fq"></label></div><h4 class = "rate-text">'+
            String(final_questions.question3.answerOptions[4])+'</h4></div>'+
        '</div>')
        
    question3Element.append(question3Text,question3RateScale);


    var question4Text = $('<h3>')
        .addClass('question-text')
        .text(final_questions.question4.text);

    var answer4Input = $('<textarea name="answer4" id="answer4" '+
        'class = "big-writing-box" rows="4" cols="50"></textarea>');
    
    question4Element.append(question4Text,answer4Input);

    questionStartTime = performance.now();

    let timeToAnswerQuestion1;
    let finalQuestionnaireStartTime = performance.now()
    
    question1RateScale.find('input[type="radio"]').click(function () {
        timeClickedQuestion1 = performance.now();
        timeToAnswerQuestion1 = timeClickedQuestion1 - finalQuestionnaireStartTime;
    });
    

    // Create the submit button
    var submitButton = $('<button>')
        .addClass('button')
        .text('Submit Answers')
        .click(function() {

            var answer1 = $('input[name="rating1_fq"]:checked').val();
            var answer2 = $('#answer2').val();
            var answer3 = $('input[name="rating3_fq"]:checked').val();
            var answer4 = $('#answer4').val();

            var error1Text = $('<h4>')
                .text('Please, answer the question')
                .css('color', 'red');

            var error2Text = $('<h4>')
                .text('Please, answer the question. If you did not lose focus you can type "Never".')
                .css('color', 'red');

            var error3Text = $('<h4>')
                .text('Please, answer the question')
                .css('color', 'red');

            question1Element.empty().append(question1Text,question1RateScale);
            question2Element.empty().append(question2Text,answer2Input);
            question3Element.empty().append(question3Text,question3RateScale);

            if (!answer1 || !answer2 || !answer3) {

                if (!answer1) {
                    question1Element.empty().append(question1Text,error1Text,question1RateScale);
                }

                if (!answer2) {
                    question2Element.empty().append(question2Text, error2Text, answer2Input);
                }

                if (!answer3) {
                    question3Element.empty().append(question3Text,error3Text,question3RateScale);
                }
                
            } else {

                var totalStudyTime = performance.now() - startTimeStudy
                var firstAttentionCheckRound = attention_check_info[0] ?? null;
                var secondAttentionCheckRound = attention_check_info[1] ?? null;
                var firstAttentionCheckAnswer = attention_check_info[2] ?? null;
                var secondAttentionCheckAnswer = attention_check_info[3] ?? null;
                
                var dataFinalQ = {
                    Study_id: studyID,
                    Session_id: sessionID,
                    Participant_id: participantID,
                    CountingFrequency: answer1,
                    ResponseTimeCountingFrequency: timeToAnswerQuestion1 ? timeToAnswerQuestion1/1000 : null,
                    FocusLoss: answer2,
                    InstructionsComprehension: answer3,
                    Feedback: answer4,
                    FirstRoundAttentionCheck: firstAttentionCheckRound,
                    SecondRoundAttentionCheck: secondAttentionCheckRound,
                    First_attention_check_answer: firstAttentionCheckAnswer,
                    Second_attention_check_answer: secondAttentionCheckAnswer,
                    TotalStudyTime: totalStudyTime/1000,
                    TotalEarned: totalEarned             
                };

            submitButton.prop('disabled', true);

            saveFinalQuestionnaire(dataFinalQ, {
                onSuccess: function() {
                    thankYouMessage();
                },
                onError: function() {
                    submitButton.prop('disabled', false);
                }
            })
    
            }

      })

    $('#finalQuestionnaire')
        .addClass('finalQuestionnaire')
        .append(finalQuestionnaireTitle,
            question1Element,
            question2Element, 
            question3Element,
            question4Element,
            submitButton).show();   
}

function thankYouMessage() {
    
    $('#explanations').hide()
    $('#finalQuestionnaire').empty().hide()

    var performanceBonus = calculatePerformanceBonus(totalEarned)
 
    var thankYouTitle = $('<h1>Thanks for participating!</h1>')

    var thankYouText1 = $("<h3>You obtained a performance bonus of "+
        "<span class = 'green-text-paragraph'>£"+String(performanceBonus)+"</span>. "+
        "Please, click on <i>Submit completion code</i> so "+
        "that you your completion code is submitted automatically. "+
        "You will then be redirected to Prolific's platform. </h3>")

    var submitButton = $('<button>')
      .addClass('button')
      .text('Submit completion code')
      .click(function() {
          var urlToRedirect = "https://app.prolific.co/submissions/complete?cc=CLBXUU2B";
          window.location.href = urlToRedirect; 
    });
    var thankYouTextBox = $('<div>')
        .addClass('thank-you-text-box')
        .append(thankYouText1)

    $('#thankYouMessage')
        .addClass('thank-you-message')
        .append(thankYouTitle,thankYouTextBox,submitButton).show();
}
