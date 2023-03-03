// Récupération des projets depuis l'API
const reponse = await fetch('http://localhost:5678/api/works');
const projets = await reponse.json();
// Transformation des projets en JSON
const valeurProjets = JSON.stringify(projets);

console.log(valeurProjets)

function afficherProjets(projets){
    for (let i = 0; i < projets.length; i++) {

        // Récupération de l'élément du DOM qui accueillera les projets
        const galerie = document.querySelector(".gallery");

        // Création d’une balise dédiée à un projet
        const projet = document.createElement("projet");
        projet.dataset.id = projets[i].id

        // Création des balises 
        const imageProjet = document.createElement("img");
        imageProjet.src = projets[i].imageUrl;

        const nomProjet = document.createElement("p");
        nomProjet.innerText = projets[i].title;

        // On rattache la balise projet a la section galerie
        galerie.appendChild(projet);

        projet.appendChild(imageProjet);
        projet.appendChild(nomProjet);
    }
}

afficherProjets(projets);

const boutonFiltreTous = document.querySelector("#boutonFiltreTous");

boutonFiltreTous.addEventListener("click", function () {
    const projetsFiltres = projets.filter(function (projets) {
        return projets;
    });
    document.querySelector(".gallery").innerHTML = "";
    afficherProjets(projetsFiltres);
    console.log(projetsFiltres);
});

const boutonFiltreObjets = document.querySelector("#boutonFiltreObjets");

boutonFiltreObjets.addEventListener("click", function () {
    const projetsFiltres = projets.filter(function (projets) {
        return projets.category.name == "Objets";
    });
    document.querySelector(".gallery").innerHTML = "";
    afficherProjets(projetsFiltres);
    console.log(projetsFiltres);
});

const boutonFiltreAppartements = document.querySelector("#boutonFiltreAppartements");

boutonFiltreAppartements.addEventListener("click", function () {
    const projetsFiltres = projets.filter(function (projets) {
        return projets.category.name == "Appartements";
    });
    document.querySelector(".gallery").innerHTML = "";
    afficherProjets(projetsFiltres);
    console.log(projetsFiltres);
});

const boutonFiltreHotelsRestau = document.querySelector("#boutonFiltreHotelsRestau");

boutonFiltreHotelsRestau.addEventListener("click", function () {
    const projetsFiltres = projets.filter(function (projets) {
        return projets.category.name == "Hotels & restaurants";
    });
    document.querySelector(".gallery").innerHTML = "";
    afficherProjets(projetsFiltres);
    console.log(projetsFiltres);
});