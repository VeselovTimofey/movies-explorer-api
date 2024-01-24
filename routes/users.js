const routerUser = require('express').Router();
const { getMe, updateUser } = require('../controllers/users');
const validationPatchUser = require('../validations/patch_user');

routerUser.get('/me', getMe);
routerUser.patch('/me', validationPatchUser, updateUser);

module.exports = routerUser;
