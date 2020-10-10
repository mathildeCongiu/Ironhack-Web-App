const gmObjUrl = 'https://chessgmplayers.herokuapp.com/object';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';

const gmList = document.querySelector('#chessGM');
const btn = document.querySelector("#date");

async function getGMlist(){
    const gmResponse = await fetch(gmObjUrl);
    const gmJSON = await gmResponse.json();

    const profiles = gmJSON.map( async person => {
    let name = await person.Name.split(", ")[1] + "_" + person.Name.split(", ")[0];
    const profileResponse = await fetch(wikiUrl + name);
    const profileJSON = await profileResponse.json();
    
    

    return profileJSON// Check what the meaning of this
    });
    // habria que hacer un segundo intento agrenado (chess_player) al final 
    // habría que coger los casos de error y agregar una frase de tipo: `This grand-master is from ${person.country} and have been titled in ${person.year} the International Grand Master title. 

    return profiles
}

function generateHTML(list) {
    list.map(data => {
        console.log(data.title);

        let tagForInfo = document.querySelector(".home");
        let tagCreated = document.createElement("p");
        let appended = tagForInfo.appendChild(tagCreated);
        appended.innerHTML = data.title;
    })
    // list.map(person => {
        const section = document.createElement('section');
        let prueba = "<h2>Easy try<h2>"

        prueba.appendChild(section);
        const thumbnail = list[0].thumbnail ? `<img src='${list[0].thumbnail.source}'>` : '';
        section.innerHTML = `
        <span>${person.name}</span>
        <h2>${person.title}</h2>
        ${thumbnail}
        <p>${person.description}</p>
        <p>${person.extract}</p>
        `;
    // });
}



btn.addEventListener('click', async (event) => {
    event.target.textContent = "Loading...";
    const gmList = await getGMlist();
    await Promise.all(gmList)
    .then(values => generateHTML(values));
    event.target.remove()
});


// window,addEventListener("load", getGMlist)

// Calendar


