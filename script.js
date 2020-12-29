
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true;

// unsplash API
const apiKey = 'VRPYOJEkElxOtk4bPN3jIPiSOAZ-xe4WFl2yurqHg1U';
let initialCount = 5;
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

const updateAPIURLWithNewCount = (picCount) => {
    apiUrl =  `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`;
}

//function checks if all images were loaded. This gets called for each image
const imageLoaded = () => {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true; 
    }
}

//helper function to set attributes on DOM elements
const setAttributes = (element, attributes) => {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//create elements for links and photos, add to DOM
const displayPhotos = () => {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach(photo => {
        //create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })
        //create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        //event listener, checks when each image is loaded
        img.addEventListener('load', imageLoaded);
        //put <img> inside <a>, then put bot inside the imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

// get photos from unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if (isInitialLoad) {
            updateAPIURLWithNewCount(30);
            isInitialLoad = false;
        }
    } catch (error) {
        console.log('Error while getting photos', error)
    }
}

//load more photos when scroll is close to the bottom
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY 
        >=
       document.body.offsetHeight - 1000 
        && 
       ready) {
            ready = false;
            getPhotos();
    }
})

//on load
getPhotos();