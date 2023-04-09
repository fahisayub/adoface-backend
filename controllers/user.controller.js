const { UserModel } = require('../models/user.model');


// Controller: To create new user
const createUser = async (req, res) => {
    try {
        const user = new UserModel(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
//Controller:   Get user data
const getUserById = async (req, res) => {

    try {
        const { id } = req.params
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// Controller: Update user data 
const updateUserById = async (req, res) => {

    try {
        const { id } = req.params
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.name = req.body.name || user.name;
        user.bio = req.body.bio || user.bio;
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
//Controller: Delete an existing user
const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params
        const user = await UserModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// Controller:Get the Total number of registered users 
const getTotalNumberOfUsers = async (req, res) => {
    try {
        const count = await UserModel.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
//Controller:Get the top 5 active users who posts regularly 
const getTopActiveUsers = async (req, res) => {
    try {
        const users = await UserModel.aggregate([
            { $lookup: { from: 'posts', localField: '_id', foreignField: 'user_id', as: 'posts' } },
            { $project: { name: 1, posts_count: { $size: '$posts' } } },
            { $sort: { postCount: -1 } },
            { $limit: 5 },
        ]);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

const userController = {
    getUserById,
    getTopActiveUsers,
    deleteUserById,
    getTotalNumberOfUsers,
    updateUserById,
    createUser

}
module.exports = {
    userController
}
