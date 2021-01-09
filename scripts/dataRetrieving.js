// Link to our JSON file on Heroku Server
const gmObjUrl = 'https://chessgmplayers.herokuapp.com/objects';
const wikiUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/";

// Variables for selectors
const gmList = document.querySelector('#chessGM');
const btnCheckIt = document.querySelector("#check-it");
let userBirthdayValue = document.querySelector("#start");


// console.log(userBirthdayValue)

//Other global variables
var today = new Date()
// console.log(todayDate);

//Functions
async function getGMlist(){
    const gmResponse = await fetch(gmObjUrl);
    const gmJSON = await gmResponse.json();
    console.log(gmJSON, "Response GM");
    return gmJSON;
}

async function checkBirthdayMatch(userBirthday) {
  console.log(userBirthday, 'value');
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
    console.log(arrAllResults);

    return arrAllResults;
}

// checkBirthdayMatch(userBirthdayValue);

async function findWikiInfo() {
    let wikiProfiles = [];

    let perfectMatch = [];
    let birthdayMatch = [];
    let yearMatch = [];

    let arrAllResults = await checkBirthdayMatch(userBirthdayValue.value);

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
          // let extract = response.extract; //This must be added when I learn to do a "Learn More"
          let birthday = `${data.born.toString().split("-")[2]}/${data.born.toString().split("-")[1]}/${data.born.toString().split("-")[0]}`
         
         
          // console.log(extract);
          let name = response.title;
          let extract = `${name} is a player from ${data.mostRecentFed}, born on ${birthday}, who got the Grand Master title in ${data.yearTitle}.`
    
          let birthdayString = `${data.born.toString().split("-")[2]}/${data.born.toString().split("-")[1]}/${data.born.toString().split("-")[0]}`;
          let birthdayDate = new Date(data.born);
          let age = Math.floor((today - birthdayDate)/31557600000);
          // console.log(name)
         wikiProfile = {
             name: name,
             thumbnail: thumbnail,
             extract: extract,
             wikiPage: data.wikiPage,
             fidePage: data.fidePage,
             fideId: data.fideId,
             gender: data.gender,
             nationality: data.mostRecentFed,
             birthday: birthdayString,
             age: age,
             dead: data.dead,
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
          if (data.name.includes(",")) {
            name = data.name.split(",")[1] + " " + data.name.split(",")[0];
        
         }
         else {
           name = data.name
         }
         // let name = data.name;
          let birthday = `${data.born.toString().split("-")[2]}/${data.born.toString().split("-")[1]}/${data.born.toString().split("-")[0]}`
          let extract = `${name} is a player from ${data.mostRecentFed}, born on ${birthday}, who got the Grand Master title in ${data.yearTitle}.`
          let birthdayString = `${data.born.toString().split("-")[2]}/${data.born.toString().split("-")[1]}/${data.born.toString().split("-")[0]}`;
          let birthdayDate = new Date(data.born);
          
          let age = Math.floor((today - birthdayDate)/31557600000);
          
          wikiProfile = {
            name: name,
            thumbnail: thumbnail,
            extract: extract,
            fidePage: data.fidePage,
            fideId: data.fideId,
            gender: data.gender,
            nationality: data.mostRecentFed,
            birthday: birthdayString,
            age : age,
            dead: data.dead,
            wikiPage: data.fidePage
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
     
        console.log(wikiProfiles, "check if same number of elements")
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
            let hr = document.createElement("hr")
            title.innerHTML = "Someone was born the exact same day as you";

            let divTitle = document.createElement("div");
            divTitle.setAttribute("class", "div-title")
            perfectMatch.appendChild(divTitle);
            divTitle.appendChild(title);
            divTitle.appendChild(hr)

            let divCardsContainer = document.createElement("div");
            perfectMatch.appendChild(divCardsContainer)

         array.map( async player => { 
          
          let newCard = document.createElement("div");
          divCardsContainer.appendChild(newCard);
          divCardsContainer.setAttribute("class","cards-container");

              newCard.innerHTML = `<div class="card">
              <a href=${await player.wikiPage}><div class="thumbnail-container">
          <img class="thumbnail" src=${await player.thumbnail} alt="random-GM" />
        
          </div></a>
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
            let hr = document.createElement("hr")
      
            title.innerHTML = `<span class="birthday-number">${array.length} </span> GMs celebrate the same birthday as you`;
            let divTitle = document.createElement("div");
            divTitle.setAttribute("class", "div-title");
            birthdayMatch.appendChild(divTitle);
            divTitle.appendChild(title);
            divTitle.appendChild(hr)

            let divCardsContainer = document.createElement("div");
            birthdayMatch.appendChild(divCardsContainer);
            divCardsContainer.setAttribute("class","cards-container");

         array.map( async player => { 
          
          let newCard = document.createElement("div");
          divCardsContainer.appendChild(newCard);
              newCard.innerHTML = `<div class="card">
              <a href=${await player.wikiPage}><div class="thumbnail-container">
           <img class="thumbnail" src=${await player.thumbnail} alt="random-GM" />
          </div></a>
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
            let hr = document.createElement("hr")
            title.innerHTML = `<span class="birthday-number">${array.length} </span> GMs were born the same year as you`;
            let divTitle = document.createElement("div")
            divTitle.setAttribute("class", "div-title")
            yearMatch.appendChild(divTitle);
            divTitle.appendChild(title);
            divTitle.appendChild(hr)

            let divCardsContainer = document.createElement("div");
            yearMatch.appendChild(divCardsContainer);
            divCardsContainer.setAttribute("class","cards-container");

         array.map( async player => { 
          
          let newCard = document.createElement("div");
          divCardsContainer.appendChild(newCard);
              newCard.innerHTML = `<div class="card">
              <a href=${await player.wikiPage}><div class="thumbnail-container">
            <img class="thumbnail" src=${await player.thumbnail} alt="random-GM" />
          </div></a>
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




async function getTodayBirthday() {
  let gmList = await getGMlist()
  let todayMonth = today.getMonth() +1 
  if (todayMonth < 10) {
    todayMonth = "0" + todayMonth 
  }

  let todayDay = today.getDate() 
  if (todayDay < 10) {
    todayDay = "0" + todayDay
  }
  var todayDate = todayDay + "-" + todayMonth
  let todayDateStr = todayDate.toString()

  
  let todayArr = [];

  for (let i= 0; i< gmList.length; i++) {
    let gmDay =  gmList[i].born.toString().split("-")[2];
    let gmMonth =  gmList[i].born.toString().split("-")[1];
    let gmDayMonth =   gmDay + "-" + gmMonth;


      if ( todayDate == gmDayMonth) {
          todayArr.push(gmList[i]);
      }
      
     
}
  return todayArr
}

getTodayBirthday()



async function getwikiTodayBirthday() {

  let birthdayToday = await getTodayBirthday();
  console.log(birthdayToday, "cant see it")

  let birthdayTodayWiki = []


      await Promise.all(birthdayToday.map( async data => {
        // console.log(data.wikiPage.includes("https://en.wikipedia.org/wiki/"))
       if (data.wikiPage.includes("https://en.wikipedia.org/wiki/")) {
        //  console.log(data.wikiPage)
      let wikiDestructuration = await data.wikiPage.split("https://en.wikipedia.org/wiki/");
      let redirection = await wikiDestructuration[1];
    
        let wikiPage = await fetch (wikiUrl + redirection);
         console.log(wikiPage);
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
        // let extract = response.extract;

        let birthday = `${data.born.toString().split("-")[2]}/${data.born.toString().split("-")[1]}/${data.born.toString().split("-")[0]}`
          
        // console.log(extract);
        let name = response.title;
       
        let extract = `${name} is a player from ${data.mostRecentFed}, born on ${birthday}, who got the Grand Master title in ${data.yearTitle}.`
       
        let birthdayString = `${data.born.toString().split("-")[2]}/${data.born.toString().split("-")[1]}/${data.born.toString().split("-")[0]}`;
        let birthdayDate = new Date(data.born);
        let age = Math.floor((today - birthdayDate)/31557600000);
        // console.log(name)
       wikiProfile = {
           name: name,
           thumbnail: thumbnail,
           extract: extract,
           wikiPage: data.wikiPage,
           fidePage: data.fidePage,
           fideId: data.fideId,
           gender: data.gender,
           nationality: data.mostRecentFed,
           birthday: birthdayString,
           age: age,
           dead: data.dead,
       };

       birthdayTodayWiki.push(wikiProfile)
      }
       else {

        // console.log(data)
        let thumbnail = "content/img/king.jpg";
        let name
        if (data.name.includes(",")) {
           name = data.name.split(",")[1] + " " + data.name.split(",")[0];
       
        }
        else {
          name = data.name
        }
        let birthday = `${data.born.toString().split("-")[2]}/${data.born.toString().split("-")[1]}/${data.born.toString().split("-")[0]}`
        let extract = `${name} is a player from ${data.mostRecentFed}, born on ${birthday}, who got the Grand Master title in ${data.yearTitle}.`
        let birthdayString = `${data.born.toString().split("-")[2]}/${data.born.toString().split("-")[1]}/${data.born.toString().split("-")[0]}`;
        let birthdayDate = new Date(data.born);
        
        let age = Math.floor((today - birthdayDate)/31557600000);
        
        wikiProfile = {
          name: name,
          thumbnail: thumbnail,
          extract: extract,
          fidePage: data.fidePage,
          fideId: data.fideId,
          gender: data.gender,
          nationality: data.mostRecentFed,
          birthday: birthdayString,
          age : age,
          dead: data.dead,
          wikiPage: data.fidePage
      };

      birthdayTodayWiki.push(wikiProfile)}
    }))


    console.log(birthdayTodayWiki, "ICIIIII")
    return birthdayTodayWiki;
}


getwikiTodayBirthday()



async function printTodayBirthday() {

  let birthdayToday = await getwikiTodayBirthday();

  let todaySection = document.querySelector(".today-section");
 
  birthdayToday.map( async (player,index) => {
    let newA = document.createElement("a")
    newA.setAttribute("href", `#slide-${await index+1}`)
    console.log(newA)
    todaySection.appendChild(newA)
  }
  )

  let slidesContainer = document.createElement("div")
  slidesContainer.setAttribute("class", "slides")
  todaySection.appendChild(slidesContainer)


  
   birthdayToday.map(async (player,index) => {
    
    let newCard = document.createElement("div");
    slidesContainer.appendChild(newCard);


    newCard.innerHTML = `<div class="today-card" id = "slide-${index+1}">
  <a href=${await player.wikiPage}><div class="thumbnail-container">
    <img class="thumbnail" src=${await player.thumbnail} alt="random-GM" />
  </div></a>
  <div class="info-gm">
    <div class="basic-info">
      <h3 class="gm-name">${await player.name}</h3>
    </div>
    <div class="bio">
      <p>${await player.extract}</p>
    </div>
  </div>
</div>
</div>`
  })

}

printTodayBirthday()


btnCheckIt.addEventListener('click', (event) => {
  event.target.textContent = "Loading...";
   let sectionCards = document.querySelector(".result-container");
   sectionCards.innerHTML = ""
   generateHTML();
    event.target.textContent = "Check it...";
});
