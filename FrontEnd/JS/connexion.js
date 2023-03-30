// Déclaration des éléments en JS
const formulaireConnexion = document.querySelector('#formulaire-connexion form');
const email = document.querySelector('#email-connexion');
const mdp = document.querySelector('#mdp-connexion');
const messageErreur = document.getElementById("message-erreur-connexion");

// Ajoute un écouteur d'événement lors de la soumission du formulaire
formulaireConnexion.addEventListener('submit', async (event) => {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire

    // Récupère les données
    const emailValeur = email.value;
    const mdpValeur = mdp.value;

    // Envoie une requête POST à l'API d'authentification
    try {
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: emailValeur, password: mdpValeur }),
        });

        // Vérifie le statut de la réponse
        if (response.ok) {
            // Stock le token d'identification communiqué par l'API dans le localStorage et redirige l'utilisateur vers la page d'acceuil
            // La vérification de la présence token se fait au chargement de la page, le code est dans le fichier acces-editeur
            const data = await response.json();
            localStorage.setItem('token', data.token);
            window.location.href = './index.html';

        } else {
            messageErreur.textContent = "Erreur dans l’identifiant ou le mot de passe";
        }

    } catch (error) {
        console.error(error);
        alert('Une erreur est survenue lors de la connexion');
    }
});