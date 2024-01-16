import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { Portfolio } from "../models/portfolio.model.js";
import { apiResponse } from "../utils/apiResponse.js";

const insertPortfolio = asyncHandler(async(req, res) => {
    const {fundName, amount, investmentPlatform, investedOn, startingNAV} = req.body

    if([fundName, amount].some((field)=> field?.trim() === "")){
        throw new apiError(400, "Fund Name & Amount are required")
    }

    const existingFund = await Portfolio.findOne({
        $and: [{fundName}, {amount}]
    })

    if(existingFund){
        throw new apiError(400, "Entry with this Fund Name & Amount already exists")
    }

    const portfolio = await Portfolio.create({
        fundName,
        amount,
        investmentPlatform, 
        investedOn, 
        startingNAV
    })

    const createdEntry = await Portfolio.findById(portfolio._id)

    if(!createdEntry){
        throw new apiError(500, "Something went wrong while inserting the entry")
    }

    return res.status(200).json(
        new apiResponse(200, createdEntry, "Entry successfully created")
    )
})

const getEntry = asyncHandler(async(req, res) => {
    const {fundName} = req.body

    if(!fundName?.trim()){
        throw new apiError(400, "Fund Name cannot be empty")
    }
    const Entry = await Portfolio.findOne({fundName})

    return res.status(200).json(
        new apiResponse(200, Entry, "Entry fetched successfully")
    )
})

export {
    insertPortfolio,
    getEntry
}