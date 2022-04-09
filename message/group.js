"use strict";
const {
	MessageType
} = require("@adiwajshing/baileys");
const fs = require("fs-extra")
const moment = require("moment-timezone")

const { getBuffer } = require('../lib/myfunc')
const { color, bgcolor } = require('../lib/color')

let setting = JSON.parse(fs.readFileSync('./control.json'))
let prefix = setting.prefix

module.exports = async(deff, anu, welcome) => {
	    const welkom = JSON.parse(fs.readFileSync('./database/welkom.json'))
	    const isWelcome = welkom.includes(anu.jid)
	    if (!isWelcome) return
		try {
			  let  mem = anu.participants[0]
			    console.log(anu)
                try {
              var pp_user = await deff.getProfilePicture(mem)
                } catch (e) {
              var pp_user = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
                try {
            var pp_grup = await deff.getProfilePicture(anu.jid)
                } catch (e) {
            var pp_grup = 'https://i.postimg.cc/SN54m6LW/SAVE-20210728-133334.jpg'
            }
            if (anu.action == 'add' && mem.includes(deff.user.jid)) {
            deff.sendMessage(anu.jid, 'Halo! Terima Kasih sudah Mengundangku, Jika ingin Menggunakan Bot Ketik ${prefix}menu', 'conversation')
            }
             if (anu.action == 'add' && !mem.includes(deff.user.jid)) {
             if (!welkom.includes(anu.jid)) return
              let mdata = await deff.groupMetadata(anu.jid)
              let memeg = mdata.participants.length
              let num = anu.participants[0]
              let v = deff.contacts[num] || { notify: num.replace(/@.+/, '') }
              let anu_user = v.vname || v.notify || num.split('@')[0]
              let time_wel = moment.tz('Asia/Jakarta').format("HH:mm")
              let teks = `
╭━━━━━━━━━━━━┈ ❋ཻུ۪۪⸙
│ *「 WELCOME 」* 
│ *Terimakasih Sudah*
│ *Mau join*
╰┬────────────┈ ⳹
┌┤◦➛ *Nama :* 
││◦➛ *Asal :* 
││◦➛ *Gender :* 
││◦➛ *Status :* 
││◦➛ *Kelengkapan Ortu :* 
│╰────────────┈ ⳹
│ *Untuk menggunakan bot ini*
│ *Cukup ketik #menu*
│ *Kalo gapaham tanya member lain* 
├────────────────
│ Jangan lupa isi intro:)
╰━━━━━━━━━━━━┈ ❋ཻུ۪۪⸙
               `
	         let buff = await getBuffer(`http://hadi-api.herokuapp.com/api/card/welcome?nama=${anu_user}&descriminator=${time_wel}&memcount=${memeg}&gcname=${encodeURI(mdata.subject)}&pp=${pp_user}&bg=https://telegra.ph/file/5fa6532fb8bf0f0e579f2.jpg`) 
              let buttons = [{buttonId: `#infogrup`,buttonText:{displayText: 'SELAMAT DATANG'},type:1}]
              let imageMsg = (await deff.prepareMessageMedia((buff), 'imageMessage', {thumbnail: buff})).imageMessage
              let buttonsMessage = { contentText: `${teks}`, footerText: 'JANGAN BUAT ONAR BRO', imageMessage: imageMsg, buttons: buttons, headerType: 4 }
              let prep = await deff.prepareMessageFromContent(mdata.id,{buttonsMessage},{})
                deff.relayWAMessage(prep)

}
            if (anu.action == 'remove' && !mem.includes(deff.user.jid)) {
            if (!welkom.includes(anu.jid)) return
              let mdata = await deff.groupMetadata(anu.jid)
              let num = anu.participants[0]
              let w = deff.contacts[num] || { notify: num.replace(/@.+/, '') }
              let  anu_user = w.vname || w.notify || num.split('@')[0]
              let  time_wel = moment.tz('Asia/Jakarta').format("HH:mm")
              let  memeg = mdata.participants.length
              let  out = `Jangan Lupakan Kenangan kita\n${anu_user}\nSemoga kamu bahagia diluar sana`
              let  buff = await getBuffer(`http://hadi-api.herokuapp.com/api/card/goodbye?nama=${anu_user}&descriminator=${time_wel}&memcount=${memeg}&gcname=${encodeURI(mdata.subject)}&pp=${pp_user}&bg=https://telegra.ph/file/5fa6532fb8bf0f0e579f2.jpg`)
              let  buttons = [{buttonId: `#alquran 1`,buttonText:{displayText: 'SELAMAT JALAN'},type:1}]
              let  imageMsg = (await deff.prepareMessageMedia((buff), 'imageMessage', {thumbnail: buff})).imageMessage
              let  buttonsMessage = { contentText: `${out}`, footerText: 'DONT BACK', imageMessage: imageMsg, buttons: buttons, headerType: 4 }
              let  prep = await deff.prepareMessageFromContent(mdata.id,{buttonsMessage},{})
                deff.relayWAMessage(prep)

            }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	}