// Récupération des projets depuis l'API
const response = await fetch('http://localhost:5678/api/works');
const projets = await response.json();

// Affiche les projets sur la page d'acceuil
function afficherProjets(projets){
    // Récupération de l'élément du DOM qui accueillera les projets
    const galerie = document.querySelector(".gallery");

    for (const projet of projets) {

        // Création d’une balise dédiée à un projet
        const projetElement = document.createElement("figure");
        projetElement.dataset.id = projet.id

        const imageProjet = document.createElement("img");
        imageProjet.src = projet.imageUrl;

        const nomProjet = document.createElement("p");
        nomProjet.innerText = projet.title;

        // On rattache la balise projet a la section galerie
        galerie.appendChild(projetElement);
        projetElement.appendChild(imageProjet);
        projetElement.appendChild(nomProjet);
    }
}
afficherProjets(projets);

// Filtre les projets en fonction des catégories
const boutonFiltreTous = document.querySelector("#bouton-filtre-tous");

boutonFiltreTous.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    afficherProjets(projets);
});

const boutonFiltreObjets = document.querySelector("#bouton-filtre-objets");

boutonFiltreObjets.addEventListener("click", function () {
    const projetsFiltres = projets.filter(function (projets) {
        return projets.category.name == "Objets";
    });
    document.querySelector(".gallery").innerHTML = "";
    afficherProjets(projetsFiltres);
});

const boutonFiltreAppartements = document.querySelector("#bouton-filtre-appartements");

boutonFiltreAppartements.addEventListener("click", function () {
    const projetsFiltres = projets.filter(function (projets) {
        return projets.category.name == "Appartements";
    });
    document.querySelector(".gallery").innerHTML = "";
    afficherProjets(projetsFiltres);
});

const boutonFiltreHotelsRestaurants = document.querySelector("#bouton-filtre-hotels-restaurants");

boutonFiltreHotelsRestaurants.addEventListener("click", function () {
    const projetsFiltres = projets.filter(function (projets) {
        return projets.category.name == "Hotels & restaurants";
    });
    document.querySelector(".gallery").innerHTML = "";
    afficherProjets(projetsFiltres);
});