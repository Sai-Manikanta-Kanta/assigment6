const mongooose = require('mongoose');

const blogSchema = new mongooose.Schema({
    // Your code goes here
    topic:String,
    description:String,
    posted_at:String,
    posted_by:String
})

const Blog = mongooose.model('blogs', blogSchema);

module.exports = Blog;