"use strict";

// Récupération du LS
var getLs = JSON.parse(localStorage.getItem("panier")); // Fonction pour récupérer les produits du LS dans l'API

console.log(getLs);

function apiFetch() {
  getLs.map(function (produit) {
    return fetch("http://localhost:3000/api/products/".concat(produit.id)).then(function (products) {
      return products.json();
    }).then(function (data) {
      return genererPanier(data, produit);
    }); // changeQuantity(produit));
  });
}

function genererPanier(data, produit) {
  // DOM
  var articleElement = document.createElement("article");
  articleElement.classList.add("cart__item");
  var divItemImg = document.createElement("div");
  divItemImg.classList.add("cart__item__img");
  var imgElement = document.createElement("img");
  imgElement.src = data.imageUrl;
  imgElement.alt = data.altTxt;
  var divItemContent = document.createElement("div");
  divItemContent.classList.add("cart__item__content");
  var divItemContentDesc = document.createElement("div");
  divItemContentDesc.classList.add("cart__item__content__description");
  var nomElement = document.createElement("h2");
  nomElement.innerText = data.name;
  var couleurElement = document.createElement("p");
  couleurElement.innerText = produit.couleur;
  var prixElement = document.createElement("p");
  prixElement.innerText = "".concat(data.price, "\u20AC");
  var divItemContentSett = document.createElement("div");
  divItemContentSett.classList.add("cart__item__content__settings");
  var divItemContentSettQuant = document.createElement("div");
  divItemContentSettQuant.classList.add("cart__item__content__settings__quantity");
  var quantityElement = document.createElement("p");
  quantityElement.innerText = produit.quantity; // Input pour la quantité -->

  var itemQuantity = document.createElement("input");
  itemQuantity.classList.add("itemQuantity");
  itemQuantity.setAttribute("name", 'itemQuantity');
  itemQuantity.setAttribute("type", 'number');
  itemQuantity.setAttribute("value", '0');
  itemQuantity.setAttribute("min", '1');
  itemQuantity.setAttribute("max", '100');
  itemQuantity.setAttribute("step", '1'); //  S'occuper de l'evenement du clic de changement de quantité (Pb : ne détecte pas le .value fans le fonction)
  // console.log(itemQuantity.value);
  // itemQuantity.addEventListener("click", changeQuantity(produit));
  // 

  var divItemContentSettDel = document.createElement("div");
  divItemContentSettDel.classList.add("cart__item__content__settings__delete");
  var deleteElement = document.createElement("p");
  deleteElement.classList.add("deleteItem");
  deleteElement.innerText = "Supprimer"; // faire le bouton supprimer des produits
  // 
  // Total articles
  // 

  var sectionItems = document.querySelector("#cart__items");
  sectionItems.appendChild(articleElement);
  articleElement.appendChild(divItemImg);
  divItemImg.appendChild(imgElement);
  articleElement.appendChild(divItemContent);
  divItemContent.appendChild(divItemContentDesc);
  divItemContentDesc.appendChild(nomElement);
  divItemContentDesc.appendChild(couleurElement);
  divItemContentDesc.appendChild(prixElement);
  divItemContent.appendChild(divItemContentSett);
  divItemContentSett.appendChild(divItemContentSettQuant);
  divItemContentSettQuant.appendChild(quantityElement);
  divItemContentSettQuant.appendChild(itemQuantity);
  divItemContentSett.appendChild(divItemContentSettDel);
  divItemContentSettDel.appendChild(deleteElement);
}

; //  fonction pour le calcul total des articles 

function calculQuantity() {
  var totalQuantity = document.querySelector("#totalQuantity");
  var totQuant = [];

  for (var i = 0; i < getLs.length; i++) {
    var quantProd = parseInt(getLs[i].quantity);
    totQuant.push(quantProd);
  } // Addition des produits


  var reducer = function reducer(accumulator, currentvalue) {
    return accumulator + currentvalue;
  };

  var totalArticles = totQuant.reduce(reducer); // 

  totalQuantity.innerText = totalArticles;
}

;
calculQuantity(); // //  trouver comment utiler data et produit
// function calculPrixTotal (data, produit) {
//     let totalPrice = document.querySelector("#totalPrice");
//     let totPrix = [];
//     const prixProd = parseInt(produit.quantity) * data.price;
//     for (let i = 0; i < getLs.length; i++) {
//         const prixProd = parseInt(getLs[i].quantity) * console.log(data.price);
//         totPrix.push(prixProd);
//         } 
//    totalPrice.innerText = prixProd
// }
// calculPrixTotal ();

function changeQuantity() {
  var itemQuantity = document.querySelectorAll(".itemQuantity");
  console.log(itemQuantity.length);
  itemQuantity.addEventListener("change", function () {
    var newQuantity = parseInt(produit.quantity) + parseInt(itemQuantity.value);
    var panier = {
      id: produit.id,
      couleur: produit.couleur,
      quantity: newQuantity
    };
    localStorage.setItem("panier", JSON.stringify(panier));
    location.reload();
  });
}

;
changeQuantity();
apiFetch();