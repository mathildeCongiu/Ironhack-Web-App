// Link to our JSON file on Heroku Server
const gmObjUrl = 'https://chessgmplayers.herokuapp.com/objects';
const wikiUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/";

// Variables for selectors
const gmList = document.querySelector('#chessGM');
const btnCheckIt = document.querySelector("#check-it");
let userBirthdayValue = document.querySelector("#start").value;

console.log(userBirthdayValue)

//Functions
async function getGMlist(){
    const gmResponse = await fetch(gmObjUrl);
    const gmJSON = await gmResponse.json();
    // console.log(gmJSON, "Response GM")
    return gmJSON;
}

async function checkBirthdayMatch(userBirthday) {
    const gmList = await getGMlist();

    let arrAllResults = [];

    let perfectResultMatchArr = [];
    let birthdayMatchArr = [];
    let yearMatchArr = [];
    
    
    let userDay =  userBirthday.toString().split("-")[2];
    let userMonth =  userBirthday.toString().split("-")[1];
    let userYear =  userBirthday.toString().split("-")[0];
    let userDayMonth =   userDay + "-" + userMonth;


    for (let i= 0; i< gmList.length; i++) {
      let gmDay =  gmList[i].born.toString().split("-")[2];
      let gmMonth =  gmList[i].born.toString().split("-")[1];
      let gmYear =  gmList[i].born.toString().split("-")[0];
      let gmDayMonth =   gmDay + "-" + gmMonth;
      // console.log("aquí está la info", gmDay, gmMonth, gmYear, gmDayMonth);
        if ( userBirthday === gmList[i].born) {
            perfectResultMatchArr.push(gmList[i]);
            
            
        }
        else if ( userDayMonth ===  gmDayMonth) {
          birthdayMatchArr.push(gmList[i]);
        }
        else if ( userYear ===  gmYear) {
          yearMatchArr.push(gmList[i]);
        }      
    }
    arrAllResults.push(perfectResultMatchArr);
    arrAllResults.push(birthdayMatchArr);
    arrAllResults.push(yearMatchArr);
    // console.log(arrAllResults);

    return arrAllResults;
}

// checkBirthdayMatch(userBirthdayValue);

