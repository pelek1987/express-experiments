const mongoose = require('mongoose');
const DB_USER = "admin";
const DB_PASSWORD = "admin123";

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.hmfhh.mongodb.net/mega_kurs?retryWrites=true&w=majority`,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });

const schema = new mongoose.Schema({
    name: String,
    lastName: String
})

const User = mongoose.model('User', schema);

const addUser = async userData => {
    const user = new User(userData);
    return await user.save();
}

const getUser = async id => {
    const user = await User.findById(id).exec();
    return user;
};

const updateUser = async userData => {
    const id = userData.id;
    delete userData.id

    const user = await User.findByIdAndUpdate(id, userData).exec();

    return getUser(user.id);

}

const deleteUser = async id => {

    const user = await User.findByIdAndRemove(id).exec();

    return user;
}

const listUsers =  async (cb) => {
    const users = await User.find().exec();
    return users;
}

module.exports = {
    add: addUser,
    get: getUser,
    update: updateUser,
    delete: deleteUser,
    list: listUsers
};
