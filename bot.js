// Creator By: Cem#3658
// Discord: discord.gg/Nk2H3H3

// Başlangıç

const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment');
const path = require('path');
const fs = require('fs');

const ayarlar = require('./veri/ayarlar.json');

// Komut Yükleyicisi.

const komutlar = new Map();

client.config = ayarlar;
client.komutlar = komutlar;

fs.readdirSync(path.resolve(__dirname, 'komutlar'))
    .filter(f => f.endsWith('.js'))
    .forEach(f => {
        console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Yüklenen Komut: ${f}`);
        try {
            let komut = require(`./komutlar/${f}`);
            if (typeof komut.run !== 'fonksiyon') {
                throw `Komutun bir çalışma fonksiyonu eksik!`;
            } else if (!komut.help || !komut.help.name) {
                throw `Komutun geçerli bir yardım nesnesi eksik!`;
            }
            komutlar.set(komut.help.name, komut);
        } catch (error) {
            console.error(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Komut Yüklenemedi ${f}: ${error}`);
        }
    });

// Genel Ayarlar

client.on('ready', () => {
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] LOG: Aktif, Komutlar yüklendi!`);
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} (${client.user.id}) ismi ile giriş yapıldı!`);
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Oyun ismi ayarlandı!`);
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] LOG: Şu an ` + client.channels.size + ` adet kanala, ` + client.guilds.size + ` adet sunucuya ve ` + client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + ` kullanıcıya hizmet veriliyor!`);
    client.user.setActivity("Seni", { type: "WATCHING"});
  });

// Elleme! / Ayarlar

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlevel = 0;
  if (message.member.hasPermission("KICK_MEMBERS","BAN_MEMBERS")) permlevel = 1; // Genel Denetim İzinleri
  if (message.member.hasPermission("ADMINISTRATOR","MANAGE_CHANNELS","MANAGE_GUILD","MANAGE_NICKNAMES","MANAGE_ROLES")) permlevel = 2;// Sunucu Ayarları İzinleri
  if (message.member.hasPermission("CONNECT","SPEAK")) permlevel = 3; // Sesli Kanal İzinleri
  if (message.member.hasPermission("MOVE_MEMBERS","MUTE_MEMBERS","DEAFEN_MEMBERS")) permlevel = 4; // Sesli Denetim İzinleri
  if (message.author.id === ayarlar.owner) permlvl = 5; // Bot Sahibi
  return permlevel;
};

// Genel Denetim İzinleri;
// 'KICK_MEMBERS',
// 'BAN_MEMBERS',

// Sunucu Ayarları İzinleri;
// 'ADMINISTRATOR',
// 'MANAGE_CHANNELS',
// 'MANAGE_GUILD',
// 'MANAGE_NICKNAMES',
// 'MANAGE_ROLES',

// Sesli Kanal İzinleri;
// 'CONNECT',
// 'SPEAK',

// Sesli Denetim İzinleri;
// 'MOVE_MEMBERS',
// 'MUTE_MEMBERS',
// 'DEAFEN_MEMBERS',

client.login(ayarlar.token)