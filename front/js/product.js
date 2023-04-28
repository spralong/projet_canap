// Récupération de l'id dans l'Url
const produit = window.location.search.split("?").join("");

// Récupération des données du produit grâce à l'id
const fetchProduit = () => {
    fetch(`http://localhost:3000/api/products/${produit}`)
    .then((res) => res.json())
    .then((promise) => {
        genererProduct(promise)});
};
fetchProduit();

// Création du DOM 
function genererProduct(promise){
    const imageElement = document.createElement("img");
    imageElement.src = promise.imageUrl;
    const titreElement = document.getElementById("title");
    titreElement.textContent = promise.name;
    const prixElement = document.getElementById("price");
    prixElement.textContent = promise.price;
    const descriptionElement = document.getElementById("description");
    descriptionElement.textContent = promise.description;

    const sectionItems = document.querySelector(".item__img");
    sectionItems.appendChild(imageElement);

// Boucle pour le menu déroulant des couleurs
    for (let i = 0; i < promise.colors.length; i++) {

    const colorsElement = document.createElement("option");
    colorsElement.textContent = promise.colors[i];

    const sectionColors = document.getElementById("colors");
    sectionColors.appendChild(colorsElement);
    }


// // comment ajouter différent produit dans le LS ?
//         if(localStorage.setItem("produit") != localStorage.setItem("produit"))
//         localStorage.setItem.push;

//     });
};

// function savePanier(panier) {
//     const ajoutPanier = document.getElementById("addToCart");
//     ajoutPanier.addEventListener("click", () => {
//         const couleur = document.getElementById("colors").value;
//         const quantity = document.getElementById("quantity").value;
//         const panier = {"id" : produit, "couleur" : couleur, "quantité" : quantity};
//         localStorage.setItem("panier", JSON.stringify(panier));
//     })
// };

let getLs = JSON.parse(localStorage.getItem("panier"));

function addPanier() {
    const couleur = document.getElementById("colors").value;
    const quantity = document.getElementById("quantity").value;
    const panier = {id : produit, couleur : couleur, quantité : quantity};
    let getLs = JSON.parse(localStorage.getItem("panier"));
    getLs.forEach((element, key) => {
        if(element.id === produit && element.couleur === couleur) {
            // getLs{key}.quantité = element.quantité + quantity
            alert("oui");
        }else{
            localStorage.setItem("panier", JSON.stringify(panier));
        }

    });
    if(panier.id == panier.id) {
        panier.quantité += quantity;
    }else{
        panier.push;
    }
};


    const ajoutPanier = document.getElementById("addToCart");
    ajoutPanier.addEventListener("click", (addPanier));




// function getPanier() {
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
