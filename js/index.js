//=====[modification background wrap_header]================================================

/**
 * modification du background du header
 */
const header = document.getElementsByClassName("wrap_header");
header[0].style.backgroundColor = "#f3e9f1";

// =====[récupération des données du server]===============================================================================

/**récupération  des données du server
 * @return {string}
 */

var eshop = {};
var src = "http://localhost:3000/api/cameras"
initShop(src);
/**
 * les données du server sont récupérer (fetch)
 * fichier json
 * @param {*} server 
 */
async function initShop (server){
  new Panier("panier", document.querySelector(".wrap_header"));
  const target   = document.querySelector("main");
  const response = await fetch(server);
  const data     = await response.json();
  for (let i=0; i< data.length; i++){
    new Produit(data[i], target);
  }
}
// -----[récupère le nom des produits sans "_"]---------------------------------
/**
 * affiche le nom utilisable sans "_"
 * @param {string} name 
 * @return {string}
 */
function usableName(name){
  return name.split(" ").join("_");
}