"use strict";

// Récupération du LS
var getLs = JSON.parse(localStorage.getItem("panier")); // Fonction pour récupérer les produits du LS dans l'API

console.log(getLs); // function apiFetch(){

getLs.map(function (produit) {
  return fetch("http://localhost:3000/api/products/".concat(produit.id)).then(function (products) {
    return products.json();
  }).then(function (data) {
    genererPanier(data, produit);
    changeQuantity();
    suppElement();
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
  var test = document.querySelectorAll(".priceElement");
  console.log(test);

  for (var i = 0; i < test.length; i++) {
    console.log(test[i].innerHTML); // let prixProd =  parseInt(getLs[i].quantity);
    // totPrix.push(prixProd);    
  } // const reducer = (accumulator, currentvalue) => accumulator + currentvalue;
  // let totalPrix = totPrix.reduce(reducer);
  // totalPrice.innerText = totalPrix;

}

;
calculPrixTotal();

function changeQuantity() {
  var btn_qty = document.querySelectorAll('.itemQuantity');

  var _loop = function _loop(d) {
    btn_qty[d].addEventListener('change', function () {
      // Demander a Thomas, à quoi sert le 10 ? fonctionne sans 
      var qtyModified = parseInt(btn_qty[d].value, 10);
      getLs[d].quantity = qtyModified;
      localStorage.setItem('panier', JSON.stringify(getLs));
      location.reload();
    });
  };

  for (var d = 0; d < btn_qty.length; d++) {
    _loop(d);
  }
}

function suppElement() {
  var deleteItem = document.querySelectorAll(".deleteItem");

  var _loop2 = function _loop2(d) {
    deleteItem[d].addEventListener('click', function () {
      // trouver l'argument pour en supprimer seulement 1
      localStorage.removeItem("panier", JSON.stringify(getLs[d]));
      location.reload();
    });
  };

  for (var d = 0; d < deleteItem.length; d++) {
    _loop2(d);
  }
}

;