// https://viacep.com.br/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
// https://www.alura.com.br/artigos/es6-desestruturando-objetos?
// https://horadecodar.com.br/html-como-limitar-caracteres-do-input/
// https://joaorodrs.medium.com/formatando-n%C3%BAmero-de-celular-cpf-cnpj-e-cep-com-regex-no-react-a2ee498fd9e9

async function buscaEndereco(cep) {

    let erroTela = document.getElementById('erro')

    try {

        let data = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        let dataJson = await data.json()

        console.log(dataJson)
        dataJson.erro == true ? erroTela.innerHTML = '<p>CEP não existente!!</p>' : erroTela.innerHTML = "";

        var cidade = document.getElementById('cidade');
        var logradouro = document.getElementById('endereco');
        var estado = document.getElementById('estado');

        cidade.value = dataJson.localidade
        logradouro.value = dataJson.logradouro
        estado.value = dataJson.uf


    } catch (err) {
        console.error(err);
        erroTela.innerHTML = "<p>CEP não encontrado!</p>"
    } finally {
        console.log('Operação concluida!')
    }
}


let cepEntrada = document.getElementById('cep')

cepEntrada.addEventListener('keydown', (e) => {
    console.log(e.target.value)
    const cep = e.target.value // <-- cep não formatado
    cepEntrada.value = cep.replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1')
    // LOG: 64031-520
})

cepEntrada.addEventListener('focusout', (e) => {
    buscaEndereco(e.target.value)
})





