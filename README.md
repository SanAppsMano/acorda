# Acorda Notifications Demo

Este projeto demonstra um fluxo simples de envio de notificações push utilizando Netlify Functions e a biblioteca `web-push`.

## Requisitos
- Node.js 18 ou superior
- [Netlify CLI](https://docs.netlify.com/cli/get-started/) instalado globalmente

## Configuração
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Gere um par de chaves VAPID abrindo `generate_keys.html` em seu navegador. A página realiza todo o processo localmente e exibe as chaves **Public Key** e **Private Key** para você copiar.
3. Crie um arquivo `.env` na raiz do projeto com as variáveis abaixo:
   ```bash
   VAPID_PUBLIC_KEY=<sua public key>
   VAPID_PRIVATE_KEY=<sua private key>
   ```
4. Edite `subscribe.html` e substitua o valor de `publicVapidKey` pelo conteúdo da sua chave pública.
5. Inicie o ambiente local com:
   ```bash
   npx netlify dev
   ```
   A página `monitor.html` permite acordar todos os inscritos através do botão de envio.

## Limpeza
O arquivo `netlify/functions/subs.json` é gerado durante a execução para armazenar as inscrições de push e está ignorado pelo git.
