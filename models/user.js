var mongoose = require('mongoose');

// The factSchema is used to embedded docs in as student doc.
// There is no model and no 'facts' collection

var studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  googleId: String
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);