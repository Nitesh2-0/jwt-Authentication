const { mongoose } = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://0.0.0.0:27017/tokens')
.then(() => {
  console.log('Connected to the database');
})
.catch((error) => {
  console.error('Error connecting to the database:', error);
});

const userSchema = new Schema({
  name: {
    type: String,
    minLength: [3, 'Enter at least 3 characters']
  },
  username: {
    type: String,
    minLength: [3, 'Enter at least 3 characters'],
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

