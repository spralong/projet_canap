let url ="https://localhost:3000/api/products";

// Récupération des pièces depuis le fichier JSON
const reponse = fetch('../models/Product');
const pieces = reponse.json();


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



