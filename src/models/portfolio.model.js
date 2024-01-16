import mongoose, {Schema} from "mongoose";

const portfolioSchema = new Schema({
    fundName:{
        type: String,
        required: true,
        index: true
    },
    amount:{
        type: Number, 
        required: true,
    },
    investmentPlatform:{
        type: String,
        index: true
    },
    investedOn:{
        type: Date,
        index: true
    },
    startingNAV:{
        type: Number,
        trim: false
    }
},{timestamps: true}
)

export const Portfolio = mongoose.model("Portfolio", portfolioSchema)