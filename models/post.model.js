const mongoose = require('mongoose');
const { UserModel } = require('./user.model');

const postSchema= new mongoose.Schema({
    uid:{type:String, required:true},
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel,
        required: true
      },
      content: {
        type: String,
        minlength: 1,
        maxlength: 300,
        required: true
      },
      likes: {
        type: Number,
        min: 0,
        default: 0
      }
    
},{timestamps:true});

const PostModel=mongoose.model('post',postSchema);

module.exports={
    PostModel,
}