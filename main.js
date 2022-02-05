const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./resources/settings/config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });


const eventFiles = fs.readdirSync('./resources/events').filter(file => file.endsWith('.js'));

for (const file of eventFiles){
    const event = require(`./resources/events/${file}`);
    if(event.once){
        client.once(event.name, (...args) => event.execute(client, ...args));
    }else{
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
}

client.commands = new Collection();
const commandFiles = fs.readdirSync('./resources/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    //*set new item in collection
    //*using key as command name, value as exported module
    
    const command = require(`./resources/commands/${file}`);
    client.commands.set(command.data.name, command);
}


client.on('interactionCreate', async interaction => {
    const command = client.commands.get(interaction.commandName);
    if(!interaction.isCommand()) return;
    if(!command) return;

    try{
        await command.execute(interaction);
    }catch (err){
        console.error(err);
        await interaction.reply({ content: 'There was an error trying to execute that command!', ephemeral: true});
    }
});

client.login(token);