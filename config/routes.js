const router = require('express').Router();
const passport = require('passport')
const miscController = require('../controllers/misc.controller');
const candidatesController = require('../controllers/candidates.controller');
const companiesController = require('../controllers/companies.controller');
const offersController = require('../controllers/offers.controller');
const secureCompany = require('../middlewares/secureCompany.middleware')
const secureCandidate = require('../middlewares/secureCandidate.middleware')

const GOOGLE_SCOPES = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
]

// MISC
router.get('/', miscController.home);
router.get('/main-login', miscController.mainLogin);
// router.get('/delete-profile', miscController.deleteProfile);
//router.get('/delete-profile', miscController.doDeleteProfile);

// CANDIDATES
router.get('/candidate-profile', secureCandidate.candidateIsAuthenticated, candidatesController.candidateProfile); //No permitir company
router.get('/candidate-signup', secureCandidate.candidateIsNotAuthenticated, candidatesController.signup);
router.post('/candidate-signup', secureCandidate.candidateIsNotAuthenticated, candidatesController.doSignup);
router.get('/candidate-login', secureCandidate.candidateIsNotAuthenticated, candidatesController.login);
router.post('/candidate-login', secureCandidate.candidateIsNotAuthenticated, candidatesController.doLogin);
router.get('/authenticate/google', passport.authenticate('google-auth-candidates', {scope: GOOGLE_SCOPES}))
router.get('/authenticate/google/callback', candidatesController.doLoginGoogle)
router.post('/candidate-logout', secureCandidate.candidateIsAuthenticated, candidatesController.logout);
/* Edit candidate profile route GET */
/* Edit candidate profile route POST */
router.post('/delete-candidate/:id', candidatesController.delete); // TODO --> Nodemailer confirmation email to permanently delete profile

// COMPANIES
router.get('/company-profile', secureCompany.companyIsAuthenticated, companiesController.companyProfile); //No permitir candidate
router.get('/company-signup', secureCompany.companyIsNotAuthenticated, companiesController.signup);
router.post('/company-signup', secureCompany.companyIsNotAuthenticated, companiesController.doSignup);
router.get('/company-login', secureCompany.companyIsNotAuthenticated, companiesController.login);
router.post('/company-login', secureCompany.companyIsNotAuthenticated, companiesController.doLogin);
router.get('/auth/google', passport.authenticate('google-auth-companies', {scope: GOOGLE_SCOPES}))
router.get('/auth/google/callback', companiesController.doLoginGoogle)
router.post('/company-logout', secureCompany.companyIsAuthenticated, companiesController.logout);
/* Edit company profile route GET */
/* Edit company profile route POST */
router.post('/delete-company/:id', companiesController.delete); // TODO --> Nodemailer confirmation email to permanently delete profile

// OFFERS
router.get('/offers-list', offersController.offersList);
router.get('/offer-detail/:id', offersController.offerDetail);
router.get('/offer-creation',  secureCompany.companyIsAuthenticated, offersController.create);
router.post('/offer-creation', secureCompany.companyIsAuthenticated, offersController.doCreate);
/* Edit offer route GET */
/* Edit offer route POST */
router.post('/delete-offer/:id', offersController.delete);



module.exports = router;