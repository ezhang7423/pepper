const axios = require('axios');
const cheerio = require('cheerio');
const Octokit = require("@octokit/rest");
const store = require("./store.js")


function storeFile(username, token, org) {
    const octokit = new Octokit({
        auth: {
            username: username,
            password: token,
        }
    });

    octokit.paginate("GET /orgs/:org/members", {
        org: org
    })
    .then((users) => {
        let userArray = [];
        users.forEach((user) => {
            userArray.push(user)
            store.writeContributions(user.html_url, org);
        });
        return users;
    })
    .catch(err => {
        console.log(err);
    });
} 

module.exports = {
    storeFile: storeFile
}
