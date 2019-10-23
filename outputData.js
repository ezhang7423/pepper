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
        indivKeys = Object.keys(individualCommits)
        for (j = 0; j < indivKeys.length; j++){
            console.log(individualCommits[indivKeys[j]] + ' contributions in '+ indivKeys[j])
        }
        console.log("\n")
    }
    console.log(keys.length)
})
