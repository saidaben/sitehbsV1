async function getPoke(page){
    try {
        const pokemonsRes = await axios.get("https://pokeapi.co/api/v2/pokemon");
        const pagination = getPagination(pokemonsRes.data.results, 5)
        affiche(pagination, page)
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

function affiche(pokemons, page){
    console.log(pokemons)
    const pagination = document.querySelector(".pagination");
    const pokemonsList = document.querySelector(".pokemons");
    pokemonsList.innerHTML = "";
    pagination.innerHTML = "";
    pokemons[page].forEach((pokemon, i) => {
        pokemonsList.innerHTML += `
            <ul> <li>${pokemon.name}</li> </li>
        `
    })

    pokemons.forEach((el, i) => {
        pagination.innerHTML += `
              <button class='pageBTN'> ${i+1} </button>
        `;
    })

    const allBTN = document.querySelectorAll('.pageBTN');
    allBTN.forEach((btn, page) => { // page = i
        btn.onclick = () => getPoke(page)
    })

}

// ########################## VERSION 2
// la division est automatique, on peut choisir le nombre de page seulement
function getPagination(list, numberOfPage){
    const pages = [];
    const numberElementsOfOnePage = list.length / numberOfPage; // je divise tout les element par le nombre de pages choisis
    var pageIndex = [0, numberElementsOfOnePage];

    for (let i = 0; i <= numberOfPage-1; i++){
        let page = list.filter((el, b) => b <= pageIndex[1] && b >= pageIndex[0] )
        if (page.length != 0) pages.push(page)
        let from = pageIndex[0] + numberElementsOfOnePage, to = pageIndex[1] + numberElementsOfOnePage;
        pageIndex = [from, to];
    }
    return pages;
}

getPoke(0);