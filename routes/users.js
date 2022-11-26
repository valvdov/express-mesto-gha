const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateMyInfo,
  updateMyAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.patch('/users/me', updateMyInfo);
router.patch('/users/me/avatar', updateMyAvatar);

module.exports = router;
