function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    while (currentIndex != 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}

function showMissedDeadlineWarning(practice) {

    var missedDeadlineWarningHeading = $('<h1 class = red-missed-deadline-warning-text>'+
        'You missed the deadline!</h1>');

    var missedDeadlineWarningButton = $('<button class="missed-deadline-button">')
        .text('Ok')
        .click(function() {

            missedDeadlineMessageShown = false;
            //Enable button again
            $('.submit-answers-button').prop('disabled', false); 
            $('#missedDeadlineWarningMessage').empty().hide();
        })

    if (practice) {

        var missedDeadlineText1 = $("<p class = missed-deadline-warning-text>"+
            "You were too slow deciding and you missed the deadline. " +
            "That means that if the lottery that you just chose is drawn from the " +
            "<i>bag of selected lotteries</i> at the end of the practice session, "+
            "you will only earn half of the lottery's resulting outcome.</p>")

        var missedDeadlineText2 = $("<p class = missed-deadline-warning-text>"+
            "But don't worry! Since this is the practice session, " +
            "all the points that you earn now, will not count towards your bonus. "+
            "Click on <i>Ok</i> to close this warning and to proceed.</p>")
     
    } else {

        var missedDeadlineText1 = $("<p class = missed-deadline-warning-text> "+
            "You were too slow deciding and you missed the deadline. " +
            "That means that if the lottery that you just chose is drawn from the "+
            "<i>bag of selected lotteries</i> at then end of the game, "+
            "you will only earn half of the lottery's resulting outcome.</p>")

        var missedDeadlineText2 = $("<p class = missed-deadline-warning-text>"+
            "Click on <i>Ok</i> to close this warning and to proceed.</p>")
    }

    missedDeadlineMessageShown = true;
    
    //Dissable buttons
    $('.submit-answers-button').prop('disabled', true); 

    $('#missedDeadlineWarningMessage')
        .empty()
        .append(missedDeadlineWarningHeading,
            missedDeadlineText1,
            missedDeadlineText2,
            missedDeadlineWarningButton)
        .show()
}

function getRandomElementsFromArray(arr, numElements) {
   
    const shuffledArray = arr.slice();
    let currentIndex = shuffledArray.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        temporaryValue = shuffledArray[currentIndex];
        shuffledArray[currentIndex] = shuffledArray[randomIndex];
        shuffledArray[randomIndex] = temporaryValue;
    }

    return shuffledArray.slice(0, numElements);
}

function generateRandom(min, max) {

    let difference = max - min;
    let rand = Math.random();
    rand = Math.floor( rand * difference);
    rand = rand + min;
    return rand;
}

function generateArrayFrom1ToN(N) {
    const resultArray = [];
    for (let i = 1; i <= N; i++) {
        resultArray.push(i);
    }
    return resultArray;
}

function generateNonContiguousNumbers(n, N) {
    if (n > N - 2) {
        throw new Error("n should be less than or equal to N - 2");
    }
    // Generate array [2, 3, ..., N-1]
    const allNumbers = Array.from({length: N - 2}, (_, index) => index + 2); 
    
    const result = [];
    
    while (result.length < n) {
        const randomIndex = Math.floor(Math.random() * allNumbers.length);
        const selectedNumber = allNumbers[randomIndex];
        
        if (
            !result.includes(selectedNumber) && // Check if already selected
            (result.length === 0 || Math.abs(selectedNumber - result[result.length - 1]) > 1) // Check for non-contiguity
        ) {
            result.push(selectedNumber);
        }
    }
    
    return result.sort((a, b) => a - b); // Sort the result in ascending order
}

function generateRandomNumbers(count, min = 0.25, max = 1) {
    let numbers = [];
    for (let i = 0; i < count; i++) {
      // Generate a random number between min and max
      let randomNumber = min + (max - min) * Math.random();
      numbers.push(randomNumber);
    }
    return numbers;
}

