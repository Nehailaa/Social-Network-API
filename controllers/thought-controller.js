const {Thought, User} = require('../models');

const thoughtController = {

    // Create a thought
    createThought({params, body}, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate({ _id: params.userId}, 
                {$push: {thoughts: _id}}, 
                {new: true});
        })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'Whoops! No thought is found with this ID!'});
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err)); 
    },

    // Get all available Thought
    getAllThought(req,res) {
        Thought.find({})
        .populate({path: 'reactions', 
        select: '-__v'
    })
        .select('-__v')
        .sort({_id: -1})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // Get a thought by ID
    getThoughtById({params}, res) {
        Thought.findOne({ _id: params.id })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .sort({_id: -1})
        .then(dbThoughtData => {
            if(!dbThoughtData) {
            res.status(404).json({message: 'Whoops! No thought is found with this ID!'});
            return;
        }
        res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // Update a thought by ID
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-___v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'Whoops! No thought is found with this ID!'});
                return;
            }
                res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    // Delete a thought by ID
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.id})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'Whoops! No thought is found with this ID!'});
                return;
            }
            res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // Create a new Reaction
    createReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId}, 
            {$push: {reactions: body}}, 
            {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({message: 'Whoops! No thought is found with this ID!'});
            return;
        }
        res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err))

    },

    // Delete a reaction by ID
    deleteReaction({params}, res) {
        Thought.findOneAndUpdat(
            {_id: params.thoughtId}, 
            {$pull: {reactions: {reactionId: params.reactionId}}}, 
            {new : true}
            )

        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'Whoops! No ID is associated with this Thought!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    }

};

module.exports = thoughtController;