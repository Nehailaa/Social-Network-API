const { User, Thought } = require('../models');

const userController = {

    // Create new User
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    // Get All User
    getAllUser(req, res) {
        console.log("test get all users");
        User.find({})
            // .populate({ path: 'thoughts', select: '-__v' })
            // .populate({ path: 'friends', select: '-__v' })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => {
                console.log(dbUserData);
                res.json(dbUserData)})
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // Get one user by ID
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')

            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User is found with this ID!' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },

    // Update a User by ID
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User is found with this ID!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err))
    },

    // Delete a user by ID
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User is found with this ID!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // Add a friend
    addFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $push: { friends: params.friendId } }, { new: true })
            .populate({ path: 'friends', select: ('-__v') })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User is found with this ID!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // Delete a Friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $pull: { friends: params.friendId } }, { new: true })
            .populate({ path: 'friends', select: '-__v' })
            .select('-__v')

            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User is found with this ID!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    }

};

module.exports = userController; 