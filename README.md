[![Tests](../../actions/workflows/tests-13-sprint.yml/badge.svg)](../../actions/workflows/tests-13-sprint.yml) [![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)
# Проект Mesto бэкенд


## Основаня информация
Проект сделан во время обучения на сайте [Яндекс Практикум](https://practicum.yandex.ru/).

**Реализованне функции:**
1. GET /users — возвращает всех пользователей из базы;
2. GET /users/:userId — возвращает пользователя по _id;
3. GET /users/me — получение информации о пользователе;
3. POST /users — создаёт пользователя с переданными в теле запроса name , about и avatar ;
4. PATCH /users/me — обновляет профиль пользователя;
5. PATCH /users/me/avatar — обновляет аватар пользователя;
6. GET /cards — возвращает все карточки из базы;
7. POST /cards — создаёт карточку с переданными в теле запроса name и link , устанавливает поле owner для
карточки;
8. DELETE /cards/:cardId — удаляет карточку по _id ;
9. PUT /cards/:cardId/likes — ставит лайк карточке;
10. DELETE /cards/:cardId/likes — убирает лайк с карточки;
11. POST /sginup — регестрация пользователя;
12. POST /signin — вход в учетную запись пользователя;
  
### Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

**Ссылки:**
[Ссылка на GitHub](https://github.com/valvdov/express-mesto-gha)
