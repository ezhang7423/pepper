const axios = require('axios');
const cheerio = require('cheerio');
const store = require("./store.js")

if (process.argv.length == 5){
const username = process.argv[2];
const token = process.argv[3];
const org = process.argv[4];

let orgURL = "https://api.github.com/orgs/" + org + "/members";
axios.get(orgURL, {
    auth: {
        username: username,
        password: token
    }
})
    .then(res => {
        res.data.forEach((user) => {
            store.writeContributions(user.html_url);
        });
    })
    .catch(err => {
        console.log(err);
    });
}
else console.log("USAGE: node index.js username token org-name")