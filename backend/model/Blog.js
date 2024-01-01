const mongoose = require("mongoose");
const { Schema } = mongoose;

const Categories = {
    Fashion: 'Fashion',
    Beauty: 'Beauty',
    Travel: 'Travel',
    Lifestyle: 'Lifestyle',
    Personal: 'Personal',
    Tech: 'Tech',
    Health: 'Health',
    Fitness: 'Fitness',
    Wellness: 'Wellness',
    SaaS: 'SaaS',
    Business: 'Business',
    Education: 'Education',
    FoodAndRecipe: 'FoodAndRecipe',
    LoveAndRelationships: 'LoveAndRelationships',
    AlternativeTopics: 'AlternativeTopics',
    GreenLiving: 'GreenLiving',
    Music: 'Music',
    Automotive: 'Automotive',
    Marketing: 'Marketing',
    InternetServices: 'InternetServices',
    Finance: 'Finance',
    Sports: 'Sports',
    Entertainment: 'Entertainment',
    Productivity: 'Productivity',
    Hobbies: 'Hobbies',
    Parenting: 'Parenting',
    Pets: 'Pets',
    Photography: 'Photography',
    Agriculture: 'Agriculture',
    Art: 'Art',
    DIY: 'DIY',
    Science: 'Science',
    Gaming: 'Gaming',
    History: 'History',
    SelfImprovement: 'SelfImprovement',
    NewsAndCurrentAffairs: 'NewsAndCurrentAffairs'
  };
  
const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    banner: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    des: {
        type: String,
        maxlength: 200,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        enum: Object.values(Categories),
        required: true
    }],
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    activity: {
        total_likes: {
            type: [Schema.Types.ObjectId],
            ref: 'users'
        },
        total_comments: {
            type: Number,
            default: 0
        },
        total_reads: {
            type: [Schema.Types.ObjectId],
            ref: 'users'
        },
    },
    comments: {
        type: [Schema.Types.ObjectId],
        ref: 'comments'
    },
    draft: {
        type: Boolean,
        default: false
    }

}, 
{ 
    timestamps: {
        createdAt: 'publishedAt'
    } 

})

exports.blogs = mongoose.model("blogs", blogSchema);