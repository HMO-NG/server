import provider from './src/controller/provider-controller.js';
import auth from './src/controller/auth-controller.js'
import healthPlan from './src/controller/health-plan-controller.js'
import nhisService from './src/controller/nhis-service-controller.js'
import nhisEnrollee from './src/controller/enrollee-controller.js'
import getHealthCheck  from './src/controller/health-check-controller.js';

const router = [provider, auth, healthPlan, nhisService, nhisEnrollee, getHealthCheck];

export default router;

