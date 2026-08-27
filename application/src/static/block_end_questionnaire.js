function blockEndQuestionnaire() {

    $('body').css('background-color', 'white');
    
    var blockEndQuestionnaireTitle = $('<h1>BLOCK '+
        String(blockNumber)+' END QUESTIONNAIRE</h1>')

    var question1Element = $('<div>')
        .addClass('questionElement');

    var question2Element = $('<div>')
        .addClass('questionElement');

    var question3Element = $('<div>')
        .addClass('questionElement');
    
    var question1Text = $('<h3>')
        .addClass('question-text')
        .text(getBlockEndQuestionText(blockNumber));

    answer1Input = $('<input type="text" class = "writing-box" name="answer1_block_end" '+
        'id="answer1_block_end" required autocomplete="off"  placeholder="Type your answer in minutes">')
    
    question1Element.append(question1Text,answer1Input);

    var question2Text = $('<h3>')
        .addClass('question-text')
        .text(block_end_questions.question2.text);

    var question2RateScale = $('<div class="rating">'+
        '<div class = "rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_2_1_block_end" name="rating2_block_end" value="1">'+
                '<label for="circle_2_1_block_end"></label></div><h4 class = "rate-text">'+
                        String(block_end_questions.question2.answerOptions[0])+'</h4></div>'+
        '<div class= "rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_2_2_block_end" name="rating2_block_end" value="2">'+
                '<label for="circle_2_2_block_end"></label></div><h4 class = "rate-text">'+
                        String(block_end_questions.question2.answerOptions[1])+'</h4></div>'+
        '<div class ="rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_2_3_block_end" name="rating2_block_end" value="3">'+
                '<label for="circle_2_3_block_end"></label></div><h4 class = "rate-text">'+
                        String(block_end_questions.question2.answerOptions[2])+'</h4></div>'+
        '<div class ="rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_2_4_block_end" name="rating2_block_end" value="4">'+
                '<label for="circle_2_4_block_end"></label></div><h4 class = "rate-text">'+
                        String(block_end_questions.question2.answerOptions[3])+'</h4></div>'+
        '<div class ="rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_2_5_block_end" name="rating2_block_end" value="5">'+
                '<label for="circle_2_5_block_end"></label></div><h4 class = "rate-text">'+
                        String(block_end_questions.question2.answerOptions[4])+'</h4></div>'+
        '</div>')

    question2Element.append(question2Text,question2RateScale);

    var question3Text = $('<h3>')
        .addClass('question-text')
        .text(block_end_questions.question3.text);

    var question3RateScale = $('<div class="rating">'+
        '<div class = "rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_3_1_block_end" name="rating3_block_end" value="1">'+
                '<label for="circle_3_1_block_end"></label></div><h4 class = "rate-text">'+
                        String(block_end_questions.question3.answerOptions[0])+'</h4></div>'+
        '<div class= "rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_3_2_block_end" name="rating3_block_end" value="2">'+
                '<label for="circle_3_2_block_end"></label></div><h4 class = "rate-text">'+
                        String(block_end_questions.question3.answerOptions[1])+'</h4></div>'+
        '<div class ="rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_3_3_block_end" name="rating3_block_end" value="3">'+
                '<label for="circle_3_3_block_end"></label></div><h4 class = "rate-text">'+
                        String(block_end_questions.question3.answerOptions[2])+'</h4></div>'+
        '<div class ="rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_3_4_block_end" name="rating3_block_end" value="4">'+
                '<label for="circle_3_4_block_end"></label></div><h4 class = "rate-text">'+
                        String(block_end_questions.question3.answerOptions[3])+'</h4></div>'+
        '<div class ="rateblock">'+
            '<div class="circle-label">'+
                '<input type="radio" id="circle_3_5_block_end" name="rating3_block_end" value="5">'+
                '<label for="circle_3_5_block_end"></label></div><h4 class = "rate-text">'+
                        String(block_end_questions.question3.answerOptions[4])+'</h4></div>'+
        '</div>')
    
    question3Element.append(question3Text,question3RateScale);
    
    // Record the start time before showing the questions
    questionStartTime = performance.now();
    
    let typingTimerQuestion1;


    answer1Input.on('keyup', function (event) {
        if (event.keyCode === 8 || event.keyCode === 46) {
            return; // Do nothing if backspace or delete is pressed
        }
        // Clear the previous timer for question 1
        clearTimeout(typingTimerQuestion1);
        timeToAnswerBlockEndQuestion1 = performance.now() - questionStartTime;
        // Start a new timer for question 1
        typingTimerQuestion1 = setTimeout(function () {
                // Typing has stopped for question 1
                attemptsAnswerBlockEndQuestion1 +=1
                
                if (attemptsAnswerBlockEndQuestion1 == 1) {
                    firstTimeToAnswerBlockEndQuestion1 = timeToAnswerBlockEndQuestion1
                }
                // Perform your desired action here for question 1
        }, typingTimeoutDelay);
    });

    question2RateScale.find('input[type="radio"]').click(function () {
        timeToAnswerBlockEndQuestion2 = performance.now() - questionStartTime;
        //console.log('Question 2 (milliseconds):', timeToAnswerQuestion2);
    });

    question3RateScale.find('input[type="radio"]').click(function () {
        timeToAnswerBlockEndQuestion3 = performance.now() - questionStartTime;
        //console.log('Question 3 (milliseconds):', timeToAnswerQuestion3);
    });

    // Create the submit button
    var submitButton = $('<button>')
        .addClass('button')
        .text('Submit Answers')
        .click(function() {

            blockEndAnswer1 = $('#answer1_block_end').val();
            blockEndAnswer2 = $('input[name="rating2_block_end"]:checked').val();
            blockEndAnswer3 = $('input[name="rating3_block_end"]:checked').val();

            var error1Text = $('<h4>').text('Please, answer the question').css('color', 'red');
            var error2Text = $('<h4>').text('Please, answer the question').css('color', 'red');
            var error3Text = $('<h4>').text('Please, answer the question').css('color', 'red');

            question1Element.empty().append(question1Text,answer1Input);
            question2Element.empty().append(question2Text,question2RateScale);
            question3Element.empty().append(question3Text,question3RateScale);

            if (!blockEndAnswer1 || !blockEndAnswer2 || !blockEndAnswer3) {

                if (!blockEndAnswer1) {
                    question1Element.empty().append(question1Text,error1Text,answer1Input);
                }

                if (!blockEndAnswer2) {
                    question2Element.empty().append(question2Text, error2Text, question2RateScale);
                }
                
                if (!blockEndAnswer3) {
                    question3Element.empty().append(question3Text, error3Text, question3RateScale);
                }
                
            
            } else {

                if (/^\s*\d+\s*$/.test(blockEndAnswer1)) {
                    if (attemptsAnswerBlockEndQuestion1 == 0) {
                    firstTimeToAnswerBlockEndQuestion1 = timeToAnswerBlockEndQuestion1
                    attemptsAnswerBlockEndQuestion1+=1
                    }
                    totalTimeBlock = performance.now() - startTimeBlock
                    

                    saveBlockEndQuestionnaire()

                    resetBlockEndVariables()
                    

                    //Update block number
                    blockNumber += 1

                    if (roundNumber === totalRounds + 1) {
                        //breakHappened = 1
                        breakHappened = true;
                        getBonus()
                    } else {
                        takeBreak()
                    }

                } else {

                    var errorNoIntegerText = $('<h4>')
                        .text('Invalid answer. Please type a number here.')
                        .css('color', 'red');

                    question1Element.empty().append(question1Text,errorNoIntegerText,answer1Input);


                }
            }

        })

    $('#blockEndQuestionnaire')
        .addClass('finalQuestionnaire')
        .append(blockEndQuestionnaireTitle,
            question1Element,
            question2Element, 
            question3Element,
            submitButton).show();

}
