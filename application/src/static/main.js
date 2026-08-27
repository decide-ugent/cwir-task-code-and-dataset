//Obtaine participant, session and study ID from prolific

if (testingMode) {
    participantID = Math.floor(Math.random() * 900) + 100;
    studyID = Math.floor(Math.random() * 900) + 100;
    sessionID = Math.floor(Math.random() * 900) + 100;

} else {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    participantID = urlParams.get('PROLIFIC_PID')
    studyID = urlParams.get('STUDY_ID') 
    sessionID = urlParams.get('SESSION_ID')

}



loadGambles()

showConsentForm()








    

