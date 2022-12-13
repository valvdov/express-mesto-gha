const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCardById,
  putLike,
  deleteLike,
} = require('../controllers/cards');
const auth = require('../middlewares/auth');
const {
  checkNewCard, checkCardId,
} = require('../utils/validation');

router.get('/cards', auth, getCards);
router.post('/cards', auth, checkNewCard, createCard);
router.delete('/cards/:cardId', auth, checkCardId, deleteCardById);
router.put('/cards/:cardId/likes', auth, checkCardId, putLike);
router.delete('/cards/:cardId/likes', auth, checkCardId, deleteLike);

module.exports = router;
