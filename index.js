var mineflayer = require('mineflayer');
const config = require("./config.json")

const mgr = require('./accMgr.js');
// =========================
// Mineflayers Client
// =========================
let arr = mgr.loadAcc()

let result = {
  "sucessServer":[],
  "fail":[],
  "sucessLogin":[]
}
// make a for of on config.accounts
let i = 0;
let inter = setInterval(()=>{
  if(i <= arr.length){
    botloop(i)
    i++
  }else{
    clearInterval(inter)
  }
},3000)
function botloop(i){
  let bot = mineflayer.createBot({
    username: arr[i].username,
    password: arr[i].password,
    version: config.version,
    host: config.ip
  });

  bot.on('kicked', (reason,loggedIn) => {
    console.log(`[${arr[i].username}] kicked: ${reason}`);
    if(loggedIn){
      result.sucessLogin.push(`${arr[i].username}:${arr[i].password}`)
    }else{
      result.sucessLogin.push(`${arr[i].username}:${arr[i].password}`)
    }
    bot.end()
  })

  bot.on('error', (err) => {
    console.log(`[${arr[i].username}] error: ${err}`);
    result.fail.push(`${arr[i].username}:${arr[i].password}`)
    bot.end()
  })

  bot.on('login', () => {
    console.log(`[${arr[i].username}] login`);
    result.sucessServer.push(`${arr[i].username}:${arr[i].password}`)
    bot.end()
  })

  bot.on("end",()=>{
    mgr.makeResult(result)
  })
}