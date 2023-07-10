const mongoose = require('mongoose')

const restaurantSchema = mongoose.Schema({
    name: String,
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    menu: Array
})

const RestaurantModel = mongoose.model("restaurant", restaurantSchema)

module.exports = RestaurantModel