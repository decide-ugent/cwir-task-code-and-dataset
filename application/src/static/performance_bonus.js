function calculateOutcome(val,per) {
    
    var randomNum = Math.floor(Math.random() * 101); 
        
    if (randomNum < per){
        var outcome = val
    } else {
        var outcome = 0
    }
    return outcome  
}

function getFinalLotteriesPractice(selectedNumber) {

    var lotteryValue = 0
    var lotteryPercentage = 0

    //console.log("practice_lotteries_chosen",practice_lotteries_chosen)

    var lotteryChosen = practice_lotteries_chosen[selectedNumber-1]
    var lotteryMissedDeadline = practice_lotteries_chosen_missed_deadline[selectedNumber-1]

    if (lotteryChosen !== "None") {
        if (lotteryChosen === "Left"){
            lotteryValue = practiceGamblesValues[selectedNumber - 1][0]
            lotteryPercentage = practiceGamblesPercentages[selectedNumber - 1][0]
        } else {
            lotteryValue = practiceGamblesValues[selectedNumber - 1][1]
            lotteryPercentage = practiceGamblesPercentages[selectedNumber - 1][1]
        }

    }

    return [lotteryValue, lotteryPercentage,lotteryMissedDeadline];
}

function getBonusPractice() {

    
    all_gambles_array = generateArrayFrom1ToN(totalPracticeRounds) 

    var reels = document.querySelectorAll('.practice-reel');
    
    var spinButton = document.getElementById('practiceSpinButton');  
    
    function spinReel(reel, availableNumbers) {

        return new Promise(resolve => {

            let ticks = 0;

            const interval = setInterval(() => {

                var index = Math.floor(Math.random() * availableNumbers.length);

                var selectedNumber = availableNumbers[index];
       
                reel.textContent = selectedNumber;

                ticks++;

                if (ticks >= 15) {

                    clearInterval(interval);

                    practiceReelsLeft--;

                    practiceLotteriesDrawn = true;

                    resolve();
                    
                    // Deactivate the spin button
                    spinButton.disabled = true; 

                    availableNumbers.splice(index, 1); // Remove the chosen number

                    var lotteryNums =  getFinalLotteriesPractice(selectedNumber)

                    var lotteryValue = lotteryNums[0]
                    var lotteryPercentage = lotteryNums[1]
                    var lotteryMissedDeadline = lotteryNums[2]

                    if (practiceReelsLeft === 1) {

                        if (lotteryMissedDeadline) {

                            subContainer1.append($(
                                '<h1 class=orange-outcome>Missed Deadline</h1>'))
                        
                        
                            round_title_container_1.empty()
                                .append($('<h2 class ="round-text-get-bonus">Lottery '+
                                    String(selectedNumber)+'</h2>'))
                            
                                
    
    
                            subcontainerOption1.append(subContainer1)


                            optionButton1.prop('disabled', true); 
            


                            orangeOutcomeWarning.empty().append($('<h2 class = "orange-text">'+
                                            'Please note that if a lottery displays <i>Missed Deadline</i>, '+
                                            'it means that you did not select a lottery before the deadline for that round. '+
                                            'Hence, you obtained no earnings from this lottery.</h2>'))

                            practiceTotalEarned += 0


                            total_earned_text.empty()
                                    .append('<h1><span class="black-text">Total earned: '+
                                        '</span> <span class="green-outcome">' 
                                        + String(practiceTotalEarned) + ' $</span></h1>')
                        
                        } else {


                            upSubContainer1.append($('<h1 class="numbers-bonus">'+
                                String(lotteryPercentage) +
                                '</h1>'+
                                '<p class="symbol-bonus">%</p>'+
                                '<p class="options-text-bonus">of</p>'))

                            downSubContainer1.append($('<p class="options-text-bonus">winning</p>'+
                                '<h1 class="numbers-bonus">'+
                                String(lotteryValue)+
                                '</h1>'+
                                '<p class="symbol-bonus">$</p>'))
                        
                        
                            round_title_container_1.empty()
                                .append($('<h2 class ="round-text-get-bonus">Lottery '+
                                    String(selectedNumber)+'</h2>'))

                            subcontainerOption1.append(upSubContainer1,downSubContainer1)

                            optionButton1.click(function () {

                                subcontainerOption1.empty()
                                    .css('flex-direction','column')
                                    .css('height','80%');
                        
                                var outcome = calculateOutcome(lotteryValue, lotteryPercentage)
        

                                if (outcome === 0) {
                                    var outcomeText = $('<h1 class = red-outcome>' + String(outcome) + '$</h1>')

                                } else {
                                    var outcomeText = $('<h1 class = green-outcome>' + String(outcome) + '$</h1>')      
                                }

                                practiceTotalEarned += outcome
                                
                                subcontainerOption1.append(outcomeText)

                                total_earned_text.empty()
                                    .append('<h1><span class="black-text">Total earned: '+
                                        '</span> <span class="green-outcome">' 
                                        + String(practiceTotalEarned) + ' $</span></h1>')

                                optionButton1.prop('disabled', true); 

                                practiceLotteriesClicked = true;
                            })
                        }
                    
                    } else if (practiceReelsLeft === 0) {


                        if (lotteryMissedDeadline) {

                            subContainer2.append($(
                                '<h1 class=orange-outcome>Missed Deadline</h1>'))
                        
                        
                            round_title_container_2.empty()
                                .append($('<h2 class ="round-text-get-bonus">Lottery '+
                                    String(selectedNumber)+'</h2>'))
                            
    
                            subcontainerOption2.append(subContainer2)

                            optionButton2.prop('disabled', true); 
            


                            orangeOutcomeWarning.empty().append($('<h2 class = "orange-text">'+
                                            'Please note that if a lottery displays <i>Missed Deadline</i>, '+
                                            'it means that you did not select a lottery before the deadline for that round. '+
                                            'Hence, you obtained no earnings from this lottery.</h2>'))

                            practiceLotteriesClicked = true;

                            practiceTotalEarned += 0;

                            total_earned_text.empty()
                                    .append('<h1><span class="black-text">Total earned: '+
                                        '</span> <span class="green-outcome">' 
                                        + String(practiceTotalEarned) + ' $</span></h1>')



                        } else {

                            upSubContainer2.append($('<h1 class="numbers-bonus">'+
                                String(lotteryPercentage) +
                                '</h1>'+
                                '<p class="symbol-bonus">%</p>'+
                                '<p class="options-text-bonus">of</p>'))

                            downSubContainer2.append($('<p class="options-text-bonus">winning</p>'+
                                '<h1 class="numbers-bonus">'+
                                String(lotteryValue)+
                                '</h1>'+
                                '<p class="symbol-bonus">$</p>'))

                            round_title_container_2.empty()
                                .append($('<h2 class ="round-text-get-bonus">Lottery '+
                                String(selectedNumber)+'</h2>'))

                            subcontainerOption2.append(upSubContainer2,downSubContainer2)
                            
                            optionButton2.click(function () {

                                subcontainerOption2.empty()
                                    .css('flex-direction','column')
                                    .css('height','80%');
                        
                                var outcome = calculateOutcome(lotteryValue, lotteryPercentage)

                                if (outcome === 0) {
                                    var outcomeText = $('<h1 class = red-outcome>' + String(outcome) + '$</h1>')

                                } else {
                                        var outcomeText = $('<h1 class = green-outcome>' + String(outcome) + '$</h1>')
                                }
                                

                                practiceTotalEarned += outcome
                                
                                subcontainerOption2.append(outcomeText)

                                total_earned_text.empty()
                                    .append('<h1><span class="black-text">Total earned: '+
                                        '</span> <span class="green-outcome">' 
                                        + String(practiceTotalEarned) + ' $</span></h1>')
                                
                                optionButton2.prop('disabled', true); 

                                practiceLotteriesClicked = true;

                            });

                        }
          
                    }
                }
            });
    }, 100);   
}


    async function spin() {
        spinButton.disabled = true;
        let availableNumbers = all_gambles_array.slice(); 
        for (const reel of reels) {
            await spinReel(reel, availableNumbers);
        }
    }


    spinButton.addEventListener('click', spin);

    var get_bonus_heading = $('<h1>'+String(get_practice_bonus.heading)+'</h1>')

    var get_bonus_text_1 =  $('<p class= "explanationText">'+
        String(get_practice_bonus.paragraph1)+'</p>')

    var get_bonus_text_2 =  $('<p class= "explanationText">'+
        String(get_practice_bonus.paragraph2)+'</p>')

    var get_bonus_text_3 =  $('<p class= "explanationText">'+
        String(get_practice_bonus.paragraph3)+'</p>')

    var slotMachine = $('#practiceSlotMachine')

    var slotWarning = $('<div>')
                
    var clickLotteriesWarning = $('<div>')


    var subcontainerOption1 = $('<div class="option-subcontainer" id="subcontainerOption1"></div>')
    var subcontainerOption2 = $('<div class="option-subcontainer" id="subcontainerOption2"></div>')

    var optionButton1 = $('<button>')
        .addClass('option-button-get-bonus')
        .attr('id', 'button1')

    var optionButton2 = $('<button>')
        .addClass('option-button-get-bonus')
        .attr('id', 'button1')


    var upSubContainer1 = $('<div class="option-subcontainer-bonus"></div>')
    var upSubContainer2 = $('<div class="option-subcontainer-bonus"></div>')


    var downSubContainer1 = $('<div class="option-subcontainer-bonus"></div>')
    var downSubContainer2 = $('<div class="option-subcontainer-bonus"></div>')

    var subContainer1 = $('<div class="option-subcontainer"></div>')
    var subContainer2 = $('<div class="option-subcontainer"></div>')
  
    
    optionButton1.append(subcontainerOption1)
    optionButton2.append(subcontainerOption2)
        
    var selected_rounds_sub_container = $('<div class= "selected-rounds-sub-get-bonus">')

    var round_title_container_1 = $('<h2 class ="round-text-get-bonus">Lottery</h2>')
    
    var round_title_container_2 = $('<h2 class ="round-text-get-bonus">Lottery</h2>')

    var clickHereLotteriesContainer_1 = $('<div></div>')

    var clickHereLotteriesArrow_1 = $('<h2 class ="red-text">↑</h2>')

    var clickHereLotteriesText_1 = $('<h2 class ="red-text">Click here</h2>')

    var clickHereLotteriesContainer_2 = $('<div></div>')

    var clickHereLotteriesArrow_2 = $('<h2 class ="red-text">↑</h2>')

    var clickHereLotteriesText_2 = $('<h2 class ="red-text">Click here</h2>')

    var selected_rounds_subcontainer_1 = $('<div class="rounds-subcontainer-get-bonus">')
        .append(round_title_container_1,optionButton1,clickHereLotteriesContainer_1)

    var selected_rounds_subcontainer_2 = $('<div class="rounds-subcontainer-get-bonus">')
        .append(round_title_container_2,optionButton2,clickHereLotteriesContainer_2)

    selected_rounds_sub_container.append(selected_rounds_subcontainer_1,
                                         selected_rounds_subcontainer_2)                                     

    var selected_rounds_container = $('<div class= "selected-rounds-get-bonus-practice">')
        .append(selected_rounds_sub_container)
   
    var total_earned_text = $('<h1>Total earned: </h1>')
    
    var total_earned_container = $('<div class="total-earned-container">')
        .append(total_earned_text)

    var orangeOutcomeWarning = $('<div>').append($('<h2 class = "orange-text">'+
                                            'Please note that if a lottery displays <i>Missed Deadline</i>, '+
                                            'it means that you did not select a lottery before the deadline for that round. '+
                                            'Hence, you obtained no earnings from this lottery.</h2>'))

    var next_button = $('<button class = "button">')
        .text('Next')
        .click(function() {

            if (!practiceLotteriesDrawn) {
                var clickHereSpinContainer = $('<div class="click-on-spin"></div>')
                var clickHereSpinArrow = $('<h1 class ="red-text">↑</h1>')
                var clickHereSpinText = $('<h1 class ="red-text">Click on <i>SPIN</i></h1>')
                clickHereSpinContainer.append(clickHereSpinArrow,clickHereSpinText)
                slotWarning.append(clickHereSpinContainer,clickHereSpinContainer)

                //slotWarning.append($('<h2 class = "red-text">Click on <i>Spin</i> to '+
                //    'draw two lotteries from the bag of selected lotteries.</h2>'))
            } else if (practiceLotteriesDrawn && !practiceLotteriesClicked) {
                clickLotteriesWarning.append($('<h2 class = "red-text">Click on the two '+
                    'lotteries below to collect Ghentian dollars.</h2>'))
                clickHereLotteriesContainer_1.append(
                    clickHereLotteriesArrow_1,
                    clickHereLotteriesText_1)
                clickHereLotteriesContainer_2.append(
                    clickHereLotteriesArrow_2,
                    clickHereLotteriesText_2)
                
            } else {
                trainingCompleted()
            }
        })
        
    var slotMachineHeading =  $('<h2>Draw two lotteries from the <i>bag of selected lotteries</i></h2>')
    var selectedRoundsContainerHeading = $('<h2>Selected lotteries</h2>')

    var get_bonus_boxtext = $('<div>')
        .addClass("explanationBoxText")
        .append(get_bonus_text_1,
                get_bonus_text_2,
                slotMachineHeading,
                slotMachine.show(),
                slotWarning,
                get_bonus_text_3,
                selectedRoundsContainerHeading,
                clickLotteriesWarning,
                selected_rounds_container,
                orangeOutcomeWarning,
                total_earned_container,
                next_button) 
         
    $('#explanations').append(get_bonus_heading,get_bonus_boxtext).scrollTop(0).show() 
}

