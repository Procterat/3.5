// const dog = {
//     name: "Sharik",
//     age: "3",
//     breed: "Laika",
//     isHealthy: true,
//     makeNoise: function() {
//         console.log('Bark')
//     }
// }

// dog.name = 'Keks';

// console.log(dog.name);
// console.log(dog.age);
// console.log(dog.breed);

// console.log(dog);

// dog.makeNoise();

// dog.makeNoise = function () {
//     console.log('Bark bark bark')
// }

// dog.makeNoise();

const map = document.querySelector('#game');
const canvas = map.getContext('2d');
canvas.fillStyle = '#b067c2';

const grid = 15;
const paddleHeight = grid * 5;
const maxPaddleY = map.height - grid - paddleHeight;

let ballSpeed = 2.5;
let paddleSpeed = 2.5;

const leftPaddle = {
    x: grid * 2,
    y: map.height / 2 - paddleHeight / 2,
    width: grid,
    height: paddleHeight,
    dy: 0, // Speed Y
}

const rightPaddle = {
    x: map.width - grid * 3,
    y: map.height / 2 - paddleHeight / 2,
    width: grid,
    height: paddleHeight,
    dy: 0, // Speed Y
}

const ball = {
    x: map.width / 2,
    y: map.height / 2,
    width: grid,
    height: grid,
    dx: ballSpeed,
    dy: -ballSpeed,
    resetting: false,
    isResetted: false
}

function renderMap() {
    canvas.fillRect(0, 0, map.width, grid); // Верхняя граница
    canvas.fillRect(0, map.height - grid, map.width, grid) // Нижняя граница

    for (let i = grid; i < map.height - grid; i += grid * 2) {
        canvas.fillRect(map.width / 2, i, grid, grid); // Разделительная линия
    }
}

function renderLeftPaddle() {
    canvas.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
}

function renderRightPaddle() {
    canvas.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
}

function movePaddles() {
    leftPaddle.y += leftPaddle.dy;
    rightPaddle.y += rightPaddle.dy;
}

function clearMap() {
    canvas.clearRect(0, 0, map.width, map.height);
}

function loop() {
    clearMap();

    renderLeftPaddle();
    renderRightPaddle();

    movePaddles();

    renderBall();
    moveBall();

    renderMap();
    requestAnimationFrame(loop);
}

function renderBall() {
    canvas.fillRect(ball.x, ball.y, ball.width, ball.height);
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}

document.addEventListener('keydown', (event) => {
    console.log(event.key);
    if (event.key === 'w' || event.key === 'ц') {
        leftPaddle.dy = -paddleSpeed;
    } else if (event.key === 's' || event.key === 'ы') {
        leftPaddle.dy = paddleSpeed;
    }
})

document.addEventListener('keyup', (event) => {
    console.log(event.key);
    if (event.key === 'w' || event.key === 'ц' || event.key === 's' || event.key === 'ы') {
        leftPaddle.dy = 0;
    }
})

requestAnimationFrame(loop);