function getLivres(startIndex) {
    const URL = `https://opendata.paris.fr/api/records/1.0/search/?dataset=les-titres-les-plus-pretes&q=&rows=200&start${startIndex}&facet=type_de_documnt&facet=auteur`
    axios
        // récupere URL api
        .get(URL)
        // .then((res) => {console.log(res)})
        // si promesse ok ==> execute start 
        .then((res) => start(res))
        // sinon affiche error dans console
        .catch((err) => console.error(err));
}

getLivres(0);

// démarrage
function start(res) {
    // récupere les données de l'url avec chemin
    const livres = res.data.records;
    // execute fonction afficher livre
    console.log(livres);
    afficherlivre(livres);
    
    document.getElementById("input-livre").oninput = function (evt) {
        const checkedRadio = document.querySelector("[name=type-tri]:checked");
        var filteredouvrages;
        if (checkedRadio.value === "nom") {
            filteredouvrages = triNom(livres, evt.target.value);
        } else {
            filteredouvrages = triType(livres, evt.target.value);
        }
        afficherlivre(filteredouvrages)
    }
    
}

function afficherlivre(livres) {
    // on récupere l'ul 
    const ouvrages = document.getElementById("ouvrages");
    // on le vide 
    ouvrages.innerHTML = "";
    // on parcours tous les livres et on crée des li avec les infos de chaque livre + boutton dans le ul #ouvrages
    for (let i = 0; i < livres.length; i += 1) {
        ouvrages.innerHTML +=
            `<li class="list-livres" data-nom="${livres[i].fields.titre}" data-type="${livres[i].fields.type_de_documnt="Livre jeunesse"}" >
            <span>${livres[i].fields.type_de_documnt="Livre jeunesse"} </span>
            <h2 id="titre-livre">${livres[i].fields.titre}</h2>
            <img itemprop="image" class="imglivre" src=images/img-livre.png>
            <h4>Ecrit par : ${livres[i].fields.auteur}</h4>
        </li>`
    }
}

function triType(livres, search) {
    // on execute la fonction filter pour filtrer dans un nouveau tableau tous les types de livre
    return livres.filter(function (livre) {
        // on met tous les types en minuscule + on verifie que la recherche(en minuscule) match/coincide 
        return livre.fields.type_de_documnt.toLowerCase().replace('é', 'e').replace('ô', 'o').match(search.toLowerCase().replace('é', 'e').replace('ô', 'o'));
    })
};

function triNom(livres, search) {
    // on execute la fonction filter pour filtrer dans un nouveau tableau tous les noms de livre
    return livres.filter(function (livre) {
        // on met tous les types en minuscule + on verifie que la recherche(en minuscule) match/coincide 
        return livre.fields.titre.toLowerCase().replace('é', 'e').replace('ô', 'o').match(search.toLowerCase().replace('é', 'e').replace('ô', 'o'));
    })
};