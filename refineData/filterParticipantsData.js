const db = require("./../dbFunc.js")
let data = db.read("./refineData/rawParticipantsData.json")
data = JSON.parse(data)

// console.log(data["data"]);

let participants = {
    "profiles": data
}

try {
    db.write("participants.json", participants)
    console.log("participants.json added");
} catch (error) {
    console.log(error);
}