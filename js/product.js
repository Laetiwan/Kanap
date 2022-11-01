//Produits

//function indiquant la place du produit dans le tableau
// Paramètre : id produit
// Sortie : numéro dans le tableau / -1 si pas de produit.
function searchProduct(id,array) {  
  for (let i = 0;i < array.length;i++){
    if (array[i]._id==id) {
      return i;
    }
  }
  return -1;
}

function searchProductInLocalData(id,colour,array) {  
  for (let i = 0;i < array.length;i++){
    if ((array[i]['id']==id)&&(array[i]['colour']==colour)) {
      return i;
    }
  }
  return -1;
}

//Requête API pour ensemble produits
fetch ("http://localhost:3000/api/products")
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
.then(function(value) {
  console.log(value);
  
  let params = new URLSearchParams(window.location.search);
  let id = params.get("id");
  let productIndex = searchProduct(id,value);  

  //--------------------------------------------------------- Récupération des données du tableau
  var productId = value[productIndex]._id;
  var productImg = value[productIndex].imageUrl;
  var productImgAlt = value[productIndex].altTxt;
  var productName = value[productIndex].name;
  var productDescription = value[productIndex].description;
  var productPrice = value[productIndex].price;     
  var productColors = value[productIndex].colors;

  var productUrl = './product.html?id='+productId+'';
  console.log(productUrl); 

  //--------------------------------------------------------- Création dans le html
    
  //ajout nom produit
  document.querySelector('h1').innerText = productName;      
  //ajout prix produit
  document.querySelector('span').innerText = productPrice;   
  //ajout description produit   
  document.getElementById ('description').innerText = productDescription;   
  //ajout options couleurs
  for (let i = 0;i < productColors.length;i++){
    document.querySelector('option').insertAdjacentHTML('afterend', `<option value=${productColors[i]}>${productColors[i]}</option>`);
  }
  console.log(productColors);
  //ajout image
  document.querySelector('div.item__img').innerHTML = '<img src="'+productImg+'" alt="'+productImgAlt+'">';          
  })  
  .catch(function(err) {
    // Une erreur est survenue
    alert('Une erreur a été rencontrée');
  });

  
  //------------------------------------------------------- Fonction récupérant les données du produit sélectionné
  function getUserData() {
  
    let index = new URLSearchParams(window.location.search);

    //ref produit
    let productRef = index.get('id');
    console.log(productRef); 

    //qt produit
    var productQt = document.getElementById('quantity').value;
    console.log(productQt);  

    //couleur produit
    var selectColor = document.getElementById('colors');
    // Quand une nouvelle <option> est selectionnée
    //selectColor.addEventListener('change', function() {
    var productColor = selectColor.options[selectColor.selectedIndex].value;
    console.log(productColor);
    //})   
    
    var productReturn = {'id' : productRef,'colour' : productColor,'quantity' : productQt};    
    return(productReturn);        
  }
  
  //Constitution du panier     

  //Evenement clic bouton "Ajouter au panier"
  const button = document.getElementById('addToCart');
  button.addEventListener('click', event => {

      let data = []
      data = getUserData();
      console.log(data);      
      
      let productData = localStorage.getItem("data")
      ? JSON.parse(localStorage.getItem("data"))
      : [];

      var index = searchProductInLocalData(data['id'],data['colour'],productData);
      console.log(index);

      if (index == -1) {
        productData.push(data);
        localStorage.setItem("data", JSON.stringify(productData));
        console.log(localStorage);
        console.log(productData.length);
      }
      else {
        console.log(productData[index]['quantity']);
        productData[index]['quantity']=parseInt(productData[index]['quantity'])+1;
        localStorage.setItem("data", JSON.stringify(productData));
        console.log(localStorage);
      }
       
  });
    
  //localStorage.clear();

  