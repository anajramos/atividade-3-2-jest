// avancado.test.js
const {
  ehPalindromo,
  contarVogais,
  calcularFatorial,
  removerDuplicatas,
  agendarConsulta,
  formatarMoeda,
  validarCpfBasico,
  calcularIngresso,
  ContaBancaria,
  obterClima
} = require('./avancado');

describe('🚀 Suíte de Testes Unitários Avançados - Parte 2', () => {
  // 1. ehPalindromo
  test('1. deve validar palíndromos ignorando maiúsculas e rejeitar não palíndromos ou string vazia', () => {
    expect(ehPalindromo('radar')).toBe(true);
    expect(ehPalindromo('Arara')).toBe(true);
    expect(ehPalindromo('javascript')).toBe(false);
    expect(ehPalindromo('')).toBe(false);
  });

  // 2. contarVogais
  test('2. deve contar vogais com e sem acentuação corretamente', () => {
    expect(contarVogais('programação')).toBe(5);
    expect(contarVogais('computador')).toBe(4);
    expect(contarVogais('xyz')).toBe(0);
  });

  // 3. calcularFatorial
  test('3. deve calcular o fatorial para números positivos, casos base (0 e 1) e lançar erro para negativos', () => {
    expect(calcularFatorial(5)).toBe(120);
    expect(calcularFatorial(0)).toBe(1);
    expect(calcularFatorial(1)).toBe(1);
    expect(() => calcularFatorial(-5)).toThrow('Não existe fatorial de número negativo');
  });

  // 4. removerDuplicatas
  test('4. deve remover elementos duplicados de arrays numéricos e de strings usando toEqual', () => {
    expect(removerDuplicatas([1, 1, 2, 3, 3, 4])).toEqual([1, 2, 3, 4]);
    expect(removerDuplicatas(['a', 'b', 'a'])).toEqual(['a', 'b']);
  });

  // 5. agendarConsulta
  test('5. deve permitir agendamento em dia útil e bloquear sábado e domingo', () => {
    const segundaFeira = new Date(2026, 9, 26); // 26 de Outubro de 2026 (Segunda)
    const sabado = new Date(2026, 9, 24);       // 24 de Outubro de 2026 (Sábado)
    const domingo = new Date(2026, 9, 25);      // 25 de Outubro de 2026 (Domingo)

    expect(agendarConsulta(segundaFeira)).toBe('Consulta agendada com sucesso');
    expect(() => agendarConsulta(sabado)).toThrow('Clínica fechada aos finais de semana');
    expect(() => agendarConsulta(domingo)).toThrow('Clínica fechada aos finais de semana');
  });

  // 6. formatarMoeda
  test('6. deve formatar números para o padrão brasileiro (R$ 0,00) e rejeitar valores inválidos', () => {
    expect(formatarMoeda(100)).toBe('R$ 100,00');
    expect(formatarMoeda(15.5)).toBe('R$ 15,50');
    expect(() => formatarMoeda('abc')).toThrow('Valor inválido');
  });

  // 7. validarCpfBasico
  test('7. deve validar CPFs de 11 dígitos (com ou sem máscara) e rejeitar dígitos repetidos ou curtos', () => {
    expect(validarCpfBasico('12345678901')).toBe(true);
    expect(validarCpfBasico('123.456.789-01')).toBe(true);
    expect(validarCpfBasico('11111111111')).toBe(false);
    expect(validarCpfBasico('12345')).toBe(false);
  });

  // 8. calcularIngresso
  test('8. deve calcular ingresso integral, meia-entrada e respeitar a não cumulatividade', () => {
    expect(calcularIngresso(25, false, 1)).toBe(40); // Integral em dia comum
    expect(calcularIngresso(20, true, 1)).toBe(20);  // Meia para estudante
    expect(calcularIngresso(60, false, 1)).toBe(20); // Meia para idoso (>= 60)
    expect(calcularIngresso(30, false, 3)).toBe(20); // Meia na quarta-feira (dia 3)
    expect(calcularIngresso(65, true, 3)).toBe(20);  // Não cumulativo: idoso + estudante + quarta
  });

  // 9. Classe ContaBancaria com isolamento via beforeEach
  describe('9. Suíte da Classe ContaBancaria', () => {
    let conta;

    beforeEach(() => {
      conta = new ContaBancaria('Lucas');
    });

    test('deve iniciar com saldo zerado', () => {
      expect(conta.obterSaldo()).toBe(0);
    });

    test('deve atualizar o saldo após um depósito válido', () => {
      conta.depositar(150);
      expect(conta.obterSaldo()).toBe(150);
    });

    test('deve lançar erro ao tentar depositar valor negativo ou zero', () => {
      expect(() => conta.depositar(-50)).toThrow('Valor de depósito deve ser positivo');
    });

    test('deve realizar saque válido e atualizar o saldo corretamente', () => {
      conta.depositar(200);
      conta.sacar(80);
      expect(conta.obterSaldo()).toBe(120);
    });

    test('deve lançar erro de saldo insuficiente ao tentar sacar acima do saldo', () => {
      conta.depositar(50);
      expect(() => conta.sacar(100)).toThrow('Saldo insuficiente');
    });
  });

  // 10. Consulta Assíncrona de Clima com Mock (jest.fn)
  describe('10. Suíte de Clima Assíncrono com Mock', () => {
    test('deve retornar a temperatura formatada quando o serviço responder com sucesso', async () => {
      const servicoMock = {
        buscar: jest.fn().mockResolvedValue({ temperatura: 28 })
      };

      const resultado = await obterClima('São Paulo', servicoMock);

      expect(resultado).toBe('A temperatura em São Paulo é de 28°C');
      expect(servicoMock.buscar).toHaveBeenCalledWith('São Paulo');
      expect(servicoMock.buscar).toHaveBeenCalledTimes(1);
    });

    test('deve lançar erro tratado quando ocorrer falha de rede no serviço externo', async () => {
      const servicoMockComFalha = {
        buscar: jest.fn().mockRejectedValue(new Error('Network Offline'))
      };

      await expect(obterClima('Curitiba', servicoMockComFalha)).rejects.toThrow(
        'Falha ao buscar dados climáticos'
      );
    });
  });
});