#!/var/www/cognitive_load/risky_dm/src/ven

from flask import Flask, jsonify, request, render_template
from flask_sqlalchemy import SQLAlchemy 
from sqlalchemy.dialects.mysql import LONGTEXT


app = Flask(__name__)


# Define your MySQL database connection URL

db_url = 'sqlite:///local.db'


app.config['SQLALCHEMY_DATABASE_URI'] = db_url
db = SQLAlchemy(app)

class experimentMetaData(db.Model):
    __tablename__ = 'experimentMetaData'
    StudyID = db.Column(db.String(255))
    SessionID = db.Column(db.String(255))
    ParticipantID = db.Column(db.String(255), primary_key=True)
    TimePerceptionMeasureMethod = db.Column(db.String(255))
    QuestionnaireClass = db.Column(db.String(255))
    NumberOfRounds = db.Column(db.String(255))
    DeadlinePresentationOrder = db.Column(db.String(255))
    NumberOfRoundsPerBlock = db.Column(db.String(255))
    Lot0Probabilities = db.Column(db.Text)
    Lot1Probabilities = db.Column(db.Text)
    Lot0Values = db.Column(db.Text)
    Lot1Values = db.Column(db.Text)
    ObjectiveTimeIntervals = db.Column(db.Text)

class experimentReproTaskMethod1Quest1Answers(db.Model):
    __tablename__ = 'experimentReproTaskMethod1Quest1Answers'
    StudyID = db.Column(db.String(255))
    SessionID = db.Column(db.String(255))
    ExperimentRoundID = db.Column(db.String(255), primary_key=True)
    ParticipantID = db.Column(db.String(255))
    DeadlinePresentationOrder = db.Column(db.String(255))
    BlockNumber = db.Column(db.String(255))
    ExperimentRoundNumber = db.Column(db.String(255))
    ExperimentGambleNumber = db.Column(db.String(255))
    LotteryLeft = db.Column(db.String(255))
    LotteryRight = db.Column(db.String(255))
    GambleChoice = db.Column(db.String(255))
    GambleResponseTime = db.Column(db.String(255))
    GambleSecondaryChoices = db.Column(db.Text)
    GambleSecondaryChoicesTimes = db.Column(db.Text)
    GambleDeadline = db.Column(db.String(255))
    MissedDeadline = db.Column(db.String(255))
    FullScreenExited = db.Column(db.String(255))
    ReproducedTime = db.Column(db.String(255))
    SubjectiveDifficulty = db.Column(db.String(255))
    ResponseTimeSubjectiveDifficulty = db.Column(db.String(255))
    ResponseTimeSubmitAnswersQuestionnaire = db.Column(db.String(255))

class practiceReproTaskMethod1Quest1Answers(db.Model):
    __tablename__ = 'practiceReproTaskMethod1Quest1Answers'
    StudyID = db.Column(db.String(255))
    SessionID = db.Column(db.String(255))
    PracticeRoundID = db.Column(db.String(255), primary_key=True)
    ParticipantID = db.Column(db.String(255))
    PracticeGambleNumber = db.Column(db.String(255))
    GambleChoice = db.Column(db.String(255))
    GambleResponseTime = db.Column(db.String(255))
    GambleSecondaryChoices = db.Column(db.Text)
    GambleSecondaryChoicesTimes = db.Column(db.Text)
    GambleDeadline = db.Column(db.String(255))
    MissedDeadline = db.Column(db.String(255))
    FullScreenExited = db.Column(db.String(255))
    ReproducedTime = db.Column(db.String(255))
    SubjectiveDifficulty = db.Column(db.String(255))
    ResponseTimeSubjectiveDifficulty = db.Column(db.String(255))
    ResponseTimeSubmitAnswersQuestionnaire = db.Column(db.String(255))

