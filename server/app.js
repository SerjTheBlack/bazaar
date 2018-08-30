// Подготовка. Подключаем парсеры, логгер.
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// ? Цепляем к сайту иконку вкладки. Потом...
const favicon = require('static-favicon');

// Подключение к базе Mongo по URL из внешней конфигурации.
const dbConfig = require('./db');
const mongoose = require('mongoose');
mongoose.connect(dbConfig.url);

// Подключение приложения Express.
const app = express();

// Собираем представление.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Настраиваем Passport.
const passport = require('passport');
const expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
const User = require('./models/user');

// Цепляем на средний слой flash-сообщения для шаблонов.
const flash = require('connect-flash');
app.use(flash());

// Поддерживаем текущую сессию, чтобы не отправлять учетные данные.
// Cериализация.
passport.serializeUser((user, done) => {
  done(null, user._id);
});
// Десериализация.
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Подключаем шифрование.
const bCrypt = require('bcrypt-nodejs');

// Объявляем класс локальных стратегий аутентификации Passport.
const LocalStrategy = require('passport-local').Strategy;

// Стратегия авторизации.
passport.use('login', new LocalStrategy({
    passReqToCallback : true
  },
  (req, username, password, done) => {
    // проверка в mongo, существует ли пользователь с таким логином
    User.findOne({ 'username' :  username },
      (err, user) => {
        // В случае возникновения любой ошибки, возврат с помощью метода done
        if (err)
          return done(err);
        // Пользователь не существует, ошибка входа и перенаправление обратно
        if (!user) {
          console.log('User Not Found with username '+username);
          return done(null, false,
            req.flash('message', 'User Not found.'));
        }
        // Пользователь существует, но пароль введен неверно, ошибка входа
        if (!isValidPassword(user, password)){
          console.log('Invalid Password');
          return done(null, false,
            req.flash('message', 'Invalid Password'));
        }
        // Пользователь существует и пароль верен, возврат пользователя из
        // метода done, что будет означать успешную аутентификацию
        return done(null, user);
      }
    );
  }));

// Шифрованное сравнение паролей при помощи bCrypt.
const isValidPassword = (user, password) => {
  return bCrypt.compareSync(password, user.password);
};

// Стратегия регистрации.
passport.use('signup', new LocalStrategy({
    passReqToCallback : true
  },
  (req, username, password, done) => {
    findOrCreateUser = () => {
      // поиск пользователя в Mongo с помощью предоставленного имени пользователя
      User.findOne({ 'username' : username}, (err, user) => {
        // В случае любых ошибок - возврат
        if (err) {
          console.log('Error in SignUp: '+err);
          return done(err);
        }
        // уже существует
        if (user) {
          console.log('User already exists');
          return done(null, false,
            req.flash('message','User Already Exists'));
        } else {
          // если пользователя с таки адресом электронной почты
          // в базе не существует, создать пользователя
          let newUser = new User();
          // установка локальных прав доступа пользователя
          newUser.username = username;
          newUser.password = createHash(password);
          newUser.fio = req.param('fio');
          newUser.cash = 10000;
          newUser.inventory = [];

          // сохранения пользователя
          newUser.save((err) => {
            if (err){
              console.log('Error in Saving user: '+err);
              throw err;
            }
            console.log('User Registration successful');
            return done(null, newUser);
          });
        }
      });
    };

    // Отложить исполнение findOrCreateUser и выполнить
    // метод на следующем этапе цикла события
    process.nextTick(findOrCreateUser);
  }));

// Генерация хэша пароля с помощью bCrypt.
const createHash = (password) => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

// Подтягиваем роуты.
const indexRouter = require('./routes/index')(passport);
app.use('/', indexRouter);

module.exports = app;
