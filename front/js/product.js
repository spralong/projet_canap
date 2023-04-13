// Récupération de l'id dans l'Url
const produit = window.location.search.split("?").join("");
console.log(produit);
let produitData = [];

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
};