class blockEndQuestionnaireAnswers(db.Model):
    __tablename__ = 'blockEndQuestionnaireAnswers'
    StudyID = db.Column(db.String(255))
    SessionID = db.Column(db.String(255))
    ParticipantID = db.Column(db.String(255))
    ParticipantID_BlockNumber = db.Column(db.String(255), primary_key=True)
    BlockNumber = db.Column(db.String(255))
    SubjectiveBlockTotalTime = db.Column(db.String(255))
    ResponseTimeSubjectiveBlockTotalTime = db.Column(db.String(255))
    ResponseTimeFirstAttemptSubjectiveBlockTotalTime = db.Column(db.String(255))
    AttemptsAnswerSubjectiveBlockTotalTime = db.Column(db.String(255))
    ConfidenceSubjectiveBlockTotalTime = db.Column(db.String(255))
    ResponseTimeConfidenceSubjectiveBlockTotalTime = db.Column(db.String(255))
    LevelBoredom = db.Column(db.String(255))
    ResponseTimeLevelBoredom = db.Column(db.String(255))
    TotalObjectiveBlockTime = db.Column(db.String(255))

class finalQuestionnaireAnswers(db.Model):
    __tablename__ = 'finalQuestionnaireAnswers'
    StudyID = db.Column(db.String(255))
    SessionID = db.Column(db.String(255))
    ParticipantID = db.Column(db.String(255), primary_key=True)
    CountingFrequency = db.Column(db.String(255))
    ResponseTimeCountingFrequency = db.Column(db.String(255))
    FocusLoss = db.Column(db.Text)
    InstructionsComprehension = db.Column(db.String(255))
    Feedback = db.Column(db.Text)
    FirstAttentionCheckRoundNumber = db.Column(db.String(255))
    SecondAttentionCheckRoundNumber = db.Column(db.String(255))
    FirstAttentionCheckAnswer = db.Column(db.String(255))
    SecondAttentionCheckAnswer = db.Column(db.String(255))
    TotalObjectiveStudyTime = db.Column(db.String(255))
    TotalEarned = db.Column(db.String(255))

class instructionsCompletionTimes(db.Model):
    __tablename__ = 'instructionsCompletionTimes'
    StudyID = db.Column(db.String(255))
    SessionID = db.Column(db.String(255))
    ParticipantID = db.Column(db.String(255), primary_key=True)
    CompletionTimeConsentForm = db.Column(db.String(255))
    CompletionTimeIntroduction = db.Column(db.String(255))
    CompletionTimeInstruction1 = db.Column(db.String(255))
    CompletionTimeInstruction2 = db.Column(db.String(255))
    CompletionTimeInstruction3 = db.Column(db.String(255))
    CompletionTimeInstruction4 = db.Column(db.String(255))
    CompletionTimeInstruction5 = db.Column(db.String(255))
    CompletionTimeInstruction6 = db.Column(db.String(255))
    CompletionTimeInstructionsCompleted = db.Column(db.String(255))
    CompletionTimeTimingInstructions = db.Column(db.String(255))
    CompletionTimeAllInstructions = db.Column(db.String(255))
    CompletionTimeComprehensionCheck1 = db.Column(db.String(255))
    CompletionTimeComprehensionCheck2 = db.Column(db.String(255))
    CompletionTimeComprehensionCheck3 = db.Column(db.String(255))
    CompletionTimeComprehensionCheck4 = db.Column(db.String(255))
    AttemptsLeftComprehensionCheck1 = db.Column(db.String(255))
    AttemptsLeftComprehensionCheck2 = db.Column(db.String(255))
    AttemptsLeftComprehensionCheck3 = db.Column(db.String(255))
    AttemptsLeftComprehensionCheck4 = db.Column(db.String(255))
    VisitsConsentForm = db.Column(db.String(255))
    VisitsInstruction1 = db.Column(db.String(255))
    VisitsInstruction2 = db.Column(db.String(255))
    VisitsInstruction3 = db.Column(db.String(255))
    VisitsInstruction4 = db.Column(db.String(255))
    VisitsInstruction5 = db.Column(db.String(255))
    VisitsInstruction6 = db.Column(db.String(255))

