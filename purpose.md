# Memudei - v1.0.0
Plataforma para gestão de imóveis com foco nas etapas de descoberta e fechamento de contratos de locação.
Fluxo básico:
1. Cria a conta `é criado uma organização e um usuário administrador`
2. Cadastra os imóvel
3. Cadastra os contrato de locação e o termo de vistoria (ou qualquer outro termo e contrato que seja necessário)
4. Cadastra o inquilino
  4.1. O cadastro de inquilinos pode ser feito manualmente ou por meio do link de cadastro acessado pelo inquilino
  4.2. é possível cadastrar fiadores e seguros
5. Aprovação do inquilino e analise de risco e crédito
6. Assinatura do contrato
7. Pagamento do aluguel e repasse automático (split de pagamento)


## Features
### Gestão de imóveis
Gestão de imóveis para locação que oferece suporte com diversas integrações para facilitar a busca e fechamento de contratos.
- [x] Integração com Google Maps
- [x] Integração com redes sociais e portais de imóveis
- [x] Suporte para criação por meio de inteligência artificial
- [ ] Integração com CRMs e ERPs
- [ ] Suporte para fotos, videos e tours virtuais

### Gestão de inquilinos
- [ ] Integração com sistemas de análise de perfil para detecção de risco
- [ ] Integração com sistemas de análise de crédito
- [ ] Integração com sistemas de pagamento para pagamento de aluguéis
- [x] Suporte para fiadores e seguros

### Gestão de contratos
- [x] Assinatura eletrônica de contratos

### Gestão de proprietários
- [ ] Integração com sistemas de pagamento para repasse de aluguéis

### Gestão de corretores
- [x] Integração com sistemas de CRM
- [ ] Ferramentas de análise de desempenho
- [ ] Integração com sistemas de pagamento para comissões

### Criação de documentos
- [ ] Um documento pode ser criado a partir de um template ou de forma livre (fazendo upload de um arquivo com o conteúdo já preenchido)
  1. Preencher os dados dos signatários.
    1.1. O documento é enviado para para assinatura.
      - Cria um Signatary com o type [LESSEE, LESSOR, WITNESS] e o status [PENDING, APPROVED, REJECTED]
      - Cria uma Person para cada signatário
      - Cria um Document gerando um link para assinatura
  2. Notifica os signatários com formulario para preencher os campos.
    - Cria um token para cada signatário e envia um email com o link para preencher os campos
    2.1. Caso seja aprovado, verifica se todos os signatários preencheram os campos.
      2.1.1. Se sim, o documento é enviado para para assinatura.
      2.1.2. Se não, aguardar o preenchimento dos campos.
    2.2. Caso seja rejeitado
      2.2.1. Voltar para o passo 1.2 com uma justificativa.
      2.2.2. Cancelar o documento e notificar os envolvidos com a justificativa.
  3. Em caso de template, etapa para preencher os campos do documento.