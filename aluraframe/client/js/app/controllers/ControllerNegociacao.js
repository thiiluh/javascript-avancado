class ControllerNegociacao {
  constructor() {
    let $ = document.querySelector.bind(document);
    this._inputData = $("#data");
    this._inputQuantidade = $("#quantidade");
    this._inputValor = $("#valor");

    this._listaNegociacoes = new Bind(
      new ListaNegociacoes(),
      new NegociacoesView($("#negociacoesView")),
      "apaga",
      "adiciona"
    );
    this._mensagem = new Bind(
      new ListaNegociacoes(),
      new MensagemView($("#mensagemView")),
      "texto"
    );
  }

  adiciona(event) {
    event.preventDefault();
    this._listaNegociacoes.adiciona(this._criaNegociacao());
    this._mensagem.texto = "Adicionado com sucesso";
    this._limpaForm();
  }

  importaNegociacoes() {
    let negociacaoService = new NegociacaoService();

    Promise.all([
      negociacaoService.obterNegociacoesSemana(),
      negociacaoService.obterNegociacoesSemanaAnterior(),
      negociacaoService.obterNegociacoesSemanaRetrasada()
    ])
      .then(negociacao =>
        negociacao
          .reduce((novoArray, array) => novoArray.concat(array), [])
          .forEach(elem => this._listaNegociacoes.adiciona(elem))
      )
      .catch(erro => (this._mensagem.texto = erro));
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
