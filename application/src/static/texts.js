
//In this file I define all the texts that show up in the experiment

const consent_form_information = {    
    introduction: {
        heading: "Introduction",
	      paragraph1: "Ghent University supports the practice of protecting human participants in research. This form provides you with important information about taking part in this study, <i>Ghent's game</i>.",
        paragraph2: "Participation in this study is entirely voluntary, and you may withdraw at any time without penalty or negative consequences, except for the loss of compensation. "+ 
                    "If you choose to withdraw, any data collected from you will be deleted and not included in the final analysis.",
    },
    summary: {
        heading: "Summary",
        paragraph1: "The purpose of this study is to investigate how humans perceive time while gambling.",
        paragraph2: "During the experiment you will be playing a simple game where you will have to choose between different lotteries to earn as many points as possible. Before playing, you will read instructions and play some practice rounds.",
        paragraph3: "<strong>The study must be completed in full-screen mode on a laptop or a desktop computer</strong>",
        paragraph4: "<strong>The study will take approximately 1 hour to complete, "+
                    "including two 5-minute breaks</strong>."
      
    },
    risks: {
        heading: "Risks",
        paragraph1: "This experiment may be harmful for individuals suffering from gambling addiction. Please, <strong>do not participate in this study if you are suffering from gambling addiction or you believe you may be susceptible to it</strong>."

    },
    dataInfo: {
        heading:"Data collection and confidentiality",
        paragraph1: "During this study, we will collect Gameplay data, Questionnaire responses and Demographics (sex and age).", 
        paragraph2: "<strong>All demographic data will be collected in a pseudonymous manner, using your Prolific ID. "+
                    "No personally identifiable information, such as your name or any details that could reveal your identity, will be collected.</strong>",
        paragraph3: "The data collected will be processed and analysed, and the results might be published in a scientific journal or conference paper. "+
                    "If published, you will be able to see the results on the website of <u>ChronoPilot</u>, the European project that has funded this study.",
        paragraph4: "All the data will be securely stored in the IT and storage services provided by Ghent University. "+
                    "In addition, after the publication of the results, all the data and metadata, as well as the necessary scripts to process it, will be deposited in the <i>Zenodo</i> repository with an appropriate structure, format, and guidelines to adhere to the FAIR principles (guaranteed Findability, Accessibility, Interoperability and Reusability of datasets).",
        paragraph5: "Importantly, we will not publish or deposit in <i>Zenodo</i> your Prolific ID. All the Prolific IDs will be removed from Ghent's University repository after we have processed the data and we are sure that all participants have received their corresponding compensation.",
        paragraph6: "<strong>If your submission is rejected, all your data will be automatically deleted (it will not be use for any analysis). If you return your submission, your data will also be deleted and not analysed.</strong>"
    },
    compensation: {
        heading:"Compensation",
        point1: "For your valuable time and dedication, we're pleased to offer you a <strong>"+
                "base compensation of £10</strong>.", 
        point2: "Additionally, you have the opportunity to earn a "+
                "<strong>performance bonus ranging from £0 to £4</strong>, "+
                "depending on the number of points (known as <i>Ghentian</i> dollars in the game) you collect during the game. ",
        point3: "At the beginning of the study, you will read instructions and complete "+
                "four <u>comprehension checks</u> "+
                "to assess your understanding of the explanations. ",
        point4: "<strong>Please be aware that if you fail a <u>comprehension check</u> more than twice "+
                "you will be automatically redirected to Prolific's platform, "+
                "and you will be asked to return your submission in accordance with Prolific's policy. "+
                "If you return your submission, you will not receive a compensation.</strong>",
        point5: "The study will be divided into 3 blocks with 20 experiment rounds each. "+
                "Following the completion of each block, "+
                "<strong>you are entitled to a break of up to 5 minutes </strong>. "+
                "During the break, "+
                "simply <strong>ensure that you click the designated button to progress to the next block "+
                "within the 5-minute timeframe</strong>. "+
                "Failure to do so will result in automatic redirection to Prolific's platform, "+
                "where you will be asked to return your submission.",
        point6: "Please be aware that you are not allowed to take breaks during the questionnaires and "+
                "experiment rounds. You can only take breaks during the designated resting times after each block. "+
                "If we detect inactivity for a long time (more than 5 minutes), you will be automatically "+
                "redirected to Prolific's platform and asked to return your submission.",
        point7: "During the experiment you will also complete two randomly allocated <u>attention checks</u>. "+
                "These questions are very easy, do not require any prior knowledge, "+
                "and are designed solely to assess whether you are paying attention or not.",
        point8: "<strong>Please be aware that if you fail both <u>attention checks</u>, "+
                "your submission will be rejected and you will not receive any compensation, "+
                "in accordance with Prolific's policy.</strong>",
        point9: "The study must be completed in full-screen mode and you cannot switch screens. "+
                "Every time you exit the full-screen mode or switch screens you will be warned to return to full-screen mode and to not switch screens. "+
                "<strong>If you are warned more than three times to return to full-screen mode and to not switch screens, "+
                "you will be automatically redirected to Prolific's platform and asked to return your submission</strong>.",
        point10: "Finally, please note that if your participation was clearly negligible, "+
                "your submission will be rejected and your compensation will be denied. "+
                "In particular, if you completed the study extremely fast "+
                "(more than three standard deviations below the mean) "+
                "and if you input random characters in your answers to the questionnaires."
    },
    contactInformation: {
        heading:"Contact information",
        paragraph1:"If you have any questions, concerns, or feedback related to this study, please, feel free to contact: ",
        name: "Alvaro Garrido Perez",
        email: "alvaro.garridoperez@ugent.be"
    },
    statementOfConsent: {
        heading: "Statement of consent",
        paragraph1: "I confirm that:",
        point1: "I have read and understood the information provided in this consent form.",
        point2: "I have had the opportunity to ask questions and have received satisfactory answers.",
        point3: "I voluntarily agree to participate in the study: <i>Ghent's game</i>.",
        point4: "I understand that I may withdraw from the study at any time without penalty or negative consequences, except for the loss of compensation."
    }
}


