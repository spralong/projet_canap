//  Récuperer l'Id de commande
const commandeId = window.location.search.split("?id=").join("");

const orderId = document.querySelector('#orderId');
orderId.innerHTML = commandeId;

localStorage.clear();