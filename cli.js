#! /usr/bin/env node
const fs = require('fs');
const path = require('path');

const [,, ...args] = process.argv;

const filePath = args[0];
const data = fs.readFileSync(path.resolve(__dirname, filePath));
const dataToImport = validateTopicsData(data);

console.log('PUSHY STARTER ', dataToImport);


/**
 *
 * @param {String} topicsRowData
 */
function validateTopicsData (topicsRowData) {
   const dataArray = JSON.parse(topicsRowData);

    if (!isArray(dataArray)) throwInvalidDataStructure('Should pass an array of objects');

    return dataArray.map(validationMapper);

    function validationMapper (instant) {
        const isValidTopicName = !!instant.topicName && typeof instant.topicName === 'string';
        const isValidToken = !!instant.token && typeof instant.token === 'string';

        if (!isValidTopicName) throwInvalidDataStructure('One of objects has an invalid topicName');
        else if (!isValidToken) throwInvalidDataStructure('One of objects has an invalid tokens');
        else return instant;
    }
}


function throwInvalidDataStructure (errorMessage = '') {
    console.error(`Invalid data structure in provided file \n`, errorMessage);
    process.exit(1);
}

function isArray(object) {
    return object instanceof Array;
};