const {User} = require('../database');

module.exports = {
    getAllUsers: (query = {}) => {
        const {
            perPage = 20,
            page = 1,
            sortBy = 'createdAt',
            order = 'asc',
            ...filters
        } = query;

        const findObject = {};
        const ageFilter = {};

        Object.keys(filters).forEach((filterParam) => {
            switch (filterParam) {
                case 'name':
                    findObject.name = {$regex: `^${filters.name}`, $options: 'i'};
                    break;
                case 'role':
                    const roleArray = filters.role.split(';');
                    findObject.role = {$in: roleArray};
                    break;
                case 'age.gte':
                    Object.assign(ageFilter, {$gte: +filters['age.gte']});
                    break;
                case 'age.lte':
                    Object.assign(ageFilter, {$lte: +filters['age.lte']});
                    break;

            }

            console.log(ageFilter);
        });

        if (Object.values(ageFilter).length) {
            findObject.age = ageFilter;
        }

        const orderBy = order === 'asc' ? -1 : 1;

        return User
            .find(findObject)
            .sort({[sortBy]: orderBy})
            .limit(+perPage)
            .skip((page-1) * page);


        // console.log(JSON.stringify(filtres, null, 2), 'other filtres');
    }
};
