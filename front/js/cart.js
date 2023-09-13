// Récupération du LS
const getLs = JSON.parse(localStorage.getItem("panier"));

if (getLs) {

    Promise.all(getLs.map(produit => {

        return fetch(`http://localhost:3000/api/products/${produit.id}`)

            .then(products => products.json())

            .then(data => {

                genererPanier(data, produit);

            });

    })).then(() => {

        changeQuantity();

        ExecDelete();

        calculQuantity();

        calculPrixTotal();

        validForm();
    });

}


function genererPanier(data, produit) {


        // DOM
        const articleElement = document.createElement("article");
        articleElement.classList.add("cart__item");

        const divItemImg = document.createElement("div");
        divItemImg.classList.add("cart__item__img");

        const imgElement = document.createElement("img");
        imgElement.src = data.imageUrl;
        imgElement.alt = data.altTxt;

        const divItemContent = document.createElement("div");
        divItemContent.classList.add("cart__item__content");

        const divItemContentDesc = document.createElement("div");
        divItemContentDesc.classList.add("cart__item__content__description");

        const nomElement = document.createElement("h2");
        nomElement.innerText = data.name;

        const couleurElement = document.createElement("p");
        couleurElement.innerText = produit.couleur;

        const prixElement = document.createElement("p");
        prixElement.classList.add("priceElement");
        prixElement.innerText = `${data.price}€`;

        const divItemContentSett = document.createElement("div");
        divItemContentSett.classList.add("cart__item__content__settings");

        const divItemContentSettQuant = document.createElement("div");
        divItemContentSettQuant.classList.add("cart__item__content__settings__quantity");

        const quantityElement = document.createElement("p");
        quantityElement.innerText = 'Qté :';

        // Input pour la quantité -->
        const itemQuantity = document.createElement("input");
        itemQuantity.classList.add("itemQuantity");
        itemQuantity.setAttribute("name", 'itemQuantity');
        itemQuantity.setAttribute("type", 'number');
        itemQuantity.setAttribute("value", produit.quantity);
        itemQuantity.setAttribute("min", '1');
        itemQuantity.setAttribute("max", '100');
        itemQuantity.setAttribute("step", '1');


        const divItemContentSettDel = document.createElement("div");
        divItemContentSettDel.classList.add("cart__item__content__settings__delete");

        const deleteElement = document.createElement("p");
        deleteElement.classList.add("deleteItem");
        deleteElement.innerText = `Supprimer`;
        deleteElement.id = produit.id + produit.couleur;
        deleteElement.addEventListener("click", function(e){ExecDelete(e.target.id)});


        const sectionItems = document.querySelector("#cart__items");
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
};

//  fonction pour le calcul total des articles 
function calculQuantity () {
    if (getLs.length > 0 ) {
    let totalQuantity = document.querySelector("#totalQuantity");
    let totQuant = [];
    
    for (let i = 0; i < getLs.length; i++) {

    const quantProd = parseInt(getLs[i].quantity);
    totQuant.push(quantProd);

    } 

// Addition des produits 
    const reducer = (accumulator, currentvalue) => accumulator + currentvalue;
    const totalArticles = totQuant.reduce(reducer);
// 
    totalQuantity.innerText = totalArticles;
    }
};


//  fonction pour le prix total des articles 
function calculPrixTotal () {
    let totalPrice = document.getElementById('totalPrice');
    
    if (getLs.length > 0 ) {
        const test = document.querySelectorAll(".priceElement");
        let totPrix = [];
        
        for (let i = 0; i < getLs.length; i++) {
    
        const prixProd = parseInt(test[i].innerText) * parseInt(getLs[i].quantity);
        totPrix.push(prixProd);
        } 

        // Addition des produits 
        const reducer = (accumulator, currentvalue) => accumulator + currentvalue;
        let totalPrix = totPrix.reduce(reducer);

        totalPrice.innerText = totalPrix;
    }
}

//  fonction pour le changer la quantité des articles 
function changeQuantity() {
    let btn_qty = document.querySelectorAll('.itemQuantity');
    for (let d = 0; d < btn_qty.length; d++) {
        btn_qty[d].addEventListener('change', function () {
            let qtyModified = parseInt(btn_qty[d].value, 10);
            getLs[d].quantity = qtyModified;
            localStorage.setItem('panier', JSON.stringify(getLs));
            location.reload();
        }
    )}
};


//   fonction pour supprimer l'élément
 function ExecDelete(targetId) {
    for (let d = 0; d < getLs.length; d++) {
        let itemId = getLs[d].id + getLs[d].couleur;
        if (itemId === targetId) {
            getLs.splice(d, 1);
            localStorage.setItem("panier", JSON.stringify(getLs));
            location.reload();        
        }
    }
};

//   fonction pour valider et envoyer le formulaire
function validForm() {
    let formulaire = document.querySelector('#order');

    formulaire.addEventListener('click', function (e) {

        let allOk = true;
        let myRegex = /^[a-zA-Z-\sàâäéèêëìîïôöòùçñ]{2,}$/;
        let myRegexEmail = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;
        let myRegexAdresse = /^[a-zA-Z0-9\s,.'-]{3,}$/;

        allOk = allOk && testElement('firstName', 'prénom', 'firstNameErrorMsg', myRegex, e);
        allOk = allOk && testElement('firstName', 'nom', 'lastNameErrorMsg', myRegex, e);
        allOk = allOk && testElement('address', 'adresse', 'addressErrorMsg', myRegexAdresse, e);
        allOk = allOk && testElement('city', 'ville', 'cityErrorMsg', myRegex, e);
        allOk = allOk && testElement('email', 'mail', 'emailErrorMsg', myRegexEmail, e);

        if (allOk == true) {
            postAPI();
            e.preventDefault();
        }
    })
};

//   fonction pour vérifier si les champs sont ok
function testElement(elementName,elementTitle, elementErrorMsg, myRegex, e) {
    let myElement = document.getElementById(elementName);
    let ok = true
    if (myElement.value.trim() == "") {
        let error = document.getElementById(elementErrorMsg);
        error.innerHTML = 'Le champ '+ elementTitle + ' est requis.';
        ok = false;
        e.preventDefault();
    } else if (myRegex.test(myElement.value) == false) {
        let error = document.getElementById(elementErrorMsg);
        error.innerHTML = "Le "+ elementTitle +" que vous avez choisi n'est pas valide";
        ok = false;
        e.preventDefault();
    }else if (myRegex.test(myElement.value) == true) {
        let error = document.getElementById(elementErrorMsg);
        error.innerHTML = "";
    }
    return ok;
}

//   fonction pour envoyer la requete à l'API
function postAPI() {

    let contact = {
        firstName : `${firstName.value}`,
        lastName : `${lastName.value}`,
        address : `${address.value}`,
        city : `${city.value}`,
        email : `${email.value}`
    };

    let products = [];
    for (let i = 0;i < getLs.length; i++) {
        products.push(getLs[i].id);
    };
    
    let contactProd = {contact, products};

    let reponseAPI = fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(contactProd)
        })
        .then((res) => res.json())
        .then((data) => {
            window.location.href = `confirmation.html?id=${data.orderId}`;
        })
        .catch((error) => {
            console.error(error)
        })
}