const fs = require('fs');
const path = require('path')


function printContribuitions(commits){
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
}

function reduceToTuple(commits){
    reducedList = []
    keys = Object.keys(commits)
    for(i = 0; i < keys.length; i++){
        individualCommits = commits[keys[i]]
        indivKeys = Object.keys(individualCommits)
        totalCommits = 0;
        for (j= 0; j < indivKeys.length; j++){
            totalCommits += Number(individualCommits[indivKeys[j]].replace(',', ''))
        }
        reducedList.push([keys[i], totalCommits])
    }
    return reducedList
}

function filterToTop(tupleCommits, topAmt){
    top = []
    for (x = 0; x < topAmt; x++ ){
        top.push(tupleCommits[x])
    }
    top = top.sort((a, b) => a[1] - b[1])
    for (x = 0; x < tupleCommits.length; x++){
        if (tupleCommits[x][1] > top[0][1]){
            top[0] = tupleCommits[x]
        }
        top = top.sort((a, b) => a[1] - b[1])
    }
    return top

}
if (process.argv.length == 3){
    orgName = process.argv[2]
    filePath = path.join(__dirname,"data", orgName)
    fs.readFile(filePath, (err, data) =>{
        if (err) console.log(err)
        commits = JSON.parse(data)
        top10 = reduceToTuple(commits)
        top10 = filterToTop(top10, 5)
        console.log(top10)
        //expand top10 to actual contributions
        printContribuitions(commits)
    })
}
else{
    console.log("USAGE: outputData.js orgName.json")
}