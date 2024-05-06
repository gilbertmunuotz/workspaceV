const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: true // Automatically sets `isAdmin` to true for new admins
    }
}, { timestamps: true });

module.exports = mongoose.model("SysAdmins", adminSchema);