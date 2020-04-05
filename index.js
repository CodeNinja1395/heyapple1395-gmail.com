const fs = require('fs');
const path = require('path');
const mocha = require('mocha');
const xml2js = require('xml2js');

const addBook = require('./src/sql');
const buildBookMetadata = require('./src/util');

const localPath = './cache/epub';
const dirname = path.join(__dirname, localPath);
const parser = new xml2js.Parser();

(async () => {   
    const books = fs.readdirSync(dirname);
    const promises = [];

    for (const book of books) {
        const fileName = fs.readdirSync(path.join(__dirname, localPath, book))[0];
        const file = fs.readFileSync(path.join(__dirname, localPath, book, fileName)); 
        const metadata = await extractMetadata(file);

        try {
            await addBook(metadata);
            // promises.push(addBook(metadata)); 
        } catch (error) {
            console.log(error);     
        }               
    // try {    
    //     await Promise.all(promises); 
    // } catch (error) {
    //     console.log(error);
    // }
    // for asynchronous workflow  & better performance;
    }
})() 

async function extractMetadata(file) {   
    const data = await parser.parseStringPromise(file);
    const metadata = data['rdf:RDF']['pgterms:ebook'][0];

    return buildBookMetadata(metadata);
}