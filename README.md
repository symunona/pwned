This little tool lets you check whether your pass is part of a large SHA1 databas available online. 

 
 Usage: 
 0. Clone into a folder of your choice
 1. `npm install`
 2. Dowload SHA1 passwords from https://haveibeenpwned.com/Passwords
 3. Unzip it
 4. Export your passwords in a CSV format i.e. in Chrome you can go to Settings -> Manage -> Passwords -> Saved Passwords -> ... -> Export
 5. Call node test.js yourPasswords.csv [optional hash file source]