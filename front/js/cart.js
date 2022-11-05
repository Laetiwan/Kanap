//Cart

let productCart = [];
let productCartPriceArray = [];
let productCartQuantityArray = [];

//Fonction qui récupère l'index
function getMatchingIndex(id,array){
  for (let i = 0;i < array.length;i++){
      if(array[i]._id==id){
        return(i);
      }
    }
  return(-1);
}

//Fonction qui récupère le localStorage
function getLocalStorage () {
  let productCartLocal = localStorage.getItem("data");
  let productCartLocalJSON = JSON.parse(productCartLocal);
  console.log('localStorage',productCartLocal);
  console.log('localStorageparsed',productCartLocalJSON);

  // Vérification qu'il ne soit pas vide
  if (!productCartLocal) {
    console.log("Oups c'est vide");
  }

  console.log('localStorageparsed lenght',productCartLocalJSON.length);

  for(var i = 0; i < productCartLocalJSON.length; i++) {
    productCart.push({'id':productCartLocalJSON[i].id,'colour':productCartLocalJSON[i].colour,'quantity' : productCartLocalJSON[i].quantity});
    console.log(productCart[i]);
    productCartQuantityArray.push(productCartLocalJSON[i].quantity);
    console.log('quantités',productCartQuantityArray[i]);
  }
}

//Fonction qui insère le HTML avec données produits
function insertHTML(productCartId, productCartColour, productImg, productImgAlt, productName, productPrice, productCartQuantity) {
  //balise article
  let cartItems = document.getElementById("cart__items");
  var newArticle = document.createElement("article");  
  newArticle.setAttribute("class","cart__item");
  newArticle.setAttribute("data-id",productCartId);
  newArticle.setAttribute("data-color",productCartColour);
  cartItems.appendChild(newArticle); 

  //balise div image
  var newImg = document.createElement("div"); 
  newImg.setAttribute("class","cart__item__img");
  newArticle.appendChild(newImg); 
  newImg.innerHTML = '<img src="'+productImg+'" alt="'+productImgAlt+'">';
  
  //balise div content
  var newContent = document.createElement("div");
  newContent.setAttribute("class","cart__item__content");
  newArticle.appendChild(newContent); 

  //balise div content description
  var newContentDesc = document.createElement("div");
  newContentDesc.setAttribute("class","cart__item__content__description");
  newContent.appendChild(newContentDesc); 

  //balise h2
  var newContentName = document.createElement("h2");
  newContentDesc.appendChild(newContentName); 
  newContentName.innerHTML = productName;

  //balise p couleur
  var newContentColor = document.createElement("p");
  newContentDesc.appendChild(newContentColor); 
  newContentColor.innerHTML = productCartColour;

  //balise p prix
  var newContentPrice = document.createElement("p");
  newContentDesc.appendChild(newContentPrice); 
  newContentPrice.innerHTML = productPrice+" €";
  productCartPriceArray.push(productPrice);
  console.log('prix array',productCartPriceArray);

  //balise div content settings
  var newContentSettings = document.createElement("div"); 
  newContentSettings.setAttribute("class","cart__item__content__settings");
  newContent.appendChild(newContentSettings); 

  //balise div content settings qt
  var newContentSettingsQt = document.createElement("div"); 
  newContentSettingsQt.setAttribute("class","cart__item__content__settings__quantity");
  newContentSettings.appendChild(newContentSettingsQt); 
  newContentSettingsQt.innerHTML = '<p>"Qté : "</p>';

  var newContentSettingsQtInput = document.createElement("input"); 
  newContentSettingsQtInput.setAttribute("type","number");
  newContentSettingsQtInput.setAttribute("class","itemQuantity");
  newContentSettingsQtInput.setAttribute("name","itemQuantity");
  newContentSettingsQtInput.setAttribute("min","1");
  newContentSettingsQtInput.setAttribute("max","100");
  newContentSettingsQtInput.setAttribute("value", productCartQuantity);
  newContentSettingsQt.appendChild(newContentSettingsQtInput);

  //balise div content settings delete
  var newContentSettingsDel = document.createElement("div");  
  newContentSettingsDel.setAttribute("class","cart__item__content__settings__delete");
  newContentSettings.appendChild(newContentSettingsDel); 
  newContentSettingsDel.innerHTML = '<p class="deleteItem">Supprimer</p>';

}

//Fonction qui recherche données produits avec l'id
function getProductData() {

  //Requête API pour ensemble produits
  fetch ("http://localhost:3000/api/products")
  .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
  .then(function(value) {
    console.log('api products',value);
    console.log(productCart.length);
    var matchingIndex;
    for (let i = 0;i < productCart.length;i++){
      matchingIndex = getMatchingIndex(productCart[i]['id'],value);
      //Récupération des données du tableau
      var productId = value[matchingIndex]._id;
      var productImg = value[matchingIndex].imageUrl;
      var productImgAlt = value[matchingIndex].altTxt;
      var productName = value[matchingIndex].name;
      var productDescription = value[matchingIndex].description; 
      var productPrice = value[matchingIndex].price;
      console.log('productId',productId);
      console.log(productCart[i]['id']);
      console.log('value lenght',value.length);
      if (productId==productCart[i]['id']) {
        //----------------------------------Insertion code HTML
        insertHTML(productCart[i]['id'], productCart[i]['colour'], productImg, productImgAlt, productName, productPrice, productCart[i]['quantity']);
        
      }
      getTotalPrice (productPrice);
    }
    
  })
  .catch(function(err) {
    // Une erreur est survenue
    alert('Une erreur a été rencontrée');
  });

}

//fonction pour calculer quantité totale
function getTotalQt () {
  var totalQty = 0;
  for (let i = 0;i < productCart.length;i++){
    totalQty += parseInt(productCart[i]['quantity']);
    console.log('qt totale',totalQty);
  }
  //classe "cart__price"
let totalQt = document.getElementById("totalQuantity");
totalQt.innerHTML = totalQty;

}

//fonction pour calculer prix total
function getTotalPrice (productPrice) {
  var totalPrice = 0;
  for (let i = 0;i < productCart.length;i++){
    let Price = parseInt(productCartPriceArray[i])*parseInt(productCartQuantityArray[i]);
    totalPrice += Price;
    console.log('prix total',totalPrice);
  }
  let totalPriceHTML = document.getElementById("totalPrice");
  totalPriceHTML.innerHTML = totalPrice;
}

getLocalStorage ();
getProductData();
getTotalQt ();


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

