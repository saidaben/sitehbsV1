const URL = "https://opendata.paris.fr/api/records/1.0/search/?dataset=les-titres-les-plus-pretes&q=&rows=1000&facet=type_de_documnt&facet=auteur"


axios
    // récupere URL api
    .get(URL)
    // .then((res) => {console.log(res)})
    // si promesse ok ==> execute start 
    .then((res) => start(res))
    // sinon affiche error dans console
    .catch((err) => console.error(err));

// démarrage
function start(res) {
    // récupere les données de l'url avec chemin
    const livres = res.data.records;
    // execute fonction afficher livre
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
    livres.forEach(livre => (
        ouvrages.innerHTML += `<li class="list-livres"> <span>${livre.fields.type_de_documnt}</span><br><h2 id="titre-livre">${livre.fields.titre}</h2> <br> <img itemprop="image" class="imglivre" src=images/img-livre.png ><br><h4>Ecrit par : ${livre.fields.auteur} </h4> <br><data-nom="${livre.fields.titre}" data-type="${livre.fields.type_de_documnt}" 
    </li>`
  
    ));
 
    
}

function triType(livres, search) {
    // on execute la fonction filter pour filtrer dans un nouveau tableau tous les types de livre
    return livres.filter(function (livre) {
        // on met tous les types en minuscule + on verifie que la recherche(en minuscule) match/coincide 
        return livre.fields.type_de_documnt.toLowerCase().replace('é', 'e').replace('ô', 'o').match(search.toLowerCase().replace('é', 'e').replace('ô', 'o'));
    })
};

function triNom(livres, search) {
    // on execute la fonction filter pour filtrer dans un nouveau tableau tous les types de livre
    return livres.filter(function (livre) {
        // on met tous les types en minuscule + on verifie que la recherche(en minuscule) match/coincide 
        return livre.fields.titre.toLowerCase().replace('é', 'e').replace('ô', 'o').match(search.toLowerCase().replace('é', 'e').replace('ô', 'o'));
    })
};


