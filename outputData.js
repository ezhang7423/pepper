const fs = require('fs');
const path = require('path')

filePath = path.join(__dirname, "data.json")
fs.readFile(filePath, (err, data) =>{
    if (err) console.log(err)
    commits = JSON.parse(data)
    keys = Object.keys(commits)
    for (i = 0; i < keys.length; i++){
        console.log(keys[i])
        individualCommits = commits[keys[i]]
        for (j = 0; j < individualCommits.length; j++){
            console.log(individualCommits[j].substring(5, individualCommits[j].length)+' contribuitions in '+individualCommits[j].substring(0, 5))
        }
        console.log("\n")
    }
})