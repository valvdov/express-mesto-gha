class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}
const notFoundCard = 'Карточка с указанным _id не найдена';
const notFoundUser = 'Пользователь по указанному _id не найден';
module.exports = { NotFoundError, notFoundCard, notFoundUser };
