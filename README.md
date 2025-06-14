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
   A página `monitor.html` permite acordar todos os inscritos através do botão de envio.

## Limpeza
O arquivo `netlify/functions/subs.json` é gerado durante a execução para armazenar as inscrições de push e está ignorado pelo git.
