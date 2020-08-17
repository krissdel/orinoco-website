/**
 * affiche et stock les informations des produits commandés
 * @class
 */
class Panier extends Composant{
  constructor(name, domTarget){
    super(name, domTarget, "cart");
    this.content = [];
    this.state = "minified";
    this.modalContent="";
    this.render();
    this.DOM.onclick = this.showHide.bind(this);
  }
 
  render(){
    let templateTarget = this.state+"Template";
    if (this[templateTarget] === undefined) templateTarget = "minifiedTemplate";
    this.DOM.innerHTML = this[templateTarget]+this.modalContent;
    this.DOM.className = this.state;
    
  }

// -----[nombre de produits dans le panier icon notification]------------------------------------------------

  /**
   * [minifiedTemplate description]
   *
   * @return  {string}  [return description]
   */
  get minifiedTemplate(){
    return `
      
    <div class="header-icons">
    <div class="header-wrapicon2">
    <img src="./images/icons/icon-header-02.png" class="header-icon2 js-show-header-dropdown" alt="ICON">
    <span class="header-icons-noti">${this.content.length}</span>

    `;
  }
 
// -----[evite la répétition des objets déjas commandés en métant un x1]-------------------------------------
  /**
    évite la répétition des objets ds le panier en méttant un quantité
   * @return {object}
   */
  makeResume(){
    const newContent = {};
    let productName;
    for ( let i = 0; i< this.content.length; i++){
      productName = this.content[i].name;
      if (newContent[productName] === undefined){
        newContent[productName] = {
          name : productName,
          image : this.content[i].image,
          price : this.content[i].price,
          lentille : this.content[i].lentille,
          qty : 1
        }
      }
      else newContent[productName].qty++;
    }

    let resume =  "";
    let amount =  0;
    let productPrice;
    for (const [key, product] of Object.entries(newContent)) {
      productPrice = Number(product.price)*product.qty;
      resume += `<li class="resume-cam"><img class="resizeImage" src= '${product.image}'> <div class="cam"> ${product.name} <br> ${product.lentille } </div> ${(product.price) / 100+"€"} <div class="qty"> x ${product.qty}</div> <div class="price">${productPrice / 100+" €" } </div></li>`;
      amount += productPrice;
      
    }
    return {
      "resume": resume,
      "amount":amount
    }
  }

// -----[ouverture du panier dropDownTemplate]--------------------------------------------------------------------

 
/**
 * ouverture de la modale du panier
 * @return [produits dans le panier avec qté, prix, img]
 */
get dropDownTemplate(){
    const {resume, amount} = this.makeResume();

    return `      
    <div class="header-icons">
      <div class="header-wrapicon2">
        <img src="./images/icons/icon-header-02.png" class="header-icon2 js-show-header-dropdown" alt="ICON">
        <span class="header-icons-noti"> ${this.content.length} </span> 

      <div class="main-dropdown">
        <ul class="resume">
          ${resume}
          
            <div class="total">Total: ${amount/100}€ </div>
      

            <div class= "footer-dropDown">
              <div><button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button></div>
              <div><button type="button" class="btn btn-primary" onclick="eshop.${this.name}.sendToForm()" data-dismiss="modal" data-toggle="modal" data-target="#formModal">commander</button> </div>

              </div>  
        </ul>
        </div>
      </div>
    </div>
   `;
  }

 
    add(product){
    this.content.push(product);
    this.render();
  }

  showHide(){
    switch (this.state){
      case "minified" :
        if (this.content.length===0)  return;
        this.state = "dropDown"
        break;
        case "dropDown" : 
          this.state = "minified"
          break;
    }
    this.render();
  }

  
// -----[envoi des élements du panier vers le formulaire]----------------------------

/**
 * envoi des éléments du panier vers le formulaire
 */
  sendToForm(){
    document.getElementById("formCartResume").innerHTML = this.makeResume().resume;
    document.getElementById("total").innerHTML = this.makeResume().amount/100 ;
        


  }

 

    
  }
    
  






