import express from 'express';

import UsersAuthenticationsController from '../controllers/UsersAuthenticationController';
import UsersNewController from '../controllers/UsersNewController';
import UsersResetsController from '../controllers/UsersResetsController';

const userPublicRoutes = express.Router();

userPublicRoutes.post('/users/authenticate', UsersAuthenticationsController.create);

userPublicRoutes.get('/users/new/auth', UsersNewController.show);

userPublicRoutes.get('/users/reset', UsersResetsController.show);
userPublicRoutes.post('/users/reset', UsersResetsController.create);

export default userPublicRoutes;