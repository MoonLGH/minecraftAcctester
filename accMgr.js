const fs = require("fs")
const config = require("./config.json")

function loadAcc() {
    let arr = []
    const accStr = fs.readFileSync("acc.txt").toString().replace(/\r/g, "")
    const accArr = accStr.split("\n");
    for (let i = 0; i < accArr.length; i++) {
        let selected = accArr[i].split(":")
        arr.push({username:selected[0],password:selected[1]})
    }
    return arr    
}

function makeResult(result) {
        // SucessLogin
    fs.writeFileSync(config.outputLogined, result.sucessLogin.join("\n"))
        // SucessServer
    fs.writeFileSync(config.outputWorkPath, result.sucessServer.join("\n"))
        // Failed
    fs.writeFileSync(config.outputFailedPath, result.fail.join("\n"))
}

module.exports = {
    loadAcc:function(){
        return loadAcc()
    },
    makeResult:function(result){
        makeResult(result)
    }
}