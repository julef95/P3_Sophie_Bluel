// 1. Récupérer le formulaire et les champs email et mot de passe
const formulaireConnexion = document.querySelector('#formulaireConnexion');
const email = document.querySelector('#email');
const mdp = document.querySelector('#mdp');
const messageErreur = document.getElementById("messageErreur");

// 2. Ajouter un écouteur d'événement sur la soumission du formulaire
formulaireConnexion.addEventListener('submit', async (event) => {
    event.preventDefault(); // empêcher le comportement par défaut du formulaire

    // 3. Récupérer les valeurs des champs email et mot de passe
    const emailValeur = email.value;
    const mdpValeur = mdp.value;

    // 4. Envoyer une requête POST à l'API d'authentification
    try {
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: emailValeur, password: mdpValeur }),
        });

        // 5. Vérifier le code de statut de la réponse
        if (response.ok) {
            //stock le token d'identification dans le localStorage
            const data = await response.json();
            localStorage.setItem('token', data.token);
            // redirige l'utilisateur vers la page d'accueil
            window.location.href = 'http://127.0.0.1:5500/FrontEnd/index.html';
        } else {
            messageErreur.textContent = "Email ou mot de passe incorrect";
        }

    } catch (error) {
        console.error(error);
        alert('Une erreur est survenue lors de la connexion');
    }
});