const BadRequestMessage = 'Были переданы некорректные данные: ';
const SomeOneElseMovieMessage = 'Нельзя удалять чужой фильм.';
const NotFoundMovieMessage = 'Запрашиваемый фильм не найден.';
const NotFoundUserMessage = 'Запрашиваемый пользователь не найден.';
const UnauthorizedMessage = 'Неправильные почта или пароль.';
const InternalServerErrorMessage = 'На сервере произошла ошибка.';
const ConflictUserMessage = 'Такой пользователь уже существует.';
const MongoServerErrorName = 'MongoServerError';
const MongoServerErrorCode = 11000;

module.exports = {
  BadRequestMessage,
  SomeOneElseMovieMessage,
  NotFoundMovieMessage,
  NotFoundUserMessage,
  UnauthorizedMessage,
  InternalServerErrorMessage,
  ConflictUserMessage,
  MongoServerErrorName,
  MongoServerErrorCode,
};
