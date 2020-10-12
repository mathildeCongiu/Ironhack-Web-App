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
    console.log(gmJSON, "Response GM")
    return gmJSON
}

getGMlist();

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

async function findWikiInfo() {
    let wikiProfiles = []
    let resultMatchArr = await checkBirthdayMatch(userBirthdayValue);
    for (let i= 0; i< resultMatchArr.length; i++) {
        let wikiDestructuration = await resultMatchArr[i].wikiPage.split("https://en.wikipedia.org/wiki/")
        let redirection = await wikiDestructuration[1];
        
         let wikiPage = await fetch (wikiUrl + redirection);
         console.log(wikiPage);
         let response = await wikiPage.json();
         let thumbnail = await response.thumbnail.source;
         let extract = await response.extract;
         console.log(extract);
         let name = await response.title;
        wikiProfile= {
            name: name,
            thumbnail: thumbnail,
            extract: extract
        }

        wikiProfiles.push(wikiProfile);
        console.log(wikiProfiles);

         // Do a catch try if there is no answer to fecth to wikipedia
         // retrieve info in function generate HTML
        }
    

        return wikiProfiles
}

findWikiInfo();
let infoPlayers = findWikiInfo();

console.log(infoPlayers);

function generateHTML2(){
    let resultContainer = document.querySelector(".result-container");
    let newCard = document.createElement("div");
    resultContainer.appendChild(newCard);


        newCard.innerHTML = `<div class="card">
    <div class="thumbnail-container">
      <img class="thumbnail" src="" alt="random-GM" />
    </div>
    <div class="info-gm">
      <div class="basic-info">
        <h3 class="gm-name"> Hulk </h3>
      </div>
      <div class="bio">
        <p>Impressive character that never has been grand master</p>
      </div>
    </div>
  </div>`
}


 async function generateHTML(gmArray) {
   let result = await gmArray
    result.map(data => { 
      console.log(data,'data probando')
        let resultContainer = document.querySelector(".result-container")
        let newCard = document.createElement("div");
        resultContainer.appendChild(newCard);
  
        const thumbnail = data.thumbnail ? data.thumbnail : data.thumbnail.source;
        
            newCard.innerHTML = `<div class="card">
        <div class="thumbnail-container">
          <img class="thumbnail" src=${thumbnail} alt="random-GM" />
        </div>
        <div class="info-gm">
          <div class="basic-info">
            <h3 class="gm-name">${data.name}</h3>
          </div>
          <div class="bio">
            <p>${data.extract}</p>
          </div>
        </div>
      </div>`
      console.log(data.extract);
})
    //   resultContainer.appendChild(newCard)

    //     // let tagForInfo = document.querySelector(".home");
    //     // let tagCreated = document.createElement("p");
    //     // let appended = tagForInfo.appendChild(tagCreated);
    //     // appended.innerHTML = data.title;
    // })
}

generateHTML(infoPlayers)

btnCheckIt.addEventListener('click', (event) => {
    event.target.textContent = "Loading...";
    // const gmList = findWikiInfo();
     Promise.all(gmList)
    .then(values => generateHTML(values));
    event.target.remove()
});




//Functions for other possible matches (with month or year)

// async function checkBirthYearMatch(userBirthday) {
//     const gmList = await getGMlist();

//     let resultMatchArrYear = [];
    
//     for (let i= 0; i< gmList.length; i++) {
//         let userBirthYear = await userBirthday.split("-")[0];
//         console.log(userBirthday)
//         if (await userBirthYear === gmList[i].born.split("-")[0]) {
//             resultMatchArrYear.push(gmList[i]);
//         }
            
//         }
    
//     console.log(resultMatchArrYear)
//     return resultMatchArrYear
// }



// async function checkBirthMonthYearMatch(userBirthday) {
//     const gmList = await getGMlist();

//     let resultMatchArrMonthYear = [];
    
//     for (let i= 0; i< gmList.length; i++) {
//         let userBirthMonthYear = await userBirthday.split("-")[0] + "-" + userBirthday.split("-")[1];
//         if (await userBirthMonthYear === gmList[i].born.split("-")[0]) {
//             resultMatchMonthYear.push(gmList[i]);
//         }
            
//         }
    
//     console.log(resultMatchArrMonthYear)
//     return resultMatchArrMonthYear
// }
