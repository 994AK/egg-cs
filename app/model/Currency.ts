module.exports = app => {
    const mongoose = app.mongoose;
    // const Schema = mongoose.Schema;
    const UserSchema = new mongoose.Schema({
        username: {
            type: String,
        },
        money: {
            type: Number
        }
    }, {timestamps: true});

    return mongoose.model('Currency', UserSchema);
};
