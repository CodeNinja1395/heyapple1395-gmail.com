const path = require('path');
const fs = require('fs');
const expect = require('chai').expect;
const xml2js = require('xml2js');

const buildBookMetadata = require('../src/util');

describe("buildTaskMetadata", async () => {
    const parser = new xml2js.Parser();

    const file = fs.readFileSync(path.join(__dirname, "../", "cache/epub/1/pg1.rdf"));
    const data = await parser.parseStringPromise(file);
    const metadata = data['rdf:RDF']['pgterms:ebook'][0];

    console.log(buildBookMetadata(metadata));

    it('buildBookMetadata should return type object with default props', () => {
        expect(buildBookMetadata(metadata)).to.have.property('title');
        expect(buildBookMetadata(metadata)).to.have.property('author');
        expect(buildBookMetadata(metadata)).to.have.property('publisher');
        expect(buildBookMetadata(metadata)).to.have.property('publicationDate');
        expect(buildBookMetadata(metadata)).to.have.property('language');
        expect(buildBookMetadata(metadata)).to.have.property('subject');
        expect(buildBookMetadata(metadata)).to.have.property('license');
    })

    it('metadata publisher should always be Project Gutenberg', () => {
        expect(buildBookMetadata(metadata).publisher).to.equal("Project Gutenberg");
    })
});