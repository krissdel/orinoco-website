/**
 * class qui definit les composants du site 
 * @class
 */
class Composant{
  /**
   * constructor de la class composant
   * 
   * @param {*} name 
   * @param {*} domTarget 
   * @param {*} tagName 
   */
  constructor(name, domTarget, tagName){
    name      = usableName(name);
    this.DOM  = document.createElement(tagName);
    this.name = name;
    domTarget.appendChild(this.DOM);
    eshop[name] = this;
    console.log (this.DOM);
  }
}

