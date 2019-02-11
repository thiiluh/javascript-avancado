class View {
    constructor(elemento){
        this._elemento = elemento;
    }

    _template(model) {
        throw new Error('Você deve sobrescrever este método em seu template');
    }

    update(model){
        this._elemento.innerHTML = this._template(model);
    }
}