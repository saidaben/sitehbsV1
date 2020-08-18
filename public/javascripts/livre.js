const URL = "https://opendata.paris.fr/api/records/1.0/search/?dataset=les-titres-les-plus-pretes&q=&rows=1000&facet=type_de_documnt&facet=auteur";
const list = document.getElementById("ouvrage"); //On récupère notre URL, on appel notre ul  list
const input = document.getElementById("input"); //on récupère notre input

function getData() {
    axios //on utilise axios
        .get(URL) //pr recup (get) les donnees localisées a cette url
        .then((res) => display(res.data.records)) //si succes requete:on affiche
        .catch((err) => console.error(err)); //sinn on log err ds la consol

}

function display(livres) { //stations est un tableau d'objet

    const list = document.getElementById("ouvrages"); // on recup le ul ds lequel on veut realiser l'affichage

    livres.forEach((livre) => { //parcours de chaques station avc une boucle
        const li = document.createElement("li"); //crea li h2 p
        const h2 = document.createElement("h2");
        const h4 = document.createElement("h4")
        const p = document.createElement("p");
        const pix = document.createElement("figure")

        li.className = "item"; //ajout dune class css
        h2.textContent =  livre.fields.titre; //affichage nom station
        h2.style.color = "grey";
        h4.textContent = livre.fields.type_de_documnt
        li.appendChild(h2); //on insert le titre ds le li titre enfant de li
       li.appendChild(h4);
       h4.style.color = "#ffa8d2";
        p.innerHTML = `
    <span>De: ${livre.fields.auteur} </span><br> `; //affichage info de dispo
        p.style.margin = "20px"
        li.appendChild(p); //p ds le li
        li.onclick = handleClick; //avc creatElement on peur associer des listner/handler directement sur lobjet généré
        list.appendChild(li); //enfin on insere le li constitué ds le il
        // pix.innerHTML= " <img src=../assets/img/img-livre.png' width=\'100px\' height=\'100px\>";
        pix.innerHTML= `<img class="imglivre" src=images/img-livre.png >`;

li.appendChild(pix);
    });
}

function handleClick(evt) { //togle une class css is active sur chaque li cliqué
    evt.target.classList.toggle("is-active");
}




function filterbooks() {
    const filter = input.value.toUpperCase(); // transf en majuscule pour pouvoir tout rechercher. filter= a la valeur de input
    let li = document.getElementsByTagName("li"); //on appelle notre li 
    for (let i = 0; i < li.length; i++) { // on boucle tout les li et compare le contenu html  de chacun des li
        if (li[i].textContent.toUpperCase().indexOf(filter) > -1) { //indexoff donne 
            // la position numerique de la chaine filter que tu cherche


            //si c'est superieur à -1  il l'a trouvé 
            li[i].style.display = ""; //il l'affiche alors ds l'input.

        } else {
            li[i].style.display = "none" //sinon il le masque on cache le li

        }
    }
}

input.oninput = filterbooks //on affiche la list qu'on à  filtré précédement dans l'input 




getData(); //on lance le programme en allant chercher les donnees via l api d'open data paris */}



//api sortie a paris



// const URLB = "https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=&rows=660&facet=category&facet=tags&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type&refine.tags=Enfants";
// const list = document.getElementById("sortie"); //On récupère notre URL, on appel notre ul  list
// const input = document.getElementById("inputb"); //on récupère notre input

// function getDatab(){
//     axios //on utilise axios
//     .get(URLB) //pr recup (get) les donnees localisées a cette url
//     .then((res) => displayb(res.data.records)) //si succes requete:on affiche
//     .catch((err) => console.error(err)); //sinn on log err ds la consol

// }
// function displayb(sorties) { //stations est un tableau d'objet
   
// const list = document.getElementById("sortie");// on recup le ul ds lequel on veut realiser l'affichage

// sorties.forEach((sortie) =>{ //parcours de chaques sortie avc une boucle
//     const li = document.createElement("li"); //crea li h2 p
//     const h3 = document.createElement("h3"); 
//     const h4 = document.createElement("h4"); 
//     const h6 = document.createElement("h6")
//     const p = document.createElement("p");
//     const pix = document.createElement("figure")
//     const button = document.createElement ("button")
//     // const h6 = document.createElement()
   
    
//     li.className = "item";//ajout dune class css
//     h3.textContent =  sortie.fields.category ;
//      //affichage category titre
//     h3.style.color = "grey";
//     h4.textContent =  sortie.fields.title;
//     h4.style.color = "yellow";
//     h4.style.margin = "10px 10px 10px 10px";
//     pix.innerHTML= " <img src=\'https://www.sortiraparis.com/resources/header_logo_default_82/1584729976.png\' width=\'200px\' height=\'50px\'>";
//     pix.style.margin= "20px 10px 20px 10px";
//     h6.innerHTML = ` ${sortie.fields.date_description}  <br> Tarif:  ${sortie.fields.price_type} <br> Adresse:
//     ${sortie.fields.address_name} `;
//     button.innerHTML = `<a href="${sortie.fields.contact_url}">En savoir plus </button> </a>`; 

//     li.appendChild(h3);//on insert le titre ds le li titre enfant de li
//     li.appendChild(h4);
//     li.appendChild(pix)
//     li.appendChild(h6);
    
//     p.innerHTML = `
//      <br> ${sortie.fields.lead_text} <br> `; //affichage descr
//    p.style.margin = "30px";
//    p.style.textAlign ="justify"
//    p.style.fontSize ="20px" ;
   
//     li.appendChild(p);//p ds le li
//     li.appendChild(button);
//     li.onclick = handleClickb; //avc creatElement on peur associer des listner/handler directement sur lobjet généré
//     list.appendChild(li);
//      //enfin on insere le li constitué ds le il
    
// });
// }

// function handleClickb(evt) { //togle une class css is active sur chaque li cliqué
//     evt.target.classList.toggle("is-active");
// }




// function filtersorties() {
//     const filter = input.value.toUpperCase(); // transf en majuscule pour pouvoir tout rechercher. filter= a la valeur de input
//     let li = document.getElementsByTagName("li"); //on appelle notre li 
//     for (let i = 0; i < li.length; i++) { // on boucle tout les li et compare le contenu html  de chacun des li
//         if (li[i].textContent.toUpperCase().indexOf(filter) > -1) { //indexoff donne 
//             // la position numerique de la chaine filter que tu cherche


//             //si c'est superieur à -1  il l'a trouvé 
//             li[i].style.display = ""; //il l'affiche alors ds l'input.

//         } else {
//             li[i].style.display = "none" //sinon il le masque on cache le li

//         }
//     }
// }

// input.oninput = filtersorties //on affiche la list qu'on à  filtré précédement dans l'input 




// getDatab();//on lance le programme en allant chercher les donnees via l api d'open data paris */}




