"use strict";

// Récupération du LS
var getLs = JSON.parse(localStorage.getItem("panier")); // Fonction pour récupérer les produits du LS dans l'API

console.log(getLs); // function apiFetch(){

getLs.map(function (produit) {
  return fetch("http://localhost:3000/api/products/".concat(produit.id)).then(function (products) {
    return products.json();
  }).then(function (data) {
    genererPanier(data, produit); // changeQuantity();
  });
}); // }

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
  prixElement.classList.add("priceElement");
  prixElement.innerText = "".concat(data.price, "\u20AC");
  var divItemContentSett = document.createElement("div");
  divItemContentSett.classList.add("cart__item__content__settings");
  var divItemContentSettQuant = document.createElement("div");
  divItemContentSettQuant.classList.add("cart__item__content__settings__quantity");
  var quantityElement = document.createElement("p");
  quantityElement.innerText = 'Qté :'; // Input pour la quantité -->

  var itemQuantity = document.createElement("input");
  itemQuantity.classList.add("itemQuantity");
  itemQuantity.setAttribute("name", 'itemQuantity');
  itemQuantity.setAttribute("type", 'number');
  itemQuantity.setAttribute("value", produit.quantity);
  itemQuantity.setAttribute("min", '1');
  itemQuantity.setAttribute("max", '100');
  itemQuantity.setAttribute("step", '1');
  var divItemContentSettDel = document.createElement("div");
  divItemContentSettDel.classList.add("cart__item__content__settings__delete");
  var deleteElement = document.createElement("p");
  deleteElement.classList.add("deleteItem");
  deleteElement.innerText = "Supprimer";
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
calculQuantity(); // Le calcul fonctionne seulement pour 1 produit (Récup le price via le dom)

function calculPrixTotal() {
  // let totalPrice = document.querySelector("#totalPrice");
  // let totPrix = [];
  //  Touver comment acceder au price du DOM !
  // test.querySelector("p.priceElement");
  // test.getElementByTagname("p");
  var test = document.getElementsByClassName("priceElement"); // const array = Array.from(test);
  // test.forEach(function (element) {
  //     console.log(element);
  // });

  console.log(test.value); // for (let i = 0; i < getLs.length; i++) {
  //     let prixProd =  parseInt(getLs[i].quantity);
  //     totPrix.push(prixProd);    
  // }
  // const reducer = (accumulator, currentvalue) => accumulator + currentvalue;
  // let totalPrix = totPrix.reduce(reducer);
  // totalPrice.innerText = totalPrix;
}

;
calculPrixTotal(); //  créer une nouvelle qt

function changeQuantity() {
  var itemQuantity = document.querySelectorAll(".itemQuantity");
  itemQuantity.forEach(function (element) {
    element.addEventListener("change", function (event) {
      console.log(getLs);
      var actualQuantity = parseInt(event.target.value);
      console.log(actualQuantity);
      var newQuantity = actualQuantity;
      getLs.quantity = newQuantity;
      console.log(getLs);
      localStorage.setItem("panier", JSON.stringify(getLs));
    });
  });
}

; // faire le bouton supprimer des produits (Tjr addEvent pas une fonction)

function suppElement() {
  var deleteItem = document.querySelectorAll(".deleteItem");
  deleteItem.addEventListener("click", function () {
    localStorage.removeItem(getLs);
  });
}

;
suppElement(); //