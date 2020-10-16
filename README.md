



![logocomplete](/content/img/logocomplete.png)

# Happy GM to you!

## Description

Compare your birthday with the birthdays of the worldwide Chess Grand Masters. That way you can see which Grand Master you could have been born ! So close...

## MVP (DOM - CANVAS)

- Dashboard: it is mainly a welcome page for the user and a call to action to go to the Check it page. On the bottom part, you have slider showing who are the GM celebrating birthday today. 

- API : retrieve the information I uploaded in Heroku and log the List of Grand Masters in the World that I found in a table in a [Wikipedia page](https://en.wikipedia.org/wiki/List_of_chess_grandmasters). I match the GM with their relative Wikipedia Summary information. If no thumbnails is available, a default image is displayed. This information is then retrieved in the Check It page according to the user input (her/his birthday). The result is displayed in three categories: "Someone was born the same day as you", "x GM were born celebrate their birthdays the same day as you", "x GM were born the same year as you"

- Sign Up: enable the user to do a local copy of his personal informations (email, birthday, username and password)

- Sign In: check whether the user has already signed-up by checking whether his user does exist in the local storage.

- FAQ page: Answer common questions why this website has been done and how it works.

  

## Backlog

- Give age information about the player if he is alive or his death date if he passed away. 
- Do more validation with other languages wikipage to retrieve more thumbnails.
- Add Astrological Sign ! XD
- Use the Sign Up functionality to increase User Experience.
- Add a filter on the result page to show only one of the three categories.

## Wireframes

- [XD Prototype and Wireframes](https://xd.adobe.com/view/b4f8153a-9d13-4526-ae03-82571d292f3b-e1ab/)

## Data structure

**
Ironhack Web App/**

- index.html
- checkit.html
- faq.html
- register.html
- signin.html
- whoiam.html
- css/
  - style.css
  - carousel.css
- js/
  - main.js
  - signup.js
  - user.js
  - validator.js
  - dataRetrieving.js
  - database.js
- content/
  - img/

## APIs

- [Heroku created API](https://chessgmplayers.herokuapp.com/object), collecting wikipedia information
- [Wikimedia](https://en.wikipedia.org/api/rest_v1/page/summary/)

## Links

### Trello (list of tasks)

- [Trello Board](https://trello.com/b/44A81aqU/project-module-1)

### Github

- [Link Repo](https://github.com/mathildeCongiu/Ironhack-Web-App) 
- [Link Deploy](https://mathildecongiu.github.io/Ironhack-Web-App/)

### Slides

-  [Link Slides.com](https://docs.google.com/presentation/d/1RSsgBK5CCFFKZ9vVf4ZSZTEsCmmPFuEelYjkxwLm0rE/edit#slide=id.gc6f80d1ff_0_0)