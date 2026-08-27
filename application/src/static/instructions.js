function showExplanations(instround,quiznum){
    
    $('#instructionsMessage').hide()
    $('#explanations').empty().hide()
    $('#Quiz').empty().hide()
    
    clearTimeout(timerInstruction1)
    clearTimeout(timerInstruction2)
    clearTimeout(timerInstruction3)
    clearTimeout(timerInstruction4)
    clearTimeout(timerInstruction5)
    clearTimeout(timerInstruction6)

    if (instround == 1){
        
        var explanation_1_heading = $('<h1 class="heading-instructions">'+
            String(explanations.explanation1.heading)+'</h1>')

        var explanation_1_text_1 =  $('<p class= "explanationText">'+
            String(explanations.explanation1.paragraph1)+'</p>')

        var explanation_1_text_2 =  $('<p class= "explanationText">'
            +String(explanations.explanation1.paragraph2)+'</p>')
        
        var explanation_1_text_3 =  $('<p class= "explanationText">'+
            String(explanations.explanation1.paragraph3)+'</p>')

        var explanation_1_snapshot_1 = $('<img class = "snapshot-instructions">')
            .attr('src', "static/images/snapshot1.png") 

        var explanation_1_text_4 =  $('<p class= "explanationText">'+
            String(explanations.explanation1.paragraph4)+'</p>')

        var explanation_1_snapshot_2 = $('<img class = "snapshot-instructions">')
            .attr('src', "static/images/snapshot2.png") 

        var explanation_1_text_5 =  $('<p class= "explanationText">'+
            String(explanations.explanation1.paragraph5)+'</p>')

        var explanation_1_snapshot_3 = $('<img class = "snapshot-instructions-arrow-keys">')
            .attr('src', "static/images/arrow_keys.svg") 
        
        var explanation_1_text_6 =  $('<p class= "explanationText">'+
            String(explanations.explanation1.paragraph6)+'</p>')
            
        var explanation_1_text_7 =  $('<p class= "explanationText">'+
            String(explanations.explanation1.paragraph7)+'</p>')

        var explanation_1_text_8 =  $('<p class= "explanationText">'+
            String(explanations.explanation1.paragraph8)+'</p>')

        var explanation_1_button_next = $('<button class = "button-instructions">')
            .text('Next')
            .click(function() {
                $('html, body').animate({ scrollTop: 0 }, 'smooth'); 
                if (!instruction1_visited) {
                    instruction1_visited = true; 
                    completionTimeInstruction1 = performance.now() - startTimeInstruction1
                }
                showExplanations(instround+1,quiznum)
            });
        
         var explanation_1_boxtext = $('<div>')
            .addClass("explanationBoxText")
            .append(//explanation_1_heading,
                explanation_1_text_1, 
                explanation_1_text_2, 
                explanation_1_text_3, 
                explanation_1_text_4,
                explanation_1_snapshot_1,
                explanation_1_text_5, 
                explanation_1_text_6,
                explanation_1_text_7,
                explanation_1_snapshot_2,
                explanation_1_snapshot_3,
                explanation_1_text_8,
                explanation_1_button_next)         
         
         $('#explanations').append(explanation_1_heading,explanation_1_boxtext).show()       
         
         var startTimeInstruction1 = performance.now()    
      
         if (visitsInstruction1 == 0) {
             visitsInstruction1 += 1
         } else {
            timerInstruction1 = setTimeout(function() {
                visitsInstruction1 += 1
            }, minTimeVisit);
         }


    } else {

        if (instround == 2){
            
            var explanation_2_heading = $('<h1 class = "heading-instructions">'+
                String(explanations.explanation2.heading)+'</h1>') 
            
            var explanation_2_text_1 =  $('<p class= explanationText>'
                +String(explanations.explanation2.paragraph1)+'</p>')

            var explanation_2_text_2 = $('<div>' +
                '<p class = "explanationText">'+String(explanations.explanation2.paragraph2)+'</p>'+
                '<ul>' +
                    '<li class = "explanationText">'+String(explanations.explanation2.point1)+'</li>' +
                    '<li class = "explanationText">'+String(explanations.explanation2.point2)+'</li>' +
                    '<li class = "explanationText">'+String(explanations.explanation2.point3)+'</li>' +
                    '<li class = "explanationText">'+String(explanations.explanation2.point4)+'</li>' +
               '</ul>')
            
            var explanation_2_text_3 =  $('<p class= explanationText>'
                +String(explanations.explanation2.paragraph3)+'</p>')

            
            var explanation_2_button_next = $('<button class = "button-instructions">')
                .text('Next')
                .click(function() {

                    $('html, body').animate({ scrollTop: 0 }, 'smooth'); // Or r
                    if (quiznum >= 3) {
                        showExplanations(instround+1,quiznum)
                    } else {
                        if (!instruction2_visited) {
                            instruction2_visited = true;
                            completionTimeInstruction2 = performance.now() - startTimeInstruction2 
                        }
                        Quiz(quiznum)
                    } 
                })

            var explanation_2_button_back = $('<button class = "button-instructions">')
                .text('Back')
                .click(function() {
                    $('html, body').animate({ scrollTop: 0 }, 'smooth'); 
                    if (!instruction2_visited) {
                        instruction2_visited = true;
                        completionTimeInstruction2 = performance.now() - startTimeInstruction2
                    }
                    showExplanations(instround-1,quiznum)
                })

            var explanation_2_buttons = $('<div>')
                .addClass("explanation-buttons")
                .append(explanation_2_button_back, explanation_2_button_next)

            var explanation_2_boxtext = $('<div>')
                .addClass("explanationBoxText")
                .append(//explanation_2_heading, 
                    explanation_2_text_1, 
                    explanation_2_text_2, 
                    explanation_2_text_3, 
                    explanation_2_buttons)
            
            $('#explanations').append(explanation_2_heading,explanation_2_boxtext).show()

            var startTimeInstruction2 = performance.now()
            
            if (visitsInstruction2 == 0) {
                visitsInstruction2 += 1
            } else {
                timerInstruction2 = setTimeout(function() {
                    visitsInstruction2 += 1
                    //console.log("visitsInstruction2",visitsInstruction2)
                }, minTimeVisit);
            }
            //console.log("visitsInstruction2",visitsInstruction2)

        } 
        
        if (instround == 3){
            
            var explanation_3_heading = $('<h1 class= "heading-instructions">'
                +String(explanations.explanation3.heading)+'</h1>')

            var explanation_3_text_1 =  $('<p class= "explanationText">'+
                String(explanations.explanation3.paragraph1)+'</p>')

            var explanation_3_text_1 = $('<div>' +
                '<p class = "explanationText">'+String(explanations.explanation3.paragraph1)+'</p>'+
                '<ul>' +
                    '<li class = "explanationText">'+String(explanations.explanation3.point1)+'</li>' +
                    '<li class = "explanationText">'+String(explanations.explanation3.point2)+'</li>' +
                    '<li class = "explanationText">'+String(explanations.explanation3.point3)+'</li>' +
                    '<li class = "explanationText">'+String(explanations.explanation3.point4)+'</li>' +
               '</ul>')

            var explanation_3_button_next = $('<button class = "button-instructions">')
                .text('Next')
                .click(function() {
                    $('html, body').animate({ scrollTop: 0 }, 'smooth'); 
                    if (quiznum == 4) {
                        showExplanations(instround+1,quiznum)
                    } else {
                        if (!instruction3_visited) {
                            instruction3_visited = true;
                            completionTimeInstruction3 = performance.now() - startTimeInstruction3 
                        }
                        Quiz(quiznum)
                    } 
                })

            var explanation_3_button_back = $('<button class = "button-instructions">')
                .text('Back')
                .click(function() {
                    $('html, body').animate({ scrollTop: 0 }, 'smooth'); 
                    if (!instruction3_visited) {
                            instruction3_visited = true;
                            completionTimeInstruction3 = performance.now() - startTimeInstruction3
                    }
                    showExplanations(instround-1,quiznum)
                })

            var explanation_3_buttons = $('<div>')
                .addClass("explanation-buttons")
                .append(explanation_3_button_back, explanation_3_button_next)

            var explanation_3_boxtext = $('<div>')
                .addClass("explanationBoxText")
                .append(//explanation_3_heading,
                        explanation_3_text_1,
                        explanation_3_buttons)

            $('#explanations').append(explanation_3_heading,explanation_3_boxtext).show()
            
            var startTimeInstruction3 = performance.now()
            
            if (visitsInstruction3 == 0) {
                visitsInstruction3 += 1
            } else {
                timerInstruction3 = setTimeout(function() {
                    visitsInstruction3 += 1
                }, minTimeVisit);
            }
            //console.log("visitsInstruction3",visitsInstruction3)

        }

        if (instround == 4){
            
            var explanation_4_heading = $('<h1 class = "heading-instructions">'
                +String(explanations.explanation4.heading)+'</h1>')

            var explanation_4_snapshot_1 = $('<img class = "snapshot-timing-diagram">')
                .attr('src', "static/images/timingTaskDiagram.svg")


            var explanation_4_text_1 =  $('<p class= "explanationText">'+
                String(explanations.explanation4.paragraph1)+'</p>')

            var explanation_4_text_2 =  $('<p class= "explanationText">'+
                String(explanations.explanation4.paragraph2)+'</p>')
        
            var explanation_4_text_3 =  $('<p class= "explanationText">'+
                String(explanations.explanation4.paragraph3)+'</p>')

            var explanation_4_text_4 =  $('<p class= "explanationText">'+
                String(explanations.explanation4.paragraph4)+'</p>')

            var explanation_4_text_5 =  $('<p class= "explanationText">'+
                String(explanations.explanation4.paragraph5)+'</p>')
            
            var explanation_4_text_6 =  $('<p class= "explanationText">'+
                String(explanations.explanation4.paragraph6)+'</p>')

            var explanation_4_text_7 = $('<div>' +
                '<p class = "explanationText">'+String(explanations.explanation4.paragraph7)+'</p>'+
                '<ul>' +
                    '<li class = "explanationText">'+String(explanations.explanation4.point1)+'</li>' +
                    '<li class = "explanationText">'+String(explanations.explanation4.point2)+'</li>' +
                    '<li class = "explanationText">'+String(explanations.explanation4.point3)+'</li>' +
                '</ul>')
               
            var explanation_4_button_next = $('<button class = "button-instructions">')
                .text('Next')
                .click(function() {
                    $('html, body').animate({ scrollTop: 0 }, 'smooth'); 
                    if (!instruction4_visited) {
                        instruction4_visited = true;
                        completionTimeInstruction4 = performance.now() - startTimeInstruction4 
                    }
	            showExplanations(instround+1,quiznum)
                })

            var explanation_4_button_back = $('<button class = "button-instructions">')
                .text('Back')
                .click(function() {
                    $('html, body').animate({ scrollTop: 0 }, 'smooth'); 
                    if (!instruction4_visited) {
                        instruction4_visited = true;
                        completionTimeInstruction4 = performance.now() - startTimeInstruction4
                    }
                    showExplanations(instround-1,quiznum)
                })

            var explanation_4_buttons = $('<div>')
                .addClass("explanation-buttons")
                .append(explanation_4_button_back, explanation_4_button_next)

            var explanation_4_boxtext = $('<div>')
                .addClass("explanationBoxText")
                .append(//explanation_4_heading,
                    explanation_4_text_1,
                    explanation_4_text_2,  
                    explanation_4_text_3,
                    explanation_4_text_4, 
                    explanation_4_snapshot_1,
                    explanation_4_text_5,
                    explanation_4_text_6, 
                    explanation_4_text_7, 
                    explanation_4_buttons)

            $('#explanations').append(explanation_4_heading,explanation_4_boxtext).show()          
            
            var startTimeInstruction4 = performance.now()

            if (visitsInstruction4 == 0) {
                visitsInstruction4 += 1
            } else {
                timerInstruction4 = setTimeout(function() {
                    visitsInstruction4 += 1
                }, minTimeVisit);
            }
            //console.log("visitsInstruction4",visitsInstruction4)


        }

        if (instround == 5){
            
            var explanation_5_heading = $('<h1 class = "heading-instructions">'
                +String(explanations.explanation5.heading)+'</h1>')
            
            //var explanation_5_heading2 = $('<h1>'
                //+String(explanations.explanation5.heading2)+'</h1>')

            var explanation_5_text_1 =  $('<p class= "explanationText">'+
                String(explanations.explanation5.paragraph1)+'</p>')
            
            var explanation_5_text_2 =  $('<p class= "explanationText">'+
                String(explanations.explanation5.paragraph2)+'</p>')

               
            var explanation_5_button_next = $('<button class = "button-instructions">')
                .text('Next')
                .click(function() {
                    $('html, body').animate({ scrollTop: 0 }, 'smooth'); 
                    if (!instruction5_visited) {
                        instruction5_visited = true;
                        completionTimeInstruction5 = performance.now() - startTimeInstruction5 
                    }
	            showExplanations(instround+1,quiznum)
                })

            var explanation_5_button_back = $('<button class = "button-instructions">')
                .text('Back')
                .click(function() {
                    $('html, body').animate({ scrollTop: 0 }, 'smooth'); 
                    if (!instruction5_visited) {
                        instruction5_visited = true;
                        completionTimeInstruction5 = performance.now() - startTimeInstruction5
                    }
                    showExplanations(instround-1,quiznum)
                })

            var explanation_5_buttons = $('<div>')
                .addClass("explanation-buttons")
                .append(explanation_5_button_back, explanation_5_button_next)

            var explanation_5_boxtext = $('<div>')
                .addClass("explanationBoxText")
                .append(//explanation_5_heading,
                    //explanation_5_heading2,
                    explanation_5_text_1, 
                    explanation_5_text_2, 
                    explanation_5_buttons)

            $('#explanations').append(explanation_5_heading,explanation_5_boxtext).show()          
            
            var startTimeInstruction5 = performance.now()

            if (visitsInstruction5 == 0) {
                visitsInstruction5 += 1
            } else {
                timerInstruction5 = setTimeout(function() {
                    visitsInstruction5 += 1
                }, minTimeVisit);
            }
            //console.log("visitsInstruction4",visitsInstruction4)


        }
        if (instround == 6){
            
            var explanation_6_heading = $('<h1 class = "heading-instructions">'
                +String(explanations.explanation6.heading)+'</h1>')

            var explanation_6_text_1 =  $('<p class= "explanationText">'+
                getInstructionBlockSummary()+'</p>')

            var explanation_6_text_2 =  $('<p class= "explanationText">'+
                String(explanations.explanation6.paragraph2)+'</p>')
               
            var explanation_6_button_next = $('<button class = "button-instructions">')
                .text('Next')
                .click(function() {
                    $('html, body').animate({ scrollTop: 0 }, 'smooth'); 
                    if (!instruction6_visited) {
                        instruction6_visited = true;
                        completionTimeInstruction6 = performance.now() - startTimeInstruction6 
                    }
	            showExplanations(instround+1,quiznum)
                })

            var explanation_6_button_back = $('<button class = "button-instructions">')
                .text('Back')
                .click(function() {
                    $('html, body').animate({ scrollTop: 0 }, 'smooth'); 
                    if (!instruction6_visited) {
                        instruction6_visited = true;
                        completionTimeInstruction6 = performance.now() - startTimeInstruction6
                    }
                    showExplanations(instround-1,quiznum)
                })

            var explanation_6_buttons = $('<div>')
                .addClass("explanation-buttons")
                .append(explanation_6_button_back, explanation_6_button_next)

            var explanation_6_boxtext = $('<div>')
                .addClass("explanationBoxText")
                .append(//explanation_6_heading,
                    explanation_6_text_1,
                    explanation_6_text_2,  
                    explanation_6_buttons)

            $('#explanations').append(explanation_6_heading,explanation_6_boxtext).show()           
            
            var startTimeInstruction6 = performance.now()

            if (visitsInstruction6 == 0) {
                visitsInstruction6 += 1
            } else {
                timerInstruction6 = setTimeout(function() {
                    visitsInstruction6 += 1
                }, minTimeVisit);
            }


        }

        if (instround == 7){

            var headingStartPracticing1 = $('<h1>'+
                String(instructions_completed.heading)+'</h1>')

            var textStartPracticing1 = $('<p class= "explanationText">'+
                String(instructions_completed.paragraph1)+'</p>')

            var textStartPracticing2 = $('<p class= "explanationText">'+
                String(instructions_completed.paragraph2)+'</p>')

            var buttonStartPracticing = $('<button class = "button-instructions">')
                .text('Start practicing')
                .click(function() {
                    
                    completionTimeInstructionsCompleted =  performance.now() - startTimeInstructionsCompleted 

                    showPracticeOptions()
                })
    

            var boxTextStartPracticing = $('<div class=start-practicing-box-text>')
                .append(textStartPracticing1,
                        textStartPracticing2,
                        buttonStartPracticing)

            $('#InstructionsCompleted').empty().append(headingStartPracticing1,boxTextStartPracticing).show()   

            var startTimeInstructionsCompleted = performance.now() 
       }
    }
}

