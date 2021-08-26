export enum InvoiceHelp {
  invoiceNumber = 'É o identificador único do seu invoice. Ele te ajuda a organizar melhor os documentos! Se você não preencher, o mínimo é usado.',
  contractorTitle = 'É o título que identifica o seu papel no invoice, por exemplo: “prestador de serviço”, “acting company”, etc.',
  clientTitle = 'É o título que identifica o papel do cliente no invoice, por exemplo: “tomador de serviço”, “beneficiary company”, etc.',
  clientId = 'O nome do seu cliente como está cadastrado. Use a página de clientes para criar um novo cliente.',
  greeting = 'A saudação que apresenta o conteúdo do invoice, por exemplo “Caros”, “Dear [COMPANY NAME] team”.',
  motivation = 'A motivação é um texto justificativo, geralmente pequeno, que explica porque o invoice está sendo gerado e qual é o período de referência. Por exemplo: “Cobrança referente às [ATIVIDADES], realizadas de [DATA INICIAL] a [DATA FINAL]”.',
  currency = 'Valor cobrado pela hora e a unidade monetária de pagamento. Por exemplo “15.00” e “US$”.',
  paymentTerms = 'Regras em relação ao pagamento, por exemplo “Termos de pagamento: pagar em até 5 dias úteis”.',
  paymentInstructions = 'Como o pagamento será recebido. Por exemplo “Por favor deposite o total na conta bancária a seguir”.',
  bankInfo = 'São os dados que possibilitam execução das instruções de pagamento.',
  thankYouText = 'Um agradecimento ao cliente pela preferência.',
  signature = 'Uma assinatura que precede a assinatura da empresal. Por exemplo, a pessoa física que emite o documento.',
  period = 'Use o calendário para selecionar o período de abrangência do invoice. Os pontos abertos não serão considerados.',
}

export enum InvoicePlaceholder {
  invoiceNumber = 'Número do invoice',
  contractorTitle = 'Por exemplo “Prestador de serviço”',
  clientTitle = 'Por exemplo “Tomador de serviço”',
  clientId = 'Nome do cliente',
  greeting = 'Por exemplo “Caros [NOME DO CLIENTE]”',
  motivation = 'Por exemplo “Cobrança referente às atividade realizadas como ghostwriter para 5 textos sobre educação à distância de 14 de março de 2021 a 10 de abril de 2021” ',
  hourlyRate = 'Digite o valor da hora',
  currency = 'Digite a unidade monetária',
  paymentTerms = 'Por exemplo “Termos de pagamento: pagar em até 5 dias úteis”',
  paymentInstructions = 'Por exemplo “Por favor deposite o total na conta bancária a seguir”',
  bankInfo = 'Os dados bancários para recebimento. Por exemplo, o seu banco, conta e agência, ou ainda os dados de depósito de remessa, para o caso de clientes no exterior.',
  thankYouText = 'Por exemplo “Grata/Grato por trabalharem conosco”',
  signature = 'Por exemplo o seu nome físico',
}

export class Invoice {
  id = ''
  invoiceNumber = ''
  contractorTitle = ''
  clientTitle = ''
  clientId = ''
  greeting = ''
  motivation = ''
  hourlyRate = ''
  totalHours = ''
  createdAt = ''
  currency = ''
  paymentTerms = ''
  paymentInstructions = ''
  bankInfo = ''
  thankYouText = ''
  signature = ''
}