async function findWikiInfo() {
    let wikiProfiles = [];

    let perfectMatch = [];
    let birthdayMatch = [];
    let yearMatch = []

    let arrAllResults = await checkBirthdayMatch(userBirthdayValue);

    // console.log(arrAllResults)
    for (let i = 0; i < arrAllResults.length; i++) {
      if (arrAllResults[i].length > 0) {
        await Promise.all(arrAllResults[i].map( async data => {
          // console.log(data.wikiPage.includes("https://en.wikipedia.org/wiki/"))
         if (data.wikiPage.includes("https://en.wikipedia.org/wiki/")) {
          //  console.log(data.wikiPage)
        let wikiDestructuration = await data.wikiPage.split("https://en.wikipedia.org/wiki/");
        let redirection = await wikiDestructuration[1];
      
          let wikiPage = await fetch (wikiUrl + redirection);
          // console.log(wikiPage);
          let response = await wikiPage.json();
            // console.log(response)
         
            
          if (typeof response.thumbnail === "object") {
            var thumbnail = await response.thumbnail.source
          }
          else if (typeof response.thumbnail === "string") {
            var thumbnail = await response.thumbnail
          }

          else {
            var thumbnail = "content/img/king.jpg";
          }

          // let thumbnail = await response.thumbnail.source;
          let extract = response.extract;
          // console.log(extract);
          let name = response.title;

          // console.log(name)
         wikiProfile= {
             name: name,
             thumbnail: thumbnail,
             extract: extract
         };

          // console.log(wikiProfile, "AHORA ES LA SIGUIENTE COMPROBACION")
         
         if (i=== 0) {
           perfectMatch.push(wikiProfile);
         }

         else if (i === 1 ) {
          birthdayMatch.push(wikiProfile);
         }

         else if (i === 2) {
          yearMatch.push(wikiProfile);
         }
         
        }
        else {

          // console.log(data)
          let thumbnail = "content/img/king.jpg";
          let name = data.name;
          let extract = `${data.name} is a player from ${data.mostRecentFed} who got the Grand Master title in ${data.yearTitle}`;

          wikiProfile = {
            name: name,
          thumbnail: thumbnail,
            extract: extract
        };

          if (i=== 0) {
            perfectMatch.push(wikiProfile);
          }
 
          else if (i === 1 ) {
           birthdayMatch.push(wikiProfile);
          }
 
          else if (i === 2) {
           yearMatch.push(wikiProfile);
          }
        }
        
        }))
      }
      else {console.log("There is no player born the exact same day as you")
    }
    

  }
  // console.log(wikiProfiles, "kjhgfdsa")
//   wikiProfiles.push(perfectMatch, birthdayMatch, yearMatch);
// wikiProfiles[0].push(perfectMatch)
    wikiProfiles = [perfectMatch, birthdayMatch, yearMatch];
     
        // console.log(wikiProfiles, "check if same number of elements")
        return wikiProfiles;
    }



    
 async function generateHTML() {
   let result =  await findWikiInfo()

   let resultContainer = document.querySelector(".result-container");
    
       return result.forEach(async (array, index) =>  {
         if (index === 0) {
         
          if (array.length > 0){
            let perfectMatch = document.createElement("div")
            resultContainer.appendChild(perfectMatch)
            let title = document.createElement("h2");
            title.innerHTML = "Someone is born the exact same day as you";
            perfectMatch.appendChild(title);

         array.map( async player => { 
          
          let newCard = document.createElement("div");
          perfectMatch.appendChild(newCard);
              newCard.innerHTML = `<div class="card">
          <div class="thumbnail-container">
            <img class="thumbnail" src=${await player.thumbnail} alt="random-GM" />
          </div>
          <div class="info-gm">
            <div class="basic-info">
              <h3 class="gm-name">${await player.name}</h3>
            </div>
            <div class="bio">
              <p>${await player.extract}</p>
            </div>
          </div>
        </div>`
         }
         )
        }
      
      
         }
        else if (index === 1)  {
          if (array.length > 0){
            let birthdayMatch = document.createElement("div")
            resultContainer.appendChild(birthdayMatch)
            let title = document.createElement("h2");
            title.innerHTML = `${array.length} GMs celebrate the same birthday as you`;
            birthdayMatch.appendChild(title);

         array.map( async player => { 
          
          let newCard = document.createElement("div");
          birthdayMatch.appendChild(newCard);
              newCard.innerHTML = `<div class="card">
          <div class="thumbnail-container">
            <img class="thumbnail" src=${await player.thumbnail} alt="random-GM" />
          </div>
          <div class="info-gm">
            <div class="basic-info">
              <h3 class="gm-name">${await player.name}</h3>
            </div>
            <div class="bio">
              <p>${await player.extract}</p>
            </div>
          </div>
        </div>`
         }
         )
        }
    }
        else if (index === 2 ) {
          if (array.length > 0) {
            let yearMatch = document.createElement("div")
            resultContainer.appendChild(yearMatch)
            let title = document.createElement("h2");
            title.innerHTML = `${array.length} GMs were born the same year as you`;
            yearMatch.appendChild(title);

         array.map( async player => { 
          
          let newCard = document.createElement("div");
          yearMatch.appendChild(newCard);
              newCard.innerHTML = `<div class="card">
          <div class="thumbnail-container">
            <img class="thumbnail" src=${await player.thumbnail} alt="random-GM" />
          </div>
          <div class="info-gm">
            <div class="basic-info">
              <h3 class="gm-name">${await player.name}</h3>
            </div>
            <div class="bio">
              <p>${await player.extract}</p>
            </div>
          </div>
        </div>`
         }
         )
        }
    }}
       )
  }


// generateHTML()

// btnCheckIt.addEventListener('click', (event) => {
//   event.target.textContent = "Loading...";
//   // const gmList = findWikiInfo();
//    Promise.all(gmList)
//   .then(values => generateHTML(values));
//   event.target.remove()
// });

btnCheckIt.addEventListener('click', (event) => {
    event.target.textContent = "Loading...";
    generateHTML();
    event.target.textContent ="Check It"
});