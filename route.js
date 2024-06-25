import provider from './src/controller/provider-controller.js';
import auth from './src/controller/auth-controller.js'
import healthPlan from './src/controller/health-plan-controller.js'


const router = [provider, auth, healthPlan];

export default router;

