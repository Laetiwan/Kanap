//confirmation

//Passage du no commande dans URL et afficher

function getCommandNumber() {
  
    let index = new URLSearchParams(window.location.search);
    
    //ref produit
    let productRef = index.get('id');
    console.log(productRef); 

    let noCommande = document.getElementById("orderId");
    noCommande.innerText = productRef; 
};

getCommandNumber();



