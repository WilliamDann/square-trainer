let x;

const updateUI = () => {
    const score = document.querySelector('#correct');
    const tries = document.querySelector('#tries');

    const squareElem  = document.querySelector('#square');
    const square      = getSquare();

    const avgTimeElem   = document.querySelector('#avgtime');
    const totalTimeElem = document.querySelector('#totaltime');

    score.innerHTML      = document.data.score;
    tries.innerHTML      = document.data.tries;
    squareElem.innerHTML = `${String.fromCharCode(square.letter+96)}${square.number}`
    
    const totaltime = ((Date.now() - document.data.startTime) / 1000)
    const avgtime   =  totaltime / document.data.tries;

    avgTimeElem.innerHTML   = Math.round(avgtime * 1000) / 1000 
    totalTimeElem.innerHTML = Math.round(totaltime * 10) / 10
}

const pickSquare = () => {
    return {
        letter: Math.ceil(Math.random() * 8),
        number: Math.ceil(Math.random() * 8)
    };
}

// rank is even xor file is even
const squareIsWhite = square => 
    (square.number % 2 == 0) ^ (square.letter % 2 == 0)

const setSquare = square => document.data.square = square;
const getSquare = ()     => document.data.square;

const setScore = score => document.data.score = score;
const getScore = ()    => document.data.score;

const setTries = tries => document.data.tries = tries;
const getTries = ()    => document.data.tries;

const getTotal = () => getScore() - (getTries() - getScore());

const setTime    = time   => document.data.startTime = time;
const getTime    = ()     => document.data.startTime;
const setTimeNow = ()  => document.data.startTime = Date.now();

const handleClick = isWhite => {
    const targetSquare = getSquare();
    const expected     = squareIsWhite(targetSquare);

    if (!document.data.startTime)
        document.data.startTime = Date.now();

    console.log(document.data.mode)
    if (document.data.mode == 'quiz')
        setTimeout(() => {
            const inputs = document.querySelector('#inputButtons');
            inputs.style.display = 'none';
            clearInterval(x);
            updateUI();
    
            document.querySelector('#correct').innerHTML = getTotal();
            document.querySelector('#tries').innerHTML = `${getScore()} right answers, ${getTotal() - getScore()} for incorrect answers`
    
        }, 30000);

    setTries(getTries() + 1);

    if (isWhite == expected) {
        setScore(getScore() + 1);
        confetti({
            particleCount: 100,
            spread: 200,
            origin: { y: 0.6 },
            ticks: 20
          });
    }

    setSquare(pickSquare());
    updateUI();
}

const showTime = () => {
    document.querySelector('#timePanel').style.visibility = 'visible';
    document.querySelector('#hideTimeLab').innerHTML = "Hide Time"
}
const hideTime = () => {
    document.querySelector('#timePanel').style.visibility = 'hidden';
    document.querySelector('#hideTimeLab').innerHTML = "Show Time"
}
const toggleTime = () => 
    document.querySelector('#timePanel').style.visibility == 'hidden' ? showTime() : hideTime()

const viewModes = {
    'start' : () => {
        const startPane = document.querySelector('#start');
        const gamePane = document.querySelector('#game');
        
        startPane.style.visibility = 'visible';
        gamePane.style.visibility = 'hidden';
    },

    'game' : () => {
        const startPane = document.querySelector('#start');
        const gamePane = document.querySelector('#game');
    
        startPane.style.visibility = 'hidden';
        gamePane.style.visibility = 'visible';
    }
}

const start = () => {
    document.data = {
        square    : pickSquare(),
        score     : 0,
        tries     : 0,
        startTime : Date.now(),
        mode      : 'training'
    }
    
    setSquare(pickSquare())
    updateUI();

    viewModes.game();

    setInterval(() => {
        if (document.data.tries != 0)
        updateUI();
    }, 100);
}

const startQuiz = () => {
    document.data = {
        square    : pickSquare(),
        score     : 0,
        tries     : 0,
        mode      : 'quiz'
    }
    
    setSquare(pickSquare())

    updateUI();
    viewModes.game();

    x = setInterval(() => {
        if (document.data.tries != 0)
            updateUI();
    }, 100);
}