const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        country: {
            type: String,
            required: true,
            default: 'Magyarország'
        },
        city:{
            type: String,
            required: true,
            default: ''
        },
        street:{
            type: String,
            required: true,
            default: ''
        },
        zip: {
            type: Number,
            required: true,
        },
        building: {
            type: Number,
            required: true,
        },
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
}, {
    timestamps: true
});

// automatically adds { password: String }
UserSchema.plugin(require('mongoose-bcrypt'));

const User = mongoose.model('User', UserSchema, 'users');
// ----------------------
// User.createCollection().then(function(collection) {
//     collection.name='users'
//     console.log('Collection is created!');
//     console.log('Collection name!', collection.name);
//   });
//---------------------
module.exports = User;
