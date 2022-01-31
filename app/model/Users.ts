module.exports = app => {
    const mongoose = app.mongoose;
    const UserSchema = new mongoose.Schema({
        username: {
            type: String
        },
        password: {
            type: String
        },
        association: {
            type: String
        },
        newcomer: {
            type: Number
        }
    }, {timestamps: true});

    return mongoose.model('Users', UserSchema, null, {cache: false});
};
