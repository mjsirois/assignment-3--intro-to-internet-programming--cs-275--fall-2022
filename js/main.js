let elements = (json) => {

    let musicSlides = document.querySelector(`.carousel-slides`);
    let slideContainer = document.createElement(`div`);
    slideContainer.setAttribute(`class`, `slide-container`);

    for(let i = 0; i <json.length; i++) {

        let albums = `<h2>${json[i].album}</h2>`;
        slideContainer += albums;

        let artists = `<h3>${json[i].artist}</h3>`;
        slideContainer += artists;

        let cover_images = `<img src = "${json[i].cover_image.path} alt = "${json[i].cover_image.alt_content}"></img>`;
        slideContainer += cover_images;



        

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