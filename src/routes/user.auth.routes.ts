import express from 'express';

import { UploadsConfig } from '../config/uploads';

import UsersController from '../controllers/UsersController';
import UsersRolesController from '../controllers/UsersRolesController';
import UsersNewController from '../controllers/UsersNewController';
import UsersResetsController from '../controllers/UsersResetsController';

import AttachmentsRequiredProjectController from '../controllers/AttachmentsRequiredProjectController';
import EstimatesController from '../controllers/EstimatesController';
import EstimateStatusController from '../controllers/EstimateStatusController';
import EstimateItemsController from '../controllers/EstimateItemsController';
import EventsProjectController from '../controllers/EventsProjectController';
import IncomeAttachmentsController from '../controllers/IncomeAttachmentsController';
import IncomeItemsController from '../controllers/IncomeItemsController';
import IncomingsController from '../controllers/IncomingsController';
import NotesController from '../controllers/NotesController';
import NoteAttachmentsController from '../controllers/NoteAttachmentsController';
import NoteSharesController from '../controllers/NoteSharesController';
import PanelPricesController from '../controllers/PanelPricesController';
import PanelsController from '../controllers/PanelsController';
import PayTypesController from '../controllers/PayTypesController';
import ProjectAttachmentsController from '../controllers/ProjectAttachmentsController';
import ProjectAttachmentsRequiredController from '../controllers/ProjectAttachmentsRequiredController';
import ProjectEventsController from '../controllers/ProjectEventsController';
import ProjectsController from '../controllers/ProjectsController';
import ProjectStatusController from '../controllers/ProjectStatusController';
import RoofOrientationsController from '../controllers/RoofOrientationsController';
import RoofTypesController from '../controllers/RoofTypesController';
import StoresController from '../controllers/StoresController';

import usersAuthMiddleware from '../middlewares/usersAuth';
import ServiceOrdersController from '../controllers/ServiceOrdersController';

const userAuthRoutes = express.Router();

