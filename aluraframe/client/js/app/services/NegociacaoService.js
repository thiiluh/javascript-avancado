class NegociacaoService {
  obterNegociacoesSemana() {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();

      xhr.open("GET", "/negociacoes/semana");

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(
              JSON.parse(xhr.responseText).map(
                obj =>
                  new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)
              )
            );
          } else {
            reject("Erro ao importar");
            console.log(xhr.responseText);
          }
        }
      };

      xhr.send();
    });
  }

  obterNegociacoesSemanaAnterior() {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();

      xhr.open("GET", "/negociacoes/anterior");

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(
              JSON.parse(xhr.responseText).map(
                obj =>
                  new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)
              )
            );
          } else {
            reject("Erro ao importar");
            console.log(xhr.responseText);
          }
        }
      };

      xhr.send();
    });
  }

  obterNegociacoesSemanaRetrasada() {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();

      xhr.open("GET", "/negociacoes/retrasada");

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(
              JSON.parse(xhr.responseText).map(
                obj =>
                  new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)
              )
            );
          } else {
            reject("Erro ao importar");
            console.log(xhr.responseText);
          }
        }
      };

      xhr.send();
    });
  }
}
