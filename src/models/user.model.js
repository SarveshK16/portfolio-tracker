import mongoose, {Schema} from "mongoose";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    email:{
        type:String,
        required: true,
        unique: true,
        lowercase: true
    },
    fullName:{
        type:String,
        required: true,
        index: true,
        trim: true
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    refreshToken:{
        type: String
    }
},
{timestamps: true}
)

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
        next()
    }
    else{
        return next()
    }
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return Jwt.sign(
        {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return Jwt.sign(
        {
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}

export const User = mongoose.model("User", userSchema)