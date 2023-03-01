// Récupération des projets depuis l'API
const reponse = await fetch('http://localhost:5678/api/works');
const projets = await reponse.json();
// Transformation des projets en JSON
const valeurProjets = JSON.stringify(projets);

console.log(valeurProjets)

function afficherProjets(projets){
    for (let i = 1; i < projets.length; i++) {

        // Récupération de l'élément du DOM qui accueillera les projets
        const galerie = document.querySelector(".gallery");

        // Création d’une balise dédiée à un projet
        const projet = document.createElement("projet");
        projet.dataset.id = projets[i].id

        // Création des balises 
        const imageProjet = document.createElement("img");
        imageProjet.src = projets[i].imageUrl;

        const nomProjet = document.createElement("h2");
        nomProjet.innerText = projets[i].title;

        // On rattache la balise projet a la section galerie
        galerie.appendChild(projet);

        projet.appendChild(imageProjet);
        projet.appendChild(nomProjet);
    }
}

afficherProjets(projets);