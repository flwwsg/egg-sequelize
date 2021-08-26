'use strict';

exports.sequelize = {
  datasources: [
    {
      delegate: 'model',
      baseDir: 'model',
      database: 'test',
      dialect: 'mysql',
      password: '123456',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
    },
    {
      delegate: 'sequelize',
      baseDir: 'model',
      database: 'test1',
      dialect: 'mysql',
      exclude: 'Person.js',
      password: '123456',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
    },
  ],
};

exports.keys = '0jN4Fw7ZBjo4xtrLklDg4g==';
