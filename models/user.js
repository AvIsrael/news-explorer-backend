const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator(v) {
        return /^(http|https):\/\/(www\.)?[a-z\d\-/.]+/gi.test(v);
      },
      message: (props) => `${props.value} not right link`,
    },
  },
  password: {
    type: String,
    minLength: 6,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
});

module.exports = mongoose.model('user', userSchema);
