const dayjs = require('dayjs');
const uts = require('dayjs/plugin/utc');

dayjs.extend(uts);

const O_Auth = require('../database/O_auth');

module.exports = async () => {
    const previousMonth = dayjs.utc().subtract(1, 'month');

    console.log(previousMonth);

    const deleteInfo = await O_Auth.deleteMany({
        createdAt:{$lt: previousMonth}
    });
    console.log(deleteInfo);
};
