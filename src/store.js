const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
let formattedData = {};
function actualWrite(years, org) {
    for (let i = 0; i < years.length; i++) {
        let newUrl = "https://github.com" + years[i].attribs.href;
        axios.get(newUrl)
            .then(res => {
                $ = cheerio.load(res.data)
                contributions = $(".f4.text-normal.mb-2")
                userName = newUrl.substring(19, years[i].attribs.href.length-25);
                yrAndCommits = $(contributions[1]).text()
                yrAndCommits = yrAndCommits.split(' ')
                commits = yrAndCommits[6]
                yr = yrAndCommits[16]
                yr = yr.substring(0, yr.length-1)
                if (formattedData[userName]){
                    formattedData[userName][yr] = commits
                }
                else{
                    formattedData[userName] = {};
                    formattedData[userName][yr] = commits;
                }
                fs.writeFile("data/"+org.toString()+".json", JSON.stringify(formattedData), (err) => {
                    if (err) console.log(err);
                    console.log("Successfully Written to File.");
                  });
            })
            .catch(err => {
                console.log(err)
            });
    }
}

function writeContributions(url, org){
    axios.get(url)
    .then(res => {
        $ = cheerio.load(res.data)
        let yearsList = $(".filter-list.small");
        let years = yearsList.find("li a");

        actualWrite(years, org);
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = {
    actualWrite: actualWrite,
    writeContributions: writeContributions
}
