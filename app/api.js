var express = require ('express')
var router = express.Router()
var controllers = require('../controllers') //index is the default, no need to specify

router.get('/:resource', function(req, res, next) {
    var resource = req.params.resource
    var controller = controllers[resource]

    if (controller == null) {
        res.json({
            confirmation: 'fail',
            message: 'Invalid resource request: ' + resource
        })
        return 
    }

    controller.find(null, function(err, results) {
        if (err) {
            res.json({
                confirmation: 'fail',
                message: err
            })
            return    
        }

        res.json({
            confirmation: 'success',
            results: results
        })
    })
});

router.get('/:resource/:id', function(req, res, next) {
    var resource = req.params.resource
    var id = req.params.id
    var controller = controllers[resource]

    if (controller == null) {
        res.json({
            confirmation: 'fail',
            message: 'Invalid resource request: ' + resource
        })
        return 
    }

    controller.findById(id, function(err, result) {
        if (err) {
            res.json({
                confirmation: 'fail',
                message: 'Couldn\'t find the ' + resource
            })
            return
        }

        res.json({
            confirmation: 'success',
            result: result
        })
    })

    if (resource == "zone") {
        
    }
})

router.post('/:resource', function(req, res, next) {
    var resource = req.params.resource
    var controller = controllers[resource]

    if (controller == null) {
        res.json({
            confirmation: 'fail',
            message: 'Invalid resource request: ' + resource
        })
        return 
    }

    controller.create(req.body, function(err, result) {
        if (err) {
            res.json({
                confirmation: 'fail',
                message: err
            })

            return
        }

        res.json({
            confirmation: 'success',
            result: result
        })
    })
})

router.delete('/:resource/:id', function(req, res, next) {
    var resource = req.params.resource
    var controller = controllers[resource]
    var id = req.params.id

    if (controller == null) {
        res.json({
            confirmation: 'fail',
            message: 'Invalid resource request: ' + resource
        })
        return 
    }

    controller.delete(id, function(err, result) {
        if (err) {
            res.json({
                confirmation: 'fail',
                message: err
            })

            return
        }

        res.json({
            confirmation: 'success',
            result: result
        })
    })
})

module.exports = router;