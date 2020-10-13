// Link to our JSON file on Heroku Server
const gmObjUrl = 'https://chessgmplayers.herokuapp.com/objects';
const wikiUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/";

// Variables for selectors
const gmList = document.querySelector('#chessGM');
const btnCheckIt = document.querySelector("#checkIt");
let userBirthdayValue = document.querySelector("#start").value;

//Functions
async function getGMlist(){
    const gmResponse = await fetch(gmObjUrl);
    const gmJSON = await gmResponse.json();
    // console.log(gmJSON, "Response GM")
    return gmJSON;
}

async function checkBirthdayMatch(userBirthday) {
    const gmList = await getGMlist();

    let arrAllResults = []

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
        arrAllResults[i].forEach( async data => {
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
            var thumbnail = "content/img/king.jpg"
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
          //let thumbnail = "content/img/king.jpg";
          let name = data.name;
          let extract = `${data.name} is a player from ${data.mostRecentFed} who got the Grand Master title in ${data.yearTitle}`;

          wikiProfile = {
            name: name,
          //  thumbnail: thumbnail,
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
        
        })
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
   let data =  await findWikiInfo()
console.log(data, 'DATAAAAAAA')
  // console.log(result, "here it is")
  // result.map( player => console.log(player, "DFFGHHGFFGDGGD"))
  
    
        data.forEach(async resulT =>  {
          let result = await resulT
          console.log(result)
        // if (result[i].length > 0){
       // console.log(result.length, "check array number")
        result.map(player => { 
          console.log(player, "PLAYERS")
          let resultContainer = document.querySelector(".result-container")
          let newCard = document.createElement("div");
          resultContainer.appendChild(newCard);
              newCard.innerHTML = `<div class="card">
          <div class="thumbnail-container">
            <img class="thumbnail" src=${player.thumbnail} alt="random-GM" />
          </div>
          <div class="info-gm">
            <div class="basic-info">
              <h3 class="gm-name">${player.name}</h3>
            </div>
            <div class="bio">
              <p>${player.extract}</p>
            </div>
          </div>
        </div>`
        })
      })
    }
    
      
     
  //  }


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


// Agregar en el generate HTML
// if (i === 0) {
//   let resultContainer = document.querySelector(".result-container");
//   let titlePerfectMatch= document.createElement(h2);
//   titlePerfectMatch.innerHTML = "Someone is born the exact same day as you";
//   resultContainer.appendChild(titlePerfectMatch);

// }

// if ( i === 1) {
//   titlebirthdayMatch.innerHTML = `${data.length} GMs celebrate the same birthday as you`;
// }

// if (i === 2 ) {
//   titlebirthdayMatch.innerHTML = `${data.length} were born the same year as you`;

// }