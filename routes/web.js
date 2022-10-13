import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';
//import checkUserAuth from '../middlewares/auth-middleware.js';

/* //  Protect Routes
router.use('/changepassword', checkUserAuth)
router.use('/loggeduser', checkUserAuth)
 */
// Public Routes
router.post('/signup', userController.signup);
router.post('/login', userController.login);

/* // Protected Routes
router.post('/changepassword', UserController.changeUserPassword)
router.get('/loggeduser', UserController.loggedUser)

 */
export {router};