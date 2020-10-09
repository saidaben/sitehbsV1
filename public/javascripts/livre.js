function getLivres(page) {
    const URL = `https://opendata.paris.fr/api/records/1.0/search/?dataset=les-titres-les-plus-pretes&q=&rows=200&facet=type_de_documnt&facet=auteur`
    axios
        // récupere URL api
        .get(URL)
        // .then((res) => {console.log(res)})
        // si promesse ok ==> execute start 
        .then((res) => start(res, page))
        // sinon affiche error dans console
        .catch((err) => console.error(err));
}

//commence à0
getLivres(0);

//******************* */ 1-démarrage on affiche et on filtre et on gere le nb de page voulu 

function start(res, page) {
    // récupere les données de l'url avec chemin
    const livres = res.data.records;

    // la function qui ns genere des pages avc en params les livre et le nombre de page qu'on souhaite
    const pagination1 = pagination(livres, 5);
    // execute fonction afficher livre qui ns affiche les livre avc en params la const qui genère les pages 
    afficherlivre(pagination1, page);


    //on recup l'input et on ecoute pr afficher selon les filtres
    document.getElementById("input-livre").oninput = function (evt) {

        const checkedRadio = document.querySelector("[name=type-tri]:checked");
        var filteredouvrages;
        if (checkedRadio.value === "nom") {
            {
                filteredouvrages = triNom(pagination1[page], evt.target.value);
                pagination1[page] = filteredouvrages
            }
        } else {
            filteredouvrages = triType(pagination1[page], evt.target.value);
            pagination1[page] = filteredouvrages
        }
        // console.log("PAGINATION : ", pagination1)
        afficherlivre(pagination1, page);
    }

}
//**************************** */ 2- on boucle sur les li pr generer les listes de livres avc le contenu souhaité

function afficherlivre(pagination, page) {
    // on récupere l'ul 
    const ouvrages = document.getElementById("ouvrages");
    // on le vide 
    ouvrages.innerHTML = "";

    // on parcours tous les livres et on crée des li avec les infos de chaque livre dans le ul #ouvrages

    // console.log("PAGINATION AFF LIVRE : ", pagination , "PAGE :: > ", page)
    const livres = pagination[page];
    for (let i = 0; i < livres.length; i += 1) {
        ouvrages.innerHTML +=
            `<li itemprop="titre" class="list-livres" data-nom="${livres[i].fields.titre}" data-type="${livres[i].fields.type_de_documnt}" >
            <span>${livres[i].fields.type_de_documnt} </span>
            <h2 id="titre-livre" itemprop="titre">${livres[i].fields.titre}</h2>
            <img itemprop="image" class="imglivre" src=images/img-livre.png>
            <h4 itemprop="auteur">Ecrit par : ${livres[i].fields.auteur}</h4>
        </li>`
    } //on execute la fonction qui nous affiche les boutons de page pr quelle se genere en mm temps que les livres
    afficherpagination(pagination)
}

// ***************/3 - on fait la meme chose avc les boutons

//on recup le ul et la fonction pagination avc les livres et le nombre de page voulu en params
function afficherpagination(pagination) {
    const paginationElement = document.getElementById("pages")
    paginationElement.innerHTML = "" //on vide le ul 
    for (let i = 0; i < pagination.length; i += 1) {
        paginationElement.innerHTML += //et on fait une boucle pr ajouter un li le remplir a chaque tour d'une page 
            ` <li> <button class="dropbtn btn-pagination" data-page=${i+1}> <i class="fas fa-angle-right"></i>${i+1} </button></li> 
`
    }
    //on recup le les li généré en haut dc les boutons de pages
    const allLi = document.querySelectorAll(".btn-pagination")
    allLi.forEach((li, i) => { //on boucle dessus pr ajouter un onclick a chacun pr que get livre soit executer a chaque clik en l'incrémentant
        // console.log("INDEX NUMBER : ", i)
        li.onclick = () => getLivres(i)
    })
}


// *************1) filtre de l'input 

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


// **************1) 
function pagination(list, numberOfPage) {

    // 100 elements, numberElementsOfOnePage = 100 / 5 = 20
    // numberElementsOfOnePage = 20
    // page = vie
    //page = [
    //[0,1,2,3 ... , 20]
    //[21,22,23 ... , 40]
    //[41,42,... , 80]
    //]

    // from = 0 : to = 20
    // from = 20 : to 40
    // from = 40 : to 80
    // from = 80 : to 100
    const pages = []; //pages est un tableau vide 
    const numberElementsOfOnePage = list.length / numberOfPage; // je divise tout les element par le nombre de pages choisis
    var pageIndex = [0, numberElementsOfOnePage];
    for (let i = 0; i <= numberOfPage - 1; i++) {
        let page = list.filter((el, index2) => {
            //si lindex2 est plus grand ou egale a la page 0 et que index2 est plus petit que la page 1 on retourne ce contenu
            if (index2 >= pageIndex[0] && index2 <= pageIndex[1])
                return el
        })
        if (page.length != 0) pages.push(page)

        let from = pageIndex[0] + numberElementsOfOnePage
        let to = pageIndex[1] + numberElementsOfOnePage;
        pageIndex = [from, to];
    }
    return pages;
}