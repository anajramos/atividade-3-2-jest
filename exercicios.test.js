const {
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
} = require('./exercicios');

describe('Suíte de Testes - Atividade 3.2', () => {
  // 1. calcularMedia
  test('deve calcular a média corretamente e lançar erro para notas inválidas', () => {
    expect(calcularMedia(8, 7, 9)).toBe(8);
    expect(calcularMedia(10, 7, 8)).toBeCloseTo(8.33, 2);
    expect(() => calcularMedia(-1, 8, 9)).toThrow('Nota inválida: deve estar entre 0 e 10');
    expect(() => calcularMedia(8, 11, 9)).toThrow('Nota inválida: deve estar entre 0 e 10');
  });

  // 2. verificarAprovacao
  test('deve aprovar apenas com média >= 7 e frequência >= 75', () => {
    expect(verificarAprovacao(7.0, 75)).toBe(true);
    expect(verificarAprovacao(6.9, 90)).toBe(false);
    expect(verificarAprovacao(8.5, 70)).toBe(false);
  });

  // 3. classificarFaixaEtaria
  test('deve classificar as faixas etárias e barrar idade negativa', () => {
    expect(classificarFaixaEtaria(10)).toBe('Criança');
    expect(classificarFaixaEtaria(15)).toBe('Adolescente');
    expect(classificarFaixaEtaria(30)).toBe('Adulto');
    expect(classificarFaixaEtaria(65)).toBe('Idoso');
    expect(() => classificarFaixaEtaria(-5)).toThrow('Idade não pode ser negativa');
  });

  // 4. converterKmParaMilhas
  test('deve converter km para milhas com precisão e barrar valor negativo', () => {
    expect(converterKmParaMilhas(10)).toBeCloseTo(6.21371, 5);
    expect(() => converterKmParaMilhas(-2)).toThrow('Distância não pode ser negativa');
  });

  // 5. gerarEmailCorporativo
  test('deve gerar e-mail limpo em letras minúsculas', () => {
    expect(gerarEmailCorporativo('  Lucas ', ' SILVA ', 'Empresa.COM ')).toBe(
      'lucas.silva@empresa.com'
    );
  });

  // 6. adicionarItemCarrinho
  test('deve adicionar item sem alterar o carrinho original', () => {
    const original = ['Teclado', 'Mouse'];
    const atualizado = adicionarItemCarrinho(original, 'Monitor');

    expect(atualizado).toEqual(['Teclado', 'Mouse', 'Monitor']);
    expect(original).toEqual(['Teclado', 'Mouse']);
  });

  // 7. calcularSalarioLiquido
  test('deve calcular o salário líquido e validar entradas inválidas', () => {
    expect(calcularSalarioLiquido(3000, 10)).toBe(2700);
    expect(() => calcularSalarioLiquido(0, 10)).toThrow('Valores de salário ou desconto inválidos');
    expect(() => calcularSalarioLiquido(3000, 110)).toThrow('Valores de salário ou desconto inválidos');
  });

  // 8. criarProduto
  test('deve criar objeto de produto com emEstoque true e validar preço', () => {
    expect(criarProduto(1, 'Notebook', 3500, 'Informática')).toEqual({
      id: 1,
      nome: 'Notebook',
      preco: 3500,
      categoria: 'Informática',
      emEstoque: true,
    });
    expect(() => criarProduto(2, 'Cabo', 0, 'Acessórios')).toThrow('Preço deve ser maior que zero');
  });

  // 9. ehTrianguloValido
  test('deve validar corretamente a desigualdade triangular', () => {
    expect(ehTrianguloValido(3, 4, 5)).toBe(true);
    expect(ehTrianguloValido(1, 2, 10)).toBe(false);
    expect(ehTrianguloValido(0, 4, 5)).toBe(false);
  });

  // 10. removerItem
  test('deve remover item retornando um novo array sem alterar o original', () => {
    const lista = ['Ana', 'Bruno', 'Carlos'];
    const novaLista = removerItem(lista, 'Bruno');

    expect(novaLista).toEqual(['Ana', 'Carlos']);
    expect(lista).toEqual(['Ana', 'Bruno', 'Carlos']);
  });
});