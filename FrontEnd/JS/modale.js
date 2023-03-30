// Déclaration de tous les éléments en JS
const lienModale = document.querySelector('#lien-edition-projets');
const arriereModale = document.querySelector('#arriere-modale');
const modaleProjets = document.querySelector('#modale-projets');
const modaleAjout = document.querySelector('#modale-ajout');
const boutonFermer = document.querySelector('.fa-xmark');
const boutonRetour = document.querySelector('.fa-arrow-left')
const boutonAjout = document.querySelector('#bouton-vers-modale-ajout');
const formulaireAjout = document.querySelector('#formulaire-ajout');
const erreurEnvoi = document.querySelector('#erreur-envoi');
const filtres = document.querySelector('.filtres');


async function recuperationProjets(){
  const response = await fetch('http://localhost:5678/api/works');
  const projets = await response.json();
  console.log(projets);
  return projets;
}



// Affiche les projets dans la première modale
function afficherProjetsModale(projets){
  const galerieModale = document.querySelector("#galerie-modale");
  // "Nettoie la galerie avant de l'ouvrir pour éviter les doubles lors de l'appel au moment de l'ajout d'un nvx projet"
  galerieModale.innerHTML = "";

  for (const projet of projets) {

      const projetModale = document.createElement("figure");
      projetModale.dataset.id = projet.id;
      projetModale.style.position = "relative";

      const imageProjetModale = document.createElement("img");
      imageProjetModale.src = projet.imageUrl;

      const iconeSupprimer = document.createElement("a");
      iconeSupprimer.className = "fa-solid fa-trash-can";
      iconeSupprimer.href = "#";
      iconeSupprimer.addEventListener("click", async function() {
          const confirmation = confirm("Voulez-vous vraiment supprimer ce projet ?");
          if (confirmation) {
              const idProjet = projetModale.dataset.id;
              await supprimerProjet(idProjet);
              projetModale.remove();
          }
      });
      
      galerieModale.appendChild(projetModale);
      projetModale.appendChild(imageProjetModale);
      projetModale.appendChild(iconeSupprimer);
  }
}



// Ouvre la modale 1 projets
const ouvertureModaleProjets = async function(event) {
  event.preventDefault();
  const projets = await recuperationProjets();

  afficherProjetsModale(projets);
  arriereModale.style.display = 'flex';
  modaleProjets.style.display = 'flex';
  modaleAjout.style.display = "none";

  arriereModale.addEventListener('click', fermetureModale);
  boutonFermer.addEventListener('click', fermetureModale);
  modaleProjets.addEventListener('click', stopPropagation);
  boutonAjout.addEventListener('click', ouvertureModaleAjout);
}

lienModale.addEventListener('click', ouvertureModaleProjets);

const stopPropagation = function (event) {
    event.stopPropagation()
}



// Ouvre la modale 2 d'ajout et cache la modale 1
const ouvertureModaleAjout = function(event) {
  //*****Pourquoi querySelectorAll ne fontionne pas sur les i croix pour les boutons fermer des deux modales? */
  const boutonFermerAjout = document.querySelector('#bouton-fermer-modale-ajout');
  event.preventDefault();

  modaleAjout.style.display = 'flex';
  ajoutImage.style.display = 'flex';
  previewImage.style.display = "none";
  modaleProjets.style.display = "none";
  //supprimer le titre précédemment entré
  title.value = null;
  boutonEnvoyer.style.backgroundColor = '#A7A7A7';
  
  formulaireAjout.addEventListener('submit',envoyerFormulaire);
  boutonFermerAjout.addEventListener('click', fermetureModale);
  modaleAjout.addEventListener('click', stopPropagation);
  boutonRetour.addEventListener('click', ouvertureModaleProjets);
}



// Ferme les modales
const fermetureModale = function(event) {
  event.preventDefault();

  arriereModale.style.display = "none";
  modaleProjets.style.display = "none";
  modaleAjout.style.display = "none";
  erreurEnvoi.style.display = "none";
}



// Suppression d'un projet
const token = localStorage.getItem('token');

function supprimerProjet(idProjet) {

  fetch(`http://localhost:5678/api/works/${idProjet}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`
      }
  })

  .then(response => {
    if (!response.ok) {
      throw new Error('Une erreur est survenue.');
    }

    // Supprime le projet du DOM pour qu'il disparaisse de la galerie d'acceuil sans avoir à recharger la page
    const projetSupprime = document.querySelector(`[data-id="${idProjet}"]`);
    const galerie = document.querySelector(".gallery");
    galerie.removeChild(projetSupprime); 
  })
}



// Ajout d'un nouveau projet
function envoyerFormulaire(event) {
  event.preventDefault();

  const title = document.querySelector('#title');
  const image = document.querySelector('#input-image');
  const category = document.querySelector('#category');

  console.log(!title.value || !image.value || !category.value);
  if (!title.value || !image.value || !category.value)  {
    erreurEnvoi.style.display = 'block';
  }
  else {
    erreurEnvoi.style.display = "none";
  }

  const formData = new FormData(formulaireAjout);

  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData,
  })

  .then(response => {
    if (!response.ok) {
    throw new Error('Une erreur est survenue.');
    }
    return response.json();
  })

  // Ajoute le projet dans le DOM pour l'afficher dans la galerie acceuil sans recharger la page
  .then(data => {
    const projetElement = document.createElement("figure");
    projetElement.dataset.id = data.id;

    const imageProjet = document.createElement("img");
    imageProjet.src = data.imageUrl;

    const nomProjet = document.createElement("p");
    nomProjet.innerText = data.title;

    const galerie = document.querySelector(".gallery");
    galerie.appendChild(projetElement);
    projetElement.appendChild(imageProjet);
    projetElement.appendChild(nomProjet);

    // Ferme la modale après ajout d'un nouveau projet
    fermetureModale(event);
  })

  .catch(error => {
    console.error(error);
  });
}



// Preview de la photo dans la modale ajout
const image = document.querySelector('#input-image');
const ajoutImage = document.querySelector('#ajout-image');
const previewImage = document.querySelector('#preview-image');

image.addEventListener('change', () => {
    
  // Obtient le fichier sélectionné
  const file = image.files[0];

  // Créé un objet de lecteur de fichier
  const reader = new FileReader();

  reader.addEventListener('load', () => {
      // Met à jour la source de l'image     
      previewImage.setAttribute('src', reader.result);
      previewImage.style.display = 'flex';
      ajoutImage.style.display = "none";
  });

  // Lis le contenu du fichier comme une URL de données
  reader.readAsDataURL(file);
});



// Change la couleur du bouton valider si tous les champs sont remplis
const title = document.getElementById('title');
const category = document.getElementById('category');
const boutonEnvoyer = document.getElementById('bouton-modale-ajout');

const boutonVert = () => {
  if (image.value && title.value && category.value) {
    boutonEnvoyer.style.backgroundColor = '#1D6154';
    boutonEnvoyer.disabled = false;
  } else {
    boutonEnvoyer.style.backgroundColor = '#A7A7A7';

  }
};

image.addEventListener('input', boutonVert);
title.addEventListener('input', boutonVert);
category.addEventListener('input', boutonVert);