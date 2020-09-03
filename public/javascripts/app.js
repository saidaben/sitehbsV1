// const URL="https://opendata.paris.fr/api/records/1.0/search/?dataset=les-titres-les-plus-pretes&q=&rows=1000&facet=type_de_documnt&facet=auteur";


// function getData(){
//     axios //on utilise axios
//     .get(URL) //pr recup (get) les donnees localisées a cette url
//     .then((res) => display(res.data.records)) //si succes requete:on affiche
//     .catch((err) => console.error(err)); //sinn on log err ds la consol

// }
// function display(livres) { //LIVRES est un tableau d'objet
   
// const list = document.getElementById("ouvrages");// on recup le ul ds lequel on veut realiser l'affichage

// livres.forEach((livre) =>{ //parcours de chaques livre avc une boucle
//     const li = document.createElement("li"); //crea li h2 p
//     const h2 = document.createElement("h2"); 
//     const p = document.createElement("p");
   
    
//     li.className = "item";//ajout dune class css
//     h2.textContent = livre.fields.titre; //affichage titre du livre
//     li.appendChild(h2);//on insert le titre ds le li titre enfant de li
//     p.innerHTML = `
//     <span>Nom de l'auteur: ${livre.fields.auteur} </span><br>
//     <span>`; //affichage nom de lauteur
//     li.appendChild(p);//p ds le li
//     li.onclick = handleClick; //avc creatElement on peur associer des listner/handler directement sur lobjet généré
//     list.appendChild(li); //enfin on insere le li constitué ds le il
// });
// }

// function handleClick(evt) { //togle une class css is active sur chaque li cliqué
//     evt.target.classList.toggle("is-active");
// }


// function filterbooks() {
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

// input.oninput = filterbooks//on affiche la list qu'on à  filtré précédement dans l'input 




// getData();//on lance le programme en allant chercher les donnees via l api d'open data paris */}