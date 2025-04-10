# 🤖 ArenaFutebolBR Bot

![Capa do Projeto](https://cdn.discordapp.com/attachments/123456789012345678/123456789012345678/capa-bot-arena.png)

Um bot para Discord com foco em futebol brasileiro e internacional. Permite ver jogos do dia e registrar palpites.

---

## 🚀 Comandos disponíveis

| Comando         | Descrição                                                |
|-----------------|-----------------------------------------------------------|
| `/jogos-hoje`   | Lista os jogos de futebol do dia                          |
| `/serie-a`      | (Em breve) Mostra os jogos da Série A                     |
| `/palpite`      | Envia seu palpite para um jogo específico                 |

---

## 🛠️ Tecnologias

- Node.js
- Discord.js v14
- Railway (hospedagem)
- dotenv (para variáveis de ambiente)
- node-fetch (requisições HTTP)

---

## ⚙️ Como rodar localmente

1. Clone o repositório
2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` com o seguinte conteúdo:

```env
DISCORD_TOKEN=seu_token_aqui
CLIENT_ID=seu_client_id_do_bot
GUILD_ID=id_do_servidor_para_testes
API_KEY=sua_api_key_da_api-futebol
```

4. Rode o bot:

```bash
node index.js
```

---

## ☁️ Como fazer deploy na Railway

1. Acesse: https://railway.app
2. Clique em "New Project" e selecione "Deploy from GitHub"
3. Conecte seu repositório com o bot
4. Em "Variables", adicione:

   - `DISCORD_TOKEN`
   - `CLIENT_ID`
   - `GUILD_ID`
   - `API_KEY`

5. Clique em "Deploy"

---

## 🌐 Registro de comandos

Durante o desenvolvimento, os comandos são registrados diretamente em um servidor (via `GUILD_ID`) para propagação instantânea.

Para uso global (produção), altere:

```js
Routes.applicationCommands(process.env.CLIENT_ID)
```

---

## 🔗 Links úteis

- [Documentação Discord.js](https://discordjs.guide)
- [API Futebol](https://api-futebol.com.br/)
- [Railway Docs](https://docs.railway.app/)
- [Suporte Oficial do Discord](https://support.discord.com/)

---

## 📩 Sugestões de novos comandos:

- `/transmissao`
- `/ranking-palpite`
- `/radio-esportiva`
- `/estatisticas-jogador`

---

Feito com ⚽ por [ArenaFutebolBR]