function getFinalLotteries(selectedNumber) {

    var lotteryValue = 0
    var lotteryPercentage = 0

    var lotteryChosen = lotteriesChosen[selectedNumber-1]
    var lotteryMissedDeadline = lotteriesChosenMissedDeadline[selectedNumber-1]

    var gambleValues = [gamblesValues[gamblesPresentationOrder[selectedNumber - 1]][0],
                         gamblesValues[gamblesPresentationOrder[selectedNumber - 1]][1]]

    var gamblePercentages = [gamblesPercentages[gamblesPresentationOrder[selectedNumber - 1]][0],
                              gamblesPercentages[gamblesPresentationOrder[selectedNumber - 1]][1]]

    if (lotteryChosen !== "None") {
        if (lotteryChosen === "Left"){

            lotteryID = lotteriesPresentationOrder[selectedNumber - 1]['Left']
     
        } else {
            lotteryID = lotteriesPresentationOrder[selectedNumber - 1]['Right']
        }

        lotteryValue = gambleValues[lotteryID]
        lotteryPercentage = gamblePercentages[lotteryID]

    }
                        
    return [lotteryValue, lotteryPercentage,lotteryMissedDeadline];
}

function getBonus() {

    $('#explanations').empty().hide()
    $('#blockEndQuestionnaire').empty().hide()

    //Generate array from 1 to number of rounds
    all_gambles_array = generateArrayFrom1ToN(totalRounds)

    //var reels = document.querySelectorAll('.reel');

    var upreels = document.querySelectorAll('.reel-container-up .reel');

    var downreels = document.querySelectorAll('.reel-container-down .reel');

    var spinButton = document.getElementById('spinButton');   

    function spinReel(reel, availableNumbers,upOrDownReel) {

        return new Promise(resolve => {

            let ticks = 0;

            const interval = setInterval(() => {

                var index = Math.floor(Math.random() * availableNumbers.length);

                var selectedNumber = availableNumbers[index];
        
                reel.textContent = selectedNumber;
           
                ticks++;

                if (ticks >= 30) {

                    clearInterval(interval);

                    reelsLeft--;

                    resolve();

                    // Deactivate the spin button
                    spinButton.disabled = true; 
                    
                    lotteriesDrawn = true;
                    
                    availableNumbers.splice(index, 1); // Remove the chosen number

                    var lotteryNums =  getFinalLotteries(selectedNumber)

                    var lotteryValue = lotteryNums[0]
                    var lotteryPercentage = lotteryNums[1]
                    var lotteryMissedDeadline= lotteryNums[2]

                    if (upOrDownReel === 1) {
                        if (reelsLeft === 3) {

                            if (lotteryMissedDeadline) {

                                subContainer1.append($(
                                    '<h1 class=orange-outcome>Missed Deadline</h1>'))
                            
                            
                                round_title_container_1.empty()
                                    .append($('<h2 class ="round-text-get-bonus">Lottery '+
                                        String(selectedNumber)+'</h2>'))
                                
                         
        
                                subcontainerOption1.append(subContainer1)
                


                                orangeOutcomeWarning.empty().append($('<h2 class = "orange-text">'+
                                            'Please note that if a lottery displays <i>Missed Deadline</i>, '+
                                            'it means that you did not select a lottery before the deadline for that round. '+
                                            'Hence, you obtained no earnings from this lottery.</h2>'))

                                lotteriesClicked += 1;

                                totalEarned += 0

                                optionButton1.prop('disabled', true); 


                                total_earned_text.empty()
                                        .append('<h1><span class="black-text">Total earned: '+
                                            '</span> <span class="green-outcome">' 
                                            + String(totalEarned) + ' $</span></h1>')
                        


                            } else {

                                upSubContainer1.append($('<h1 class="numbers-bonus">'+
                                    String(lotteryPercentage) +
                                    '</h1>'+
                                    '<p class="symbol-bonus">%</p>'+
                                    '<p class="options-text-bonus">of</p>'))
        
                                downSubContainer1.append($('<p class="options-text-bonus">winning</p>'+
                                    '<h1 class="numbers-bonus">'+
                                    String(lotteryValue)+
                                    '</h1>'+
                                    '<p class="symbol-bonus">$</p>'))
                            
                            
                                round_title_container_1.empty()
                                    .append($('<h2 class ="round-text-get-bonus">Lottery '+
                                        String(selectedNumber)+'</h2>'))
                                
                                    }    
        
        
                                subcontainerOption1.append(upSubContainer1,downSubContainer1)
                
    
                                optionButton1.click(function () {
        
                                    subcontainerOption1.empty()
                                        .css('flex-direction','column')
                                        .css('height','80%');
                            
                                    var outcome = calculateOutcome(lotteryValue,lotteryPercentage)
        
                                    if (outcome === 0) {
                                        var outcomeText = $('<h1 class = red-outcome>' + String(outcome) + '$</h1>')
        
                                    } else {
                                        
                                        var outcomeText = $('<h1 class = green-outcome>' + String(outcome) + '$</h1>')
                                        
                                    }
        
                                    totalEarned += outcome
                                    
                                    subcontainerOption1.append(outcomeText)
        
                                    total_earned_text.empty()
                                        .append('<h1><span class="black-text">Total earned: '+
                                            '</span> <span class="green-outcome">' 
                                            + String(totalEarned) + ' $</span></h1>')
        
                                    optionButton1.prop('disabled', true); 
        
                                    lotteriesClicked += 1;
                                })
        
                        } else if (reelsLeft === 2) {

                            if (lotteryMissedDeadline) {

                                subContainer2.append($(
                                    '<h1 class=orange-outcome>Missed Deadline</h1>'))
                            
                            
                                round_title_container_2.empty()
                                    .append($('<h2 class ="round-text-get-bonus">Lottery '+
                                        String(selectedNumber)+'</h2>'))
                                
                         
        
                                subcontainerOption2.append(subContainer2)
                


                                orangeOutcomeWarning.empty().append($('<h2 class = "orange-text">'+
                                            'Please note that if a lottery displays <i>Missed Deadline</i>, '+
                                            'it means that you did not select a lottery before the deadline for that round. '+
                                            'Hence, you obtained no earnings from this lottery.</h2>'))

                                lotteriesClicked += 1;

                                totalEarned += 0

                                optionButton2.prop('disabled', true); 


                                total_earned_text.empty()
                                        .append('<h1><span class="black-text">Total earned: '+
                                            '</span> <span class="green-outcome">' 
                                            + String(totalEarned) + ' $</span></h1>')
                            } else {
                        
    
                                upSubContainer2.append($('<h1 class="numbers-bonus">'+
                                    String(lotteryPercentage) +
                                    '</h1>'+
                                    '<p class="symbol-bonus">%</p>'+
                                    '<p class="options-text-bonus">of</p>'))
        
                                downSubContainer2.append($('<p class="options-text-bonus">winning</p>'+
                                    '<h1 class="numbers-bonus">'+
                                    String(lotteryValue)+
                                    '</h1>'+
                                    '<p class="symbol-bonus">$</p>'))
                            
                            
                                round_title_container_2.empty()
                                    .append($('<h2 class ="round-text-get-bonus">Lottery '+
                                        String(selectedNumber)+'</h2>'))        
        
                                subcontainerOption2.append(upSubContainer2,downSubContainer2)
        
                                optionButton2.click(function () {
        
                                    subcontainerOption2.empty()
                                        .css('flex-direction','column')
                                        .css('height','80%');
                            
                                    var outcome = calculateOutcome(lotteryValue,lotteryPercentage)
        
                                    if (outcome === 0) {
                                        var outcomeText = $('<h1 class = red-outcome>' + String(outcome) + '$</h1>')
        
                                    } else {     
                                        var outcomeText = $('<h1 class = green-outcome>' + String(outcome) + '$</h1>')
                                    }
        
                                    totalEarned += outcome
                                    
                                    subcontainerOption2.append(outcomeText)
        
                                    total_earned_text.empty()
                                        .append('<h1><span class="black-text">Total earned: '
                                            +'</span> <span class="green-outcome">' 
                                            + String(totalEarned) + ' $</span></h1>')
                                    
                                    optionButton2.prop('disabled', true); 
                                    lotteriesClicked += 1;
                                })
                            }
                            
                        } else if (reelsLeft === 1) {

                            if (lotteryMissedDeadline) {

                                subContainer3.append($(
                                    '<h1 class=orange-outcome>Missed Deadline</h1>'))
                            
                            
                                round_title_container_3.empty()
                                    .append($('<h2 class ="round-text-get-bonus">Lottery '+
                                        String(selectedNumber)+'</h2>'))
                                
                         
        
                                subcontainerOption3.append(subContainer3)
                


                                orangeOutcomeWarning.empty().append($('<h2 class = "orange-text">'+
                                            'Please note that if a lottery displays <i>Missed Deadline</i>, '+
                                            'it means that you did not select a lottery before the deadline for that round. '+
                                            'Hence, you obtained no earnings from this lottery.</h2>'))

                                lotteriesClicked += 1;

                                totalEarned += 0

                                optionButton3.prop('disabled', true); 


                                total_earned_text.empty()
                                        .append('<h1><span class="black-text">Total earned: '+
                                            '</span> <span class="green-outcome">' 
                                            + String(totalEarned) + ' $</span></h1>')

                            } else {
    
                                upSubContainer3.append($('<h1 class="numbers-bonus">'+
                                    String(lotteryPercentage) +
                                    '</h1>'+
                                    '<p class="symbol-bonus">%</p>'+
                                    '<p class="options-text-bonus">of</p>'))
        
                                downSubContainer3.append($('<p class="options-text-bonus">winning</p>'+
                                    '<h1 class="numbers-bonus">'+
                                    String(lotteryValue)+
                                    '</h1>'+
                                    '<p class="symbol-bonus">$</p>'))
                            
                            
                                round_title_container_3.empty()
                                    .append($('<h2 class ="round-text-get-bonus">Lottery '+
                                        String(selectedNumber)+'</h2>'))
        
        
                                subcontainerOption3.append(upSubContainer3,downSubContainer3)
        
                                optionButton3.click(function () {
        
                                    subcontainerOption3.empty()
                                        .css('flex-direction','column')
                                        .css('height','80%');
                            
                                    var outcome = calculateOutcome(lotteryValue, lotteryPercentage)
        
                                    if (outcome === 0) {
                                        var outcomeText = $('<h1 class = red-outcome>' + String(outcome) + '$</h1>')
        
                                    } else {
                                        var outcomeText = $('<h1 class = green-outcome>' + String(outcome) + '$</h1>')
                                        
                                    }
        
                                    totalEarned += outcome
                                    
                                    subcontainerOption3.append(outcomeText)
        
                                    total_earned_text.empty()
                                        .append('<h1><span class="black-text">Total earned: '+
                                            '</span> <span class="green-outcome">' 
                                            + String(totalEarned) + ' $</span></h1>')
        
                                    optionButton3.prop('disabled', true); 
                                    lotteriesClicked += 1;
                                })
                            }
    
                        
                    
                        } else if (reelsLeft === 0) {
    
                            if (lotteryMissedDeadline) {

                                subContainer4.append($(
                                    '<h1 class=orange-outcome>Missed Deadline</h1>'))
                            
                            
                                round_title_container_4.empty()
                                    .append($('<h2 class ="round-text-get-bonus">Lottery '+
                                        String(selectedNumber)+'</h2>'))
                                
                         
        
                                subcontainerOption4.append(subContainer4)
                


                                orangeOutcomeWarning.empty().append($('<h2 class = "orange-text">'+
                                            'Please note that if a lottery displays <i>Missed Deadline</i>, '+
                                            'it means that you did not select a lottery before the deadline for that round. '+
                                            'Hence, you obtained no earnings from this lottery.</h2>'))

                                lotteriesClicked += 1;

                                totalEarned += 0

                                optionButton4.prop('disabled', true); 


                                total_earned_text.empty()
                                        .append('<h1><span class="black-text">Total earned: '+
                                            '</span> <span class="green-outcome">' 
                                            + String(totalEarned) + ' $</span></h1>') 

                            } else {
                                upSubContainer4.append($('<h1 class="numbers-bonus">'+
                                    String(lotteryPercentage) +
                                    '</h1>'+
                                    '<p class="symbol-bonus">%</p>'+
                                    '<p class="options-text-bonus">of</p>'))
        
                                downSubContainer4.append($('<p class="options-text-bonus">winning</p>'+
                                    '<h1 class="numbers-bonus">'+
                                    String(lotteryValue)+
                                    '</h1>'+
                                    '<p class="symbol-bonus">$</p>'))
                            
                            
                                round_title_container_4.empty()
                                    .append($('<h2 class ="round-text-get-bonus">Lottery '+
                                        String(selectedNumber)+'</h2>'))
        
        
                                subcontainerOption4.append(upSubContainer4,downSubContainer4)
        
                                optionButton4.click(function () {
        
                                    subcontainerOption4.empty()
                                        .css('flex-direction','column')
                                        .css('height','80%');
                            
                                    var outcome = calculateOutcome(lotteryValue, lotteryPercentage)
        
                                    if (outcome === 0) {
                                        var outcomeText = $('<h1 class = red-outcome>' + String(outcome) + '$</h1>')
        
                                    } else {
                                        var outcomeText = $('<h1 class = green-outcome>' + String(outcome) + '$</h1>')
                                    }
        
                                    totalEarned += outcome
                                
                                    subcontainerOption4.append(outcomeText)
        
                                    total_earned_text.empty()
                                        .append('<h1><span class="black-text">Total earned: '+
                                            '</span> <span class="green-outcome">' 
                                            + String(totalEarned) + ' $</span></h1>')  
        
                                    optionButton4.prop('disabled', true);     
                                    lotteriesClicked += 1;
                                })
                            }
                            
                        }

                    } else {
                        if (reelsLeft === 3) {

                            if (lotteryMissedDeadline) {

                                subContainer5.append($(
                                    '<h1 class=orange-outcome>Missed Deadline</h1>'))
                            
                            
                                round_title_container_5.empty()
                                    .append($('<h2 class ="round-text-get-bonus">Lottery '+
                                        String(selectedNumber)+'</h2>'))
                                
                         
        
                                subcontainerOption5.append(subContainer5)
                


                                orangeOutcomeWarning.empty().append($('<h2 class = "orange-text">'+
                                            'Please note that if a lottery displays <i>Missed Deadline</i>, '+
                                            'it means that you did not select a lottery before the deadline for that round. '+
                                            'Hence, you obtained no earnings from this lottery.</h2>'))

                                lotteriesClicked += 1;

                                totalEarned += 0

                                optionButton5.prop('disabled', true); 


                                total_earned_text.empty()
                                        .append('<h1><span class="black-text">Total earned: '+
                                            '</span> <span class="green-outcome">' 
                                            + String(totalEarned) + ' $</span></h1>')

                            } else {

                                upSubContainer5.append($('<h1 class="numbers-bonus">'+
                                    String(lotteryPercentage) +
                                    '</h1>'+
                                    '<p class="symbol-bonus">%</p>'+
                                    '<p class="options-text-bonus">of</p>'))
        
                                downSubContainer5.append($('<p class="options-text-bonus">winning</p>'+
                                    '<h1 class="numbers-bonus">'+
                                    String(lotteryValue)+
                                    '</h1>'+
                                    '<p class="symbol-bonus">$</p>'))
                            
                            
                                round_title_container_5.empty()
                                    .append($('<h2 class ="round-text-get-bonus">Lottery '+
                                        String(selectedNumber)+'</h2>'))
        
        
                                subcontainerOption5.append(upSubContainer5,downSubContainer5)
                    
        
                                optionButton5.click(function () {
        
                                    subcontainerOption5.empty()
                                        .css('flex-direction','column')
                                        .css('height','80%');
                            
                                    var outcome = calculateOutcome(lotteryValue,lotteryPercentage)
        
                                    if (outcome === 0) {
                                        var outcomeText = $('<h1 class = red-outcome>' + String(outcome) + '$</h1>')
        
                                    } else {   
                                        var outcomeText = $('<h1 class = green-outcome>' + String(outcome) + '$</h1>')
                                        
                                    }
        
                                    totalEarned += outcome
                                    
                                    subcontainerOption5.append(outcomeText)
        
                                    total_earned_text.empty()
                                        .append('<h1><span class="black-text">Total earned: '+
                                            '</span> <span class="green-outcome">' 
                                            + String(totalEarned) + ' $</span></h1>')
        
                                    optionButton5.prop('disabled', true); 
        
                                    lotteriesClicked += 1;
                                })
                            }
    
                        } else if (reelsLeft === 2) {

                            if (lotteryMissedDeadline) {

                                subContainer6.append($(
                                    '<h1 class=orange-outcome>Missed Deadline</h1>'))
                            
                            
                                round_title_container_6.empty()
                                    .append($('<h2 class ="round-text-get-bonus">Lottery '+
                                        String(selectedNumber)+'</h2>'))
                                
                         
        
                                subcontainerOption6.append(subContainer6)
                


                                orangeOutcomeWarning.empty().append($('<h2 class = "orange-text">'+
                                            'Please note that if a lottery displays <i>Missed Deadline</i>, '+
                                            'it means that you did not select a lottery before the deadline for that round. '+
                                            'Hence, you obtained no earnings from this lottery.</h2>'))

                                lotteriesClicked += 1;

                                totalEarned += 0

                                optionButton6.prop('disabled', true); 


                                total_earned_text.empty()
                                        .append('<h1><span class="black-text">Total earned: '+
                                            '</span> <span class="green-outcome">' 
                                            + String(totalEarned) + ' $</span></h1>')

                            } else {
    
                                upSubContainer6.append($('<h1 class="numbers-bonus">'+
                                    String(lotteryPercentage) +
                                    '</h1>'+
                                    '<p class="symbol-bonus">%</p>'+
                                    '<p class="options-text-bonus">of</p>'))
        
                                downSubContainer6.append($('<p class="options-text-bonus">winning</p>'+
                                    '<h1 class="numbers-bonus">'+
                                    String(lotteryValue)+
                                    '</h1>'+
                                    '<p class="symbol-bonus">$</p>'))
                            
                            
                                round_title_container_6.empty()
                                    .append($('<h2 class ="round-text-get-bonus">Lottery '+
                                        String(selectedNumber)+'</h2>'))        
        
                                subcontainerOption6.append(upSubContainer6,downSubContainer6)
        
                                optionButton6.click(function () {
        
                                    subcontainerOption6.empty()
                                        .css('flex-direction','column')
                                        .css('height','80%');
                            
                                    var outcome = calculateOutcome(lotteryValue,lotteryPercentage)
        
                                    if (outcome === 0) {
                                        var outcomeText = $('<h1 class = red-outcome>' + String(outcome) + '$</h1>')
                                    } else {
                                        var outcomeText = $('<h1 class = green-outcome>' + String(outcome) + '$</h1>')
                                    }
        
                                    totalEarned += outcome
                                    
                                    subcontainerOption6.append(outcomeText)
        
                                    total_earned_text.empty()
                                        .append('<h1><span class="black-text">Total earned: '
                                            +'</span> <span class="green-outcome">' 
                                            + String(totalEarned) + ' $</span></h1>')
                                    
                                    optionButton6.prop('disabled', true); 
                                    lotteriesClicked += 1;
                                    })
                            }
                            
                        } else if (reelsLeft === 1) {

                            if (lotteryMissedDeadline) {

                                subContainer7.append($(
                                    '<h1 class=orange-outcome>Missed Deadline</h1>'))
                            
                            
                                round_title_container_7.empty()
                                    .append($('<h2 class ="round-text-get-bonus">Lottery '+
                                        String(selectedNumber)+'</h2>'))
                                
                         
        
                                subcontainerOption7.append(subContainer7)
                


                                orangeOutcomeWarning.empty().append($('<h2 class = "orange-text">'+
                                            'Please note that if a lottery displays <i>Missed Deadline</i>, '+
                                            'it means that you did not select a lottery before the deadline for that round. '+
                                            'Hence, you obtained no earnings from this lottery.</h2>'))

                                lotteriesClicked += 1;

                                totalEarned += 0

                                optionButton7.prop('disabled', true); 


                                total_earned_text.empty()
                                        .append('<h1><span class="black-text">Total earned: '+
                                            '</span> <span class="green-outcome">' 
                                            + String(totalEarned) + ' $</span></h1>')
                                            
                            } else {

                                upSubContainer7.append($('<h1 class="numbers-bonus">'+
                                    String(lotteryPercentage) +
                                    '</h1>'+
                                    '<p class="symbol-bonus">%</p>'+
                                    '<p class="options-text-bonus">of</p>'))
        
                                downSubContainer7.append($('<p class="options-text-bonus">winning</p>'+
                                    '<h1 class="numbers-bonus">'+
                                    String(lotteryValue)+
                                    '</h1>'+
                                    '<p class="symbol-bonus">$</p>'))
                            
                            
                                round_title_container_7.empty()
                                    .append($('<h2 class ="round-text-get-bonus">Lottery '+
                                        String(selectedNumber)+'</h2>'))
        
        
                                subcontainerOption7.append(upSubContainer7,downSubContainer7)
        
                                optionButton7.click(function () {
        
                                    subcontainerOption7.empty()
                                        .css('flex-direction','column')
                                        .css('height','80%');
                            
                                    var outcome = calculateOutcome(lotteryValue, lotteryPercentage)
        
                                    if (outcome === 0) {
                                        var outcomeText = $('<h1 class = red-outcome>' + String(outcome) + '$</h1>')
                                    } else {
                                        var outcomeText = $('<h1 class = green-outcome>' + String(outcome) + '$</h1>')         
                                    }
        
                                    totalEarned += outcome
                                    
                                    subcontainerOption7.append(outcomeText)
        
                                    total_earned_text.empty()
                                        .append('<h1><span class="black-text">Total earned: '+
                                            '</span> <span class="green-outcome">' 
                                            + String(totalEarned) + ' $</span></h1>')
        
                                    optionButton7.prop('disabled', true); 
                                    lotteriesClicked += 1;
                                })

                            }
    
                    
                        } else if (reelsLeft === 0) {

                            if (lotteryMissedDeadline) {

                                subContainer8.append($(
                                    '<h1 class=orange-outcome>Missed Deadline</h1>'))
                            
                            
                                round_title_container_8.empty()
                                    .append($('<h2 class ="round-text-get-bonus">Lottery '+
                                        String(selectedNumber)+'</h2>'))
                                
                         
        
                                subcontainerOption8.append(subContainer8)
                


                                orangeOutcomeWarning.empty().append($('<h2 class = "orange-text">'+
                                            'Please note that if a lottery displays <i>Missed Deadline</i>, '+
                                            'it means that you did not select a lottery before the deadline for that round. '+
                                            'Hence, you obtained no earnings from this lottery.</h2>'))

                                lotteriesClicked += 1;

                                totalEarned += 0

                                optionButton8.prop('disabled', true); 


                                total_earned_text.empty()
                                        .append('<h1><span class="black-text">Total earned: '+
                                            '</span> <span class="green-outcome">' 
                                            + String(totalEarned) + ' $</span></h1>')

                            
                            } else {
                                upSubContainer8.append($('<h1 class="numbers-bonus">'+
                                    String(lotteryPercentage) +
                                    '</h1>'+
                                    '<p class="symbol-bonus">%</p>'+
                                    '<p class="options-text-bonus">of</p>'))
        
                                downSubContainer8.append($('<p class="options-text-bonus">winning</p>'+
                                    '<h1 class="numbers-bonus">'+
                                    String(lotteryValue)+
                                    '</h1>'+
                                    '<p class="symbol-bonus">$</p>'))
                            
                            
                                round_title_container_8.empty()
                                    .append($('<h2 class ="round-text-get-bonus">Lottery '+
                                        String(selectedNumber)+'</h2>'))
        
        
                                subcontainerOption8.append(upSubContainer8,downSubContainer8)
        
                                optionButton8.click(function () {
        
                                    subcontainerOption8.empty()
                                        .css('flex-direction','column')
                                        .css('height','80%');
                            
                                    var outcome = calculateOutcome(lotteryValue, lotteryPercentage)
        
                                    if (outcome === 0) {
                                        var outcomeText = $('<h1 class = red-outcome>' + String(outcome) + '$</h1>')
        
                                    } else {
                                    
                                        var outcomeText = $('<h1 class = green-outcome>' + String(outcome) + '$</h1>')
                                        
                                    }
        
                                    totalEarned += outcome
                                
                                    subcontainerOption8.append(outcomeText)
        
                                    total_earned_text.empty()
                                        .append('<h1><span class="black-text">Total earned: '+
                                            '</span> <span class="green-outcome">' 
                                            + String(totalEarned) + ' $</span></h1>')  
        
                                    optionButton8.prop('disabled', true);     
                                    lotteriesClicked += 1;
                                })
                            }
                            
                        }

                    }
                    
                }
            }, 100);
        });
    }

    async function spin() {
        //spinButton.disabled = true;
        let availableNumbers = all_gambles_array.slice(); 
        //for (const reel of reels) {
        //    await spinReel(reel, availableNumbers);
        //}

        // Run up slot machine
        for (const reel of upreels) {
            await spinReel(reel, availableNumbers,1);
        }

        // Restart the number of reels left per row
        reelsLeft = 4

        // Run down slot machine
        for (const reel of downreels) {
            await spinReel(reel, availableNumbers,-1);
        }
    }

    spinButton.addEventListener('click', spin);

    var get_bonus_heading = $('<h1>'+String(get_bonus.heading)+'</h1>')

    var get_bonus_text_1 =  $('<p class= "explanationText">'+
        String(get_bonus.paragraph1)+'</p>')

    var slotMachine = $('#slotMachine')

    var slotWarning = $('<div>')

    var clickLotteriesWarning = $('<div>')

    var get_bonus_boxtext = $('<div>')
        .addClass("explanationBoxText")
        .append(get_bonus_text_1,slotMachine.show())       

    var subcontainerOption1 = $('<div class="option-subcontainer" id="subcontainerOption1"></div>')
    var subcontainerOption2 = $('<div class="option-subcontainer" id="subcontainerOption2"></div>')
    var subcontainerOption3 = $('<div class="option-subcontainer" id="subcontainerOption3"></div>')
    var subcontainerOption4 = $('<div class="option-subcontainer" id="subcontainerOption4"></div>')
    var subcontainerOption5 = $('<div class="option-subcontainer" id="subcontainerOption5"></div>')
    var subcontainerOption6 = $('<div class="option-subcontainer" id="subcontainerOption6"></div>')
    var subcontainerOption7 = $('<div class="option-subcontainer" id="subcontainerOption7"></div>')
    var subcontainerOption8 = $('<div class="option-subcontainer" id="subcontainerOption8"></div>')

    var optionButton1 = $('<button>')
        .addClass('option-button-get-bonus')
        .attr('id', 'button1')

    var optionButton2 = $('<button>')
        .addClass('option-button-get-bonus')
        .attr('id', 'button2')
    
    var optionButton3 = $('<button>')
        .addClass('option-button-get-bonus')
        .attr('id', 'button3')

    var optionButton4 = $('<button>')
        .addClass('option-button-get-bonus')
        .attr('id', 'button4')

    var optionButton5 = $('<button>')
        .addClass('option-button-get-bonus')
        .attr('id', 'button5')

    var optionButton6 = $('<button>')
        .addClass('option-button-get-bonus')
        .attr('id', 'button6')

    var optionButton7 = $('<button>')
        .addClass('option-button-get-bonus')
        .attr('id', 'button7')

    var optionButton8 = $('<button>')
        .addClass('option-button-get-bonus')
        .attr('id', 'button8')
        
    var upSubContainer1 = $('<div class="option-subcontainer-bonus"></div>')
    var upSubContainer2 = $('<div class="option-subcontainer-bonus"></div>')
    var upSubContainer3 = $('<div class="option-subcontainer-bonus"></div>')    
    var upSubContainer4 = $('<div class="option-subcontainer-bonus"></div>')
    var upSubContainer5 = $('<div class="option-subcontainer-bonus"></div>')
    var upSubContainer6 = $('<div class="option-subcontainer-bonus"></div>')
    var upSubContainer7 = $('<div class="option-subcontainer-bonus"></div>')    
    var upSubContainer8 = $('<div class="option-subcontainer-bonus"></div>')

    var downSubContainer1 = $('<div class="option-subcontainer-bonus"></div>')
    var downSubContainer2 = $('<div class="option-subcontainer-bonus"></div>')
    var downSubContainer3 = $('<div class="option-subcontainer-bonus"></div>')
    var downSubContainer4 = $('<div class="option-subcontainer-bonus"></div>') 
    var downSubContainer5 = $('<div class="option-subcontainer-bonus"></div>')
    var downSubContainer6 = $('<div class="option-subcontainer-bonus"></div>')
    var downSubContainer7 = $('<div class="option-subcontainer-bonus"></div>')
    var downSubContainer8 = $('<div class="option-subcontainer-bonus"></div>') 
    
    var subContainer1 = $('<div class="option-subcontainer"></div>')
    var subContainer2 = $('<div class="option-subcontainer"></div>')
    var subContainer3 = $('<div class="option-subcontainer"></div>')
    var subContainer4 = $('<div class="option-subcontainer"></div>')
    var subContainer5 = $('<div class="option-subcontainer"></div>')
    var subContainer6 = $('<div class="option-subcontainer"></div>')
    var subContainer7 = $('<div class="option-subcontainer"></div>')
    var subContainer8 = $('<div class="option-subcontainer"></div>')
    
    optionButton1.append(subcontainerOption1)
    optionButton2.append(subcontainerOption2)
    optionButton3.append(subcontainerOption3)
    optionButton4.append(subcontainerOption4)
    optionButton5.append(subcontainerOption5)
    optionButton6.append(subcontainerOption6)
    optionButton7.append(subcontainerOption7)
    optionButton8.append(subcontainerOption8)
        
    var selected_rounds_sub_container_up = $('<div class= "selected-rounds-sub-get-bonus">')
    var selected_rounds_sub_container_down = $('<div class= "selected-rounds-sub-get-bonus">')

    var round_title_container_1 = $('<h2 class ="round-text-get-bonus">Lottery</h2>')
    var round_title_container_2 = $('<h2 class ="round-text-get-bonus">Lottery</h2>')
    var round_title_container_3 = $('<h2 class ="round-text-get-bonus">Lottery</h2>')
    var round_title_container_4 = $('<h2 class ="round-text-get-bonus">Lottery</h2>')
    var round_title_container_5 = $('<h2 class ="round-text-get-bonus">Lottery</h2>')
    var round_title_container_6 = $('<h2 class ="round-text-get-bonus">Lottery</h2>')
    var round_title_container_7 = $('<h2 class ="round-text-get-bonus">Lottery</h2>')
    var round_title_container_8 = $('<h2 class ="round-text-get-bonus">Lottery</h2>')

    var selected_rounds_subcontainer_1 = $('<div class="rounds-subcontainer-get-bonus">')
        .append(round_title_container_1,optionButton1)

    var selected_rounds_subcontainer_2 = $('<div class="rounds-subcontainer-get-bonus">')
        .append(round_title_container_2,optionButton2)

    var selected_rounds_subcontainer_3 = $('<div class="rounds-subcontainer-get-bonus">')
        .append(round_title_container_3,optionButton3)

    var selected_rounds_subcontainer_4 = $('<div class="rounds-subcontainer-get-bonus">')
        .append(round_title_container_4,optionButton4)

    var selected_rounds_subcontainer_5 = $('<div class="rounds-subcontainer-get-bonus">')
        .append(round_title_container_5,optionButton5)

        var selected_rounds_subcontainer_6 = $('<div class="rounds-subcontainer-get-bonus">')
        .append(round_title_container_6,optionButton6)

        var selected_rounds_subcontainer_7 = $('<div class="rounds-subcontainer-get-bonus">')
        .append(round_title_container_7,optionButton7)

        var selected_rounds_subcontainer_8 = $('<div class="rounds-subcontainer-get-bonus">')
        .append(round_title_container_8,optionButton8)

    selected_rounds_sub_container_up
        .append(selected_rounds_subcontainer_1,
            selected_rounds_subcontainer_2,
            selected_rounds_subcontainer_3,
            selected_rounds_subcontainer_4)    
            
    selected_rounds_sub_container_down
        .append(selected_rounds_subcontainer_5,
            selected_rounds_subcontainer_6,
            selected_rounds_subcontainer_7,
            selected_rounds_subcontainer_8) 
                                                                            
    var lottereis_chosen_text = $('<h1>Selected lotteries</h1>')

    var selected_rounds_container = $('<div class= "selected-rounds-get-bonus">')
        .append(lottereis_chosen_text,
            selected_rounds_sub_container_up,
            selected_rounds_sub_container_down)
    
    var orangeOutcomeWarning = $('<div>')
   
    var total_earned_text = $('<h1>Total earned: </h1>')
    
    var total_earned_container = $('<div class="total-earned-container">')
        .append(total_earned_text)

    var next_button = $('<button class = "button">')
        .text('Next')
        .click(function() {

            if (!lotteriesDrawn) {
                slotWarning.append($('<h2 class = "red-text">Click on <i>SPIN</i> to '+
                    'draw four lotteries from the bag of selected lotteries.</h2>'))
            } else if (lotteriesDrawn && lotteriesClicked < 8) {
                clickLotteriesWarning.empty().append($('<h2 class = "red-text">Click on the eight '+
                    'lotteries above to collect Ghentian dollars.</h2>'))
            } else {
                bonusFeedbackMessage()
            }
        })  

    var get_bonus_boxtext = $('<div>')
        .addClass("explanationBoxText")
        .append(get_bonus_text_1,
            slotWarning,
            slotMachine.show(),
            selected_rounds_container,
            clickLotteriesWarning,
            total_earned_container,
            orangeOutcomeWarning,
            next_button) 

    //console.log("lotteries chosen",lotteries_chosen)
         
    $('#explanations').append(get_bonus_heading,get_bonus_boxtext).scrollTop(0).show() 
}

