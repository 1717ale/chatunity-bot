import { performance } from 'perf_hooks';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handler = async (message, { conn, usedPrefix, command }) => {
    const userCount = Object.keys(global.db.data.users).length;
    const botName = global.db.data.nomedelbot || 'ChatUnity';
    const vs = global.db.data.versione || '1.0.0'; // Fix variabile versione

    const menuText = generateMenuText(usedPrefix, botName, userCount, vs);

    // Invia solo testo e bottoni, senza video
    await conn.sendMessage(
        message.chat,
        {
            text: menuText,
            footer: 'Scegli un menu:',
            buttons: [
                { buttonId: `${usedPrefix}menuadmin`, buttonText: { displayText: "🛡️ Menu Admin" }, type: 1 },
                { buttonId: `${usedPrefix}menuowner`, buttonText: { displayText: "👑 Menu Owner" }, type: 1 },
                { buttonId: `${usedPrefix}menusicurezza`, buttonText: { displayText: "🚨 Menu Sicurezza" }, type: 1 },
                { buttonId: `${usedPrefix}menugruppo`, buttonText: { displayText: "👥 Menu Gruppo" }, type: 1 },
                { buttonId: `${usedPrefix}menuia`, buttonText: { displayText: "🤖 Menu IA" }, type: 1 }
            ],
            viewOnce: true,
            headerType: 4
        }
    );
};

handler.help = ['menu'];
handler.tags = ['menu'];
handler.command = /^(menu|comandi)$/i;

export default handler;

function generateMenuText(prefix, botName, userCount, vs) {
    return `

╭〔 *💬 𝑴𝑬𝑵𝑼 𝑫𝑬𝑳 𝑩𝑶𝑻 💬* 〕┈⊷
┃◈╭───────────·๏
┃◈┃• 👑 *${prefix}staff*
┃◈┃• 👑 *${prefix}egemonia*
┃◈┃• 📜 *${prefix}candidati*
┃◈┃• 📥 *${prefix}installa*
┃◈┃• 📖 *${prefix}guida*
┃◈┃• ⚙ *${prefix}sistema*
┃◈┃• ❓ *${prefix}FAQ*
┃◈┃• 🚀 *${prefix}ping*
┃◈┃• 📝 *${prefix}segnala* (comando)
┃◈┃• 💡 *${prefix}consiglia* (comando)
┃◈┃
┃◈└───────────┈⊷
┃◈┃• *𝑽𝑬𝑹𝑺𝑰𝑶𝑵𝑬:* ${vs}
┃◈┃•  𝐂𝐎𝐋𝐋𝐀𝐁: 𝐃𝐑𝐆𝐁
┃◈┃• *𝐒𝐔𝐏𝐏𝐎𝐑𝐓𝐎:* (.supporto)
╰━━━━━━━━━━━━━┈·๏
`.trim();
}
