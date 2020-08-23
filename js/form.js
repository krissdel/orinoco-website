
/**
 * Classe qui affiche, valide et envoi le formulaire
 * @class
 */
class Form {

  /**
   * contructeur de la classe
   * @constructor
   */
  constructor() {
    this.data = this.getAndValidateData();
    if (!this.data) { //si false on réaffiche la modal
      $("#formModal").modal('show');   // laisse la modal ouverte si toutes les données ne sont pas remplies  
      return;
    }
    // les données sont valides

    $("#formModal").modal('hide');    // on ferme la modale de paiement

    //on regénère la liste des produits commandés
    this.data.products = [];
    const size = eshop.panier.content.length;
    for (var i = 0; i < size; i++) {
      this.data.products.push(eshop.panier.content[i].id);  
    }
    
    //on envoi le formulaire
    this.sendData();
  }
  // ICI =============[envoi de la commande au server]=============================================================

  /**
   * envoi de la commande au server (await fetch)
   * @return {void}
   */
  async sendData() {
    try {
      let result = await fetch(
        src + "/order",                 //src= "http://localhost:3000/api/cameras"
        {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.data)
        });

      result = await result.json();

      // ----[tant que la longueur du panier > 0  .pop suprime les élements du panier]--------------

      while (eshop.panier.content.length > 0) {
        eshop.panier.content.pop();
      }
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


// LA ==================================================================================

      Toast.fire({
        icon: 'success',
        title: 'Vôtre commande a éte envoyée avec succès : commande n°'+result.orderId  //server ok
      })
    }


    catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'nous avons rencontré une erreur veuillez recommencer !', // erreur server
      })
    }
  }

  // -----[vérification de données a envoyer]---------------------------------------------------------

  /**
   * verifie les données saisie
   * @return {JSON|boolean} si les données sont valides retourne les données, sinon retourne false
   */
  getAndValidateData() {
    const data = {
      "email": this.filterEmail("email"),
      "city": this.filterString("city"),
      "address": this.filterString("adress"),
      "lastName": this.filterString("prenom"),
      "firstName": this.filterString("nom")
    };
    let errors = 0;
  
    if (!data.email){
      Swal.fire('Veuillez entrer une adresse @mail valide');    
      errors++;
    }
    
    if (!data.city){
      Swal.fire('Veuillez entrer une ville valide');  
      errors++;
    }
    
    if (!data.address) {   
      Swal.fire('Veuillez entrer une adresse valide');  
      errors++;
    }
    
    if (!data.lastName) {
      Swal.fire('Veuillez entrer un prénom valide');  
      errors++;
    }
    
    if (!data.firstName)  { 
      Swal.fire('Veuillez entrer un Nom valide');  
      errors++;
    }
    
    if (errors > 0) {
      console.log("montrer la modale");
      $("#formModal").modal('show');
      return false;
    }
    return {contact : data};

  }

  // ===================================================================================================
  /**
   * 
   * @param {string} str 
   * @return {string|boolean}
   */

  //  -----[ obligation d'une adresse mail valide]-----------------------------------------------------
/**
 * [si l'adresse mail n'est pas valide return false sinon return string]
 * @param {string} ref 
 * @return (false || string)
 */
  filterEmail(ref) {
    const str = document.getElementById(ref).value;
    const arobase = str.indexOf("@"); // indexOf indique le moment dans la chaine ou se trouve "@"
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
  // -----[obligation de rentrer du texte ds l'input text]------------------------------------------------$

  /**
   * [description]
   * @param {string} ref l'id de l'élément du formulaire à valider
   * @returns {string|boolean} retourne la chaine validée ou false si la chaine n'est pas valide
   */
  filterString(ref) {
    const str = document.getElementById(ref).value;
    if (str.length <= 2) {
      this.showError(ref);
      return false;
    }
    const isNumber = Number(str);
    if (typeof isNumber !== "number") 
    {
      this.showError(ref);
      return false;
    }
    return str;
  }

  showError(ref) {
    const str = document.getElementById("#formModal");
  } 
    
}