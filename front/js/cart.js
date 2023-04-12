//Cart

let productCart = [];
let productCartPriceArray = [];
let productCartQuantityArray = [];


let productCartLocal = localStorage.getItem("data")
  ? JSON.parse(localStorage.getItem("data"))
  : [];
  console.log('localStorage01',productCartLocal);

//Fonction qui récupère l'index
function getMatchingIndex(id,array){
  for (let i = 0;i < array.length;i++){
      if(array[i]._id == id){
        return(i);
      }
    }
  return(false);
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
  if ((productCartQuantity < 1) || (productCartQuantity > 100)) {
    alert("Veuillez entrer une quantité valide comprise entre 0 et 100");
  }
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
    for (let i = 0;i < productCart.length;i++) {
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
      if (productId == productCart[i]['id']) {
        //Insertion code HTML
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
function getTotalQt() {
  var totalQty = 0;
  for (let i = 0; i < productCart.length; i++) {
    totalQty += parseInt(productCart[i]['quantity']);
    console.log('qt totale',totalQty);
  }
  //classe "cart__price"
let totalQt = document.getElementById("totalQuantity");
totalQt.innerHTML = totalQty;
}

//fonction pour calculer prix total
function getTotalPrice() {
  var totalPrice = 0;
  for (let i = 0;i < productCart.length;i++){
    let Price = parseInt(productCartPriceArray[i])*parseInt(productCartQuantityArray[i]);
    totalPrice += Price;
    console.log('prix total',totalPrice);
  }
  let totalPriceHTML = document.getElementById("totalPrice");
  totalPriceHTML.innerHTML = totalPrice;
}

getLocalStorage();
getProductData();
getTotalQt ();

//Gestion modif et suppression

//Modification de la quantité
function getInputQt() {

  var inputQt = document.querySelectorAll('input[class="itemQuantity"]');
  console.log("inputQt",inputQt);
  for (var i = 0;i<inputQt.length;i++){
      inputQt[i].addEventListener('change', updateValue);
  }
 
  function updateValue(e) {
    console.log('coucou');
    var newVal = e.target.value;
    console.log('newVal',newVal);   
    var articleQt = e.target.closest('article');
    console.log('article',articleQt);
    var artId = articleQt.getAttribute('data-id');
    console.log('articleID',artId);
    var artColor = articleQt.getAttribute('data-color');
    console.log('articleColor',artColor);

    const retrievedString = localStorage.getItem("data");
    const parsedObject = JSON.parse(retrievedString);
    console.log('localStorage',parsedObject);

    for (var j = 0; j<parsedObject.length; j++) {
      if (parsedObject[j].id == artId) {
        console.log()
        parsedObject[j].quantity = newVal;  
        if ((newVal < 1) || (newVal > 100)) {
          alert("Veuillez entrer une quantité valide comprise entre 1 et 100");
        }      
      }          
    }
    localStorage.setItem("data", JSON.stringify(parsedObject)); 

    var totalQty = 0;
    for (let k = 0; k < parsedObject.length; k++) {
      totalQty += parseInt(parsedObject[k].quantity);
      console.log('qt totale',totalQty);
    }
    let totalQt = document.getElementById("totalQuantity");
    totalQt.innerHTML = totalQty;

    var totalPrice = 0;
    for (let l = 0;l < parsedObject.length;l++){
      console.log('prix',productCartPriceArray[l]);
      let Price = parseInt(productCartPriceArray[l])*parseInt(parsedObject[l].quantity);
      totalPrice += Price;
      console.log('prix total',totalPrice);
    }
    let totalPriceHTML = document.getElementById("totalPrice");
    totalPriceHTML.innerHTML = totalPrice;
  };        
}

//Suppression d'un article
function deleteItemBt() {
  
  var deleteItemBt = document.querySelectorAll('p[class="deleteItem"]');
  console.log('delete',deleteItemBt);
  for (var i = 0; i  <deleteItemBt.length; i++){
    deleteItemBt[i].addEventListener('click', deleteItem);
  }  
  function deleteItem(e) {
    console.log('coucou Delete');
    var newDel = e.target;
    console.log('newDel',newDel);
    var articleDel = e.target.closest('article');
    console.log('articleDel',articleDel);
    var artIdDel = articleDel.getAttribute('data-id');
    console.log('articleID',artIdDel);
    
    const retrievedDel = localStorage.getItem("data");
    console.log('localStorage',retrievedDel);
    const parsedObjectDel = JSON.parse(retrievedDel);
    console.log('localStorage',parsedObjectDel);

    for (var i = 0; i < parsedObjectDel.length; i++) {
      if (parsedObjectDel[i].id == artIdDel) {
        console.log('i',i);
        parsedObjectDel.splice(i, 1);
        var artDel = e.target.closest('article');
        console.log('article',artDel);
        if (artDel.parentNode) {
          artDel.parentNode.removeChild(artDel);      
        }
      }          
    }
    localStorage.setItem("data", JSON.stringify(parsedObjectDel));  
    console.log('newlocalStorage',parsedObjectDel);

  var totalQty = 0;
  for (let k = 0; k < parsedObjectDel.length; k++) {
    totalQty += parseInt(parsedObjectDel[k].quantity);
    console.log('qt totale',totalQty);
  }
  let totalQt = document.getElementById("totalQuantity");
  totalQt.innerHTML = totalQty;

  var totalPrice = 0;
  for (let l = 0;l < parsedObjectDel.length;l++){
    console.log('prix',productCartPriceArray[l]);
    let Price = parseInt(productCartPriceArray[l])*parseInt(parsedObjectDel[l].quantity);
    totalPrice += Price;
    console.log('prix total',totalPrice);
  }
  let totalPriceHTML = document.getElementById("totalPrice");
  totalPriceHTML.innerHTML = totalPrice;
  }
} 

//création tableau de produits
function cartArray() {
  const cartData = localStorage.getItem("data");
  console.log('localStoragecartArray',cartData);
  const parsedcartData = JSON.parse(cartData);
  console.log('parsed localStoragecartArray',parsedcartData);
  return(parsedcartData);
}
  
//Formulaire
var formData = new FormData();
let firstNameObj;
let lastNameObj;
let addressObj;
let cityObj;
let emailObj;

//Validation formulaire

function checkfName() {
  //prénom
  let fName = document.getElementById("firstName").value;
  formData.set("firstName", fName);
  firstNameObj = formData.get("firstName");
  console.log('prenom', fName);
  console.log('form prenom', firstNameObj);
  let fNameErrorMsg = document.getElementById("firstNameErrorMsg");
  if(fName == '') {
    fNameErrorMsg.innerHTML = 'Erreur : Le champ doit être rempli';
    fName.focus;
    return false; 
  }
  else if(! fName.match(/^[a-zA-Z-\s]+$/)) { 
    fNameErrorMsg.innerHTML = "Erreur : Le prénom ne doit contenir que des lettres";
    fName.focus;
    return false; 
  }
  else {
    fNameErrorMsg.style.display="none"; 
    return true;
  }
};

function checklName() {
  //nom
  let lName = document.getElementById("lastName").value;
  formData.set("lastName", lName);
  lastNameObj = formData.get("lastName");
  console.log('nom', lName);
  console.log('form nom', lastNameObj);
  let lNameErrorMsg = document.getElementById("lastNameErrorMsg");  
  if(lName == '') {
    lNameErrorMsg.innerHTML = 'Erreur : Le champ doit être rempli';
    lName.focus;
    return false; 
  }
  else if(! lName.match(/^[a-zA-Z-\s]+$/)) {      
    lNameErrorMsg.innerHTML = 'Erreur : Le nom ne doit contenir que des lettres';
    lName.focus;
    return false; 
  }
  else {
    lNameErrorMsg.style.display="none"; 
    return true;
  } 
};

function checkAdress() {
  //adresse
  let adresse = document.getElementById("address").value;
  formData.set("address", adresse);
  addressObj = formData.get("address");
  console.log('adresse', adresse);
  console.log('form adress', addressObj);
  let addErrorMsg = document.getElementById("addressErrorMsg");  
  if(adresse == '') {
    addErrorMsg.innerHTML = 'Erreur : Le champ doit être rempli';
    adresse.focus;
    return false; 
  }
  else {
    addErrorMsg.style.display="none"; 
    return true;
  } 
};

function checkCity() {
  //adresse
  let ville = document.getElementById("city").value;
  formData.set("city", ville);
  cityObj = formData.get("city");
  console.log('city', ville);
  console.log('form city', cityObj);
  let cErrorMsg = document.getElementById("cityErrorMsg");  
  if(ville == '') {
    cErrorMsg.innerHTML = 'Erreur : Le champ doit être rempli';
    ville.focus;
    return false; 
  }
  else if(! ville.match(/^[a-zA-Z-\s]+$/)) {      
    cErrorMsg.innerHTML = 'Erreur : Le nom de ville est incorrect';
    ville.focus;
    return false; 
  }
  else {
    cErrorMsg.style.display="none"; 
    return true;
  } 
};

function checkEmail() {
  //adresse
  let email = document.getElementById("email").value;
  formData.set("email", email);
  emailObj = formData.get("email");
  console.log('email', email);
  console.log('form email', emailObj);
  let mailErrorMsg = document.getElementById("emailErrorMsg");  
  if(email == '') {
    mailErrorMsg.innerHTML = 'Erreur : Le champ doit être rempli';
    email.focus;
    return false; 
  }
  else if(! email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {      
    mailErrorMsg.innerHTML = 'Erreur : Email incorrect';
    email.focus;
    return false; 
  }
  else {
    mailErrorMsg.style.display="none"; 
    return true;
  } 
};
  
  
let submitForm = document.getElementById("order");  
submitForm.onclick = function() {    
  if(checkfName()&&checklName()&&checkAdress()&&checkCity()&&checkEmail()) {
    let contact = {
      "firstName" : firstNameObj,
      "lastName": lastNameObj,
      "address": addressObj,
      "city" : cityObj,
      "email": emailObj,
    }
      
    tempArray = cartArray();
    sentArray = [];

    for (let i = 0;i<tempArray.length;i++){
      sentArray.push(tempArray[i]['id']);
    }

    console.log("sentarray", sentArray)
    orderFromApi(contact,sentArray);
    }    
  };

orderFromApi = async function(contact,products){
  console.log(contact);
  let messageSentToApi = {"contact" : contact, "products" : products}
  console.log('Produits à envoyer :',products);
  let response = await fetch("http://localhost:3000/api/products/order", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(messageSentToApi)
  });
  
  console.log(response)
  let result = await response.json();
  alert("La commande "+result['orderId']+" est validée.");  
  document.location.href = "../html/confirmation.html?id="+result['orderId']+"";
}
window.addEventListener("load",getInputQt);
window.addEventListener("load",deleteItemBt);



