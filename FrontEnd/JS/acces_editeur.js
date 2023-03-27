// Ajoute un écouteur d'évènement lors du chargement de la page pour vérifier la présence du token (= l'utilisateur est connecté)
window.addEventListener('load', async () => {
  const token = localStorage.getItem('token');
  const elements = document.querySelectorAll('.element-editeur');
  const login = document.querySelector('#lien-login');
  
  // Si le token est bien présent, affiche les éléments éditeurs et ajoute une marge-top au body pour ne pas que le bandeau éditeur se superpose
  if (token) {
    elements.forEach(element => {
    element.style.display = null;
    });
    login.style.display = 'none';
    document.body.style.marginTop = '60px';
  }
});

// Lorsque l'on appuie sur le bouton logout, efface le local storage pour cacher les éléments éditeurs à nouveau
const logout = document.getElementById('lien-logout');

logout.addEventListener('click', () => {
  localStorage.clear();
});