import 'dotenv/config';
import { Client, GatewayIntentBits, Events, REST, Routes, SlashCommandBuilder, Collection } from 'discord.js';
import fs from 'fs';
import fetch from 'node-fetch';

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences
  ] 
});

client.commands = new Collection();

const commands = [
  new SlashCommandBuilder().setName('jogos-hoje').setDescription('Veja os jogos de hoje no futebol mundial'),
  new SlashCommandBuilder().setName('serie-a').setDescription('Jogos da Série A do Brasileirão'),
  new SlashCommandBuilder().setName('palpite').setDescription('Dê seu palpite para um jogo')
    .addStringOption(option => option.setName('jogo').setDescription('Ex: Flamengo x Palmeiras').setRequired(true))
    .addStringOption(option => option.setName('placar').setDescription('Ex: 2x1').setRequired(true))
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

let palpites = {};

client.once(Events.ClientReady, () => {
  console.log(`✅ Bot ArenaFutebolBR online como ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === 'jogos-hoje') {
    try {
      const response = await fetch('https://api.api-futebol.com.br/v1/partidas', {
        headers: { Authorization: `Bearer ${process.env.API_KEY}` }
      });
      const data = await response.json();

      if (!data || !data.length) return interaction.reply('⚠️ Nenhum jogo encontrado para hoje.');

      const jogos = data.slice(0, 5).map(j => `⚽ **${j.campeonato.nome}**:\n🟢 ${j.time_mandante.nome} x ${j.time_visitante.nome}`).join('\n\n');
      return interaction.reply(`📅 **Jogos de hoje:**\n\n${jogos}`);
    } catch (error) {
      console.error(error);
      interaction.reply('❌ Erro ao buscar os jogos.');
    }
  }

  if (commandName === 'serie-a') {
    return interaction.reply('🇧🇷 Em breve: dados da Série A com horários e transmissão.');
  }

  if (commandName === 'palpite') {
    const jogo = options.getString('jogo');
    const placar = options.getString('placar');
    const userId = interaction.user.id;
    const nome = interaction.user.username;

    if (!palpites[jogo]) palpites[jogo] = [];
    palpites[jogo].push({ userId, nome, placar });

    return interaction.reply(`✅ Palpite registrado para **${jogo}** como **${placar}**.`);
  }
});

(async () => {
  try {
    console.log('🔄 Registrando comandos de barra...');
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), // GUILD Commands
      { body: commands },
    );
    client.login(process.env.DISCORD_TOKEN);
  } catch (error) {
    console.error('❌ Erro ao registrar comandos:', error);
  }
})();
