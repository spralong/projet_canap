// Récupération du LS
const getLs = JSON.parse(localStorage.getItem("panier"));

// Fonction pour récupérer les produits du LS dans l'API
console.log(getLs);
function apiFetch(){
    getLs.map(produit => {
        return fetch(`http://localhost:3000/api/products/${produit.id}`)
    .then(products => products.json())
    .then(data => 
        genererPanier(data, produit))
    // changeQuantity(produit));
})
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
        prixElement.innerText = `${data.price}€`;

        const divItemContentSett = document.createElement("div");
        divItemContentSett.classList.add("cart__item__content__settings");

        const divItemContentSettQuant = document.createElement("div");
        divItemContentSettQuant.classList.add("cart__item__content__settings__quantity");

        const quantityElement = document.createElement("p");
        quantityElement.innerText = produit.quantity;

        // Input pour la quantité -->
        
        const itemQuantity = document.createElement("input");
        itemQuantity.classList.add("itemQuantity");
        itemQuantity.setAttribute("name", 'itemQuantity');
        itemQuantity.setAttribute("type", 'number');
        itemQuantity.setAttribute("value", '0');
        itemQuantity.setAttribute("min", '1');
        itemQuantity.setAttribute("max", '100');
        itemQuantity.setAttribute("step", '1');


        //  S'occuper de l'evenement du clic de changement de quantité (Pb : ne détecte pas le .value fans le fonction)
        // console.log(itemQuantity.value);
        // itemQuantity.addEventListener("click", changeQuantity(produit));

        // 

        const divItemContentSettDel = document.createElement("div");
        divItemContentSettDel.classList.add("cart__item__content__settings__delete");

        const deleteElement = document.createElement("p");
        deleteElement.classList.add("deleteItem");
        deleteElement.innerText = `Supprimer`;

        // faire le bouton supprimer des produits

        // 

        // Total articles

        // 


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


// //  trouver comment utiler data et produit
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








function changeQuantity () {
    const itemQuantity = document.querySelectorAll(".itemQuantity");
console.log(itemQuantity.length)
    itemQuantity.addEventListener("change", function () {
        const newQuantity = parseInt(produit.quantity) + parseInt(itemQuantity.value);
    
        const panier = {id : produit.id, couleur : produit.couleur, quantity : newQuantity};
    
        localStorage.setItem("panier", JSON.stringify(panier));
        location.reload(); 
    })
};
changeQuantity();



apiFetch();

