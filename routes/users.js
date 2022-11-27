const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateMyInfo,
  updateMyAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.patch('/me', updateMyInfo);
router.patch('/me/avatar', updateMyAvatar);

module.exports = router;
