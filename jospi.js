​const​ ​{​ WAConnection​,​ MessageType ​}​ ​=​ ​require​(​'@adiwajshing/baileys'​)​; 
 ​const​ ​fs​ ​=​ ​require​(​'fs'​)​; 
 ​const​ ​prefix​ ​=​ ​'1' 
  
 ​async​ ​function​ ​iniciar​ ​(​)​ ​{​  
 ​        ​const​ ​akira​ ​=​ ​new​ ​WAConnection​(​) 
 ​//Aquí el "client" lo pueden cambiar a su gusto. Pero si cambian, tendrán que cambiar todos los "client" por el cambio que hicieron. 
 ​        ​jospi-bot​.​logger​.​level​ ​=​ ​'warn' 
  
 ​//llamar al código QR 
 ​        ​jospi-bot​.​on​(​'qr'​,​ ​(​)​ ​=>​ ​{ 
 ​        ​}​) 
  
 ​//crear un archivo Json para guardar información: ID del cliente, Token y Keys del cliente y del SERVER. 
 ​        ​fs​.​existsSync​(​'./jospi04.json'​)​ ​&&​ ​jospi-bot​.​loadAuthInfo​(​'./jospi04.json'​) 
  
 ​//Conectando o reconectando 
 ​        ​jospi-bot​.​on​(​'connecting'​,​ ​(​)​ ​=>​ ​{ 
 ​        ​console​.​log​(​'Conectando'​) 
 ​        ​}​) 
  
 ​//La conexión fue en éxito👌🏻 
 ​        ​jospi-bot.​on​(​'open'​,​ ​(​)​ ​=>​ ​{ 
 ​        ​console​.​log​(​'Conectado correctamente xd'​) 
 ​        ​}​) 
 ​        ​await​ ​akira​.​connect​(​{​timeoutMs​: ​30​*​1000​}​) 
 ​        ​fs​.​writeFileSync​(​'./jospi04.json'​,​ ​JSON​.​stringify​(​jospi-bot.​base64EncodedAuthInfo​(​)​,​ ​null​,​ ​'\t'​)​) 
 ​         
  
 ​akira​.​on​(​'chat-update'​,​ ​async​ ​(​sam​)​ ​=>​ ​{ 
 ​try​ ​{​           
 ​if​ ​(​!​sam​.​hasNewMessage​)​ ​return 
 ​if​ ​(​!​sam​.​messages​)​ ​return 
 ​if​ ​(​sam​.​key​ ​&&​ ​sam​.​key​.​remoteJid​ ​==​ ​'status@broadcast'​)​ ​return 
  
 ​sam​ ​=​ ​sam​.​messages​.​all​(​)​[​0​] 
 ​if​ ​(​!​sam​.​message​)​ ​return 
 ​global​.​blocked 
 ​sam​.​message​ ​=​ ​(​Object​.​keys​(​sam​.​message​)​[​0​]​ ​===​ ​'ephemeralMessage'​)​ ? ​sam​.​message​.​ephemeralMessage​.​message​ : ​sam​.​message 
 ​const​ ​from​ ​=​ ​sam​.​key​.​remoteJid 
 ​const​ ​type​ ​=​ ​Object​.​keys​(​sam​.​message​)​[​0​]​         
 ​const​ ​quoted​ ​=​ ​type​ ​==​ ​'extendedTextMessage'​ ​&&​ ​sam​.​message​.​extendedTextMessage​.​contextInfo​ ​!=​ ​null​ ? ​sam​.​message​.​extendedTextMessage​.​contextInfo​.​quotedMessage​ ​||​ ​[​]​ : ​[​] 
 ​const​ ​typeQuoted​ ​=​ ​Object​.​keys​(​quoted​)​[​0​] 
 ​const​ ​content​ ​=​ ​JSON​.​stringify​(​sam​.​message​) 
 ​const​ ​{​ text​,​ extendedText​,​ contact​,​ location​,​ liveLocation​,​ image​,​ video​,​ sticker​,​ document​,​ audio​,​ product ​}​ ​=​ ​MessageType 
 ​const​ ​body​ ​=​ ​sam​.​message​.​conversation​ ​||​ ​sam​.​message​[​type​]​.​caption​ ​||​ ​sam​.​message​[​type​]​.​text​ ​||​ ​"" 
 ​chats​ ​=​ ​(​type​ ​===​ ​'conversation'​)​ ? ​sam​.​message​.​conversation​ : ​(​type​ ​===​ ​'extendedTextMessage'​)​ ? ​sam​.​message​.​extendedTextMessage​.​text​ : ​'' 
 ​budy​ ​=​ ​(​type​ ​===​ ​'conversation'​ ​&&​ ​sam​.​message​.​conversation​.​startsWith​(​prefix​)​)​ ? ​sam​.​message​.​conversation​ : ​(​type​ ​==​ ​'imageMessage'​)​ ​&&​ ​sam​.​message​.​imageMessage​.​caption​.​startsWith​(​prefix​)​ ? ​sam​.​message​.​imageMessage​.​caption​ : ​(​type​ ​==​ ​'videoMessage'​)​ ​&&​ ​sam​.​message​.​videoMessage​.​caption​.​startsWith​(​prefix​)​ ? ​sam​.​message​.​videoMessage​.​caption​ : ​(​type​ ​==​ ​'extendedTextMessage'​)​ ​&&​ ​sam​.​message​.​extendedTextMessage​.​text​.​startsWith​(​prefix​)​ ? ​sam​.​message​.​extendedTextMessage​.​text​ : ​'' 
  
 ​if​ ​(​prefix​ ​!=​ ​""​)​ ​{ 
 ​if​ ​(​!​body​.​startsWith​(​prefix​)​)​ ​{ 
 ​cmd​ ​=​ ​false 
 ​comm​ ​=​ ​"" 
 ​}​ ​else​ ​{ 
 ​cmd​ ​=​ ​true 
 ​comm​ ​=​ ​body​.​slice​(​1​)​.​trim​(​)​.​split​(​" "​)​.​shift​(​)​.​toLowerCase​(​) 
 ​} 
 ​}​ ​else​ ​{ 
 ​cmd​ ​=​ ​false 
 ​comm​ ​=​ ​body​.​trim​(​)​.​split​(​" "​)​.​shift​(​)​.​toLowerCase​(​) 
 ​} 
 ​         
 ​const​ ​command​ ​=​ ​comm 
  
 ​const​ ​arg​ ​=​ ​chats​.​slice​(​command​.​length​ ​+​ ​2​,​ ​chats​.​length​) 
 ​const​ ​args​ ​=​ ​budy​.​trim​(​)​.​split​(​/​ ​+​/​)​.​slice​(​1​) 
 ​const​ ​isCmd​ ​=​ ​budy​.​startsWith​(​prefix​) 
 ​const​ ​q​ ​=​ ​args​.​join​(​' '​) 
 ​const​ ​soyYo​ ​=​ ​jospi-bot.​user​.​jid 
 ​const​ ​botNumber​ ​=​ ​jospi-bot​.​user​.​jid​.​split​(​"51926246437@"​)​[​0​] 
 ​const​ ​ownerNumber​ ​=​ ​[​'51929246437@s.whatsapp.net'​] 
 ​const​ ​isGroup​ ​=​ ​from​.​endsWith​(​'@g.us'​) 
 ​const​ ​sender​ ​=​ ​sam​.​key​.​fromMe​ ? ​jospi-bot​.​user​.​jid​ : ​isGroup​ ? ​sam​.​participant​ : ​sam​.​key​.​remoteJid 
 ​const​ ​senderNumber​ ​=​ ​sender​.​split​(​"@"​)​[​0​] 
 ​const​ ​isMe​ ​=​ ​senderNumber​ ​==​ ​botNumber 
 ​const​ ​conts​ ​=​ ​sam​.​key​.​fromMe​ ? ​jospi-bot​.​user​.​jid​ : ​jospi-bot​.​contacts​[​sender​]​ ​||​ ​{​ ​notify​: ​jid​.​replace​(​/​@.​+​/​,​ ​''​)​ ​} 
 ​const​ ​pushname​ ​=​ ​sam​.​key​.​fromMe​ ? ​client​.​user​.​name​ : ​conts​.​notify​ ​||​ ​conts​.​vname​ ​||​ ​conts​.​name​ ​||​ ​'-' 
  
 ​switch​ ​(​command​)​ ​{ 
 ​                 
 ​case​ ​'helou'​: 
 ​jospi-bot.​sendMessage​(​from​,​ ​'Hola, como estas😊'​,​ ​text​,​ ​{​quoted​: ​sam​}​) 
 ​break 
 ​         
 ​case​ ​'bot'​: 
 ​jospi-bot.​sendMessage​(​from​,​ ​'Hola,felicidades, has logrado enviar un mensaje mediante un servidor externo😚'​,​ ​text​,​ ​{​quoted​ : ​sam​}​) 
 ​break 
 ​                 
 ​} 
  
 ​}​ ​catch​ ​(​e​)​ ​{ 
 ​         
 ​console​.​log​(​e​)​} 
 ​         
 ​}​)​       
 ​} 
 ​iniciar​ ​(​) 
 ​.​catch​ ​(​err​ ​=>​ ​console​.​log​(​"unexpected error: "​ ​+​ ​err​)​)
