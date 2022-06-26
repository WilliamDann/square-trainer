const updateUI = () => {
    const score = document.querySelector('#correct');
    const tries = document.querySelector('#tries');

    const squareElem = document.querySelector('#square');
    const square     = getSquare();

    score.innerHTML  = document.data.score;
    tries.innerHTML  = document.data.tries;
    squareElem.innerHTML = `${String.fromCharCode(square.letter+96)}${square.number}`
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

const handleClick = isWhite => {
    const targetSquare = getSquare();
    const expected     = squareIsWhite(targetSquare);

    document.data.tries += 1

    if (isWhite == expected) {
        document.data.score += 1
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

document.data = {
    square : pickSquare(),
    score  : 0,
    tries  : 0,
}
updateUI();