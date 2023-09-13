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
};


const ajoutPanier = document.getElementById("addToCart");
ajoutPanier.addEventListener("click", (addPanier));

//   fonction pour ajouter un produit au panier
function addPanier(e) {
    const couleur = document.getElementById("colors").value;
    const quantity = document.getElementById("quantity").value;
    if (quantity < 1 || quantity > 100) {
        alert("Veuillez choisir un  nombre entre 1 et 100 svp");
        e.preventDefault();
    } else if (couleur === "") {
        alert("Veuillez choisir une couleur svp");
        e.preventDefault();
    } else {
    const panier = {id : produit, couleur : couleur, quantity : parseInt(quantity)};

    let getLs = JSON.parse(localStorage.getItem("panier")) || [];

    let update = false;
    if (getLs) {
        getLs.forEach((element, key) => {
            if (element.id === produit && element.couleur === couleur) {
                getLs[key].quantity = parseInt(element.quantity) + parseInt(quantity);
                localStorage.setItem("panier", JSON.stringify(getLs));
                update = true;
                location.reload();  
            }
            });
            if (!update) {
                getLs.push(panier);
                localStorage.setItem("panier", JSON.stringify(getLs));
                location.reload();  
            }
        }
        else {
            getLs = [];
            localStorage.setItem("panier", JSON.stringify(panier));
            location.reload();  
        }
    }
}; 


