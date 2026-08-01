import mongoose from "mongoose";

const paperFileSchema = new mongoose.Schema(
{
    paper:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Paper",
        required:true,
        unique:true,
        index:true
    },

    workspace:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Workspace",
        required:true,
        index:true
    },

    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    cloudinaryPublicId:{
        type:String,
        required:true
    },

    fileUrl:{
        type:String,
        required:true
    },

    originalName:{
        type:String,
        required:true,
        trim:true
    },

    mimeType:{
        type:String,
        required:true
    },

    extension:{
        type:String,
        default:"pdf"
    },

    fileSize:{
        type:Number,
        required:true
    },

    checksum:{
        type:String,
        required:true,
        unique:true
    },

    pageCount:{
        type:Number,
        default:0
    },

    uploadStatus:{
        type:String,
        enum:[
            "uploading",
            "uploaded",
            "failed",
            "deleted"
        ],
        default:"uploaded"
    },

    uploadedAt:{
        type:Date,
        default:Date.now
    },
    storageProvider: {
        type: String,
        enum: ["cloudinary", "s3", "local"],
        default: "cloudinary",
    }

},
{
    timestamps:true
});

paperFileSchema.index({
    workspace:1,
    paper:1
});

export default mongoose.model(
    "PaperFile",
    paperFileSchema
);