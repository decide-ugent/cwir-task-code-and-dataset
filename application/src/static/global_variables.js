



var participantID;
var studyID;
var sessionID;

let timeToAnswerQuestion1;
let timeToAnswerQuestion2;
let timeToAnswerQuestion3;
let firstTimeToAnswerQuestion1;
let attemptsAnswerQuestion1;
let timeToAnswerQuestionnaire;

//------------ Set Experiment Metadata ------------//
var questionnaireClass = 1;
// 0 : No questionnaire
// 1 : Only one question of subjective difficulty

var testingMode = false;

var testingExperimentRounds = 12;

var timePerceptionMeasureMethod = 'ReproTaskMethod1';
// ReproTaskMethod1: Reproduction task with computer stimulus onset

var presentationOrder = 'Block';
// 'Random': random presentation order of gambles
// 'Block': presentation order of gambles is blocked by deadline (gamble with same deadline are presented together)

var fullScreenCheckingON = true;
// If true, the experiment checks if the participant exits full screen mode during the experiment and shows a warning message. 
// If false, no checks are made and no warning message is shown.


var totalBlocks = 3

var maxDeadline = 10; // in seconds, used for loading gambles. The actual deadline is specified in the gambles csv file and can differ from gamble to gamble.

//--------Initialize Questionnaire variables --------//
if (questionnaireClass === 1) {
    var timeToAnswerSubjDiff; 
    var timeToAnswerQuestionnaireClass1;
    var answerSubjDiff;
}

//--------Set URL path----------//
urlPath = '/cognitive_load/cwir-task/'

//------Initialize Reproduction Task variables ------//
if (timePerceptionMeasureMethod === 'ReproTaskMethod1') {
    var reproducedTime = 0;
    var reproducedTimeDone = false;
    var reproductionStartTime;
    var preReproTaskInterval;
    var preReproTaskIntervalPractice;
    var randomInterval;
    var reproTaskOn = false;
}

//------Initialize experiment round variables----//
let roundDeadline;
let practiceRoundDeadline;
let missedDeadline = false;
let fullScreenExitedWhileInRound = false;
let messageSwitchedWindowClicked = false;
let switchWindowMessageShown = false;

//Variables for block end questionnaire
let timeToAnswerBlockEndQuestion1;
let timeToAnswerBlockEndQuestion2;
let timeToAnswerBlockEndQuestion3;
let attemptsAnswerBlockEndQuestion1;
let firstTimeToAnswerBlockEndQuestion1;
var blockEndAnswer1 = 0;
var blockEndAnswer2 = 0;
var blockEndAnswer3 = 0;
var totalTimeBlock = 0;


// Variables related to instruction phase
let visitsConsentForm = 1;
let visitsInstruction1 = 0;
let visitsInstruction2 = 0;
let visitsInstruction3 = 0;
let visitsInstruction4 = 0;
let visitsInstruction5 = 0;
let visitsInstruction6 = 0;

let timerInstruction1;
let timerInstruction2;
let timerInstruction3;
let timerInstruction4;
let timerInstruction5;
let timerInstruction6;

let instruction1_visited = false;
let instruction2_visited = false;
let instruction3_visited = false;
let instruction4_visited = false;
let instruction5_visited = false;
let instruction6_visited = false;
let timing_instruction_visited = false;

let completionTimeConsentForm;
let completionTimeIntroduction;
let completionTimeInstruction1;
let completionTimeInstruction2;
let completionTimeInstruction3;
let completionTimeComprehensionCheck1;
let completionTimeComprehensionCheck2;
let completionTimeComprehensionCheck3;
let completionTimeComprehensionCheck4;
var attemptsLeftQuiz1 = 3
var attemptsLeftQuiz2 = 3
var attemptsLeftQuiz3 = 3
var attemptsLeftQuiz4 = 3
let completionTimeInstruction4;
let completionTimeInstruction5;
let completionTimeInstruction6;
let completionTimeTimingInstructions;
let completionTimeInstructionsCompleted;
let completionTimeAllInstructions;



