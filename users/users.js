const { writeFile } = require("fs").promises;
const { join } = require("path");

const users = require("./usersDb");

const save =  async () => {

    await writeFile(join(__dirname, "usersDb.json"), JSON.stringify(users, null, 4));

};

const copy = obj => ({...obj});

const getNextId = () => {

    const lastUser = users[users.length - 1];

    return lastUser ? lastUser.id + 1 : 1;

}

const findUserById = (id) => {

    const userId = parseInt(id);

    return users.find(u => u.id === userId);
}

const addUser = async userData => {

    userData.id = getNextId();

    users.push(userData);

    await save();

    return getUser(userData.id);

}

const getUser = id => copy( findUserById(id) );

const updateUser = async userData => {

    const user = findUserById(userData.id);

    const index = users.indexOf(user);

    const updatedUser = { ...user, ...userData};

    users.splice(index, 1, updatedUser );
    await save();

    return getUser(user.id);

}

const deleteUser = async id => {

    const user = findUserById(id);
    const index = users.indexOf(user);

    users.splice(index, 1);

    await save();

    return copy(user);
}

function listUsers() {

    return copy(users);

}

module.exports = {
    add: addUser,
    get: getUser,
    update: updateUser,
    delete: deleteUser,
    list: listUsers
};
