const express = require('express');
const router = express.Router();

const dbConfig = require('../db');
const mongoose = require('mongoose');
mongoose.connect(dbConfig.url);

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

  /* Загрузка данных текущего пользователя для домашней страницы */
  router.get('/home', (req,res) => {

    res.render('home',{message: req.flash('message')});
  });

  /* Выход из системы */
  router.get('/signout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  return router;
};
