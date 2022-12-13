const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateMyInfo,
  updateMyAvatar,
  login,
  getMyInfo,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const {
  checkLogin, checkUserId, checkUserData, checkUserAvatar, checkReg,
} = require('../utils/validation');

router.get('/users', auth, getUsers);
router.get('/users/me', auth, getMyInfo);
router.get('/users/:userId', auth, checkUserId, getUserById);

router.post('/signin', checkLogin, login);
router.post('/signup', checkReg, createUser);

router.patch('/users/me', auth, checkUserData, updateMyInfo);
router.patch('/users/me/avatar', auth, checkUserAvatar, updateMyAvatar);

module.exports = router;
