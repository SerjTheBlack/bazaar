const express = require('express');
const router = express.Router();

module.exports = (passport) => {

  /* Получение страницы авторизации. */
  router.get('/', (req, res) => {
    // Вывод страницы авторизации со всеми флэш-сообщениями, если
    // таковые существуют
    res.render('index', { message: req.flash('message') });
  });

  /* Обработка POST-данных авторизации */
  router.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash : true
  }));

  /* Получение страницы регистрации */
  router.get('/signup', (req, res) => {
    res.render('register',{message: req.flash('message')});
  });

  /* Обработка регистрационных POST-данных */
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash : true
  }));

  /* Выход из системы */
  router.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  return router;
};
