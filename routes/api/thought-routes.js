const router = require('express').Router();

// Set requirements
const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction

} = require('../../controllers/thought-controller');

// -- Runs to: /api/thought <GET>
router
    .route('/')
    .get(getAllThought)
    .post(createThought);

// -- Runs to: /api/thought/:id <GET, PUT, DELETE>
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// -- Runs to: /api/thought/:userId <POST>
router
    .route('/:userId')
    .post(createThought);

// -- Runs to: /api/thought/:thoughtId/reactions <POST>
router
    .route('/:thoughtId/reactions')
    .post(createReaction);

// -- Runs to: /api/thought/:thoughtId/reactionId <DELETE>
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;