function getExperimentBlockSizes(roundCount = totalRounds, blockCount = totalBlocks) {
    if (!roundCount || !blockCount) {
        return [];
    }

    const baseRoundsPerBlock = Math.floor(roundCount / blockCount);
    const remainder = roundCount % blockCount;

    return Array.from({ length: blockCount }, function(_, index) {
        return baseRoundsPerBlock + (index < remainder ? 1 : 0);
    });
}

function getBlockStartRounds(blockSizes = experimentBlockSizes) {
    const starts = [];
    let completedRounds = 0;

    for (let i = 0; i < blockSizes.length - 1; i++) {
        completedRounds += blockSizes[i];
        starts.push(completedRounds + 1);
    }

    return starts;
}

function formatListWithAnd(items) {
    if (!items.length) {
        return '';
    }

    if (items.length === 1) {
        return items[0];
    }

    if (items.length === 2) {
        return items[0] + ' and ' + items[1];
    }

    return items.slice(0, -1).join(', ') + ', and ' + items[items.length - 1];
}

function getBlockRoundCount(blockIndex, blockSizes = experimentBlockSizes) {
    return blockSizes[blockIndex - 1] || 0;
}

function getInstructionBlockSummary() {
    if (!experimentBlockSizes || !experimentBlockSizes.length) {
        return '';
    }

    const blockLabel = totalBlocks === 1 ? 'block' : 'blocks';
    const allEqual = experimentBlockSizes.every(function(size) {
        return size === experimentBlockSizes[0];
    });

    if (allEqual) {
        const roundLabel = experimentBlockSizes[0] === 1 ? 'experimental round' : 'experimental rounds';
        return 'The study will be divided into <strong>' + totalBlocks + ' ' + blockLabel +
            '</strong>, <strong>each consisting of ' + experimentBlockSizes[0] + ' ' + roundLabel + '</strong>.';
    }

    const sizeLabels = experimentBlockSizes.map(function(size) {
        return size + ' experimental round' + (size === 1 ? '' : 's');
    });

    return 'The study will be divided into <strong>' + totalBlocks + ' ' + blockLabel +
        '</strong>, with blocks containing <strong>' + formatListWithAnd(sizeLabels) + '</strong>.';
}

function getRemainingBlocksSummary(nextBlockNumber) {
    if (!experimentBlockSizes || !experimentBlockSizes.length) {
        return '';
    }

    const remainingBlockSizes = experimentBlockSizes.slice(nextBlockNumber - 1);
    const remainingBlocks = remainingBlockSizes.length;
    const blockLabel = remainingBlocks === 1 ? 'block' : 'blocks';
    const allEqual = remainingBlockSizes.every(function(size) {
        return size === remainingBlockSizes[0];
    });

    if (allEqual) {
        return '<strong>You have ' + remainingBlocks + ' ' + blockLabel + ' left</strong> ' +
            '(with ' + remainingBlockSizes[0] + ' round' + (remainingBlockSizes[0] === 1 ? '' : 's') +
            ' each). Good luck!';
    }

    const sizeLabels = remainingBlockSizes.map(function(size) {
        return size + ' round' + (size === 1 ? '' : 's');
    });

    return '<strong>You have ' + remainingBlocks + ' ' + blockLabel + ' left</strong> ' +
        '(with ' + formatListWithAnd(sizeLabels) + '). Good luck!';
}

function getBlockEndQuestionText(blockIndex = blockNumber) {
    const roundsInBlock = getBlockRoundCount(blockIndex);
    const roundLabel = roundsInBlock === 1 ? 'experiment round' : 'experiment rounds';

    return 'Please estimate the duration of the block of experiment rounds that you just completed ' +
        '(i.e. the last ' + roundsInBlock + ' ' + roundLabel + ', including the questionnaires). ' +
        'Type your answer in minutes.';
}

function getRoundsPerBlockMetadata() {
    if (!experimentBlockSizes || !experimentBlockSizes.length) {
        return totalRounds / totalBlocks;
    }

    const allEqual = experimentBlockSizes.every(function(size) {
        return size === experimentBlockSizes[0];
    });

    return allEqual ? String(experimentBlockSizes[0]) : experimentBlockSizes.join(', ');
}
