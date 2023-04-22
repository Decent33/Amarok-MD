const { ak } = require("../../lib/db/dataschema.js");

module.exports = {
    name: "antilinkgc",
    alias: ["alinkgc","antilink"],
    desc: "Enable or disable the antilink feature in a group",
    category: "Group",
    usage: "antilinkgc [on/off]",
    react: "🔒",
    start: async (
      Amarok,
      m,
      { args, isBotAdmin, isAdmin, isCreator, reply,prefix,pushName }
    ) => {
        if (!isAdmin) {
          return m.reply(mess.useradmin);
        }
        if (!isBotAdmin) {
          return m.reply(mess.botadmin);
        }
  
      let checkdata = await ak.findOne({ id: m.from });
      var groupe = await Amarok.groupMetadata(m.from);
      var members = groupe["participants"];
      var mems = [];
      members.map(async (adm) => {
        mems.push(adm.id.replace("c.us", "s.whatsapp.net"));
      });
  
      if (args[0] === "on") {
        if (!checkdata) {
          await new ak({ id: m.from, antilink: "true" }).save();
          Amarok.sendMessage(
            m.from,
            {
              text: `\`\`\`「 WARNING 」\`\`\`\n\nAntilink System Activated!`,
              contextInfo: { mentionedJid: mems },
            },
            { quoted: m }
          );
          return Amarok.sendMessage(
            m.from,
            { text: `*Successfully activated antilink*` },
            { quoted: m }
          );
        } else {
          if (checkdata.antilink == "true")
            return Amarok.sendMessage(
                m.from,
                { text: `*Already activated.*` },
                { quoted: m }
              );
          await ak.updateOne({ id: m.from }, { antilink: "true" });
          return Amarok.sendMessage(
            m.from,
            { text: `*Antilink is enabled in this group*` },
            { quoted: m }
          );
        }
      } else if (args[0] === "off") {
        if (!checkdata) {
          await new ak({ id: m.from, antilink: "false" }).save();
          return Amarok.sendMessage(
            m.from,
            { text: `*Successfully deactivated antilink*` },
            { quoted: m }
          );
        } else {
          if (checkdata.antilink == "false") return Amarok.sendMessage(
            m.from,
            { text: `*Already deactivated.*` },
            { quoted: m }
          );
          await ak.updateOne({ id: m.from }, { antilink: "false" });
          return Amarok.sendMessage(
            m.from,
            { text: `*Antilink is disabled in this group*` },
            { quoted: m }
          );
        }
      } else {
        await Amarok.sendMessage(m.from, {image: {url : botImage6} ,caption: `\n*「 ANTILINK SYSTEM  」*\n\nNote: This will *delete* all links from groups and *remove* someone if they send any other *WhatsApp Group's Link*.\n\n*_Usage:_*\n\n*${prefix}antilink on*\n*${prefix}antilink off*\n\n*Current Status:* ${checkdata.antilink == "true" ? "On" : "Off"}`,}, { quoted: m });
    }
  },
};
