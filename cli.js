#! /usr/bin/env node
const fs = require('fs');
const path = require('path');
const pushyTopicSubscriber = require('./pushyTopicSubscriber');

const [,, ...args] = process.argv;

const filePath = args[0];
const data = fs.readFileSync(path.resolve(__dirname, filePath));
const pushyKey = validatePushyKey(args[1]);
const dataToImport = validateTopicsData(data);

(async function () {
    try {
        await pushyTopicSubscriber.handleBulkSubscribe(dataToImport, pushyKey);
        process.exit(0);
    } catch (e) {
        console.error('ERROR: ', e);
        process.exit(1);
    }
})()


/**
 *
 * @param {String} topicsRowData
 */
function validateTopicsData (topicsRowData) {
    console.log('Validating Data ... ');

    const MAX_LENGTH = 5000;
    const dataArray = JSON.parse(topicsRowData);

    if (!isArray(dataArray)) throwInvalidDataStructure('Should pass an array of objects');
    if (dataArray.length > MAX_LENGTH) throwInvalidDataStructure('Max length of data exceeded');
    
    return dataArray.map(validationMapper);

    function validationMapper (instant) {
        const isValidTopicName = !!instant.topicName && typeof instant.topicName === 'string';
        const isValidToken = !!instant.token && typeof instant.token === 'string';

        if (!isValidTopicName) throwInvalidDataStructure('One of objects has an invalid topicName');
        else if (!isValidToken) throwInvalidDataStructure('One of objects has an invalid tokens');
        else return instant;
    }
}

function validatePushyKey (key) {
    if (!key || typeof key !== 'string' || key.length !== 64) {
        console.error('Invalid Pushy API Key');
        process.exit(1);
    } else {
        return key;
    }
}

function throwInvalidDataStructure (errorMessage = '') {
    console.error(`Invalid data structure in provided file \n`, errorMessage);
    process.exit(1);
}

function isArray(object) {
    return object instanceof Array;
}
