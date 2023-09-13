"use strict";

//  Récuperer l'Id de commande
var commandeId = window.location.search.split("?id=").join("");
var orderId = document.querySelector('#orderId');
orderId.innerHTML = commandeId;
localStorage.clear();