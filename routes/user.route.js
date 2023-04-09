const { Router } = require('express');
const { userController } = require('../controllers/user.controller');

const userRouter = Router();


userRouter.post('/', userController.createUser);
userRouter.get('/:id', userController.getUserById);
userRouter.put('/:id', userController.updateUserById);
userRouter.delete('/:id', userController.deleteUserById);
userRouter.get('/analytics/users', userController.getTotalNumberOfUsers);
userRouter.get('/analytics/users/top-active', userController.getTopActiveUsers);


module.exports = {
    userRouter,
}