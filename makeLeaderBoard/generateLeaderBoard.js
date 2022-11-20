const fs = require('fs')
const dbFunc = require("../dbFunc.js")
const dbFileLoc = "./leaderBoardSite/leaderBoard.js"

const max = (a, b) => {
    return (a >= b) ? a : b;
}
const min = (a, b) => {
    return (a <= b) ? a : b;
}

const init = () => {

    let participants = JSON.parse(dbFunc.read("db.json"))
    leaderBoard = participants["participants"]

    // sample data
    /**
     {
            "name": "Krishna Mundada",
            "profile": "https://www.cloudskillsboost.google/public_profiles/be882abb-abec-4cbe-b686-72bc3575cac7",
            "count": 0
        }
     */

    leaderBoard.sort((a, b) => {
        if (a["count"] == b["count"]) {
            return ((a["name"] < b["name"]) ? -1 : 1)
        }

        return ((a["count"] > b["count"]) ? -1 : 1)
    })

    let leaderBoardData = "const leaderBoardData = ["
    for (let i = 0; i < leaderBoard.length; i++) {
        leaderBoardData += JSON.stringify(leaderBoard[i]);
        leaderBoardData += ",\n"
    }
    leaderBoardData += "]"
    leaderBoardData += `\nconst updateTime =  "${participants["time"]}"`

    fs.writeFile(dbFileLoc, leaderBoardData, (err) => {
        if (err) {
            throw err;
        }
    });

}

init()