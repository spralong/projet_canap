"use strict";

// Récupération de l'id dans l'Url
var produit = window.location.search.split("?").join("");
console.log(produit);
var produitData = []; // Récupération des données du produit grâce à l'id

var fetchProduit = function fetchProduit() {
  fetch("http://localhost:3000/api/products/".concat(produit)).then(function (res) {
    return res.json();
  }).then(function (promise) {
    genererProduct(promise);
  });
};

fetchProduit(); // Création du DOM 

function genererProduct(promise) {
  var imageElement = document.createElement("img");
  imageElement.src = promise.imageUrl;
  var titreElement = document.getElementById("title");
  titreElement.textContent = promise.name;
  var prixElement = document.getElementById("price");
  prixElement.textContent = promise.price;
  var descriptionElement = document.getElementById("description");
  descriptionElement.textContent = promise.description;
  var sectionItems = document.querySelector(".item__img");
  sectionItems.appendChild(imageElement); // Boucle pour le menu déroulant des couleurs

  for (var i = 0; i < promise.colors.length; i++) {
    var colorsElement = document.createElement("option");
    colorsElement.textContent = promise.colors[i];
    var sectionColors = document.getElementById("colors");
    sectionColors.appendChild(colorsElement);
  }
}

;