/**
 * This little tool let's you see whether your passwords are safe or not.
 * 
 * Usage: 
 * 1.- Dowload SHA1 passwords from https://haveibeenpwned.com/Passwords
 * 2.- Unzip it wherever
 * 3.- Export your passwords in a CSV format i.e. in Chrome you can go to Settings -> Manage Passwords -> Saved Passwords -> ... -> Export
 * 4.- Call node test.js yourPasswords.csv [optional hash file source]
 * 
 * Goose 2019
 * 
 */

const fs = require('fs')
const sha1 = require('sha1')

let args = process.argv.slice(2)
let passCSVFile = args[0] || 'passwords.csv'
let passHashFile = args.length > 1 ? args[1] : 'pwned-passwords-sha1-ordered-by-count-v4.txt'

let passMap = {}

// Chrome default export CSV format: name, url, username, password
let passes = fs.readFileSync(passCSVFile, 'utf8')
    .split('\n')
    .filter((e) => e)
    .map((l) => {
        let data = l.split(',')
        return {
            name: data[0],
            url: data[1],
            username: data[2],
            pass: data[3],
            sha: sha1(data[3]).toUpperCase()
        }
    })

// Create the Map of the HASHes for quick checking
passes.map((passObject) => {
    if (!passMap[passObject.sha]) passMap[passObject.sha] = []
    passMap[passObject.sha].push(passObject);
})

let lines = 578645748; // only for the loading indicator.
// wc -l hahahaha, took about 10 minutes just to calculate the length for the loading indicator, could have just done 24303121452 / 42

// See the map that we are checking for.
console.log(`Searching for these: (${Object.keys(passMap).length} unique passwords)`)
Object.keys(passMap).map((p)=>console.log(p, passMap[p].length, passMap[p][0].pass))

// Init the stream.
let lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(passHashFile)
});

let l = 0

function pwned(line){
    let hash = line.substr(0, 40)
    console.warn('')
    console.warn('----------------------------------------------------------------')
    
    console.warn(`[PWNED] Password found: ${line}: ${passMap[hash][0].pass}`)
    console.warn('[Number of accounts affected] ', passMap[hash].length)
    console.warn('[Accounts]: ')
    passMap[hash].map((a)=>{        
        console.log(`username: ${a.username}             name: ${a.name}             url: ${a.url}`)
    })
    console.warn('----------------------------------------------------------------')
    console.warn('')
}

// Read all the lines in the file.
lineReader.on('line', function(line) {
    if (l % 1000000 == 0) {
        // This only works in CMD line
        process.stdout.cursorTo(0)
        process.stdout.write(`${l}/${lines} ${l / lines * 100}%`)
    }
    l++;

    // File contains [SHA1]:occurrence format, 40 is the length
    if (passMap[line.substr(0, 40)]) {
        pwned(line)
    }
});

