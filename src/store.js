const axios = require('axios');
const cheerio = require('cheerio');

function actualWrite(years) {
    for (let i = 0; i < years.length; i++) {
        let newUrl = "https://github.com" + years[i].attribs.href;
        axios.get(newUrl)
            .then(res => {
                $ = cheerio.load(res.data)
                contributions = $(".f4.text-normal.mb-2")
                console.log($(contributions[1]).text())
            })
            .catch(err => {
                console.log(err)
            });
    }
}

function writeContributions(url){
    axios.get(url)
    .then(res => {
        $ = cheerio.load(res.data)
        let yearsList = $(".filter-list.small");
        let years = yearsList.find("li a");

        actualWrite(years);
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = {
    actualWrite: actualWrite,
    writeContributions: writeContributions
}
