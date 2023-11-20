/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import fs from "fs";
import inquirer from 'inquirer';
import qr from 'qr-image';

inquirer.prompt([
    {
        "message": 'Please give me a url that I can generate a QR code for: ', 
        name: "URL"
    }
]).then((answers) => {
    const url = answers.URL;

    //Turn the user entered url into a QR code image and save it
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream('./generatedFiles/link_qr_img.png'));

    //Save user feedback into a text file.
    fs.writeFile('./generatedFiles/userMessage.txt', url, 'utf8', (err) => {
        if(err) throw 'an error just happened';
        console.log('the file has been saved!');
    });
}).catch((error) => {
    if(error.isTtyError) {
        console.log('Prompt could not render in the current environment.')
    } else {
        console.log('Something went wrong that time, please try again.')
    }
});