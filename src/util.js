module.exports = (metadata) => {
    const bookMetadata = {
        title: findVal(metadata, 'dcterms:title') ? findVal(metadata, 'dcterms:title')[0] : null,
        author: findVal(metadata, 'pgterms:name') ? findVal(metadata, 'pgterms:name')[0] : null,
        publisher: findVal(metadata, 'dcterms:publisher') ? findVal(metadata, 'dcterms:publisher')[0] : null,
        publicationDate: findVal(metadata, 'dcterms:issued') ? findVal(metadata, 'dcterms:issued')[0]._ : null,
        language: findVal(metadata[`dcterms:language`], `_`) ? findVal(metadata[`dcterms:language`], `_`) : null,
        subject: findVal(metadata, 'dcterms:subject') ? findVal(metadata, 'dcterms:subject')[0]['rdf:Description'][0]['rdf:value'][0] : null,
        license: findVal(metadata, 'dcterms:rights') ? findVal(metadata, 'dcterms:rights')[0] : null
    }

    return bookMetadata;
};

function findVal(object, key) {
    let value;
    Object.keys(object).some((k) => {
        if (k === key) {
            value = object[k];
            return true;
        }
        if (object[k] && typeof object[k] === 'object') {
            value = findVal(object[k], key);
            return value !== undefined;
        }
    });

    return value;
}