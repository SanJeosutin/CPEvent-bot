const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('check whether the bot is alive :D'),
        
    async execute(interaction){
        await interaction.reply({content: 'pong!', ephemeral: true});
    },
};