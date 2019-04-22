/* Generate gallery */
const gallery = document.querySelector('.gallery');

function randPosiviteNumber(max) {
    return Math.floor(Math.random() * max) + 1
}

var pairsArray = Array.from({ length: 50 }, (value, index) => [randPosiviteNumber(3), randPosiviteNumber(3)]);

pairsArray.forEach(pair => {
    gallery.innerHTML += `
                    <div class="item colSpan${pair[0]} rowSpan${pair[1]}">
                        <img src="img/${randPosiviteNumber(28)}.min.jpg">
                        <div class="gallery_overflow"><button class="gallery_button">View</button></div>
                    </div>`;
});

/* Button click */
const preview = document.querySelector('.preview');
//Gallery (Preview open)
var preview_image = document.querySelector('.preview_image');

const buttons = document.querySelectorAll('.gallery_button');
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        preview.classList.add('open');
        preview_image.src = e.currentTarget.parentNode.parentNode.querySelector('img').src.replace('.min.jpg', '.jpg');
    })
});

//Preview (Preview close)
const previewButton = preview.querySelector('.close');

previewButton.addEventListener('click', () => {
    preview.classList.remove('open');
});