class Produit extends Composant{
  constructor(data, domTarget){
    super(data.name, domTarget, "article");
    this.description = data.description;
    this.imageUrl    = data.imageUrl;
    this.lenses      = data.lenses;
    this.idLense     = 0;
    this.text        = data.name;
    this.price       = data.price;
    this.id          = data._id;
    this.minified    = true;
    this.DOM.onclick = this.click.bind(this);
    this.render(); 
  }
  render(){
    this.DOM.innerHTML = this.minifiedTemplate;
  }

  // -----[ajout des articles dans une modal bootstrap]--------------------------------------------------------

  get minifiedTemplate(){
    this.DOM.className = "article";
    return `
    <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="${this.imageUrl}" alt="Card image cam">
      <div class="card-body">
       <h2>${this.text}</h2>
         <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#${this.name}Modal">
           voir ${this.text} 
         </button>
        
        <p class="card-text"></p>
      </div>
    </div>
    
    
        <div class="modal fade" id="${this.name}Modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel" >${this.text}</h5>

          
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              ${this.description}
              <img src="${this.imageUrl}">
              <h4>${this.getPrice()}</h4> 
              ${this.showVariants()}  
            </div>


            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
              <button type="button" class="btn btn-primary" onclick="eshop.${this.name}.addToCart()" data-dismiss="modal">ajouter au panier</button>
            </div>
          </div>
        </div>
      </div>  
    `;
  }

// -----[ajout des options de lentilles]-----------------------------------------------------------------

  showVariants(){
    let html = `<div class="btn-group" data-toggle="buttons" >`;
    for (let i=0; i< this.lenses.length; i++){

        html += `
        
        <label class="btn btn-default ${(this.idLense === i) ? 'active' : "active"}">
            <input type="radio"   name="view-opt-bt-group-value" value="${this.lenses[i]}" ${(this.idLense === i) ? 'checked="checked"' : ""}>${this.lenses[i]}
            </label>
            <input type="hidden" name="view-opt-bt-group-value" value="${this.lenses[i]}">
               
            `;            
            
          }
          return html+"</div>";
  }
  
  click(){
    this.minified = !this.minified;
  }

  // -----[ajout de l'article dans le panier]---------------------------------------------------------

  addToCart(){
    eshop.panier.add({

      image : this.imageUrl,
      name : this.text,
      price : this.price,      
      lentille: $( "input:checked" ).val(), //choix de la lentille
      id : this.id
    });
  }
  addToPanier(){
    eshop.panier.add(this.minified)
  }
  getPrice(){
    return (this.price / 100)+" €";
  }

  
 

  

}

