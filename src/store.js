const axios = require('axios');
const cheerio = require('cheerio');

function actualWrite(yr){
    yr.forEach((e) => {
        if (e.includes("href")) {
            newUrl = "https://github.com"+e.substring(e.indexOf("href")+6, e.length-10)
            console.log(newUrl)
            axios.get(newUrl)
            .then(res => {
                $ = cheerio.load(res.data)
                contributions = $(".f4.text-normal.mb-2")
                console.log($(contributions[1]).text())
            })
            .catch(err => {
                console.log(err)
            })
        }
    })
}

function writeContributions(url){
    axios.get(url)
    .then(res => {
        $ = cheerio.load(res.data)
        yrs = $(".filter-list.small").html()
        let yr = yrs.split('\n')
        actualWrite(yr);
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = {
    actualWrite: actualWrite,
    writeContributions: writeContributions
}