
class Form {
  constructor() {
    this.data = this.getAndValidateData();
    if (!this.data)
    console.log( 'montrer le modal');
    console.log(!this.data);
    $("#formModal").modal('show');   // laisse la modal ouverte si toutes les données ne sont pas remplies  
  return
    



    if(this.data = 0) 
      
      console.log(" pourquoi?");
      console.log(this.data);
      $("#formModal").modal('hide');
    
    return this.sendData();
  

    this.data.products = [];
    const size = eshop.panier.content.length;
    for (var i = 0; i < size; i++) {
      this.data.products.push(eshop.panier.content[i].id);
      
    }
    
    this.sendData();
  }
  // ICI =============[envoi de la commande au server]=============================================================

  async sendData() {
    try {
      const result = await fetch(
        src + "/order",                 //src= "http://localhost:3000/api/cameras"
        {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.data)
        });

      console.log(result.status);



      // ----[tant que la longueur du panier > 0  .pop suprime les élements du panier]--------------

      while (eshop.panier.content.length > 0) {
        eshop.panier.content.pop();
      }
      // while (this.data = this.getAndValidateData()){
      //   eshop.panier.content.pop();
      // }
      $(".header-icons-noti").html(0);

      // -----[sweetAlert]----------------------------------------------------------

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Vôtre commande a éte envoyée avec success'  //server ok
      })
    }

    // LA ==================================================================================

    catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'nous avons rencontré une erreur veuillez recommencer !', // erreur server
      })
    }
  }

  // -----[envoie data valide]---------------------------------------------------------

  getAndValidateData() {
    const data = {
      "email": this.filterEmail("email"),
      "city": this.filterString("city"),
      "address": this.filterString("adress"),
      "lastName": this.filterString("prenom"),
      "firstName": this.filterString("nom"),

    };
    let errors = 0;
  
    if (!data.email)  
      Swal.fire('Veuillez entrer une adresse @mail valide');    
    
    if (!data.city)     
      Swal.fire('Veuillez entrer une ville valide');
    
    if (!data.address)    
      Swal.fire('Veuillez entrer une adresse valide');
    
    if (!data.lastName) 
      Swal.fire('Veuillez entrer un prénom valide');
    
    if (!data.firstName)   
      Swal.fire('Veuillez entrer un Nom valide');
    
    if (errors > 0) 
      console.log("montrer la modale");
           $("#formModal").modal('show');     
    

  }

  // ===================================================================================================
  /**
   * 
   * @param {string} str 
   * @returns {string|boolean}
   */

  //  -----[ obligation d'une adresse mail valide]-----------------------------------------------------

  filterEmail(ref) {
    // const domTarget = document.getElementById(ref);
    const str = document.getElementById(ref).value;
    const arobase = str.indexOf("@");              // indexOf indique le moment dans la chaine ou se trouve "@"
    if (arobase === -1) {            // return -1 si ("@" pas trouvé)
      this.showError(ref);
      return false;
    }
    const str2 = str.slice(arobase); //slice() extrait une section d'une chaine de caractères et la retourne comme une nouvelle chaine de caractères
    if (str2.indexOf(".") === -1) {
      this.showError(ref);
      return false;
    }
    return str;
  }
  // -----[obligation de rentrer du texte ds l'input text]------------------------------------------------
  filterString(ref) {
    // const domTarget = document.getElementById(ref);
    const str = document.getElementById(ref).value;
    if (str.length <= 2) {
      this.showError(ref);
      return false;
    }
    const isNumber = Number(str);
    // if (Number(str) !== NaN) 
    if (typeof isNumber !== "number") 
    {
      this.showError(ref);
      return false;
    }
    return str;
  }

  showError(ref) {
    const str = document.getElementById("#formModal")  //.className("inputError");
  } 
    
}