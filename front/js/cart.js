//Cart

//localStorage.clear();

let productCart = [];
let productCartPriceArray = [];
let productCartQuantityArray = [];

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
  for (let i = 0; i < productCart.length; i++) {
    totalQty += parseInt(productCart[i]['quantity']);
    console.log('qt totale',totalQty);
  }
  //classe "cart__price"
let totalQt = document.getElementById("totalQuantity");
totalQt.innerHTML = totalQty;
}

//fonction pour calculer prix total
function getTotalPrice () {
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


// ---------------------------------------------Gestion modif et suppression

//Modification de la quantité
function getInputQt() {

  //const inputItemQt = document.getElementsByClassName("itemQuantity");
  //console.log('boucle',inputItemQt);

  var inputQt = document.querySelector('input[name="itemQuantity"]');
  
  //for (var i = 0; i<inputItemQt.length; i++) {
    //console.log("list value", inputItemQt[i]);
    //const formerVal = inputItemQt[i].value;
    //console.log("value", formerVal);
    //const inputArt = inputItemQt[i].closest('article');
    //console.log('closest',inputArt);
    //var artId = inputArt.getAttribute('data-id');   ça marche ça
    //console.log('article id',artId);

    //inputItemQt[i].addEventListener('change', updateValue);
    inputQt.addEventListener('change', updateValue);
    function updateValue(e) {
      console.log('coucou');
      var newVal = e.target.value;
      console.log('newVal',newVal);            
      
      //var inputQt = document.querySelector('input[name="itemQuantity"]');
      console.log('query',inputQt.value);    //me retourne la newVal dans le input...Pourquoi?
      var articleQt = inputQt.closest('article');
      console.log('article',articleQt);
      var artId = articleQt.getAttribute('data-id');
      console.log('articleID',artId);
      var artColor = articleQt.getAttribute('data-color');
      console.log('articleColor',artColor);

      const retrievedString = localStorage.getItem("data");
      const parsedObject = JSON.parse(retrievedString);
      console.log('localStorage',parsedObject);

      for (var j = 0; j<parsedObject.length; j++) {
        //console.log('parseID',parsedObject[j].id);
        if (parsedObject[j].id == artId) {
          parsedObject[j].quantity = newVal;
          //const modifiedndstrigifiedForStorage = JSON.stringify(parsedObject[j].quantity);
          //localStorage.setItem("quantity", modifiedndstrigifiedForStorage);
          localStorage.setItem("quantity", JSON.stringify(parsedObject[j].quantity));
          //console.log('newlocalStorage',localStorage);
        }          
      }
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
  //}
}

//Suppression d'un article
function deleteItemBt() {
  
  var deleteItemBt = document.getElementsByClassName("deleteItem");
  console.log('delete',deleteItemBt);
  for(var i = 0; i < deleteItemBt.length; i++) {
    deleteItemBt[i].addEventListener('click', function(e){
      alert('Êtes-vous sûr de vouloir supprimer cet article?');
      console.log('target',e.target);    
      var articleParent = [];
      //articleParent[i] = deleteItemBt[i].closest('article');
      //console.log('closest',articleParent[i]);      
      //var btId = articleParent[i].getAttribute('data-id');
      //console.log('id',btId);
      //var btColor = articleParent[i].getAttribute('data-color');
      //console.log('color',btColor);

      
    }, false);
  
  
    //var btId = articleParent.getAttribute("data-id");
    //console.log('id',articleParent);
    //var btColor = articleParent.getAttribute("data-color");
    //console.log('color',articleParent);
    //var par = deleteItemBt[i].parentNode;
    //console.log('parentBt',par);

  }
}






//-------------------------------------------------------------------------------------------------

//Validation formulaire
function checkfName() {
  //prénom
  let fName = document.getElementById("firstName").value;
  let fNameErrorMsg = document.getElementById("firstNameErrorMsg");
  console.log('prenom', fName);
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
  let lNameErrorMsg = document.getElementById("lastNameErrorMsg");
  console.log('nom', lName);
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
  let addErrorMsg = document.getElementById("addressErrorMsg");
  console.log('adresse', adresse);
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
  let cErrorMsg = document.getElementById("cityErrorMsg");
  console.log('city', ville);
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
  let mailErrorMsg = document.getElementById("emailErrorMsg");
  console.log('email', email);
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
  
    checkfName();
    checklName();
    checkAdress();
    checkCity();
    checkEmail();    

    //Objet Contact + tableau de produits
    var contact = {
      firstNameC : fName,
      lastNameC: lName,
      adresseC: adresse,
      villeC : ville,
      emailC: email,
    }
    console.log('contact', contact);    
  };

window.addEventListener("load",getInputQt);
window.addEventListener("load",deleteItemBt);

