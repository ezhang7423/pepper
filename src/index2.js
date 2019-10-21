const axios = require('axios');
const cheerio = require('cheerio');

const url = "https://github.com/1Marc"
//const url = "https://github.com/shouc"
//const url = "https://github.com/yongzhenjin"
function extractContributions(yr){
    finalOut = ""
    yr.forEach((e) => {
        if (e.includes("href")) {
            newUrl = "https://github.com"+e.substring(e.indexOf("href")+6, e.length-10)
            axios.get(newUrl)
            .then(res => {
                $ = cheerio.load(res.data)
                contributions = $(".f4.text-normal.mb-2")
                console.log( $(contributions[1]).text() )
                //finalOut += $(contributions[1]).text() 
            })
            .catch(err => {
                console.log(err)
            })
            
        }
    })
    return finalOut
}
axios.get(url)
.then(res => {
    $ = cheerio.load(res.data)
    yrs = $(".filter-list.small").html()
    //contributions = $(".f4.text-normal.mb-2")
    let yr = yrs.split('\n')
    extractContributions(yr)
    //console.log('' == extractContributions(yr))
    //console.log(iterator, url.substring(19, url.length),  $(contributions[1]).text())
    
})
.catch(err => {
    console.log(err);
})

