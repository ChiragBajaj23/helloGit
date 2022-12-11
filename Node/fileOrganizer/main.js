// entry point of my command line

let helpFunc = require("./commands/help");
let orgFunc = require("./commands/organize");
let inputArr =process.argv.slice(2);
let command = inputArr[0];
let path = inputArr[1];
switch(command) {
    case "tree" :
        //call tree function
        console.log("tree function called and executed successfully on path " + path);
        break;
    case "organise" :
        //call organise function
        console.log("organise function called and executed successfully on path " + path);
        orgFunc.organize(path);
        break;
    case "help" :
        //call help function
        console.log("help function called and executed successfully on path " + path);
        helpFunc.help();
        // helpFunc.ghoda();
        break;
    default :
        console.log("command not recognized :/");
        break;                
}


