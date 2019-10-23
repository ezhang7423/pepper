const axios = require('axios');
const cheerio = require('cheerio');
const Octokit = require("@octokit/rest");

const store = require("./store.js")

if (process.argv.length == 5) {
    const username = process.argv[2];
    const token = process.argv[3];
    const org = process.argv[4];

    const octokit = new Octokit({
        auth: {
            username: username,
            password: token,
            async on2fa() {
                return prompt("2FA code: ");
            }
        }
    });

    octokit.paginate("GET /orgs/:org/members", {
        org: org
    })
    .then((users) => {
        users.forEach((user) => {
            store.writeContributions(user.html_url, org);
        });
    })
    .catch(err => {
        console.log(err);
    });
} else {
    console.log("USAGE: node index.js username token org-name")
}