const questions = {
  question1: {
    text: "Please estimate the duration of the experiment round you just completed "+
          "(from the moment you pressed START until the questionnaire appeared). "+
          "Type your answer in seconds.",
  },
  question2: {
    text: "Please indicate how confident you are of the above time estimation.",
    answerOptions: ["Very unsure", "Unsure", "Medium", "Confident", "Very confident"],
  },
  question3: {
    text: "Please indicate your perceived level of difficulty of the experiment round you just completed.",
    answerOptions: ["Very easy", "Easy", "Medium", "Hard", "Very hard"],
  },

};

const questionnaire_class_1 = {
  text: "Please indicate how difficult it was to choose a lottery in the experiment round you just completed.",
  answerOptions: ["Very easy", "Easy", "Medium", "Hard", "Very hard"],
}

const quiz_questions = {
  quiz1: {
    heading: "Comprehension check 1/4",
    question: "Imagine that you choose the <strong>lottery on the left</strong> in the example shown in the image below. "+
              "Imagine as well that this lottery is drawn from your <i>bag of selected lotteries</i> "+
              "at the end of the experiment. "+
              "If you play the lottery, what is the probability of earning Ghentian dollars? "+
              "And how many Ghentian dollars could you potentially earn?",
    paragraph: "<strong>If you are not sure about the answer, "+
              "you can read the instructions again by clicking on <i>Back</i> "+
              "and return to this comprehension check afterwards.</strong>",
    answerOptions: ["I could earn 40 Ghentian dollars with a probability of 60%", 
                    "I could earn 60 Ghentian dollars with a probability of 40%", 
                    "I could earn 80 Ghentian dollars with a probability of 20%", 
                    "I could earn 20 Ghentian dollars with a probability of 80%"]
  },

  quiz2: {
    heading: "Comprehension check 2/4",
    question: "Imagine that you choose the <strong>lottery on the right</strong> in the example shown in the image below. "+
              "Imagine as well that this lottery is drawn from your <i>bag of selected lotteries</i> "+
              "at the end of the experiment. "+
              "If you play the lottery, what is the probability of getting 0 Ghentian dollars?",
    paragraph: "<strong>If you are not sure about the answer, "+
              "you can read the instructions again by clicking on <i>Back</i> "+
              "and return to this comprehension check afterwards.</strong>",
    answerOptions: ["60%", "70%", "30%", "40%"]
  },
  quiz3: {
    heading: "Comprehension check 3/4",
    question: "<strong>For a given round, if you have not selected a lottery before the deadline, then</strong>: ",
    paragraph: "<strong>If you are not sure about the answer, "+
              "you can read the instructions again by clicking on <i>Back</i> "+
              "and return to this comprehension check afterwards.</strong>",
    answerOptions: ["I will not be able to choose a lottery in that round, "+
                    "and an empty lottery will be added to my bag of selected lotteries. "+
                    "If that lottery is drawn from my bag at the end of the experiment, I will get zero Ghentian dollars from that lottery.", 
                    "I will not be able to choose a lottery in that round, but it will not affect my chances of earning a high performance bonus. ",
                    "I will not be able to choose a lottery in that round, but one of the two presented lotteries will be randomly added to my bag of selected lotteries. "
                  ]
  },

  quiz4: {
    heading: "Comprehension check 4/4",
    question: "<strong>What time duration should you reproduce after each round?</strong>",
    paragraph: "<strong>If you are not sure about the answer, "+
              "you can read the instructions again by clicking on <i>Back</i> "+
              "and return to this comprehension check afterwards.</strong>",
    answerOptions: ["Regardless of whether I miss the deadline or not, "+
                    "the amount of time it took me to choose a lottery in that round.",
                    "Regardless of whether I miss the deadline or not, "+
                    "the amount of time that the triangle was displayed. ",
                    "Regardless of whether I miss the deadline or not, "+
                    "the amount of time that the payoffs and probabilities were displayed. ",
                    "The amount of time that the triangle was displayed, "+
                    "unless I miss the deadline, in which case I do not need to reproduce the duration."]
  }
};

