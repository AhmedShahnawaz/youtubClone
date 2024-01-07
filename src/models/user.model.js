import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"
import { Jwt } from "jsonwebtoken";

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String,
            required:true
        },
        coverImage: {
            type: String,
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password:{
            type:String,
            required:[true, "Password is required"]
        },
        refereshToken:{
            type:String,
        },
    }, 
    {timestamps: true}
)

// hash password using bcrypt or pre midilwere
userSchema.pre('save', async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();
});

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.genrateAccessToken = function () {
    const payload = {
        _id      : this._id,
        email    : this.email,
        userName : this.userName,
        fullName : this.fullName,
    }
    return Jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
}

userSchema.methods.genrateRefreshToken = function () {
    const payload = {
        _id: this._id,
    }
    return Jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY })
}

export const User = mongoose.model("User", userSchema)