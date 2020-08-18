console.log("hello world")
const menuBurger = () =>{

    const btnresponsive = document.querySelector('.burger');
    
    const nav = document.querySelector('.nav-links');
    
    // tout a linterieur de nav et qui correspond au li 
    const Navlinks = document.querySelectorAll('.nav-links li')
    
    btnresponsive.addEventListener('click', () => {
    // changer la classe et lancer l'anim
    
    btnresponsive.classList.toggle('active');
    nav.classList.toggle('nav-active');
    
    });
    }
    // on rapl on exécute
    menuBurger();