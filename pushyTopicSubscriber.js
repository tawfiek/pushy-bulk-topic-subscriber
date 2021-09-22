const Pushy = require('pushy');

/**
 * @typedef {Object} TopicTokenPair
 * @property {String} token
 * @property {String} topicName
 */

/**
 *  Make requests to subscribe all devices to the topics they should to subscribe to.
 * @param {Array<TopicTokenPair>} bulkData
 */
module.exports.handleBulkSubscribe = async function (bulkData, pushyKey) {
    try {
        const pushy = new Pushy(pushyKey);

        const subscribePromises = bulkData.map(bulkMapperFactory(pushy));

        console.log('Starting subscribe ...');

        await Promise.all(subscribePromises);

        console.log('Done');

        /**
         * A HOF returns a mapper function for bulk.
         * @param {Pushy} pushy
         * @returns
         */
        function bulkMapperFactory (pushy) {
            /**
             * Map every topic token pair to subscribe call to pushy.
             * @param {TopicTokenPair} topicTokenPair
             * @returns {Promise}
             */
            return function bulkMapper (topicTokenPair) {
                return pushy.subscribe(topicTokenPair.topicName, topicTokenPair.token);
            }
        }
    } catch (e) {
        throw e;
    }
}