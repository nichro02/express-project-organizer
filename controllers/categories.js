let express = require('express')
let db = require('../models')
let router = express.Router()

// GET /categories
//Show all categories that exist

router.get('/', (req, res) => {
    db.category.findAll()
    .then((categories) => {
        console.log('CHECK HERE---->',categories)
        res.render('categories/index', { categories: categories })
    })
    .catch((error) => {
    console.log('Error in GET /', error)
    res.status(400).render('main/404')
    })
})

// GET /categories/:id
//Show a specific category and all projects associated with that category

router.get('/:id', (req, res) => {
    //grab req.params
    console.log('REQ.QUERY---->',req.params)
    db.category.findAll({
        where: {name: req.params.id},
        include: [db.project]
    })
    .then((category) => {
        console.log('GET CATEGORY ID BODY ---->', category[0].projects)
        res.render('categories/show', {category: category})
    })
    .catch((error) => {
        console.log('Error in GET /', error)
        res.status(400).render('main/404')
    })
    
})

module.exports = router