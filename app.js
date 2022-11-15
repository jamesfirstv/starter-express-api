// Грузим либы
const CyclicDB  = require('cyclic-dynamodb')
const TgApi     = require('./tg.js')

// Настройки
global.cfg          = {}
global.cfg.dbName   = 'apricot-calf-garbCyclicDB'
global.cfg.peerName = 'WastelandWarsBot'

// Асинхронная функция запуска
const start = async function() {
  // Подключаем базу данных
  global.db          = CyclicDB(global.cfg.dbName)
  // Достаём таблицу настроек
  let settings       = global.db.collection('settings')
  // Ждем реквизиты ТГ из таблицы
  let dbAns          = await settings.get('tgApi')
  // Подключаемся к ТГ
  let tg = global.tg = new TgApi(dbAns.props.id, dbAns.props.hash)

  // Ждем ответ на запрос ближайшего ДЦ
  let dc = await tg.call('help.getNearestDc')
  console.log('country: ', dc)

  // Слушаем Телегу
  tg.up.on('updatesTooLong', (updateInfo) => {
    console.log('updatesTooLong:', updateInfo);
  })
  tg.up.on('updateShortMessage', (updateInfo) => {
    console.log('updateShortMessage:', updateInfo);
  })
  tg.up.on('updateShortChatMessage', (updateInfo) => {
    console.log('updateShortChatMessage:', updateInfo);
  })
  tg.up.on('updateShort', (updateInfo) => {
    console.log('updateShort:', updateInfo);
  })
  tg.up.on('updatesCombined', (updateInfo) => {
    console.log('updatesCombined:', updateInfo);
  })
  tg.up.on('updates', (updateInfo) => {
    console.log('updates:', updateInfo);
  })
  tg.up.on('updateShortSentMessage', (updateInfo) => {
    console.log('updateShortSentMessage:', updateInfo);
  })




  // 
  let peer = await tg.call('contacts.resolveUsername', {
    username: global.cfg.peerName,
  })
  console.log('Peer: ', peer)

}
start()
/*
(async () => {
  

  const channel = resolvedPeer.chats.find(
    (chat) => chat.id === resolvedPeer.peer.channel_id
  );

  const inputPeer = {
    _: 'inputPeerChannel',
    channel_id: channel.id,
    access_hash: channel.access_hash,
  };

  const LIMIT_COUNT = 10;
  const allMessages = [];

  const firstHistoryResult = await api.call('messages.getHistory', {
    peer: inputPeer,
    limit: LIMIT_COUNT,
  });

  const historyCount = firstHistoryResult.count;

  for (let offset = 0; offset < historyCount; offset += LIMIT_COUNT) {
    const history = await api.call('messages.getHistory', {
      peer: inputPeer,
      add_offset: offset,
      limit: LIMIT_COUNT,
    });

    allMessages.push(...history.messages);
  }

  console.log('allMessages:', allMessages);
})();

*/
