"use strict";

// Récupération des données de l'API
function apiFetch() {
  var url = "http://localhost:3000/api/products";
  fetch(url).then(function (products) {
    return products.json();
  }).then(function (data) {
    return genererProducts(data);
  });
}

apiFetch(); // Fonction pour afficher tous les produits de l'API

function genererProducts(data) {
  for (var i = 0; i < data.length; i++) {
    var fiche = data[i];
    var lienElement = document.createElement("a");
    lienElement.href = "./product.html?".concat(fiche._id);
    var articleElement = document.createElement("article");
    var imageElement = document.createElement("img");
    imageElement.src = fiche.imageUrl;
    imageElement.alt = fiche.altTxt;
    var nomElement = document.createElement("h3");
    nomElement.innerText = fiche.name;
    var descriptionElement = document.createElement("p");
    descriptionElement.innerText = fiche.description;
    var sectionItems = document.querySelector('#items');
    sectionItems.appendChild(lienElement);
    lienElement.appendChild(articleElement);
    articleElement.appendChild(imageElement);
    articleElement.appendChild(nomElement);
    articleElement.appendChild(descriptionElement);
  }
}