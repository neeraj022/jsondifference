let fileSelecter = process.argv[2]? process.argv[2] : 'ru'

var fs=require('fs');
var baseData=fs.readFileSync('../en.json', 'utf8');
var baseObj=JSON.parse(baseData);

var diffData=fs.readFileSync('../'+fileSelecter+'.json', 'utf8');
var diffObj=JSON.parse(diffData);

let baseKeys = Object.keys(baseObj)
let newObj= {}
for (let i=0; i<baseKeys.length; i++) {
    newObj[baseKeys[i]] = {}
    let nestedKeys = Object.keys(baseObj[baseKeys[i]])
    for (let j=0;j<nestedKeys.length; j++) {
        if (diffObj[baseKeys[i]][nestedKeys[j]]) {
            newObj[baseKeys[i]][nestedKeys[j]] = diffObj[baseKeys[i]][nestedKeys[j]]
        } else {
            newObj[baseKeys[i]][nestedKeys[j]] = baseObj[baseKeys[i]][nestedKeys[j]] + ' ' + fileSelecter.toUpperCase()
        }
    }
}

console.log(JSON.stringify(newObj))
