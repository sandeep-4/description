const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  description: {
    type: String,
    required:true,
  },
});

module.exports = Post = mongoose.model("Post", postSchema);
 