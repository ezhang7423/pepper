const fs = require('fs');
const path = require('path')


function printContribuitions(commits){
    keys = Object.keys(commits)
    totals = reduceToTuple(commits)
        for (i = 0; i < keys.length; i++){
            console.log(keys[i])
            console.log("total contribuitions:", totals[i][1])
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
    for (x = topAmt; x < tupleCommits.length-topAmt; x++){
        if (tupleCommits[x][1] > top[0][1]){
            top[0] = tupleCommits[x]
            top = top.sort((a, b) => a[1] - b[1])
        }
    }
    top.reverse();
    temp = []
    for (item of top){
        temp.push(item[0])
    }
    return top

}

function expandTuple(top10, commits){
    top = {}
    for (i = 0; i < top10.length; i++){

        top[top10[i][0]] = {};
        top[top10[i][0]] = commits[top10[i][0]]
    }
    return top
}
if (process.argv.length == 4){
    
    orgName = process.argv[2]
    filePath = path.join(__dirname,"data", orgName)
    fs.readFile(filePath, (err, data) =>{
        if (err) console.log(err)
        commits = JSON.parse(data)
        if (process.argv[3] > Object.keys(commits).length){
            amt = Object.keys(commits).length
        }
        else{
            amt = process.argv[3]
        }
        top10 = expandTuple(filterToTop(reduceToTuple(commits),amt), commits)
        printContribuitions(top10)
    })
}
else{
    console.log("USAGE: outputData.js orgName.json amtOfPeople")
}