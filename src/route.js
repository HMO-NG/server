import provider from './controller/provider-controller.js';
import auth from './controller/auth-controller.js'
import healthPlan from './controller/health-plan-controller.js'
import nhisService from './controller/nhis-service-controller.js'
import nhisEnrollee from './controller/enrollee-controller.js'
import getHealthCheck  from './controller/health-check-controller.js';
import forms from './controller/form-controller.js'

const router = [provider, auth, healthPlan, nhisService, nhisEnrollee, getHealthCheck, forms];

export default router;

