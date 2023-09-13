"use strict";

// Récupération de l'id dans l'Url
var produit = window.location.search.split("?").join(""); // Récupération des données du produit grâce à l'id

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
var ajoutPanier = document.getElementById("addToCart");
ajoutPanier.addEventListener("click", addPanier); //   fonction pour ajouter un produit au panier

function addPanier(e) {
  var couleur = document.getElementById("colors").value;
  var quantity = document.getElementById("quantity").value;

  if (quantity < 1 || quantity > 100) {
    alert("Veuillez choisir un  nombre entre 1 et 100 svp");
    e.preventDefault();
  } else if (couleur === "") {
    alert("Veuillez choisir une couleur svp");
    e.preventDefault();
  } else {
    var panier = {
      id: produit,
      couleur: couleur,
      quantity: parseInt(quantity)
    };
    var getLs = JSON.parse(localStorage.getItem("panier")) || [];
    var update = false;

    if (getLs) {
      getLs.forEach(function (element, key) {
        if (element.id === produit && element.couleur === couleur) {
          getLs[key].quantity = parseInt(element.quantity) + parseInt(quantity);
          localStorage.setItem("panier", JSON.stringify(getLs));
          update = true;
          location.reload();
        }
      });

      if (!update) {
        getLs.push(panier);
        localStorage.setItem("panier", JSON.stringify(getLs));
        location.reload();
      }
    } else {
      getLs = [];
      localStorage.setItem("panier", JSON.stringify(panier));
      location.reload();
    }
  }
}

;