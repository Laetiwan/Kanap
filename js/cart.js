//Cart

//Récupérer le panier de la page produits

let productCart = localStorage.getItem('data[0]');
//let productCart = JSON.parse(localStorage.getItem("data"));
console.log('data',productCart);



//----------------------------------Insertion code HTML
//balise article
let cartItems = document.getElementById("cart__items");
var newArticle = document.createElement("article");  
newArticle.setAttribute("class","cart__item");
newArticle.setAttribute("data-id","{product-ID}");
newArticle.setAttribute("data-color","{product-color}");
cartItems.appendChild(newArticle); 

//balise div image
let cartImg = document.querySelector("article");
var newImg = document.createElement("div");  
newImg.setAttribute("class","cart__item__img");
cartImg.appendChild(newImg); 
newImg.innerHTML = '<img src="{productImg}" alt="{productImgAlt}">';          
 
//balise div content
let cartContent = document.querySelector("article");
var newContent = document.createElement("div");  
newContent.setAttribute("class","cart__item__content");
cartContent.appendChild(newContent); 

//balise div content description
let cartContentDesc = document.querySelector("div.cart__item__content");
var newContentDesc = document.createElement("div");  
newContentDesc.setAttribute("class","cart__item__content__description");
cartContentDesc.appendChild(newContentDesc); 

//balise h2
let cartContentName = document.querySelector("div.cart__item__content__description");
var newContentName = document.createElement("h2");
cartContentName.appendChild(newContentName); 
newContentName.innerHTML = '{Nom du produit}';

//balise p couleur
let cartContentColor = document.querySelector("div.cart__item__content__description");
var newContentColor = document.createElement("p");
cartContentColor.appendChild(newContentColor); 
newContentColor.innerHTML = '{color}';

//balise p prix
let cartContentPrice = document.querySelector("div.cart__item__content__description");
var newContentPrice = document.createElement("p");
cartContentPrice.appendChild(newContentPrice); 
newContentPrice.innerHTML = '{price}';

//balise div content settings
let cartContentSettings = document.querySelector("div.cart__item__content");
var newContentSettings = document.createElement("div");  
newContentSettings.setAttribute("class","cart__item__content__settings");
cartContentSettings.appendChild(newContentSettings); 

//balise div content settings qt
let cartContentSettingsQt = document.querySelector("div.cart__item__content__settings");
var newContentSettingsQt = document.createElement("div");  
newContentSettingsQt.setAttribute("class","cart__item__content__settings__quantity");
cartContentSettingsQt.appendChild(newContentSettingsQt); 
newContentSettingsQt.innerHTML = '<p>"Qté :"{qt}</p>';

let cartContentSettingsQtInput = document.querySelector("div.cart__item__content__settings__quantity");
var newContentSettingsQtInput = document.createElement("input");  
newContentSettingsQtInput.setAttribute("type","number");
newContentSettingsQtInput.setAttribute("class","itemQuantity");
newContentSettingsQtInput.setAttribute("name","itemQuantity");
newContentSettingsQtInput.setAttribute("min","1");
newContentSettingsQtInput.setAttribute("max","100");
newContentSettingsQtInput.setAttribute("value","42");
cartContentSettingsQtInput.appendChild(newContentSettingsQtInput); 

//balise div content settings delete
let cartContentSettingsDel = document.querySelector("div.cart__item__content__settings");
var newContentSettingsDel = document.createElement("div");  
newContentSettingsDel.setAttribute("class","cart__item__content__settings__delete");
cartContentSettingsDel.appendChild(newContentSettingsDel); 
newContentSettingsDel.innerHTML = '<p class="deleteItem">Supprimer</p>';

//classe "cart__price"
let totalQt = document.getElementById("totalQuantity");
totalQt.innerHTML = '{qt totale}';
let totalPrice = document.getElementById("totalPrice");
totalPrice.innerHTML = '{prix total}';

//classe "cart_order"
let fNameErrorMsg = document.getElementById("firstNameErrorMsg");
fNameErrorMsg.innerHTML = '{erreur prénom}';

let lNameErrorMsg = document.getElementById("lastNameErrorMsg");
lNameErrorMsg.innerHTML = '{erreur nom}';

let addErrorMsg = document.getElementById("addressErrorMsg");
addErrorMsg.innerHTML = '{erreur adresse}';

let cErrorMsg = document.getElementById("cityErrorMsg");
cErrorMsg.innerHTML = '{erreur ville}';

let mailErrorMsg = document.getElementById("emailErrorMsg");
mailErrorMsg.innerHTML = '{erreur email}';

