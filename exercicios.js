// 1. Média aritmética com validação de 0 a 10
function calcularMedia(nota1, nota2, nota3) {
  const notas = [nota1, nota2, nota3];
  const invalida = notas.some(
    (n) => typeof n !== 'number' || Number.isNaN(n) || n < 0 || n > 10
  );
  if (invalida) {
    throw new Error('Nota inválida: deve estar entre 0 e 10');
  }
  return (nota1 + nota2 + nota3) / 3;
}

// 2. Verificação de aprovação (média >= 7.0 e frequência >= 75)
function verificarAprovacao(media, frequencia) {
  return media >= 7.0 && frequencia >= 75;
}

// 3. Classificação de faixa etária
function classificarFaixaEtaria(idade) {
  if (idade < 0) {
    throw new Error('Idade não pode ser negativa');
  }
  if (idade <= 12) return 'Criança';
  if (idade <= 17) return 'Adolescente';
  if (idade <= 59) return 'Adulto';
  return 'Idoso';
}

// 4. Conversão de quilômetros para milhas
function converterKmParaMilhas(km) {
  if (km < 0) {
    throw new Error('Distância não pode ser negativa');
  }
  return km * 0.621371;
}

// 5. Gerador de e-mail corporativo padronizado
function gerarEmailCorporativo(nome, sobrenome, empresa) {
  const n = nome.trim().toLowerCase();
  const s = sobrenome.trim().toLowerCase();
  const e = empresa.trim().toLowerCase();
  return `${n}.${s}@${e}`;
}

// 6. Adicionar item no carrinho sem alterar o array original
function adicionarItemCarrinho(carrinho, item) {
  return [...carrinho, item];
}

// 7. Cálculo de salário líquido com validação
function calcularSalarioLiquido(salarioBruto, percentualDesconto) {
  if (salarioBruto <= 0 || percentualDesconto < 0 || percentualDesconto > 100) {
    throw new Error('Valores de salário ou desconto inválidos');
  }
  return salarioBruto - salarioBruto * (percentualDesconto / 100);
}

// 8. Fábrica de objeto de produto
function criarProduto(id, nome, preco, categoria) {
  if (preco <= 0) {
    throw new Error('Preço deve ser maior que zero');
  }
  return {
    id,
    nome,
    preco,
    categoria,
    emEstoque: true,
  };
}

// 9. Validação de triângulo (desigualdade triangular)
function ehTrianguloValido(ladoA, ladoB, ladoC) {
  return (
    ladoA > 0 &&
    ladoB > 0 &&
    ladoC > 0 &&
    ladoA < ladoB + ladoC &&
    ladoB < ladoA + ladoC &&
    ladoC < ladoA + ladoB
  );
}

// 10. Remoção imutável de item em array (confira o nome exato no fim da página)
function removerItem(lista, item) {
  return lista.filter((elemento) => elemento !== item);
}

module.exports = {
  calcularMedia,
  verificarAprovacao,
  classificarFaixaEtaria,
  converterKmParaMilhas,
  gerarEmailCorporativo,
  adicionarItemCarrinho,
  calcularSalarioLiquido,
  criarProduto,
  ehTrianguloValido,
  removerItem,
};