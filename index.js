const TelegramApi = require("node-telegram-bot-api");
const { gameOptions, againOption } = require("./options");
const api = "5013293827:AAHVUkjgXBdpvdqolhKnSUoJ30Zle1g4Oig";
const bot = new TelegramApi(api, { polling: true });
const chats = {};

bot.setMyCommands([
  { command: "/start", description: "Boshlang`ich uchrashuv" },
  { command: "/info", description: "Siz xaqingizda malumot" },
  { command: "/game", description: "Play Game" },
]);

const startGame = async (chatId) => {
  await bot.sendMessage(chatId, "0 dan 9 gacha son tanladim");
  const randomNumber = Math.floor(Math.random() * 10);
  chats[chatId] = randomNumber;
  return bot.sendMessage(chatId, "Sonni top", gameOptions);
};

const start = () => {
  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
      await bot.sendSticker(
        chatId,
        "https://tgram.ru/wiki/stickers/img/senya_anim/gif/12.gif"
      );
      return bot.sendMessage(chatId, "Xush kelibsiz");
    }
    if (text === "/info") {
      return bot.sendMessage(chatId, `Sizni ismingiz ${msg.from.first_name}`);
    }
    if (text === "/game") {
      return startGame(chatId);
    }
    return bot.sendMessage(chatId, "Man bu narsani bilmayman");
  });

  bot.on("callback_query", (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data === "/again") {
      return startGame(chatId);
    }
    if (data === chats[chatId]) {
      return bot.sendMessage(
        chatId,
        `Siz raqamni topdingiz: ${chats[chatId]} raqam`
      );
    } else {
      return bot.sendMessage(
        chatId,
        `Raqam notogri: ${chats[chatId]} raqam`,
        againOption
      );
    }

    bot.sendMessage(chatId, `San ${data} tanlading`);
  });
};

start();

// npm init -y
// npm install node-telegram-bot-api
// npm install nodemon
// npm run dev
// git init
// git add .
// git commit -m "init
