import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';
import checkUserAuth from '../middleware/Authentication.js';
//middleware
router.use('/loggeduser', checkUserAuth)
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/loggeduser', userController.loggedUser);
export {router};
