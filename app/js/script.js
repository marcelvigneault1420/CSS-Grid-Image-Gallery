const gallery = document.querySelector('gallery');

function randPosiviteNumber(max) {
    return Math.floor(Math.random() * max) + 1
}

var pairsArray = Array.from({ length: 50 }, (value, index) => [randPosiviteNumber(4), randPosiviteNumber(4)]);
console.log(pairsArray);