function trainingCompleted() {

    $('#explanations').empty().hide()
    $('#fixation-cross').hide()
    $('body').css('background-color', 'white');

    var trainingCompletedTitle = $('<h1> TRAINING COMPLETED </h1>')

    if (practiceTotalEarned === 0) {
        var trainingCompletedText1 = $('<h3> Good job, you finished the practice phase! '+
            'Click on <i>Next</i> to start the real game!</h3>') 
    } else {
        var trainingCompletedText1 = $('<h3> Good job! You finished the practice phase and you '+
            'earned '+String(practiceTotalEarned)+'$! However, only the Ghentian dollars '+
            'collected in the real experiment count for the performance bonus. '+
            'Click on <i>Next</i> to start the real game!</h3>') 
    }

    var trainingCompletedTextBox = $('<div>')
        .addClass('bonus-feedback-text-box')
        .append(trainingCompletedText1);

    var startExperimentButton = $('<button class = "button">')
        .text('Next')
        .click(function() {
            $('#startExperiment').hide();   
            dontCountMessage()//Countdown(); 
        })

    $('#bonusFeedback')
        .addClass('bonus-feedback')
        .append(trainingCompletedTitle,
            trainingCompletedTextBox,
            startExperimentButton).show()
}

function calculatePerformanceBonus(ghentianDollars) {

    if (ghentianDollars < 200) {
        return 0
    } else if (200 <= ghentianDollars < 300) {
        return 1
    } else if (300 <= ghentianDollars < 400) {
        return 2
    } else if (400 <= ghentianDollars < 500) {
        return 3
    } else {
        return 4
    }

}

