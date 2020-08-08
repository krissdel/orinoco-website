




class Composant{
  constructor(name, domTarget, tagName){
    name      = usableName(name);
    this.DOM  = document.createElement(tagName);
    this.name = name;
    domTarget.appendChild(this.DOM);
    eshop[name] = this;
  }
}

