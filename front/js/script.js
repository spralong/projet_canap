// Récupération des données de l'API
function apiFetch(){
    let url ="http://localhost:3000/api/products";
    fetch(url)
    .then(products => products.json())
    .then(data => genererProducts(data));
}
apiFetch();

// Fonction pour afficher tous les produits de l'API
function genererProducts(data){
    for (let i = 0; i < data.length; i++) {

    const fiche = data[i];
  
    const lienElement = document.createElement("a");
    lienElement.href = `./product.html?${fiche._id}`;
    const articleElement = document.createElement("article");
    const imageElement = document.createElement("img");
    imageElement.src = fiche.imageUrl;
    imageElement.alt = fiche.altTxt;
    const nomElement = document.createElement("h3");
    nomElement.innerText = fiche.name;
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = fiche.description;

    const sectionItems = document.querySelector('#items');
    sectionItems.appendChild(lienElement)
    lienElement.appendChild(articleElement);
    articleElement.appendChild(imageElement);
    articleElement.appendChild(nomElement);
    articleElement.appendChild(descriptionElement);
    }
}


