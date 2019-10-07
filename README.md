# CSS-Grid-Image-Gallery

A project in HTML5 CSS3 JavaScript to practice the what I've learned recently in CSS (CSS Grid and CSS3)

The base HTML CSS is from a basic cssgrid.io example and I build around to learn Sass, Gulp, some npm packages, etc.

## To build
- run `git clone https://github.com/marcelvigneault1420/CSS-Grid-Image-Gallery.git`
- Go inside the repository
- run `npm i`
- run `gulp build`
- Open the index.html in the build folder.

## What I learned

I tried to use Sass to have the ability to nest classes and get clearer CSS so this project became also an opportunity to learn Gulp. All this website is compiled in the build folder when you run 'Gulp build'.

- Gulp
  - I use Gulp to run a watch function on every file and every time I update one file
    - I use browser-sync to refresh the browser
    - I use gulp-sass to generate my CSS automatically when I save a SCSS file
  - I created a build function to build the whole website in a build folder.
    - It map the CSS. The browser will give the the class fil line relative to the scss instead of the css minified file.
    - It regenerate all the css files
    - It prefix the css automatically
    - It minify all the CSS/JS files
    - It merge all the CSS/JS files with gulp-useref. I use the HTML anotation 
      `<!-- build:js scripts/combined.js -->`
    - It minify the images. The gallery use the minified image and the preview use the original image.
    - It transfer all the other files without any modifications.
- Sass
  - You can use Sass to nest class with the & character. The & will be replace by the parent class name during the build of the CSS
  - Instead of duplicating &.colSpan1 3 times I could have done a for loop like this: 
    ```sass
    @for $i from 1 through 3 {
      .colSpan{$i} { }
    }
    ```
- CSS3
  - I learn to reset my css properly with margin: 0 and box-sizing: border-box to avoid any weird scrolling when I use border and vh units
  - I learn that you can remove the hover event of child elements by doing `pointer-events: none;` when what you are hovering move away and the animation cancel. It's not still used in this project.
  - I learned that if you do :hover you can add another class after to modify a different class than the hover one: 
    ```css
    .gallery .item:hover .gallery_overflow {
      transform: translateY(0);
    }
    ```
  - I used 1fr grid for displaying every image. It allow image and overlay to be overlaped in the same grid area.
    - I translate the overlay `transform: translateY(100%);` and on hover I bring it back up.
  - I created a side panel with `::before` and on hover the button I move the side panel to create a shinny effect
    ```sass
    button {
      ...

      &:hover {
        ...
        
        &::before {
            transform: skewX(-45deg) translateX(13.5em);
            transition: all 0.8s ease-in-out;
        }
      }

      &::before {
        content: "";
        width: 20px;
        background-color: rgba(255, 255, 255, 0.4);
        position: absolute;
        top: 0;
        left: -35px;
        height: 100%;
        transform: skewX(-45deg) translateX(0);
        transition: none;
      }
    }
    ```
  
