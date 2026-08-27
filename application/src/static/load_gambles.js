/**
 * This script is used to load gamble data from CSV files and process them.
 */


function loadGambles() {
    /**
    * Function to load the gambles from gambles folder
    */

    //Get practice gambles
    fetch('static/gambles/practice_gambles.csv')
        .then(response => response.text())
        .then(csvData => {
            Papa.parse(csvData, {
                header: true,
                dynamicTyping: true,
                complete: processPracticeGambles
            });
        })
        .catch(error => {
            console.error('Error loading practice gambles:', error);
        });

    //Get gambles
    fetch('static/gambles/gambles.csv')
        .then(response => response.text())
        .then(csvData => {
            Papa.parse(csvData, {
                header: true,
                dynamicTyping: true,
                complete: processGambles
            });
        })
        .catch(error => {
            console.error('Error loading gambles:', error);
        });

}


function processGambles(results) {
    var data = results.data;
    const allGambles = [];

    // Iterate over each row of the CSV data
    data.forEach(function(row) {
        if (row["Deadline"] === null || row["Deadline"] === undefined || row["Deadline"] === "") {
            return;
        }

        allGambles.push({
            values: [row["lot_0_val"], row["lot_1_val"]],
            percentages: [row["lot_0_prob"], row["lot_1_prob"]],
            deadline: row["Deadline"]
        });
    });

    let selectedGambles = allGambles.slice();

    if (testingMode && presentationOrder === 'Block') {
        const deadlineGroups = {};

        selectedGambles.forEach(function(gamble, index) {
            if (!deadlineGroups[gamble.deadline]) {
                deadlineGroups[gamble.deadline] = [];
            }

            deadlineGroups[gamble.deadline].push(index);
        });

        const deadlineKeys = Object.keys(deadlineGroups);
        const roundsPerDeadline = testingExperimentRounds / deadlineKeys.length;

        if (!Number.isInteger(roundsPerDeadline)) {
            console.error("testingExperimentRounds must be divisible by the number of deadlines in Block mode");
            return;
        }

        const sampledIndices = [];

        deadlineKeys.forEach(function(deadline) {
            const shuffledIndices = shuffle(deadlineGroups[deadline].slice());

            if (shuffledIndices.length < roundsPerDeadline) {
                console.error("Not enough trials for deadline", deadline, "to sample", roundsPerDeadline, "rounds in testing mode");
                return;
            }

            sampledIndices.push.apply(sampledIndices, shuffledIndices.slice(0, roundsPerDeadline));
        });

        selectedGambles = sampledIndices.map(function(index) {
            return allGambles[index];
        });

    } else if (testingMode) {
        selectedGambles = selectedGambles.slice(0, Math.min(testingExperimentRounds, selectedGambles.length));
    }

    gamblesValues = [];
    gamblesPercentages = [];
    gamblesDeadlines = [];

    selectedGambles.forEach(function(gamble) {
        gamblesValues.push(gamble.values);
        gamblesPercentages.push(gamble.percentages);
        gamblesDeadlines.push(gamble.deadline);
    });

    totalRounds = gamblesDeadlines.length;

    preReproTaskInterval = generateRandomNumbers(totalRounds, min = 0.6, max = 1)

    // -----------------------------
    // Generate gamble presentation order
    // -----------------------------
    if (presentationOrder === 'Random') {
        experimentBlockSizes = getExperimentBlockSizes(totalRounds, totalBlocks);

        const order = [];
        for (let i = 0; i < totalRounds; i++) {
            order.push(i);
        }
        gamblesPresentationOrder = shuffle(order);

    } else if (presentationOrder === 'Block') {
        // 1) group gamble indices by deadline
        const deadlineGroups = {};

        for (let i = 0; i < totalRounds; i++) {
            const deadline = gamblesDeadlines[i];

            if (!deadlineGroups[deadline]) {
                deadlineGroups[deadline] = [];
            }

            deadlineGroups[deadline].push(i);
        }

        // 2) randomize order of deadline blocks
        let deadlineOrder = Object.keys(deadlineGroups);
        deadlineOrder = shuffle(deadlineOrder);

        // 3) randomize within each deadline block, then concatenate
        gamblesPresentationOrder = [];

        deadlineOrder.forEach(function(deadline) {
            const shuffledBlock = shuffle(deadlineGroups[deadline]);
            gamblesPresentationOrder = gamblesPresentationOrder.concat(shuffledBlock);
        });

        // In blocked presentation, each experimental block matches one deadline group.
        experimentBlockSizes = deadlineOrder.map(function(deadline) {
            return deadlineGroups[deadline].length;
        });

        //console.log("Randomized deadline block order:", deadlineOrder);
        //console.log("Experiment block sizes from deadline groups:", experimentBlockSizes);

    } else {
        console.error("presentationOrder must be 'random' or 'Block'");
        return;
    }


    for (let i = 0; i < totalRounds; i++) {
        const row = Math.random() < 0.5 ? [0, 1] : [1, 0];
        const roundDict = {
            Left: row[0],
            Right: row[1]
        };
        lotteriesPresentationOrder.push(roundDict);
    }

    // Determine the starting block rounds and when attention checks will happen

    rounds_starting_block = getBlockStartRounds(experimentBlockSizes);
    attention_checks = [];
    attention_check_info = [];
    const blockRanges = [];
    let currentBlockStart = 1;

    experimentBlockSizes.forEach(function(blockSize) {
        const currentBlockEnd = currentBlockStart + blockSize - 1;
        blockRanges.push({
            start: currentBlockStart,
            end: currentBlockEnd
        });
        currentBlockStart = currentBlockEnd + 1;
    });

    const candidateAttentionBlocks = blockRanges.slice(1);
    const selectedAttentionBlocks = getRandomElementsFromArray(
        candidateAttentionBlocks,
        Math.min(2, candidateAttentionBlocks.length)
    ).sort(function(a, b) {
        return a.start - b.start;
    });

    selectedAttentionBlocks.forEach(function(blockRange) {
        const minRound = blockRange.end > blockRange.start ? blockRange.start + 1 : blockRange.start;
        const maxRoundExclusive = blockRange.end + 1;
        attention_checks.push(generateRandom(minRound, maxRoundExclusive));
    });

    attention_check_info.push.apply(attention_check_info, attention_checks);

    //console.log("Total number of rounds",totalRounds)
    //console.log("Attention checks at :",attention_check_info)
    //console.log("The gamble presentation order is: ", gamblesPresentationOrder)
    //console.log("The lotteries presentation order is ", lotteriesPresentationOrder)
    //console.log("Gamble data downloaded and processed successfully");
}

 
function processPracticeGambles(array) {
    /**
    * Function to process practice gambles
    */

    var data = array.data;
    
    // Iterate over each row of the CSV array
    data.forEach(function(row) {
        if (row["Deadline"] === null || row["Deadline"] === undefined || row["Deadline"] === "") {
            return;
        }
       
        arrayValues = [row["lot_0_val"],
                        row["lot_1_val"]]
        
        practiceGamblesValues.push(arrayValues)

        arrayPercentages = [row["lot_0_prob"],
                             row["lot_1_prob"]]
        
        practiceGamblesPercentages.push(arrayPercentages)

        practiceGamblesDeadlines.push(row["Deadline"])


    });

    totalPracticeRounds = practiceGamblesDeadlines.length

    preReproTaskIntervalPractice = generateRandomNumbers(totalPracticeRounds, min = 0.6, max = 1)

    //console.log("preReproTaskIntervalPractice",preReproTaskIntervalPractice)
  
    console.log("Practice gambles downloaded and processed successfully");
}


