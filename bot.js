const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const ytdl = require('ytdl-core');
const streamOptions = {seek: 0, volume: 1};
let cu = false;

client.login(config.token);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  if (cu == true) 
  {   
  console.log('vai toma no cu');

  }

});


client.on('message', message => {
  if (message.content === config.prefix+'fri') {
    message.reply('fri!');
  }
});

client.on('message', message => {
  if (message.content.toLowerCase().startsWith('man')) {
    message.reply('muié');
  }
});


client.on('message', message => {
    // If the message is "what is my avatar"
    if (message.content === config.prefix+'avatar') {
      // Send the user's avatar URL
      message.reply(message.author.displayAvatarURL());
    }
});

client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Welcome to the server, ${member}`);
});



let queue = [];

client.on('message', msg => {
  if(msg.content.indexOf("youtube") !== -1 && msg.content.toLowerCase().startsWith(config.prefix+"play")){
    let CompleteMessage = msg.content.split(' ');
    let youtubeLink = CompleteMessage[1];
    let VoiceChannel = msg.guild.channels.cache.find(channel => channel.id ==='617485007908503588');
    if(VoiceChannel == null){
      console.log('Canal não foi encontrado');
    }

    if (VoiceChannel != null) {
      console.log('O canal Foi Encontrado');
      
      VoiceChannel.join().then(connection => {
        const stream =ytdl(youtubeLink, {filter:'audioonly'});
      
        const DJ = connection.play(stream, streamOptions);
        DJ.on('end', end => {
          VoiceChannel.leave();
        });
      })
      

      .catch(console.error);
    }
  }

});

