'use strict';

function getPokemons () {

  const section = document.querySelector(".pokemon-list");


  for (let i = 0; i < 21; i++) {
    // cada pokemon lleva su propio indice
    // tenemos que añadir el indice al fin de URL de la API
    fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`)
      .then((response) => {
        // convertiremos la respuesta a un objeto legible,
        // porque los datos de la respuesta (response.body) están codificados

        return response.json(); // response.json() es tambien una operacion asincrona
      })
      .then((data) => {
        
        const article = document.createElement('article');
        article.innerHTML = `
          <img src="${data.sprites.front_default}" alt="${data.name}"/>
          <h3>${data.name}</h3>
        `;

        section.appendChild(article);
      })
      .catch((err) => {})
  }
}


async function getPokemonsAA () {
  const section = document.querySelector(".pokemon-list");

  for (let i = 0; i < 21; i++) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`);
      const data = await response.json();
  
      const article = document.createElement('article');
      article.innerHTML = `
        <img src="${data.sprites.front_default}" alt="${data.name}"/>
        <h3>${data.name}</h3>
      `;
  
      section.appendChild(article);
    } catch (err) {
      
    }
  }
}

getPokemonsAA();