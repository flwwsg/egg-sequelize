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
      baseDir: 'sequelize',
      database: 'test1',
      dialect: 'mysql',
      exclude: 'Person.js',
      password: '123456',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
    },
    {
      delegate: 'subproperty.a',
      baseDir: 'subproperty/a',
      database: 'test2',
      dialect: 'mysql',
      password: '123456',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
    },
    {
      delegate: 'subproperty.b',
      baseDir: 'subproperty/b',
      database: 'test3',
      dialect: 'mysql',
      password: '123456',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
    },
  ],
};

exports.keys = '0jN4Fw7ZBjo4xtrLklDg4g==';
