const fetch = require("cross-fetch")
const parser = require("node-html-parser")

const makeRequest = async (url) => {
    let res = await fetch(url)
    return res.text()
}

const getBadgeData = async (profileUrl) => {


    let htmlData = await makeRequest(profileUrl)
    htmlData = parser.parse(htmlData)

    // console.log(htmlData);

    let data = htmlData.querySelectorAll(".profile-badge")
    if (!data) {
        console.log("No data found\n");
        return []
    }
    let res = []
    for (let i = 0; i < data.length; ++i) {
        res.push(data[i].innerText.trim())
        // console.log(data[i].innerText);
    }

    console.log("Data scrapped\n");
    return res
}


module.exports = { getBadgeData }
