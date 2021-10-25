const cron = require('node-cron');

const deleteOldToken = require('./deleteOldToken');

module.exports = () => {
    cron.schedule('1 0 * * *', async () => {
        await deleteOldToken();
    });
};
