"use strict";

// Récupération du LS
var getLs = JSON.parse(localStorage.getItem("panier"));

if (getLs) {
  Promise.all(getLs.map(function (produit) {
    return fetch("http://localhost:3000/api/products/".concat(produit.id)).then(function (products) {
      return products.json();
    }).then(function (data) {
      genererPanier(data, produit);
    });
  })).then(function () {
    changeQuantity();
    ExecDelete();
    calculQuantity();
    calculPrixTotal();
    validForm();
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
  deleteElement.id = produit.id + produit.couleur;
  deleteElement.addEventListener("click", function (e) {
    ExecDelete(e.target.id);
  });
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
  divItemContentSettDel.appendChild(deleteElement); // 
  // const lienConfirmation = document.createElement("a");
  // lienConfirmation.href = './confirmation.html';
  // const btnCommander = document.querySelector("cart__order__form");
  // btnCommander.setAttribute("action", "./confirmation.html");
  // btnCommander.appendChild(lienConfirmation);S
}

; //  fonction pour le calcul total des articles 

function calculQuantity() {
  if (getLs.length > 0) {
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
}

;

function calculPrixTotal() {
  var totalPrice = document.getElementById('totalPrice');

  if (getLs.length > 0) {
    var test = document.querySelectorAll(".priceElement");
    var totPrix = [];

    for (var i = 0; i < getLs.length; i++) {
      var prixProd = parseInt(test[i].innerText) * parseInt(getLs[i].quantity);
      totPrix.push(prixProd);
    } // Addition des produits 


    var reducer = function reducer(accumulator, currentvalue) {
      return accumulator + currentvalue;
    };

    var totalPrix = totPrix.reduce(reducer);
    totalPrice.innerText = totalPrix;
  }
}

function changeQuantity() {
  var btn_qty = document.querySelectorAll('.itemQuantity');

  var _loop = function _loop(d) {
    btn_qty[d].addEventListener('change', function () {
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

; //  Supp l'élément

function ExecDelete(targetId) {
  for (var d = 0; d < getLs.length; d++) {
    var itemId = getLs[d].id + getLs[d].couleur;

    if (itemId === targetId) {
      getLs.splice(d, 1);
      localStorage.setItem("panier", JSON.stringify(getLs));
      location.reload();
    }
  }
}

;

function validForm() {
  var formulaire = document.querySelector('#order');
  formulaire.addEventListener('click', function (e) {
    var allOk = true;
    var myRegex = /^[a-zA-Z-\sàâäéèêëìîïôöòùçñ]{2,}$/;
    var myRegexEmail = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;
    var myRegexAdresse = /^[a-zA-Z0-9\s,.'-]{3,}$/;
    allOk = allOk && testElement('firstName', 'prénom', 'firstNameErrorMsg', myRegex, e);
    allOk = allOk && testElement('firstName', 'nom', 'lastNameErrorMsg', myRegex, e);
    allOk = allOk && testElement('address', 'adresse', 'addressErrorMsg', myRegexAdresse, e);
    allOk = allOk && testElement('city', 'ville', 'cityErrorMsg', myRegex, e);
    allOk = allOk && testElement('email', 'mail', 'emailErrorMsg', myRegexEmail, e); // trouver la chemin de page conf !

    if (allOk == true) {
      postAPI();
      e.preventDefault();
    }
  });
}

;

function testElement(elementName, elementTitle, elementErrorMsg, myRegex, e) {
  var myElement = document.getElementById(elementName);
  var ok = true;

  if (myElement.value.trim() == "") {
    var error = document.getElementById(elementErrorMsg);
    error.innerHTML = 'Le champ ' + elementTitle + ' est requis.';
    ok = false;
    e.preventDefault();
  } else if (myRegex.test(myElement.value) == false) {
    var _error = document.getElementById(elementErrorMsg);

    _error.innerHTML = "Le " + elementTitle + " que vous avez choisi n'est pas valide";
    ok = false;
    e.preventDefault();
  } else if (myRegex.test(myElement.value) == true) {
    var _error2 = document.getElementById(elementErrorMsg);

    _error2.innerHTML = "";
  }

  return ok;
}

function postAPI() {
  var contact = {
    firstName: "".concat(firstName.value),
    lastName: "".concat(lastName.value),
    address: "".concat(address.value),
    city: "".concat(city.value),
    email: "".concat(email.value)
  };
  var prodId = [];

  for (var i = 0; i < getLs.length; i++) {
    prodId.push(getLs[i].id);
  }

  ;
  var contactProd = {
    contact: contact,
    prodId: prodId
  };
  console.log(JSON.stringify({
    contact: contact,
    prodId: prodId
  }));
  console.log();
  var reponseAPI = fetch('http://localhost:3000/api/products/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(contactProd)
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log(data);
  })["catch"](function (error) {
    console.error(error);
  }); // let result = await reponseAPI.json();
  // console.log(result.message);
}