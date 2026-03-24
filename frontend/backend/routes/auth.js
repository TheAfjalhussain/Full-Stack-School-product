const router = require('express').Router();
const authCtrl = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

router.post('/login', authCtrl.login);
router.post('/logout', authCtrl.logout);
router.get('/me', authMiddleware, authCtrl.me);

module.exports = router;
