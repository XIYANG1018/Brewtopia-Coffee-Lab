import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
}, {
    timestamps: true,
});

// method to compare the entered password with the hashed password in the database
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// encrypt the password before saving it to the database
userSchema.pre('save', async function(next) {
    // only encrypt the password if it is modified
    if (!this.isModified('password')) {
        next();
    }

    // salt is a random string that is used to hash the password, it is bcrypt's way of adding randomness to the hash
    const salt = await bcrypt.genSalt(10);
    // hash the password
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;