function bonusFeedbackMessage() {

    $('#explanations').empty().hide()

    var performanceBonus = calculatePerformanceBonus(totalEarned)

    var bonusFeedbackHeading = ('<h1 class =" bonus-feedback-heading">'+
        String(bonus_feedback.heading)+'</h1>')
    
    var bonusFeedbackText1 = $('<h3 class= "explanationText">Well done, '+
        'you almost finished the experiment!</h3>')
    
    var bonusFeedbackText2 = $('<h3 class= "explanationText">You earned '+ 
        String(totalEarned) + ' Ghential dollars, which corresponds to a performance bonus of '+
        '<span class = "green-text-paragraph">£'+String(performanceBonus)+'</span>.</h3>')

    var bonusFeedbackText3 =  $('<h3 class= "explanationText">'+
        String(bonus_feedback.paragraph1)+'</h3>')

    var nextButton = $('<button class = "button">')
        .text('Next')
        .click(function() {
            finalQuestionnaire()
        }) 

    var bonusFeedbackTextBox = $('<div>')
        .addClass('bonus-feedback-text-box')
        .append(bonusFeedbackText1,
            bonusFeedbackText2,
            bonusFeedbackText3, 
            nextButton);

    $('#bonusFeedback').addClass('bonus-feedback')
        .append(bonusFeedbackHeading, bonusFeedbackTextBox).show();

}