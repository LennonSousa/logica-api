import express from 'express';

import { UploadsConfig } from '../config/uploads';

import UsersController from '../controllers/UsersController';
import UsersRolesController from '../controllers/UsersRolesController';
import UsersNewController from '../controllers/UsersNewController';
import UsersResetsController from '../controllers/UsersResetsController';

import EstimatesController from '../controllers/EstimatesController';
import EstimateStatusController from '../controllers/EstimateStatusController';
import PanelPricesController from '../controllers/PanelPricesController';
import PanelsController from '../controllers/PanelsController';
import RoofOrientationsController from '../controllers/RoofOrientationsController';
import RoofTypesController from '../controllers/RoofTypesController';
import StoreController from '../controllers/StoreController';

import usersAuthMiddleware from '../middlewares/usersAuth';

const userAuthRoutes = express.Router();

userAuthRoutes.get('/users/authenticated', usersAuthMiddleware, function (request, response) {
    return response.status(202).json();
});

userAuthRoutes.put('/users/reset/:id', usersAuthMiddleware, UsersResetsController.update);

userAuthRoutes.get('/users', usersAuthMiddleware, UsersController.index);
userAuthRoutes.get('/users/:id', usersAuthMiddleware, UsersController.show);
userAuthRoutes.post('/users', usersAuthMiddleware, UsersController.create);
userAuthRoutes.put('/users/:id', usersAuthMiddleware, UsersController.update);
userAuthRoutes.delete('/users/:id', usersAuthMiddleware, UsersController.delete);

userAuthRoutes.get('/user/roles', usersAuthMiddleware, UsersRolesController.generate);
userAuthRoutes.put('/users/roles/:id', usersAuthMiddleware, UsersRolesController.update);

userAuthRoutes.put('/users/new/:id', usersAuthMiddleware, UsersNewController.update);

userAuthRoutes.get('/estimates/status', usersAuthMiddleware, EstimateStatusController.index);
userAuthRoutes.get('/estimates/status/:id', usersAuthMiddleware, EstimateStatusController.show);
userAuthRoutes.post('/estimates/status', usersAuthMiddleware, EstimateStatusController.create);
userAuthRoutes.put('/estimates/status/:id', usersAuthMiddleware, EstimateStatusController.update);
userAuthRoutes.delete('/estimates/status/:id', usersAuthMiddleware, EstimateStatusController.delete);

userAuthRoutes.get('/estimates', usersAuthMiddleware, EstimatesController.index);
userAuthRoutes.get('/estimates/:id', usersAuthMiddleware, EstimatesController.show);
userAuthRoutes.post('/estimates', usersAuthMiddleware, EstimatesController.create);
userAuthRoutes.put('/estimates/:id', usersAuthMiddleware, EstimatesController.update);
userAuthRoutes.delete('/estimates/:id', usersAuthMiddleware, EstimatesController.delete);

userAuthRoutes.get('panels/prices', usersAuthMiddleware, PanelPricesController.index);
userAuthRoutes.get('panels/prices/:id', usersAuthMiddleware, PanelPricesController.show);
userAuthRoutes.post('panels/prices', usersAuthMiddleware, PanelPricesController.create);
userAuthRoutes.put('panels/prices/:id', usersAuthMiddleware, PanelPricesController.update);
userAuthRoutes.delete('panels/prices/:id', usersAuthMiddleware, PanelPricesController.delete);

userAuthRoutes.get('panels', usersAuthMiddleware, PanelsController.index);
userAuthRoutes.get('panels/:id', usersAuthMiddleware, PanelsController.show);
userAuthRoutes.post('panels', usersAuthMiddleware, PanelsController.create);
userAuthRoutes.put('panels/:id', usersAuthMiddleware, PanelsController.update);
userAuthRoutes.delete('panels/:id', usersAuthMiddleware, PanelsController.delete);

userAuthRoutes.get('roofs/orientations', usersAuthMiddleware, RoofOrientationsController.index);
userAuthRoutes.get('roofs/orientations/:id', usersAuthMiddleware, RoofOrientationsController.show);
userAuthRoutes.post('roofs/orientations', usersAuthMiddleware, RoofOrientationsController.create);
userAuthRoutes.put('roofs/orientations/:id', usersAuthMiddleware, RoofOrientationsController.update);
userAuthRoutes.delete('roofs/orientations/:id', usersAuthMiddleware, RoofOrientationsController.delete);

userAuthRoutes.get('roofs/types', usersAuthMiddleware, RoofTypesController.index);
userAuthRoutes.get('roofs/types/:id', usersAuthMiddleware, RoofTypesController.show);
userAuthRoutes.post('roofs/types', usersAuthMiddleware, RoofTypesController.create);
userAuthRoutes.put('roofs/types/:id', usersAuthMiddleware, RoofTypesController.update);
userAuthRoutes.delete('roofs/types/:id', usersAuthMiddleware, RoofTypesController.delete);

userAuthRoutes.get('/store', usersAuthMiddleware, StoreController.show);
userAuthRoutes.put('/store/:id', usersAuthMiddleware, UploadsConfig('store').single('avatar'), StoreController.update);

export default userAuthRoutes;