const explanations = {

  explanation1: {

    heading: "Instructions 1/6: The game",

    paragraph1: "In this experiment, you will play a simple game called <i>Ghent's game</i>, which consists of two tasks. ",

    paragraph2: "The first task is to earn as many <i>Ghentian dollars</i> ($) as possible. The second one will be explained later.",

    paragraph3: "To start each round, press the SPACE BAR on your keyboard. "+
                "You may start each round when you feel ready, but please do so within 1 minute. "+
                "You will be able to take longer breaks after each experiment block.",

    paragraph4: "Immediately after pressing SPACE BAR, a black triangle will appear in the center of the screen. "+
                "The triangle is related to the second task and will be explained later. "+
                 "At the same time, two peach-colored <i>lotteries</i> will appear on the sides as shown in the image below. ",

    paragraph5: "Each lottery shows a probability of winning a certain number of Ghentian dollars. "+
                "For example, in the image above, the left lottery gives you a 30% chance of winning 99$, and the right lottery gives you a 60% chance of winning 70$. "+
                "If you do not win, you receive 0$.",

    paragraph6: "To choose the lottery on the left, press the left arrow key (←). To choose the lottery on the right, press the right arrow key (→).",

    paragraph7: "Immediately after you choose a lottery, "+
                "the border of the selected lottery will briefly be highlighted in blue, and all numbers in both lotteries will disappear. "+
                "<strong>You may choose only one lottery per round.</strong>",

    paragraph8: "Both payoffs and probabilities will always be whole numbers ranging from 1 to 99."
 },

  explanation2: {
    heading: "Instructions 2/6: The performance bonus 💰",
    paragraph1: "When you select a lottery, you will not immediately play it "+
                "(you will not obtain Ghentian dollars as soon as you choose the lottery). "+
                "Instead, the lottery will be added to your <i>bag of selected lotteries</i>, "+
                "which at the end of the experiment, "+
                "will contain all the lotteries you selected throughout the experiment rounds.",
    paragraph2: "At the end of the experiment, "+
                "you will draw eight random lotteries from your bag of selected lotteries. "+
                "Next, you will play the eight lotteries, "+
                "and the total amount of Ghentian dollars that you collect from "+
                "these, will determine your performance bonus. Specifically, getting:",           

    point1: "200$-300$ correspond to a bonus of £1",
    point2: "300$-400$ correspond to a bonus of £2",
    point3: "400$-500$ correspond to a bonus of £3",
    point4: "More than 500$ correspond to a bonus of £4",
    
    paragraph3: "Note that <strong>choosing the best possible lottery in each round, " +
                "will increase your chances of earning a high performance bonus</strong> "+
                "at the end of the experiment, "+
                "when eight lotteries are drawn from your bag of selected lotteries. "
    
  },
  explanation3: {
    heading: "Instructions 3/6: The round deadline ⏰",
    paragraph1: "<strong>Each round has a deadline</strong>. Keep in mind that: ",
    point1: "Once the deadline is reached, the lotteries will disappear and you will no longer be able to make a choice. ",
    
    point2: "If you miss the deadline in a round, an <i>empty</i> lottery will be added to your bag of selected lotteries. ",

    point3: "As explained earlier, at the end of the experiment, eight lotteries will be drawn at random from your bag of selected lotteries to determine your performance bonus. "+
            "If one of the eight drawn lotteries is an empty one, you will earn <strong>zero Ghentian dollars from that lottery</strong>.",
    point4: "Note that, in all rounds, you will <strong>not</strong> be told when the deadline will occur, "+
            "and the deadline will change from round to round."
     
    },

  explanation4: {

    heading: "Instructions 4/6: The timing task ⏳",

    paragraph1: "As explained earlier, Ghent's game consists of two tasks. " +
                "The first task is to choose lotteries in order to earn as many <i>Ghentian dollars</i> as possible at the end of the experiment.",
    paragraph2: "The second task is to <strong>estimate how long the triangle was displayed and then reproduce that time duration</strong>.",

    paragraph3: "The triangle appears immediately after you press the <strong>SPACE BAR</strong>. It stays on the screen until the deadline for that round is reached, and then it disappears. "+
                "Therefore, the time duration for which the triangle is shown (the <i>triangle duration</i>) is the same as the round deadline.",

    paragraph4: "After the triangle disappears, there will be a short interval during which nothing is shown. "+
                "Then, a black circle will appear in the center of the screen, marking the start of the triangle-duration reproduction phase.",

    paragraph5: "<strong>When you think that the black circle has been displayed for the same amount of time as the triangle was displayed, press the SPACE BAR</strong>. "+
                "This marks the end of the reproduction.",

    paragraph6: "Your goal is to make your reproduced duration (shown in blue in the image above) as close as possible to the triangle duration (shown in orange).",

    paragraph7: "Please note the following:",

    point1: "<strong>Do not use any devices or clocks to track time. We are only interested in your subjective perception of time.</strong>",
    point2: "<strong>Avoid counting in your head or using rhythmic body movements to estimate or reproduce time durations.</strong>",
    point3: "<strong>The duration of the triangle, which is determined by the deadline of each round, will vary from round to round.</strong>"
},
  explanation5: {
    heading: "Instructions 5/6: Missing the deadline and the timing task",
    paragraph1: "If you do not choose a lottery before the deadline, this does <strong>not</strong> change the timing task. It only affects your chances of earning more <i>Ghentian dollars</i>.",
    paragraph2: "Whether or not you choose a lottery before the deadline, you should <strong>always reproduce the amount of time for which the triangle was displayed.</strong>"
  },
  explanation6: {
    heading: "Instructions 6/6: Number of rounds",
    paragraph1:"The study will be divided into <strong>3 blocks</strong>, "+
              "<strong>each consisting of 33 experimental rounds</strong>.",
    paragraph2:"After each block, you will have a rest of at least 2 minutes and up to 5 minutes "+
               "before the next block begins."
    
  },
  timing_instructions: {
  heading: "Remember to reproduce the correct duration!",
  text1: "Whether or not you choose a lottery before the deadline, you should <strong>always</strong> reproduce how long the triangle was displayed."
}
};

