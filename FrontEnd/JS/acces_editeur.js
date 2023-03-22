window.addEventListener('load', async () => {
  const token = localStorage.getItem('token');
  const elements = document.querySelectorAll('.element-editeur');
  const login = document.querySelector('#lien-login');
  // si l'utilisateur est authentifié, afficher les éléments éditeurs
  if (token) {
    elements.forEach(element => {
    element.style.display = 'flex';
    });
    login.style.display = 'none';
  }
});

//Efface le local storage lors de la déconnexion
const effacerLocalStorage = document.getElementById('lien-logout');
effacerLocalStorage.addEventListener('click', () => {
  localStorage.clear();
});