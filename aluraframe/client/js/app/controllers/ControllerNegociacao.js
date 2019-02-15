class ControllerNegociacao {
  constructor() {
    let $ = document.querySelector.bind(document);
    this._inputData = $("#data");
    this._inputQuantidade = $("#quantidade");
    this._inputValor = $("#valor");
    let self = this;
    this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {

      get(target, prop, receiver){
        if(["adiciona", "apaga"].includes(prop) && typeof(target[prop]) == typeof(Function)){
          return function(){
            console.log(`Interceptado : ${prop}`);
            Reflect.apply(target[prop], target, arguments);
            self._negociacoesView.update(target);
          }
        }

        return Reflect.get(target, prop, receiver);
      }
    });
    this._negociacoesView = new NegociacoesView($("#negociacoesView"));
    this._negociacoesView.update(this._listaNegociacoes);
    this._mensagem = new Mensagem(model => this._mensagemView.update(model));
    this._mensagemView = new MensagemView($("#mensagemView"));
    this._mensagemView.update(this._mensagem);
  }

  adiciona(event) {
    event.preventDefault();
    this._listaNegociacoes.adiciona(this._criaNegociacao());
    this._mensagem.texto = "Adicionado com sucesso";
    this._limpaForm();
  }

  _criaNegociacao() {
    return new Negociacao(
      DateHelper.TextoParaData(this._inputData.value),
      this._inputQuantidade.value,
      this._inputValor.value
    );
  }

  _limpaForm() {
    this._inputData.value = "";
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0;
    this._inputData.focus();
  }

  apaga() {
    this._listaNegociacoes.apaga();
    this._mensagem.texto = "Apagado com sucesso";
  }
}
