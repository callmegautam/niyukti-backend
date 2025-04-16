import * as CompanyController from '../controllers/company.controller.js';
import { Router } from 'express';

const router = Router();

router.get('/', CompanyController.getAllCompanies);
router.post('/register', CompanyController.registerCompany);
router.post('/login', CompanyController.loginCompany);
router.get('/:id', CompanyController.getCompanyById);

export default router;
