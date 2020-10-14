const URLB = "https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=&rows=400&facet=category&facet=tags&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type&refine.tags=Enfants";
const list = document.getElementById("sortie"); //On récupère notre URL, on appel notre ul  list
const input = document.getElementById("inputb"); //on récupère notre input
const erreur = document.getElementById("erreur"); //on recupere le p 

function getDatab(page) {
    axios //on utilise axios
        .get(URLB) //pr recup (get) les donnees localisées a cette url
        //.then((res) =>console.log("here")) si succes requete:on affiche
        .then((res) => start(res.data.records, page)) //si succes requete:on affiche
        .catch((err) => console.error(err)); //sinn on log err ds la consol
}

getDatab(0); //on lance le programme en allant chercher les donnees via l api d'open data paris */}

function start(res, page) {
    const sorties = res
    const pagination1 = pagination(sorties, 6)
    console.log(pagination1)
    displayb(pagination1, page)
}

function displayb(pagination, page) { //stations est un tableau d'objet

    const list = document.getElementById("sortie"); // on recup le ul ds lequel on veut realiser l'affichage
    list.innerHTML = "";
    const sorties = pagination[page]
    console.log("<<<", sorties)
    sorties.forEach((sortie) => { //parcours de chaques sortie avc une boucle
        const li = document.createElement("li"); //crea li h2 p
        const h3 = document.createElement("h3");
        const h4 = document.createElement("h4");
        const h6 = document.createElement("h6")
        const div = document.createElement("div")
        const p = document.createElement("p");
        const pix = document.createElement("figure");
        const button = document.createElement("button");
        // const h6 = document.createElement()


        li.className = "item"; //ajout dune class css
        h3.textContent = sortie.fields.category;
        //affichage category titre
        h3.style.color = "grey";
        h3.style.backgroundColor = "lavenderblush";
        h4.textContent = sortie.fields.title;
        h4.style.color = "#ffa8d2";
        h4.style.margin = "10px 10px 10px 10px";
        pix.innerHTML = `<img itemprop="image" class="imgsortie" src=images/sortie.jpg >`;
        pix.style.margin = "20px 10px 20px 10px";

        div.innerHTML = `<figure class="info-sortie" itemprop="date"> <img  itemprop="date" class="date teste" src=images/date.png> ${sortie.fields.date_description}</figure>  
<figure class="info-sortie"itemprop="prix" > <img  itemprop="price" class="price teste" src=images/price.png>Tarif:  ${sortie.fields.price_type}</figure>   
<figure class="info-sortie" itemprop="adressLocality"><img  itemprop="streetAddress" class="date teste" src=images/lieux.png> Adresse:${sortie.fields.address_name} 
<br>  ${sortie.fields.address_zipcode}  ${sortie.fields.address_city}  </figure>  
 `;
        div.className = "itemscope";
        div.style.backgroundColor = "lavenderblush";
        div.style.width = "100%";
        h6.style.paddingBottom = "20px";
        h6.style.fontSize = "15px";

        button.innerHTML = `<a itemprop="email" target="_blank" href="${sortie.fields.contact_url}">En savoir + </button> </a >`;
        button.style.backgroundColor = "lavenderblush";
        button.style.borderColor = "black";
        button.style.height = "40px";
        button.style.width = "90px";

        li.appendChild(h3); //on insert le titre ds le li titre enfant de li
        li.appendChild(h4);
        li.appendChild(pix)
        li.appendChild(div);
        li.appendChild(h6);

        p.innerHTML = `
        ${sortie.fields.lead_text} `; //affichage descr
        p.style.margin = "30px";
        p.style.textAlign = "center"
        p.style.fontSize = "20px";

        li.appendChild(p); //p ds le li
        li.appendChild(button);
        li.onclick = handleClickb; //avc creatElement on peur associer des listner/handler directement sur lobjet généré
        list.appendChild(li);
        //enfin on insere le li constitué ds le il

    });
    afficherpagination(pagination)
}

function handleClickb(evt) { //togle une class css is active sur chaque li cliqué
    evt.target.classList.toggle("is-active");

}




function filtersorties() {
    const filter = input.value.toUpperCase(); // transf en majuscule pour pouvoir tout rechercher. filter= a la valeur de input
    let li = document.getElementsByTagName("li"); //on appelle notre li 
    for (let i = 0; i < li.length; i++) { // on boucle tout les li et compare le contenu html  de chacun des li
        if (li[i].textContent.toUpperCase().indexOf(filter) > -1) { //indexoff donne 
            // la position numerique de la chaine filter que tu cherche


            //si c'est superieur à -1  il l'a trouvé 
            li[i].style.display = ""; //il l'affiche alors ds l'input.

        } else {
            li[i].style.display = "none" //sinon il le masque on cache le li
            erreur.innerHTML = `Oups! aucune sortie trouvée, verifiez l'orthographe.` //et on affiche un message d'erreur

        }
    }
}

if ( input!=null) input.oninput = filtersorties //sinon null, /on affiche la list qu'on à  filtré précédement dans l'input 


//on recup le ul et la fonction pagination avc les livre et le nombre de page voulu en params
function afficherpagination(sorties) {

    const paginationElement = document.getElementById("pages-sorties")
    paginationElement.innerHTML = "" //on vide le ul 
    for (let i = 0; i < sorties.length; i += 1) {
        paginationElement.innerHTML += //et on fait une boucle pr ajouter un li le remplir a chaque tour d'une page 
            ` <li> <button class="dropbtn btn-pagination" data-page=${i+1}> <i class="fas fa-angle-right"></i>${i+1} </button></li> 
`
    }
    //on recup le les li généré en haut 
    const allLi = document.querySelectorAll(".btn-pagination")
    allLi.forEach((li, i) => { //on boucle dessus pr ajouter un onclick a chacun 
        li.onclick = () => getDatab(i)
    })

}

function pagination(list, numberOfPage) {
    const pages = [];
    const numberElementsOfOnePage = list.length / numberOfPage; // je divise tout les element par le nombre de pages choisis
    var pageIndex = [0, numberElementsOfOnePage];
    for (let i = 0; i <= numberOfPage - 1; i++) {
        let page = list.filter((el, b) => b <= pageIndex[1] && b >= pageIndex[0])
        if (page.length != 0) pages.push(page)

        let from = pageIndex[0] + numberElementsOfOnePage,
            to = pageIndex[1] + numberElementsOfOnePage;
        pageIndex = [from, to];
    }
    return pages;
}