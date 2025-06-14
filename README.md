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
2. Este repositório já vem configurado com o seguinte par de chaves VAPID:
   - **Public Key**: `BOymOl4h63DQGXHJMMJPXYI1gxFIMIX5J2M0pMiH6Qi_XgN7VBOhpYctrXE85Ncr5Ssvfzl-IQQWnV3q8tZ8I4U`
   - **Private Key**: `D1Frm3VNgDMClKSF1nqqKnppTuDzT_WS-yGD2Bpi9k0`
   Caso deseje gerar novas chaves, abra `generate_keys.html` em seu navegador.
3. Inicie o ambiente local com:
   ```bash
   npx netlify dev
   ```
   Acesse `http://localhost:8888/monitor.html` para visualizar o QR code.
   No celular, abra o link gerado ou escaneie o QR para acessar `subscribe.html` e ativar as notificações.
   Após a inscrição, o monitor mostra quantas inscrições foram registradas.
   Use o botão para acordar todos os inscritos.

## Limpeza
As inscrições agora são persistidas no serviço **Netlify Blobs**, permitindo que todas as funções acessem o mesmo conjunto de dados tanto localmente quanto em produção.
Durante o desenvolvimento, caso o serviço não esteja disponível, o projeto cai para um arquivo `subs.json` localizado em `netlify/functions/`.
Se necessário, é possível definir o caminho desse arquivo através da variável `SUBS_FILE`.
