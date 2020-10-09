console.log("hello world")
const menuBurger = () =>{

    //on recup le btn burger
    const btnresponsive = document.querySelector('.burger');
    
    //on recup la navigation 
    const nav = document.querySelector('.nav-links');
    
    // on recup tous a linterieur de nav et qui correspond au li 
    const Navlinks = document.querySelectorAll('.nav-links li')
    
    btnresponsive.addEventListener('click', () => {
    // changer la classe et lancer l'anim
    
    //on active le btn burger
    btnresponsive.classList.toggle('active');
    //et on active au click la nav mobil 
    nav.classList.toggle('nav-active');
    
    });
    }
    // on rapl on exécute
    menuBurger();

    // afficher mdp
    //on ecoute les clic sur loeil...
    const oeil = document.getElementById("icon-toggle");

    if (oeil !== null) {
        const input = document.getElementById("password");
        const icon = oeil.querySelector(".fas");
        oeil.onclick = (e) => {
            //on recupere la class sur licon
            icon.classList.toggle("fa-eye-slash");
            icon.classList.toggle("fa-eye");
        //si icon contient oeil ouvert on le passe en input text
            if (icon.classList.contains("fa-eye-slash")) {
                input.type = "text";
                //sinn en input password
            } else {
                input.type = "password";
            }
        }
    };

 