let fullscreenMessageShown = false; 
let fullscreenCheckIntervalId = null;
let fullscreenCheckEventsAttached = false;
let fullscreenRetryKeyHandler = null;
let practiceLotteriesDrawn = false;
let practiceLotteriesClicked = false;
let lotteriesDrawn = false;
let roundStarted = false;
let missedDeadlineMessageShown = false;
let timeLimitMessageShown = false;
let timeLimitQuestionnaireMessageShown = false;
let minRestHappened = false;
let breakHappened = false;
let attentionCheckHappened = false;
let timingQuizCompleted = false;
var lotteriesClicked = 0;


let questionStartTime;
let startTimeStudy;
let startTimeBlock;
let startTimeStrategyQ;
let startTimeRest;
let timeFullScreenMessageAppeared;
let breakTimeDuration;
let breakTime;
let roundStartTime;
let choice;
let timePickGamble;
let outcome;
let totalRounds;
let totalPracticeRounds;
let experimentBlockSizes;
let choiceMade;
let spaceBarPresses;
var secondTimeLimitID;
let noDecisionWarning;
let timeLimitAfterWarning;
let timeLimitQuestionnaireAfterWarning;
let deadlineTimer;
let restTimeWarningDeadline;
let timingInactivityWarning;
let bigContainer;
let optionButtonRight;
let optionButtonLeft;
let startButton;
let nextBlockButton;
let rectLeftOptionTopYCoord; 
let rectLeftOptionBottomYCoord; 
let rectRightOptionLeftXCoord; 
let rectRightOptionRightXCoord; 
let rectRightOptionTopYCoord; 
let rectRightOptionBottomYCoord;
let rectStartButtonLeftXCoord; 
let rectStartButtonRightXCoord; 
let rectStartButtonTopYCoord; 
let rectStartButtonBottomYCoord; 
let bigRectTopYCoord; 
let bigRectBottomYCoord; 
let bigRectLeftXCoord; 
let bigRectRightXCoord; 

var totalEarned = 0;
var practiceTotalEarned = 0;
var maxDeadline = 0;
var roundNumber = 1;
var practiceRound = 1;
var incorrect = 0
var attempts = 0
var counter = 0
//var counterBlock = 1
var reelsLeft = 4
var practiceReelsLeft = 2
//var break_happened = 0
var blockNumber = 1
var answer1 = 0
var answer2 = 0
var answer3 = 0
var full_screen_exited = 0

var rest = 2000;
var minTimeVisit = 3000;
var timeShowOutcome = 3000
const typingTimeoutDelay = 1000;
const missed_deadline_warning_time = 5000;
var start_deadline = 60;
var deciding_deadline = 60;
var timing_inactivity_deadline = 300; 
var no_activity_after_warning_deadline = 60;
var no_activity_after_questionnaire_warning_deadline = 60;
var answerQuestionnaireDeadline = 300;

var gamblesPercentages = []; 
var gamblesValues = []
var gamblesDeadlines = []
let gamblesPresentationOrder;
var lotteriesChosen = []
var lotteriesChosenMissedDeadline = []
    
var practice_lotteries_chosen = []
var practice_lotteries_chosen_missed_deadline = []
var secondaryChoices = []
var secondaryChoicesTimes = []

var practiceGamblesPercentages = []
var practiceGamblesValues = []
var practiceGamblesDeadlines = []

var lotteriesPresentationOrder = [];

let rounds_starting_block;

var attention_checks = [];
var attention_check_info = [];


// Initialize data dictionaries 
var metaDataArray = {};
var dataPractice = {};
var dataPracticeMouseTracking = {};
var dataMouseTracking = {};
var dataExperiment = {};
var dataBlockEndQ = {};
var dataInstructionsCompletionTimes = {};

