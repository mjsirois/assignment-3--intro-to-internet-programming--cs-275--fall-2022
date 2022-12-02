let elements = (json) => {

    let musicSlides = document.querySelector(`.carousel-slides`);
    let slideContainer = document.createElement(`div`);
    slideContainer.setAttribute(`class`, `slide-container`);

    for(let i = 0; i <json.length; i++) {

        let albums = `<h2>${json[i].album}</h2>`;
        slideContainer += albums;

        let artists = `<a>${json[i].artist}</a>`;
        slideContainer += artists;

        

    }

    musicSlides.innerHTML = slideContainer;
};

window.onload = () => {

    let arrowButtons = document.getElementsByClassName(`carousel-navigation`);
    let leftButton = arrowButtons[0];
    let rightButton = arrowButtons[1];


    let body = document.querySelector(`body`);
    let script = document.createElement(`script`);

    script.setAttribute(`src`, `json/data.json`);
    body.append(script);
};