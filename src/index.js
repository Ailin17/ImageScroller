
import "./sass/main.scss";

document.addEventListener('DOMContentLoaded', getImageJson);

const imgJSON = async () => {
    const response = await fetch(`../img.json`);

    const responseData = await response.json();

    return responseData;
}

function getImageJson() {
    imgJSON()
        .then(results => {

            let nextIndex = 0;
            let prevIndex = results.length;

            function imageScrollers(imageJSON) {


                return {
                    next: function () {
                        return nextIndex < imageJSON.length ?
                            { value: imageJSON[nextIndex++].img, done: false } :
                            { done: true }
                    },
                    prev: function () {
                        if (prevIndex >= 0){
                            return { value: imageJSON[prevIndex--].img, done: false };
                        } else {
                            prevIndex = results.length;
                            return { value: imageJSON[imageJSON.length - 1].img, done: false };
                        }
                        //return prevIndex >= 0 ? { value: imageJSON[prevIndex--].img, done: false } : { value: imageJSON[imageJSON.length - 1].img, done: false };
                    }
                }
            }


            const images = imageScrollers(results);


            document.querySelector('.next').addEventListener('click', nextImage);
            document.querySelector('.prev').addEventListener('click', prevImage);

            function nextImage() {
                const currentImage = images.next().value;
                if (currentImage !== undefined) {
                    document.querySelector('#image').src = `../img/${currentImage}`
                } else {
                    document.querySelector('#image').src = `../img/img1.jpg`;
                    nextIndex = 0;
                }
            }

            function prevImage() {
                let currentImage = images.prev().value;
                if (currentImage !== undefined) {
                    document.querySelector('#image').src = `../img/${currentImage}`
                  //  prevIndex--; 
                } else {
                   // currentImage = images.last().value;
                    document.querySelector('#image').src = `../img/${currentImage}`
                    
                }
            }


            nextImage();

        })
        .catch(err => {
            console.log(err);

        });
}







/*
const pix = imageScrollers();
document.querySelector('.next').addEventListener('click', nextImage);
    currentImage =

    function nextImage(){
        document.querySelector('#image').src = '';
    }

 */