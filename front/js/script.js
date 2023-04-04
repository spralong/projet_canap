let url ="http://localhost:3000/api/products";

// Récupération des pièces depuis le fichier JSON
const reponse =  fetch('../../back/models/Products.js')
// .then(products => products.json());
const products = reponse.json();

function genererProducts(products){
    for (let i = 0; i < products.length; i++) {

        const article = products[0];
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        const nomElement = document.createElement("h3");
        nomElement.innerText = article.name;
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description;

        const sectionItems = document.querySelector('#items');
        sectionItems.appendChild(imageElement);
        sectionItems.appendChild(nomElement);
        sectionItems.appendChild(descriptionElement);

    }
}
