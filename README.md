This little tool lets you check whether your pass is part of a large SHA1 databas available online. 

 
 Usage: 
 1. Clone into a folder of your choice
 2. `npm install`
 3. Dowload SHA1 passwords from https://haveibeenpwned.com/Passwords
 4. Unzip it
 5. Export your passwords in a CSV format i.e. in Chrome you can go to Settings -> Manage -> Passwords -> Saved Passwords -> ... -> Export
 6. Call node test.js yourPasswords.csv [optional hash file source]