userAuthRoutes.get('/users/authenticated', usersAuthMiddleware, function (_request, response) {
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

userAuthRoutes.get('/attachments-required/project', usersAuthMiddleware, AttachmentsRequiredProjectController.index);
userAuthRoutes.get('/attachments-required/project/:id', usersAuthMiddleware, AttachmentsRequiredProjectController.show);
userAuthRoutes.post('/attachments-required/project', usersAuthMiddleware, AttachmentsRequiredProjectController.create);
userAuthRoutes.put('/attachments-required/project/:id', usersAuthMiddleware, AttachmentsRequiredProjectController.update);
userAuthRoutes.delete('/attachments-required/project/:id', usersAuthMiddleware, AttachmentsRequiredProjectController.delete);

userAuthRoutes.get('/estimates/status', usersAuthMiddleware, EstimateStatusController.index);
userAuthRoutes.get('/estimates/status/:id', usersAuthMiddleware, EstimateStatusController.show);
userAuthRoutes.post('/estimates/status', usersAuthMiddleware, EstimateStatusController.create);
userAuthRoutes.put('/estimates/status/:id', usersAuthMiddleware, EstimateStatusController.update);
userAuthRoutes.delete('/estimates/status/:id', usersAuthMiddleware, EstimateStatusController.delete);

userAuthRoutes.get('/estimates/items', usersAuthMiddleware, EstimateItemsController.index);
userAuthRoutes.get('/estimates/items/:id', usersAuthMiddleware, EstimateItemsController.show);
userAuthRoutes.post('/estimates/items', usersAuthMiddleware, EstimateItemsController.create);
userAuthRoutes.put('/estimates/items/:id', usersAuthMiddleware, EstimateItemsController.update);
userAuthRoutes.delete('/estimates/items/:id', usersAuthMiddleware, EstimateItemsController.delete);

userAuthRoutes.get('/estimates', usersAuthMiddleware, EstimatesController.index);
userAuthRoutes.get('/estimates/:id', usersAuthMiddleware, EstimatesController.show);
userAuthRoutes.post('/estimates', usersAuthMiddleware, EstimatesController.create);
userAuthRoutes.put('/estimates/:id', usersAuthMiddleware, EstimatesController.update);
userAuthRoutes.delete('/estimates/:id', usersAuthMiddleware, EstimatesController.delete);

userAuthRoutes.get('/events/project', usersAuthMiddleware, EventsProjectController.index);
userAuthRoutes.get('/events/project/:id', usersAuthMiddleware, EventsProjectController.show);
userAuthRoutes.post('/events/project', usersAuthMiddleware, EventsProjectController.create);
userAuthRoutes.put('/events/project/:id', usersAuthMiddleware, EventsProjectController.update);
userAuthRoutes.delete('/events/project/:id', usersAuthMiddleware, EventsProjectController.delete);

userAuthRoutes.get('/incomings/attachments/:id', usersAuthMiddleware, IncomeAttachmentsController.show);
userAuthRoutes.post('/incomings/:id/attachments', usersAuthMiddleware, UploadsConfig('incomings').single('file'), IncomeAttachmentsController.create);
userAuthRoutes.put('/incomings/attachments/:id', usersAuthMiddleware, IncomeAttachmentsController.update);
userAuthRoutes.delete('/incomings/attachments/:id', usersAuthMiddleware, IncomeAttachmentsController.delete);

userAuthRoutes.get('/incomings/items', usersAuthMiddleware, IncomeItemsController.index);
userAuthRoutes.get('/incomings/items/:id', usersAuthMiddleware, IncomeItemsController.show);
userAuthRoutes.post('/incomings/items', usersAuthMiddleware, IncomeItemsController.create);
userAuthRoutes.put('/incomings/items/:id', usersAuthMiddleware, IncomeItemsController.update);
userAuthRoutes.delete('/incomings/items/:id', usersAuthMiddleware, IncomeItemsController.delete);

userAuthRoutes.get('/incomings', usersAuthMiddleware, IncomingsController.index);
userAuthRoutes.get('/incomings/:id', usersAuthMiddleware, IncomingsController.show);
userAuthRoutes.post('/incomings', usersAuthMiddleware, IncomingsController.create);
userAuthRoutes.put('/incomings/:id', usersAuthMiddleware, IncomingsController.update);
userAuthRoutes.delete('/incomings/:id', usersAuthMiddleware, IncomingsController.delete);

userAuthRoutes.get('/notes', usersAuthMiddleware, NotesController.index);
userAuthRoutes.get('/notes/:id', usersAuthMiddleware, NotesController.show);
userAuthRoutes.post('/notes', usersAuthMiddleware, NotesController.create);
userAuthRoutes.put('/notes/:id', usersAuthMiddleware, NotesController.update);
userAuthRoutes.delete('/notes/:id', usersAuthMiddleware, NotesController.delete);

userAuthRoutes.post('/notes/attachments', usersAuthMiddleware, UploadsConfig('notes').single('file'), NoteAttachmentsController.create);
userAuthRoutes.put('/notes/attachments/:id', usersAuthMiddleware, NoteAttachmentsController.update);
userAuthRoutes.delete('/notes/attachments/:id', usersAuthMiddleware, NoteAttachmentsController.delete);

userAuthRoutes.post('/notes/shares', usersAuthMiddleware, NoteSharesController.create);
userAuthRoutes.put('/notes/shares/:id', usersAuthMiddleware, NoteSharesController.update);
userAuthRoutes.delete('/notes/shares/:id', usersAuthMiddleware, NoteSharesController.delete);

userAuthRoutes.get('/panels/prices', usersAuthMiddleware, PanelPricesController.index);
userAuthRoutes.get('/panels/prices/:id', usersAuthMiddleware, PanelPricesController.show);
userAuthRoutes.post('/panels/prices', usersAuthMiddleware, PanelPricesController.create);
userAuthRoutes.put('/panels/prices/:id', usersAuthMiddleware, PanelPricesController.update);
userAuthRoutes.delete('/panels/prices/:id', usersAuthMiddleware, PanelPricesController.delete);

userAuthRoutes.get('/panels', usersAuthMiddleware, PanelsController.index);
userAuthRoutes.get('/panels/:id', usersAuthMiddleware, PanelsController.show);
userAuthRoutes.post('/panels', usersAuthMiddleware, PanelsController.create);
userAuthRoutes.put('/panels/:id', usersAuthMiddleware, PanelsController.update);
userAuthRoutes.delete('/panels/:id', usersAuthMiddleware, PanelsController.delete);

userAuthRoutes.get('/payments/types', usersAuthMiddleware, PayTypesController.index);
userAuthRoutes.get('/payments/types/:id', usersAuthMiddleware, PayTypesController.show);
userAuthRoutes.post('/payments/types', usersAuthMiddleware, PayTypesController.create);
userAuthRoutes.put('/payments/types/:id', usersAuthMiddleware, PayTypesController.update);
userAuthRoutes.delete('/payments/types/:id', usersAuthMiddleware, PayTypesController.delete);

userAuthRoutes.get('/projects/attachments/:id', usersAuthMiddleware, ProjectAttachmentsController.show);
userAuthRoutes.post('/projects/:id/attachments', usersAuthMiddleware, UploadsConfig('projects').single('file'), ProjectAttachmentsController.create);
userAuthRoutes.put('/projects/attachments/:id', usersAuthMiddleware, ProjectAttachmentsController.update);
userAuthRoutes.delete('/projects/attachments/:id', usersAuthMiddleware, ProjectAttachmentsController.delete);

userAuthRoutes.get('/projects/attachments-required/:id', usersAuthMiddleware, ProjectAttachmentsRequiredController.show);
userAuthRoutes.post('/projects/:id/attachments-required', usersAuthMiddleware, UploadsConfig('projects').single('file'), ProjectAttachmentsRequiredController.create);
userAuthRoutes.put('/projects/:id/attachments-required/:aid', usersAuthMiddleware, UploadsConfig('projects').single('file'), ProjectAttachmentsRequiredController.update);
userAuthRoutes.delete('/projects/attachments-required/:id', usersAuthMiddleware, ProjectAttachmentsRequiredController.delete);

userAuthRoutes.get('/projects/events', usersAuthMiddleware, ProjectEventsController.index);
userAuthRoutes.get('/projects/events/:id', usersAuthMiddleware, ProjectEventsController.show);
userAuthRoutes.post('/projects/events', usersAuthMiddleware, ProjectEventsController.create);
userAuthRoutes.put('/projects/events/:id', usersAuthMiddleware, ProjectEventsController.update);
userAuthRoutes.delete('/projects/events/:id', usersAuthMiddleware, ProjectEventsController.delete);

userAuthRoutes.get('/projects/status', usersAuthMiddleware, ProjectStatusController.index);
userAuthRoutes.get('/projects/status/:id', usersAuthMiddleware, ProjectStatusController.show);
userAuthRoutes.post('/projects/status', usersAuthMiddleware, ProjectStatusController.create);
userAuthRoutes.put('/projects/status/:id', usersAuthMiddleware, ProjectStatusController.update);
userAuthRoutes.delete('/projects/status/:id', usersAuthMiddleware, ProjectStatusController.delete);

userAuthRoutes.get('/projects', usersAuthMiddleware, ProjectsController.index);
userAuthRoutes.get('/projects/:id', usersAuthMiddleware, ProjectsController.show);
userAuthRoutes.post('/projects', usersAuthMiddleware, ProjectsController.create);
userAuthRoutes.put('/projects/:id', usersAuthMiddleware, ProjectsController.update);
userAuthRoutes.delete('/projects/:id', usersAuthMiddleware, ProjectsController.delete);

userAuthRoutes.get('/roofs/orientations', usersAuthMiddleware, RoofOrientationsController.index);
userAuthRoutes.get('/roofs/orientations/:id', usersAuthMiddleware, RoofOrientationsController.show);
userAuthRoutes.post('/roofs/orientations', usersAuthMiddleware, RoofOrientationsController.create);
userAuthRoutes.put('/roofs/orientations/:id', usersAuthMiddleware, RoofOrientationsController.update);
userAuthRoutes.delete('/roofs/orientations/:id', usersAuthMiddleware, RoofOrientationsController.delete);

userAuthRoutes.get('/roofs/types', usersAuthMiddleware, RoofTypesController.index);
userAuthRoutes.get('/roofs/types/:id', usersAuthMiddleware, RoofTypesController.show);
userAuthRoutes.post('/roofs/types', usersAuthMiddleware, RoofTypesController.create);
userAuthRoutes.put('/roofs/types/:id', usersAuthMiddleware, RoofTypesController.update);
userAuthRoutes.delete('/roofs/types/:id', usersAuthMiddleware, RoofTypesController.delete);

userAuthRoutes.get('/services/orders', usersAuthMiddleware, ServiceOrdersController.index);
userAuthRoutes.get('/services/orders/:id', usersAuthMiddleware, ServiceOrdersController.show);
userAuthRoutes.post('/services/orders', usersAuthMiddleware, ServiceOrdersController.create);
userAuthRoutes.put('/services/orders/:id', usersAuthMiddleware, ServiceOrdersController.update);
userAuthRoutes.delete('/services/orders/:id', usersAuthMiddleware, ServiceOrdersController.delete);

userAuthRoutes.get('/stores', usersAuthMiddleware, StoresController.index);
userAuthRoutes.get('/stores/:id', usersAuthMiddleware, StoresController.show);
userAuthRoutes.post('/stores', usersAuthMiddleware, UploadsConfig('stores').single('avatar'), StoresController.create);
userAuthRoutes.put('/stores/:id', usersAuthMiddleware, UploadsConfig('stores').single('avatar'), StoresController.update);
userAuthRoutes.delete('/stores/:id', usersAuthMiddleware, StoresController.delete);

export default userAuthRoutes;