function showAttentionCheck(roundNumber) {
    
    $('body').css('background-color', 'white');

    var attention_check_paragraph =  $('<h2><i>'+
        String(attention_check_list[counter].paragraph)+'</i><h2/>')

    var attention_check_question = $('<h2><strong>'+
        String(attention_check_list[counter].question)+'</strong><h2/>')

    var attention_check_answer_1 = $('<div class = quiz-answers-subcontainer>')
        .append($('<input type="radio" id="attention_check_answer1" '+
            'class="answerclick" name="attentionCheckAnswer" value="1">'))
        .append($('<h3 style="line-height: 1px;">'+
            String(attention_check_list[counter].answerOptions[0])+'</h3>'))

    var attention_check_answer_2 = $('<div class = quiz-answers-subcontainer>')
        .append($('<input type="radio" id="attention_check_answer2" '+
            'class="answerclick" name="attentionCheckAnswer" value="2">'))
        .append($('<h3 style="line-height: 1px;">'+
            String(attention_check_list[counter].answerOptions[1])+'</h3>'))

    var attention_check_answer_3 = $('<div class = quiz-answers-subcontainer>')
        .append($('<input type="radio" id="attention_check_answer3" '+
            'class="answerclick" name="attentionCheckAnswer" value="3">'))
        .append($('<h3 style="line-height: 1px;">'+
            String(attention_check_list[counter].answerOptions[2])+'</h3>'))

    var attention_check_answer_4 = $('<div class = quiz-answers-subcontainer>')
        .append($('<input type="radio" id="attention_check_answer4" '+
            'class="answerclick" name="attentionCheckAnswer" value="4">'))
        .append($('<h3 style="line-height: 1px;">'+
            String(attention_check_list[counter].answerOptions[3])+'</h3>'))

    var attention_check_answer_5 = $('<div class = quiz-answers-subcontainer>')
        .append($('<input type="radio" id="attention_check_answer5" '+
            'class="answerclick" name="attentionCheckAnswer" value="5">'))
        .append($('<h3 style="line-height: 1px;">'+
            String(attention_check_list[counter].answerOptions[4])+'</h3>'))

    var attention_check_answers = $('<div>')
        .addClass("quiz-answers-container")
        .append(attention_check_answer_1, 
            attention_check_answer_2, 
            attention_check_answer_3, 
            attention_check_answer_4,
            attention_check_answer_5)

    var button_next = $('<button class = "button-next">')
        .text('Next')
        .click(function() {
            
            var selectedRadioButton = $('input[name="attentionCheckAnswer"]:checked');
            
            if (selectedRadioButton.length > 0) {
                var selectedValue = parseInt(selectedRadioButton.val(),10);
                attention_check_info.push(selectedValue);
            } else {
                attention_check_info.push(0);
            }

            console.log("Attention check choice: ", attention_check_info);

            counter +=1

            attentionCheckHappened = true
            breakHappened = false
            
            $('#attentionCheck').empty().hide()

            showOptions(roundNumber) 
         
        });

        $('#attentionCheck').append(attention_check_paragraph,
            attention_check_question, 
            attention_check_answers,
            button_next).show();
}
