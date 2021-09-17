import mongoose from "mongoose";
import crypto from 'crypto';

const UserSchema = new mongoose.Schema({

    name: {
        type: String, trim: true,
        unique: "Name already exists",
        required: "Name is required"
    },
    email: {
        type: String, trim: true,
        unique: "Email already exists",
        match: [/.+\@.+\..+/, "Please fill a valid email address"],
        required: "Email is required"
    },
    hashed_password: {
        type: String,
        required: "Password is required"
    }
})

UserSchema.virtual("password").set(function (password) {
    this._password = password
    this.salt = this.name
    this.hashed_password = this.encryptPassword(password)
}).get(function () { return this._password })

UserSchema.virtual("confirmPassword").set(function (password) {
    this._confirmPassword = password
}).get(function () { return this._confirmPassword })


UserSchema.path("hashed_password").validate(function (v) {

    if (this._password && this._password.length < 6) {
        this.invalidate("password", "Password must be at least 6 characters.");
    }
    if (this.isNew && !this._password) {

        this.invalidate("password", "Password is required")
    }
    if (this.isNew && !this._password) {

        this.invalidate("password", "Password is required")
    }
    if (this._password !== this._confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords need to match.');
    }
}, null);


UserSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function (password) {
        if (!password) return "";
        try {
            return crypto.createHmac("sha1", this.name)
                .update(password)
                .digest("hex");
        } catch (err) {
            return ""
        }
    }
}



export default mongoose.model("User", UserSchema);

