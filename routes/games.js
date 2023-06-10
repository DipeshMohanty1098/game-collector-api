const Game = require('../models/game')
const { ObjectId } = require('mongodb')
const middleware = require('../middleware');
const mongoose = require('mongoose');
const cors = require("cors");

module.exports = (app) => {
    app.use(middleware.decodeToken)
    app.use(cors());
    app.get('/games', (req, res) => {
        Game.find()
            .then((result) => {
                res.json(result)
            })
            .catch((error) => {
                console.log(error)
                res.json({ error: 'could not fetch' })
            });
    })

    app.get('/games/:id', (req, res) => {
        console.log(req.params.id)
        var id = new mongoose.Types.ObjectId(req.params.id);
        if (ObjectId.isValid(id)) {
            Game.findById(id)
                .then((result) => {
                    console.log(result)
                    res.status(200).json(result)
                }).catch((error) => {
                    console.log(error)
                    res.status(500).json({ error: 'Could not fetch' })
                })
        } else {
            res.json({ err: "Invalid Id" })
        }
    });

    app.get('/gameSearch', (req, res) => {
        console.log("Title:" + req.query.title)
        console.log("Page Number: " + req.query.p)
        console.log("Tag: " + req.query.tags)
        var tags = req.query.tags
        var title = `\"${req.query.title.trim()}\"`
        console.log("New title: " + title)
        var pageNumber = req.query.p
        const limit = 5
        Game.find({$and: [
            {tags: tags},
            {$text:{$search: title}}
        ]})
        .skip(pageNumber*limit)
        .limit(limit)
        .then((data) => {
            res.status(200).json(data)
            console.log(data.length)
        })
        .catch((error) => {
            console.log(error)
            res.status(550).json({error: 'Could not fetch'})
        })
    }) 

    return app;
};

/*
Game.find({$and: [
    {tags: tags},
    {$text: {$search: title}}
]})
.skip(pageNumber*limit)
.limit(limit)
.then((data) => {
    res.status(200).json(data)
    console.log(data.length)
})
.catch((error) => {
    console.log(error)
    res.status(550).json({error: 'Could not fetch'})
})
*/