const S3 = require('aws-sdk/clients/s3');

const {
    AWS_S3_NAME,
    AWS_S3_REGION,
    AWS_S3_ACCESS,
    AWS_S3_SECRET
} = require('../config/config');

const bucket = new S3({
    region: AWS_S3_REGION,
    accessKeyId: AWS_S3_ACCESS,
    secretKey: AWS_S3_SECRET
});

module.exports = {
    uploadImage: (file) => {
        console.log(file);

        // return bucket
        //     .upload({
        //         Bucket: AWS_S3_NAME,
        //         Body: new Buffer('xxx'),
        //         key: 'image.jpg',
        //         ContentType: ''
        //     })
        //     .promise();
    }
};
