// Link to our JSON file on Heroku Server
const gmObjUrl = 'https://chessgmplayers.herokuapp.com/objects';
const wikiUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/";

// Variables for selectors
const gmList = document.querySelector('#chessGM');
const btnCheckIt = document.querySelector("#checkIt");
let userBirthdayValue = document.querySelector("#start").value;

console.log(userBirthdayValue)
//Functions
async function getGMlist(){
    const gmResponse = await fetch(gmObjUrl);
    const gmJSON = await gmResponse.json();
    
    return gmJSON
}

console.log(getGMlist)

async function checkBirthdayMatch(userBirthday) {
    const gmList = await getGMlist();

    let resultMatchArr = [];
    
    for (let i= 0; i< gmList.length; i++) {
        if (await userBirthday === gmList[i].born) {
            resultMatchArr.push(gmList[i]);
        }
    }
    console.log(resultMatchArr)
    return resultMatchArr
}

checkBirthdayMatch(userBirthdayValue)

async function findWikiInfo(page) {
    let resultMatchArr = await checkBirthdayMatch(userBirthdayValue);
    for (let i= 0; i< resultMatchArr.length; i++) {
        let wikiDestructuration = await resultMatchArr[i].wikiPage.split("https://en.wikipedia.org/wiki/")
        let redirection = await wikiDestructuration[1];
        // let name = await person.Name.split(", ")[1] + "_" + person.Name.split(", ")[0];
         let wikiPage = await fetch (wikiUrl + redirection);
         let response = await wikiPage.json();
         let thumbnail = await response.thumbnail.source;
         let extract = await response.extract;

         // Create a new Array to store this new info ?
         // Do a catch try if there is no answer to fecth to wikipedia
         // retrieve info in function generate HTML
        }
    
}

findWikiInfo(userBirthdayValue)

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


btnCheckIt.addEventListener('click', async (event) => {
    event.target.textContent = "Loading...";
    const gmList = await getGMlist();
    await Promise.all(gmList)
    .then(values => generateHTML(values));
    event.target.remove()
});

