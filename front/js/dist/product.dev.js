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
  } // // comment ajouter différent produit dans le LS ?
  //         if(localStorage.setItem("produit") != localStorage.setItem("produit"))
  //         localStorage.setItem.push;
  //     });

}

; // function savePanier(panier) {
//     const ajoutPanier = document.getElementById("addToCart");
//     ajoutPanier.addEventListener("click", () => {
//         const couleur = document.getElementById("colors").value;
//         const quantity = document.getElementById("quantity").value;
//         const panier = {"id" : produit, "couleur" : couleur, "quantité" : quantity};
//         localStorage.setItem("panier", JSON.stringify(panier));
//     })
// };

var getLs = JSON.parse(localStorage.getItem("panier"));

function addPanier() {
  var couleur = document.getElementById("colors").value;
  var quantity = document.getElementById("quantity").value;
  var panier = {
    id: produit,
    couleur: couleur,
    quantité: quantity
  };
  var getLs = JSON.parse(localStorage.getItem("panier"));
  getLs.forEach(function (element, key) {
    if (element.id === produit && element.couleur === couleur) {
      // getLs{key}.quantité = element.quantité + quantity
      alert("oui");
    } else {
      localStorage.setItem("panier", JSON.stringify(panier));
    }
  });

  if (panier.id == panier.id) {
    panier.quantité += quantity;
  } else {
    panier.push;
  }
}

;
var ajoutPanier = document.getElementById("addToCart");
ajoutPanier.addEventListener("click", addPanier); // function getPanier() {
//    let panier = localStorage.getItem("panier");
//    if( panier == null){
//         return [];
//    } else {
//     return JSON.parse(panier);
//    }
// };
// function addPanier(produit) {
//     let panier = getPanier();
//     let foundProduit = panier.find(p => p.id == panier.id);
//     if(foundProduit != undefined) {
//         panier.quantity++;
//     }else{
//         panier.quantity =1;
//         panier.push(produit);
//     }
//     savePanier(panier);
// };
// addPanier();
// console.log()