const instructions_completed = {
  
    heading: "Let's do some practice rounds!",
    paragraph1: "You have completed the first instruction phase sucessfully. "+
                "You will now play 6 practice rounds and complete the last comprehension check. "+
                "After that, you will be ready to start!",
    paragraph2: "Please note that the lotteries that you select in the practice rounds will not be "+
      "added to the <i>bag of selected lotteries</i>, "+
      "so the choices you make in these rounds will not affect your performance bonus."

}

var attention_check_list = [];

attention_check_list.push({
        paragraph: "The test you are about to take part in is very simple. "+
        "When asked which is Alice's favourite colour, you must select 'Orange'. This is an attention check.",
        question: "Based on the text you read above, which is Alice's favourite colour?",
        answerOptions: ["Purple", "Green", "Orange", "Yellow","Black"]
    });

attention_check_list.push({
        paragraph: "The test you are about to take part in is very simple. "+
        "When asked which drink does Bob have in his kitchen, you must select 'Wine'. This is an attention check.",
        question: "Based on the text you read above, which drink does Bob have in his kitchen?",
        answerOptions: ["Beer", "Coca Cola", "Apple juice", "Wine","Tequila"]
    });

const block_end_questions = {
    question1: {
    text: "Please estimate the duration of the block of experiment rounds that you just completed "+
          "(i.e. the last 32 experiment rounds, including the questionnaires). Type your answer in minutes.",
  },
  question2: {
    text: "Please indicate how confident you are of the above time estimation.",
    answerOptions: ["Very unsure", "Unsure", "Medium", "Confident", "Very confident"],
  },
  question3: {
    text: "Please indicate how bored or entertained you were while playing during the block that you just completed.",
    answerOptions: ["Very bored", "Bored", "Neutral", "Entertained", "Very entertained"],
  },
}

