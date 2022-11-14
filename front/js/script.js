//Script

//Requête API pour ensemble produits
fetch ("http://localhost:3000/api/products")
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.log(value);

    let items = document.getElementById("items");     //dans l'id items

    for (let i = 0;i < value.length;i++){
      //Récupération des données du tableau
      var productId = value[i]._id;
      var productImg = value[i].imageUrl;
      var productImgAlt = value[i].altTxt;
      var productName = value[i].name;
      var productDescription = value[i].description;    
      
      //création dans le html
      var newCard = document.createElement("a");  
      items.appendChild(newCard); 

      newCard.innerHTML = `<a href="./product.html?id=${productId}"> 
      <article> <img src="${productImg}" alt="${productImgAlt}"> 
      <h3 class="productName">${productName}</h3> 
      <p class="productDescription">${productDescription}</p> </article> </a>`
      
      //Pour l'url vers la page produits
      var productUrl = `<a href="./product.html?id=${productId}">`;
      console.log(productUrl); 
    }   
  })
  .catch(function(err) {
    // Une erreur est survenue
  });
  