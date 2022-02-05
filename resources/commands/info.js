const {SlashCommandBuilder} = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('get info about the bot & the server! Pretty neat huh?')
        .addSubcommand(subcommand =>
            subcommand
                .setName('bot')
                .setDescription('Get info about the bot!'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('Get info about the server!')),

    async execute(interaction, ){
        if (!interaction.isCommand()) return;

        var subcommand = interaction.options.getSubcommand();
        switch (subcommand) {
            case 'bot':
                await interaction.reply({content: `Hi, I\'m a bot in this server. I'm known as C&P Event Organiser, nice to meet you! I've been created to organised events on this server! We'll be seing each other soon :D`, ephemeral: true});
                break;

            case 'server':
                await interaction.reply({content: `You're currently in ${interaction.guild.name}! So far we have ${interaction.guild.memberCount} members!`, ephemeral: true});
                break;
        }
    },
};