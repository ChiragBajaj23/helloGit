const fs = require("fs") // fs module
const path = require("path") // path module -> The path module provides utilities for working with file and directory paths.



let types = {
    media: ["mp4", "mkv", "mp3","mov"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex',"csv",'json'],
    app: ['exe', 'dmg', 'pkg', "deb","apk"],
    images: ['png','jpg','jpeg']
}

function organize(srcPath) {
    //step 1.) to check if srcPath is present
    if(srcPath == undefined) {
        //the process.cwd() method returns the curent working directory of the Node.js process
        console.log(srcPath); // abhi agar kuch nhi diya toh undefined
        srcPath = process.cwd();
        console.log("source Path is ",srcPath);
    }
    //step 2.) to create a directory --> organised_files
    // console.log('yeh check kr -> ' +srcPath);
    let organisedFiles = path.join(srcPath,"organised_files");// Join all arguments together and normalize the resulting path. Arguments must be strings.
    console.log("organised files folder path is ", organisedFiles);
    if (fs.existsSync(organisedFiles) == false) { //Returns true if the path exists, false otherwise.
        // organisedFiles nam ka folder exist nhi krta toh ek folder bana do warna rhne do
        fs.mkdirSync(organisedFiles);
        // console.log("haan chl gaya bhai");
    } else {
        console.log("folder already exists");
    }
    //step 3.) scan the entire srcPath(downloads folder in this case)

    let allFiles = fs.readdirSync(srcPath);//Reads the contents of the directory. ==> basically reads the names of files present in directory
    console.log(allFiles);

    // step 4.) traverse over the files and classify them on the basis of their extensions (.pdf , .mp3)

    for(let i = 0;i < allFiles.length; i++) {
        // let ext = allFiles[i].split(".")[1];
        //let ext = path.extname(allFiles[i]);//extname -> Return the extension of the path, from the last '.' to end of string in the last portion of the path. If there is no '.' in the last portion of the path or the first character of it is '.', then it returns an empty string
        //console.log(ext);
        let fullPathOfFile = path.join(srcPath,allFiles[i]);
        console.log(fullPathOfFile);
        //1.) check if it is a file or a folder
        // lstatsync gives the information regarding the link provided (jo bhi humne path diya issse lstatsync uski information rakh leta hai)
        let isThisAFile = fs.lstatSync(fullPathOfFile).isFile();// isFile() -> true if file hai toh or false if folder hai aise hi ek isDirectory() ka bhi hota hai vo directory ke baare main batata hai
        console.log(allFiles[i] + " is " + isThisAFile);
        if (isThisAFile) {
            //1.1 ) get ext name
            let ext = path.extname(allFiles[i]).split(".")[1];
            console.log(ext);
            //1.2 ) get folder name from extension
            let folderName = getFolderName(ext);// archives
            //1.3 ) copy from src folder (srcPath) and paste in dest folder (folder_name e.g document, media etc.)
            copyFileToDest(srcPath, fullPathOfFile , folderName); // (copy jahan se krna hai, kya copy krna hai, paste krna hai jahan pe)
        }

    }
}
function getFolderName(ext) {
   for(let key in types) {
    console.log(key);
    for(let i = 0;i < types[key].length; i++) {
        if (types[key][i] == ext) {
            return key;
        }
    }
   }
   return "miscellaneous";
}

function copyFileToDest(srcPath, fullPathOfFile , folderName) {
    //1.) folderName ka path banana hai
    let destFolderPath = path.join(srcPath,"organised_files",folderName); // ......./downloads/oraganised_files/archives
    // console.log(des);
    //2.) check folder if exists , if it does not, then make folder

    if(!fs.existsSync(destFolderPath)) {
        fs.mkdirSync(destFolderPath);
    }
    //3.) copy file drc folder to dest folder

    let fileName = path.basename(fullPathOfFile);// basename -> Return the last portion of a path
    let destFileName = path.join(destFolderPath, fileName);
    fs.copyFileSync(fullPathOfFile, destFileName); // (src,dest)
}



// let srcPath = "C:\\Users\\chira\\Desktop\\vsCode\\FJP5\\Node\\fileOrganizer\\downloads";//bhai double backslash isliye lagae hain kyunki agar tu single dega toh vo qoutes main hai iss liye unka kuch aur hi mtlb nikal lega isliye agr '\' chahta hai toh '\\' aise likh yaad kr freecodecamp main padha tha jb question solve kiye the yahan wale
// organize(srcPath);

module.exports ={
    organize : organize,
}