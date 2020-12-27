
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// unsplash API
const apiKey = 'VRPYOJEkElxOtk4bPN3jIPiSOAZ-xe4WFl2yurqHg1U';
const count = '10';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//helper function to set attributes on DOM elements
const setAttributes = (element, attributes) => {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//create elements for links and photos, add to DOM
const displayPhotos = () => {
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
    } catch (error) {
        
    }
}

//on load
getPhotos();