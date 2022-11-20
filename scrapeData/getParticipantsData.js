const scrapper = require("./scrapper.js")
const dbFunc = require("./../dbFunc.js")
const dbFileLoc = "db.json"

const delay = (time) => {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

const AddZero = (num) => {
    return (num >= 0 && num < 10) ? "0" + num : num + "";
}

const getCurrentTime = () => {
    var now = new Date();
    var strDateTime = [[AddZero(now.getDate()),
    AddZero(now.getMonth() + 1),
    now.getFullYear()].join("-"),
    [AddZero(now.getHours()),
    AddZero(now.getMinutes())].join(":"),
    now.getHours() >= 12 ? "PM" : "AM"].join(" ");
    return strDateTime
}

const init = async () => {
    /**
     * 1. get profile links
     * 2. check labs done
     * 3. Update participants file with number of labs done data
     */
    console.log("\n=========================");
    console.log("---Fetching profile Data---");
    console.log("=========================\n");

    let participants = JSON.parse(dbFunc.read("participants.json"))
    // dummy data to test
    let profile = [{
        "name": "Krishna Mundada",
        "profile": "https://www.cloudskillsboost.google/public_profiles/3e884237-adca-403f-a0b8-2ac9918dcc9a"
    }]
    // gets replace by real data from file so keep comment below line while testing 
    profile = participants["profiles"]['data']

    for (let i = 0; i < profile.length; i++) {

        await delay(200)
        console.log(`Fetching Person ${i + 1}: ${profile[i]["name"]}`)

        let qsData = await scrapper.getBadgeData(profile[i]["profile"])

        let ls = qsData.filter(elem => {
            elem = elem.split(" ")
            let yr = elem[elem.length - 2]
            let num = Number(yr)
            return (num >= 2022)
        })
        // console.log(ls);

        profile[i]["count"] = ls.length
    }

    console.log(profile);
    console.log("\nUpdating db.json\n");
    let db = {
        "participants": profile,
        "time": getCurrentTime()
    }
    // console.log(db);
    dbFunc.write(dbFileLoc, db)
    console.log("\n---Data collection done---\n");
}

// entry function
init()
