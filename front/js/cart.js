// Récupération du LS
const getLs = JSON.parse(localStorage.getItem("panier"));

// Fonction pour récupérer les produits du LS dans l'API
console.log(getLs)
// function apiFetch(){
    getLs.map(produit => {
        return fetch(`http://localhost:3000/api/products/${produit.id}`)
    .then(products => products.json())
    .then(data => {
        genererPanier(data, produit);
        changeQuantity();
        suppElement();
    })    
})
// }



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
};
calculQuantity ();


// Le calcul fonctionne seulement pour 1 produit (Récup le price via le dom) 
function calculPrixTotal () {
                    
    // let totalPrice = document.querySelector("#totalPrice");
    // let totPrix = [];

    const test = document.querySelectorAll(".priceElement");
    console.log(test);

    for (let i = 0; i < test.length; i++) {
        
        console.log(test[i].innerHTML);
        // let prixProd =  parseInt(getLs[i].quantity);
        // totPrix.push(prixProd);    
    }

    // const reducer = (accumulator, currentvalue) => accumulator + currentvalue;
    // let totalPrix = totPrix.reduce(reducer);

    // totalPrice.innerText = totalPrix;



};
calculPrixTotal();

function changeQuantity() {
    let btn_qty = document.querySelectorAll('.itemQuantity');
    for (let d = 0; d < btn_qty.length; d++) {
        btn_qty[d].addEventListener('change', function () {
            // Demander a Thomas, à quoi sert le 10 ? fonctionne sans 
            let qtyModified = parseInt(btn_qty[d].value, 10);
            getLs[d].quantity = qtyModified;
   
            localStorage.setItem('panier', JSON.stringify(getLs));
            location.reload();
        }
    )}
}


function suppElement () {
    let deleteItem = document.querySelectorAll(".deleteItem");

    for (let d = 0; d < deleteItem.length; d++) {
        deleteItem[d].addEventListener('click', function () {
            // trouver l'argument pour en supprimer seulement 1
            localStorage.removeItem("panier", JSON.stringify(getLs[d]));
            location.reload();
        })
    }
};







