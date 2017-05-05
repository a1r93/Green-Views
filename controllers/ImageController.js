var Image = require('../app/models/image.js')

module.exports = {
    find: function(params, callback) {
        Image.find(params, function(err, images) {
            if (err) {
                callback(err, null)
                return 
            }
            callback(null, images)
        })
    },

    findById: function(id, callback) {
        Image.findById(id, function(err, image) {
            if (err) {
                callback(err, null)
                return
            }
            callback(null, image)
        })
    },

    create: function(params, callback) {

        Image.create(params, function(err, image) {
            if (err) {
                callback(err, null)
                return
            }
            callback(null, image)
        })
    },

    update: function(id, params, callback) {
        Image.findByIdAndUpdate(id, params, {new:true}, function(err, image){
            if (err) {
                callback(err, null)
                return
            }
            callback(null, image)
        })
    },

    delete: function(id, callback) {
        Image.findByIdAndRemove(id, function(err) {
            if (err) {
                callback(err, null)
                return
            }
            callback(null, null)
        })
    },
}
