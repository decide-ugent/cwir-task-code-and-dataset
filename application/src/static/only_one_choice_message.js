function onlyOneChoiceMessage() {

    $('#questionnaire').hide();
    $('#bonusFeedback').empty().hide()
    
    
    var onlyOneChoiceTitle = $('<h1> Remember that you can only choose one lottery per round </h1>')
        .css('max-width','13.5cm')
    
    var onlyOneChoiceText = $('<h3> When you choose a lottery, '+
        'it will be highlighted with a blue rectangle and '+
        'you will not be able to choose any more lotteries until the next round. </h3>') 
    
    var onlyOneChoiceTextBox  = $('<div>')
        .addClass('bonus-feedback-text-box')
        .append(onlyOneChoiceText);
    
    var okButton = $('<button class = "button-instructions">')
        .text('Ok')
        .click(function() {
            $('#bonusFeedback').empty().hide(); 
            resetGlobalVariables()
            practiceRound +=1
            showPracticeOptions()            
        })
    
    $('#bonusFeedback')
        .addClass('bonus-feedback')
        .append(onlyOneChoiceTitle,
            onlyOneChoiceTextBox,
            okButton).show()
}
    
