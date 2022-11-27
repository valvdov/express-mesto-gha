const STATUS_BAD_REQUEST = 400;
const STATUS_NOT_FOUND = 404;
const STATUS_INTERNAL_SERVER_ERROR = 500;

const STATUS_BAD_REQUEST_MESSAGE = { message: 'Переданы некорректные данные' };
const STATUS_NOT_FOUND_MESSAGE = { message: 'Данные по такому id не найдены' };
const STATUS_INTERNAL_SERVER_ERROR_MESSAGE = { message: 'Произошла ошибка по умолчанию' };

module.exports = {
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_BAD_REQUEST_MESSAGE,
  STATUS_NOT_FOUND_MESSAGE,
  STATUS_INTERNAL_SERVER_ERROR_MESSAGE,
};
