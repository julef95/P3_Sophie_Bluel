// Récupération des projets depuis l'API
const reponse = await fetch('http://localhost:5678/api/works');
const projets = await reponse.json();
// Transformation des projets en JSON
const valeurProjets = JSON.stringify(projets);

const fermetureModale = function(event) {
    event.preventDefault();
    const modale = document.querySelector('#modale-galerie');
    const divmodale = document.querySelector('#divmodale-galerie');
    const BoutonFermer = document.querySelector('#bouton-fermer');
    modale.style.display = "none";
    divmodale.style.display = "none";
    BoutonFermer.removeEventListener('click', fermetureModale);
    divmodale.removeEventListener('click', stopPropagation);
}

const ouvertureModale = function(event) {
    event.preventDefault();
    const modale = document.querySelector('#modale-galerie');
    const divmodale = document.querySelector('#divmodale-galerie');
    const BoutonFermer = document.querySelector('#bouton-fermer');
    modale.style.display = null;
    divmodale.style.display = null;
    modale.addEventListener('click', fermetureModale);
    BoutonFermer.addEventListener('click', fermetureModale);
    divmodale.addEventListener('click', stopPropagation);
}

const stopPropagation = function (event) {
    event.stopPropagation()
}

const lienModale = document.querySelector('#edition-projets');
lienModale.addEventListener('click', ouvertureModale);

function afficherProjetsModale(projets){
    for (let i = 0; i < projets.length; i++) {

        // Récupération de l'élément du DOM qui accueillera les projets
        const galerieModale = document.querySelector("#galerie-modale");

        // Création d’une balise dédiée à un projet
        const projetModale = document.createElement("projet");
        projetModale.dataset.id = projets[i].id

        // Création des balises 
        const imageProjetModale = document.createElement("img");
        imageProjetModale.src = projets[i].imageUrl;

        // On rattache la balise projet a la section galerie
        galerieModale.appendChild(projetModale);
        projetModale.appendChild(imageProjetModale);
    }
}

afficherProjetsModale(projets);