//confirmation

//Passage du no commande dans URL et afficher
function getCommandNumber() {
  
    let index = new URLSearchParams(window.location.search);
    
    //ref produit
    const productRef = index.get('id');
    console.log(productRef); 

    const noCommande = document.getElementById("orderId");
    noCommande.innerText = productRef; 
};

getCommandNumber();

localStorage.clear();

