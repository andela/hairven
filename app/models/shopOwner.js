var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


var shopOwnerSchema = new Schema({
    shopOwnername: {
        type: String, 
        required: true, 
        index: {unique: true}
    },
    email: {
        type: String, 
        required: true, 
        index: {unique: true}
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    }
});

shopOwnerSchema.pre('save', function(next) {
    var shopOwner = this;
    
    if (!shopOwner.isModified('password')) 
        return next();
    bcrypt.hash(shopOwner.password, null, null, function(err, hash) { 
        if (err)
        {
            return next(err);
        }
        shopOwner.password = hash;
        next(); 
    });
});

shopOwnerSchema.methods.comparePassword = function(password) { 
    var shopOwner = this;
    return bcrypt.compareSync(password, shopOwner.password);
};

module.exports = mongoose.model('ShopOwner', shopOwnerSchema);

