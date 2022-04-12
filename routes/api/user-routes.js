const router = require('express').Router();

// Set requirements
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// -- Runs to: /api/users <GET, POST>
router
    .route('/')
    .get(getAllUser)
    .post(createUser);

// -- Runs to: /api/users/:id <GET, PUT, DELETE>
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// -- Runs to: /api/users/:userId/friends/:friendId <POST, DELETE>
router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend)

module.exports = router; 