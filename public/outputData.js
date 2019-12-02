const fs = require('fs');
const path = require('path')



if (process.argv.length == 3){
    orgName = process.argv[2]
    filePath = path.join(__dirname,"data", orgName)
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
        console.log(keys.length.toString(), "total people")
    })
}
else{
    console.log("USAGE: outputData.js orgName.json")
}