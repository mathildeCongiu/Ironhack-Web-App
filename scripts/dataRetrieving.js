const gmObjUrl = 'https://chessgmplayers.herokuapp.com/object';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';

// const peopleList = document.getElementById('people');
// const btn = document.querySelector('button');

async function getGMbyYear(){
    const gmResponse = await fetch(gmObjUrl);
    const gmJSON = await gmResponse.json();

    console.log(gmJSON[0]);

    // const profiles = peopleJSON.people.map( async person => {
    //     const craft = person.craft;
    //     const profileResponse = await fetch(wikiUrl + person.name);
    //     const profileJSON = await profileResponse.json();

    //     return {...profileJSON, craft}
    // })
    // return Promise.all(profiles);
}

getGMbyYear()

// function generateHTML(data) {
//     data.map(person => {
//         const section = document.createElement('section');
//         peopleList.appendChild(section);
//         const thumbnail = person.thumbnail ? `<img src='${person.thumbnail.source}'>` : '';
//         section.innerHTML = `
//         <span>${person.craft}</span>
//         <h2>${person.title}</h2>
//         ${thumbnail}
//         <p>${person.description}</p>
//         <p>${person.extract}</p>
//         `
//     })
// }

// btn.addEventListener('click', async (event) => {
//     event.target.textContent = "Loading...";
//     const astros = await getPeopleInSpace(astroUrl);
//     generateHTML(astros);
//     event.target.remove()
// });

