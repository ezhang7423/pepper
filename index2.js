const axios = require('axios');
const cheerio = require('cheerio');


const url = "https://github.com/shouc"
//const url = "https://github.com/yongzhenjin"
axios.get(url)
.then(res => {
    $ = cheerio.load(res.data)
    yrs = $(".filter-list.small").html()
    //contributions = $(".f4.text-normal.mb-2")
    let yr = yrs.split('\n')
    iter = 0;
    yr.forEach((e) => {
        if (e.includes("href")) {
            newUrl = "https://github.com"+e.substring(e.indexOf("href")+6, e.length-10)
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
        iter++
    })
    //console.log(iterator, url.substring(19, url.length),  $(contributions[1]).text())
    
})
.catch(err => {
    console.log(err);
})