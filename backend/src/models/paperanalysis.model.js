import mongoose from "mongoose";

const paperAnalysisSchema = new mongoose.Schema(
{
    paper:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Paper",
        required:true,
        unique:true
    },

    summary:{
        type:String,
        default:""
    },

    methodology:{
        type:String,
        default:""
    },

    datasets:[
        {
            type:String
        }
    ],

    results:{
        type:String,
        default:""
    },

    limitations:{
        type:String,
        default:""
    },

    futureWork:{
        type:String,
        default:""
    },

    keyContributions:[
        {
            type:String
        }
    ],

    strengths:[
        {
            type:String
        }
    ],

    weaknesses:[
        {
            type:String
        }
    ],

    researchGap:{
        type:String,
        default:""
    },

    assumptions:[
        {
            type:String
        }
    ],

    evaluationMetrics:[
        {
            type:String
        }
    ],

    confidence:{
        type:Number,
        min:0,
        max:100,
        default:0
    },

    modelInfo:{
        provider: String, 
        model: String,        
        version: String,       
        analyzedAt: Date,
    }
},
{
    timestamps:true
}
);

paperAnalysisSchema.index({paper:1});

export default mongoose.model(
    "PaperAnalysis",
    paperAnalysisSchema
);