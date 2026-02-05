const mongoose=require('mongoose');
const blacklistSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
            unique: true
        }
    },
    { timestamps: true }
);

blacklistSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

module.exports = mongoose.model('Blacklist', blacklistSchema);