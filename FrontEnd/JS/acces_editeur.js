// Vérifier si l'utilisateur est authentifié avant de permettre l'accès à la page d'accueil
window.addEventListener('load', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        // si l'utilisateur n'est pas authentifié, redirige-le vers la page de connexion
        window.location.href = 'http://127.0.0.1:5500/FrontEnd/connexion.html';
    }
});