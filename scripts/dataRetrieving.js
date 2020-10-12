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
    console.log(arrAllResults);

    return arrAllResults;
}

checkBirthdayMatch(userBirthdayValue);

async function findWikiInfo() {
    let wikiProfiles = [];

    let perfectMatch = [];
    let birthdayMatch = [];
    let yearMatch = []
    let arrAllResults = await checkBirthdayMatch(userBirthdayValue);

    for (let i = 0; i < arrAllResults.length; i++) {
      if (arrAllResults[i].length > 0) {
        arrAllResults[i].forEach( async data => {
         if (data.wikiPage && data.wikiPage.includes("https://en.wikipedia.org/wiki/")) {
          // console.log(data.wikiPage)
        let wikiDestructuration = await data.wikiPage.split("https://en.wikipedia.org/wiki/");
        let redirection = await wikiDestructuration[1];
      
          let wikiPage = await fetch (wikiUrl + redirection);
          // console.log(wikiPage);
          let response = await wikiPage.json();

          let thumbnail
          if (await response.thumbnail) {
             thumbnail = response.thumbnail
          }
          // else if (await response.thumbnail.source) {
          //   thumbnail = response.thumbnail.source
          // }

          else {
            thumbnail = "content/img/king.jpg"
          }

          // let thumbnail = await response.thumbnail.source;
          let extract = await response.extract;
          // console.log(extract);
          let name = await response.title;
         wikiProfile= {
             name: name,
             thumbnail: thumbnail,
             extract: extract
         };

        //  console.log(wikiProfile, "AHORA ES LA SIGUIENTE COMPROBACION")
         
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
          // console.log(`${data.name} is a player from ${data.mostRecentFed} who got the Grand Master title in ${data.yearTitle}`);
          if (i=== 0) {
            perfectMatch.push(data);
          }
 
          else if (i === 1 ) {
           birthdayMatch.push(data);
          }
 
          else if (i === 2) {
           yearMatch.push(data);
          }
        }
        
        })
      }
      else {console.log("There is no player born the exact same day as you")
    };
    

  }
  
  wikiProfiles.push(perfectMatch, birthdayMatch, yearMatch)

     
        // console.log(wikiProfiles)
        return wikiProfiles
    }


findWikiInfo();
let infoPlayers = findWikiInfo();

 async function generateHTML(gmArray) {
   let result = await gmArray

   for (let i = 0; i < result.length; i++) {
     result[i].map(data => { 
        console.log(data,'data probando')
          let resultContainer = document.querySelector(".result-container")
          let newCard = document.createElement("div");
          resultContainer.appendChild(newCard);


    
          // const thumbnail = data.thumbnail ? data.thumbnail : data.thumbnail.source;
          
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
  })
     }
   }


generateHTML(infoPlayers)

btnCheckIt.addEventListener('click', (event) => {
    event.target.textContent = "Loading...";
    // const gmList = findWikiInfo();
     Promise.all(gmList)
    .then(values => generateHTML(values));
    event.target.remove()
});
