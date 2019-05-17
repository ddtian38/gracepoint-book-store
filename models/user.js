const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator")
const bcrypt = require("bcryptjs")

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true
    },

    adminstrator: {
        type: Boolean,
        default: false,
        required: true
    },

    favorites: [
        {
            type: Schema.Types.ObjectId,
            ref: "Book"
        }
    ],

    purchase_history:[
        {
            type: Schema.Types.ObjectId,
            ref: "Book"
        }
    ]
})

userSchema.plugin(uniqueValidator)

userSchema.methods.comparePassword = function(password){
    let user = this
    return bcrypt.compareSync(password, user.password)
}

userSchema.pre("save", function(next){
    var user = this;

    if (!user.isModified('password')) {
        return next();
      }
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          console.log(err)
          return next(err);
        }
        bcrypt.hash(user.password, salt, (error, hash) => {

          if (error) {
            return next(error);
          }
          user.password = hash;
          next();
        });
      });
});

const User = mongoose.model("User", userSchema);

module.exports = User;