const { User } = require('../../../models');

module.exports = async (req, res) => {
    const userIds = req.query.user_ids || [];

    const sqlOtions = {
        attributes: ['id', 'name', 'email', 'profession', 'avatar', 'role']
    }

    if (userIds.length) {
        sqlOtions.where = {
            id: userIds
        }
    }

    const users = await User.findAll(sqlOtions);

    return res.json({
        status: 'success',
        data: users
    })
}