const final_questions = {
   
  question1: {
    text: "Please indicate how often did you count in your head to estimate time.",
    answerOptions: ["Never", "A couple of rounds", "Many rounds", "Most rounds"],
  },

  question2: {
    text: "Did you lose focus at some point during the experiment? "+
    "If so, please describe approximately when you lost focus (e.g., after completing the first block of experiment rounds). "+
    "Do not worry, your answer will not affect your compensation for participating in this study.",
  },

  question3: {
    text: "Please, indicate how difficult it was to understand the instructions.",
    answerOptions: ["Very easy", "Easy", "Medium", "Hard", "Very hard"]
  },

  question4: {
    text: "Feel free to give us any feedback! This question is not mandatory, you can leave it blank if you want.",
  }
};

const get_bonus = {
  heading: "🎰 Time to earn your bonus! 🎰",
  paragraph1: "Click on <i>SPIN</i> inside the golden box, "+
  "to draw eight random lotteries from the <i>bag of selected lotteries</i>. "+
  "The eight selected lotteries will appear on the green box below the golden one. "+ 
  "Click on the lotteries to play them and collect Ghentian dollars!"

}

const get_practice_bonus = {
  heading: " 🎰 Time to play the lotteries! 🎰",
  paragraph1: "Click on <i>SPIN</i> inside the golden box, "+
    "to draw two random lotteries from the <i>bag of selected lotteries</i>. ",
  paragraph2: "Since this is the practice phase, "+
    "you will only draw two random lotteries instead of eight "+
    "(which will be the case for the real experiment rounds). "+
    "The two lotteries will appear in the green box below. ",
  paragraph3: "Click on the selected lotteries below, to play them and collect Ghentian dollars! "+
    "Please note that <strong> the Ghentian dollars that you collect now, do not count "+
    "towards your performance bonus since this is the practice phase</strong>."
}

const bonus_feedback = {
  heading: "PERFORMANCE BONUS",
  paragraph1: "Click on <i>Next</i> to complete the final questionnaire. "+
    "After that you will receive the Completion Code!"
}

const intro = {

    text1: "You are about to participate in a study funded by <u>ChronoPilot</u>, "+
      "a European Union research project that aims to control the plasticity of human time perception.",
    text2: "If published, the results of this study will be found on ChronoPilot's website. "+
    "We encourage you to visit it in a future! 😊",
    text3: "Before starting, you will read instructions and complete a couple of practice rounds, "+
      "so get ready and click on <i>Continue</i>!"
}


const experiment_setup = {

    text1: "Please, make sure that you complete the experiment in a single sitting, alone and in a quiet room. ",
    text2: "You should remain in full-screen mode during the entire experiment and do not switch screens. ",
    text3: "Remember that, unless you are on a break or in the instruction phase, "+ 
           "if you are inactive for more than 5 minutes, you will be automatically redirected to Prolific’s platform and asked to return your submission."
}

