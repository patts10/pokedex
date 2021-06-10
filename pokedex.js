
  const inputSearch = document.querySelector('.inputSearch');
  const searchBtn = document.querySelector('.search');
  const container = document.querySelector('.container');

  let pokeInfo = '';

  const pokeApi = 'https://pokeapi.co/api/v2/pokemon/';
  const pokemonList = (api, pokemonInput = 'bulbasaur') => {

    fetch(api).then( (data) => {
      return data.json();
    }).then( (info) => {
      pokeInfo = info;
      console.log(pokeInfo);


      const fetchPromises = pokeInfo.results.map( e => {
        return fetch(e.url).then( (pokeUrl) => {
          return pokeUrl.json();
        })
      })
  
      Promise.all(fetchPromises).then( (result) => {
        result.forEach( ({ name, sprites, abilities }) => {

          console.log(name);
          if(name == pokemonInput) {
            container.innerHTML = `<img class="pokeImg" src="${sprites.front_default}"/>
                                    <div class="pokeDetails">
                                    <h3 class="pokeName">${name}</h3>
                                    <p class="details">Its abilities are:</p>
                                    <ul class="abilitiesList">${listAbilities(abilities)}
                                    </ul>
                                    </div>
                                  `
          }

        })
      })
    })

    listAbilities = (abilities) => {
      return abilities.reduce((acc, {ability}) => {
        return `${acc}<li>${ability.name}</li>`;
      }, ``)

    }

    searchBtn.onclick = (() => {
        const pokemonInput = inputSearch.value;
        const url = 'https://pokeapi.co/api/v2/pokemon/?offset=100&limit=1118';
        console.log('++++++++');
        console.log(pokemonInput);
        console.log(pokeInfo);
        // pokeInfo.forEach(pokemon => {
        //   if(pokemon.name === pokemonInput)
        //   return pokemonList(url, pokemonInput);
        //   console.log(pokemon);
        // });
        pokemonList(pokeApi, pokemonInput);
        inputSearch.value = '';
      })
  }
  pokemonList(pokeApi);