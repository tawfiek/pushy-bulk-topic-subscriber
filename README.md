[![npm version](https://badge.fury.io/js/pushy-bulk-topic-subscriber.svg)](https://www.npmjs.com/package/pushy-bulk-topic-subscriber)

# pushy-bulk-topic-subscriber


This package is a CLI applications that automatically subscribe to topics into pushy application using json file with the data.

### Usage


1. Install the app using this command

    `npm install -g pushy-bulk-topic-subscriber`

2.  Run the application using the following command: 

    `pushy-blk-sub [DATA_FILE_PATH] [PUSHY_API_TOKEN]`

### The expected file dat is something like this
``` json
    [
        {"token": "DEVICE_TOKEN", "topicName": "TOPIC_TO_SUBSCRIBE"}
    ]
```

> Max number of token topic pairs is 5000 record