class fullScreenMessages(db.Model):
    __tablename__ = 'fullScreenMessages'
    StudyID = db.Column(db.String(255))
    SessionID = db.Column(db.String(255))
    ParticipantID = db.Column(db.String(255))
    ParticipantID_timestamp = db.Column(db.String(255), primary_key=True)
    TimeFullScreenMessageAppeared = db.Column(db.String(255))
    ExperimentRoundNumber = db.Column(db.String(255))
    WhileInRound = db.Column(db.String(255))

class breaksData(db.Model):
    __tablename__ = 'breaksData'
    StudyID = db.Column(db.String(255))
    SessionID = db.Column(db.String(255))
    ParticipantID = db.Column(db.String(255))
    ParticipantID_BlockNumber = db.Column(db.String(255), primary_key=True)
    BlockNumber = db.Column(db.String(255))
    BreakTimeDuration = db.Column(db.String(255))
    BreakTime = db.Column(db.String(255))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/save-experiment-metadata', methods=['POST'])
def save_experiment_metadata():
    try:
        data = request.get_json()

        experimentMetaData_array = experimentMetaData(
            StudyID = data['StudyID'],
		    SessionID = data['SessionID'],
            ParticipantID = data['ParticipantID'],
		    TimePerceptionMeasureMethod = data['TimePerceptionMeasureMethod'],
            QuestionnaireClass = data['QuestionnaireClass'],
            NumberOfRounds = data['NumberOfRounds'],
            DeadlinePresentationOrder = data['DeadlinePresentationOrder'],
            NumberOfRoundsPerBlock = data['NumberOfRoundsPerBlock'],
            Lot0Probabilities = data['Lot0Probabilities'],
            Lot1Probabilities = data['Lot1Probabilities'],
            Lot0Values = data['Lot0Values'],
            Lot1Values = data['Lot1Values'],
            ObjectiveTimeIntervals = data['ObjectiveTimeIntervals'] 
	    )
	
        db.session.add(experimentMetaData_array)

        db.session.commit()
        return jsonify({"message": "Experiment Metadata inserted successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/save-experimentdata-reprotaskmethod1-quest1', methods=['POST'])
def save_experiment_question():
    try:
        data = request.get_json()

        experimentRoundsAnswers_data = experimentReproTaskMethod1Quest1Answers(
		    StudyID = data['StudyID'],
            SessionID = data['SessionID'],
            ExperimentRoundID=f"{data['ParticipantID']}_{data['ExperimentGambleNumber']}_experiment",
            ParticipantID = data['ParticipantID'],
            DeadlinePresentationOrder = data['DeadlinePresentationOrder'],
            BlockNumber = data['BlockNumber'],
            ExperimentRoundNumber = data['ExperimentRoundNumber'],
            ExperimentGambleNumber = data['ExperimentGambleNumber'],
            LotteryLeft = data['LotteryLeft'],
            LotteryRight = data['LotteryRight'],
            GambleChoice = data.get('GambleChoice', 'None'),
            GambleResponseTime = data['GambleResponseTime'],
            GambleSecondaryChoices = data['GambleSecondaryChoices'],
            GambleSecondaryChoicesTimes = data['GambleSecondaryChoicesTimes'],
            GambleDeadline = data['GambleDeadline'],
            MissedDeadline = data['MissedDeadline'],
            FullScreenExited = data['FullScreenExited'],
            ReproducedTime = data['ReproducedTime'],
            SubjectiveDifficulty = data['SubjectiveDifficulty'],
            ResponseTimeSubjectiveDifficulty = data['ResponseTimeSubjectiveDifficulty'],
            ResponseTimeSubmitAnswersQuestionnaire = data['ResponseTimeSubmitAnswersQuestionnaire']
        )
        db.session.add(experimentRoundsAnswers_data)

        db.session.commit()
        return jsonify({"message": "Data inserted successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/save-practicedata-reprotaskmethod1-quest1', methods=['POST'])
def save_practice_question():
    try:
        data = request.get_json()

        practiceRoundsAnswers_data = practiceReproTaskMethod1Quest1Answers(
		    StudyID = data['StudyID'],
            SessionID = data['SessionID'],
            PracticeRoundID=f"{data['ParticipantID']}_{data['PracticeGambleNumber']}_practice",
            ParticipantID = data['ParticipantID'],
            PracticeGambleNumber = data['PracticeGambleNumber'],
            GambleChoice = data['GambleChoice'],
            GambleResponseTime = data['GambleResponseTime'],
            GambleSecondaryChoices = data['GambleSecondaryChoices'],
            GambleSecondaryChoicesTimes = data['GambleSecondaryChoicesTimes'],
            GambleDeadline = data['GambleDeadline'],
            MissedDeadline = data['MissedDeadline'],
            FullScreenExited = data['FullScreenExited'],
            ReproducedTime = data['ReproducedTime'],
            SubjectiveDifficulty = data['SubjectiveDifficulty'],
            ResponseTimeSubjectiveDifficulty = data['ResponseTimeSubjectiveDifficulty'],
            ResponseTimeSubmitAnswersQuestionnaire = data['ResponseTimeSubmitAnswersQuestionnaire']
        )
        db.session.add(practiceRoundsAnswers_data)

        db.session.commit()
        return jsonify({"message": "Practice data inserted successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/save-block-end-questionnaire', methods=['POST'])
def save_block_end_questionnaire():
    data = request.get_json()

    blockEndQuestionnaireAnswers_data = blockEndQuestionnaireAnswers(
        StudyID = data['StudyID'],
        SessionID = data['SessionID'],
        ParticipantID= data['ParticipantID'],
        ParticipantID_BlockNumber = f"{data['ParticipantID']}_{data['BlockNumber']}",
        BlockNumber = data['BlockNumber'],
        SubjectiveBlockTotalTime = data['BlockEndAnswer1'], 
        ResponseTimeSubjectiveBlockTotalTime = data['TimeToAnswerBlockEndQ1'], 
        ResponseTimeFirstAttemptSubjectiveBlockTotalTime = data['FirstTimeToAnswerBlockEndQ1'], 
        AttemptsAnswerSubjectiveBlockTotalTime = data['AttemptsSubjectiveBlockTime'],
        ConfidenceSubjectiveBlockTotalTime = data['BlockEndAnswer2'],
        ResponseTimeConfidenceSubjectiveBlockTotalTime = data['TimeToAnswerBlockEndQ2'], 
        LevelBoredom = data['BlockEndAnswer3'],
        ResponseTimeLevelBoredom = data['TimeToAnswerBlockEndQ3'],
        TotalObjectiveBlockTime = data['TotalTimeBlock']
    )

    db.session.add(blockEndQuestionnaireAnswers_data)

    db.session.commit()
    return jsonify({"message": "Data inserted successfully"}), 201

@app.route('/save-instructions-completion-times', methods=['POST'])
def save_instructions_completion_times():
    data = request.get_json()

    instructionsCompletionTimes_data = instructionsCompletionTimes(
        StudyID = data['StudyID'], 
        SessionID = data['SessionID'],
        ParticipantID = data['ParticipantID'],
        CompletionTimeConsentForm = data['CompletionTimeConsentForm'],
        CompletionTimeIntroduction = data['CompletionTimeIntroduction'],
        CompletionTimeInstruction1 = data['CompletionTimeInstruction1'],
        CompletionTimeInstruction2 = data['CompletionTimeInstruction2'],
        CompletionTimeInstruction3 = data['CompletionTimeInstruction3'],
        CompletionTimeInstruction4 = data['CompletionTimeInstruction4'],
        CompletionTimeInstruction5 = data['CompletionTimeInstruction5'],
        CompletionTimeInstruction6 = data['CompletionTimeInstruction6'],
        CompletionTimeInstructionsCompleted = data['CompletionTimeInstructionsCompleted'],
        CompletionTimeTimingInstructions = data['CompletionTimeTimingInstructions'],
        CompletionTimeAllInstructions = data['CompletionTimeAllInstructions'],
        CompletionTimeComprehensionCheck1 = data['CompletionTimeComprehensionCheck1'],
        CompletionTimeComprehensionCheck2 = data['CompletionTimeComprehensionCheck2'],
        CompletionTimeComprehensionCheck3 = data['CompletionTimeComprehensionCheck3'],
        CompletionTimeComprehensionCheck4 = data['CompletionTimeComprehensionCheck4'],
        AttemptsLeftComprehensionCheck1 = data['AttemptsLeftComprehensionCheck1'],
        AttemptsLeftComprehensionCheck2 = data['AttemptsLeftComprehensionCheck2'],
        AttemptsLeftComprehensionCheck3 = data['AttemptsLeftComprehensionCheck3'],
        AttemptsLeftComprehensionCheck4 = data['AttemptsLeftComprehensionCheck4'],
        VisitsConsentForm = data['VisitsConsentForm'],
        VisitsInstruction1 = data['VisitsInstruction1'],
        VisitsInstruction2 = data['VisitsInstruction2'],
        VisitsInstruction3 = data['VisitsInstruction3'],
        VisitsInstruction4 = data['VisitsInstruction4'],
        VisitsInstruction5 = data['VisitsInstruction5'],
        VisitsInstruction6 = data['VisitsInstruction6']
    )
    db.session.add(instructionsCompletionTimes_data)

    db.session.commit()
    return jsonify({"message": "Data inserted successfully"}), 201

@app.route('/save-final-questionnaire', methods=['POST'])
def save_final_questionnaire():
    try:
        data = request.get_json()

        finalQuestionnaireAnswers_data = finalQuestionnaireAnswers(
	        StudyID = data.get('Study_id'),
	        SessionID = data.get('Session_id'),
	        ParticipantID= data.get('Participant_id'),
            CountingFrequency = data.get('CountingFrequency'),
            ResponseTimeCountingFrequency = data.get('ResponseTimeCountingFrequency'),
            FocusLoss = data.get('FocusLoss'),
            InstructionsComprehension = data.get('InstructionsComprehension'),
            Feedback = data.get('Feedback'),
            FirstAttentionCheckRoundNumber = data.get('FirstRoundAttentionCheck'),
            SecondAttentionCheckRoundNumber = data.get('SecondRoundAttentionCheck'),
    	    FirstAttentionCheckAnswer = data.get('First_attention_check_answer'),
    	    SecondAttentionCheckAnswer = data.get('Second_attention_check_answer'),
    	    TotalObjectiveStudyTime = data.get('TotalStudyTime'),
            TotalEarned = data.get('TotalEarned')
        )
        db.session.add(finalQuestionnaireAnswers_data)

        db.session.commit()
        return jsonify({"message": "Final questionnaire data sent successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/save-full-screen-message', methods=['POST'])
def save_full_screen_messages():
    data = request.get_json()

    fullScreenMessages_data = fullScreenMessages(
        StudyID = data['study_id'],
        SessionID = data['session_id'],
        ParticipantID= data['participant_id'],
        ParticipantID_timestamp = f"{data['participant_id']}_{data['timeFullScreenMessageAppeared']}",
        TimeFullScreenMessageAppeared = data['timeFullScreenMessageAppeared'],
        ExperimentRoundNumber = data['experimentRoundNumber'],
        WhileInRound = data['whileInRound'],
    )
    db.session.add(fullScreenMessages_data)

    db.session.commit()
    return jsonify({"message": "Data inserted successfully"}), 201

@app.route('/save-break-data', methods=['POST'])
def save_break_data():
    data = request.get_json()

    breaksData_data = breaksData(
        StudyID = data['study_id'],
        SessionID = data['session_id'],
        ParticipantID= data['participant_id'],
        ParticipantID_BlockNumber = f"{data['participant_id']}_{data['blockNumber']}",
        BlockNumber = data['blockNumber'],
        BreakTimeDuration = data['breakTimeDuration'],
        BreakTime = data['breakTime']
    )
    db.session.add(breaksData_data)

    db.session.commit()
    return jsonify({"message": "Data inserted successfully"}), 201

if __name__ == '__main__':
    app.run(debug=True)
