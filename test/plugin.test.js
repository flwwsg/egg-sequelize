'use strict';

const assert = require('assert');
const mm = require('egg-mock');

describe('test/plugin.test.js', () => {
  let app;

  before(() => {
    app = mm.app({
      baseDir: 'apps/model-app',
    });
    return app.ready();
  });
  before(() => app.model.sync({ force: true }));

  after(mm.restore);

  describe('Base', () => {
    it('sequelize init success', () => {
      assert(app.model);
    });

    it('ctx model property getter', () => {
      const ctx = app.mockContext();
      assert.ok(ctx.model);
      assert.ok(ctx.model.ctx === ctx);
      assert.ok(ctx.model.User);
      assert.ok(ctx.model.Monkey);
      assert.ok(ctx.model.Person);
      assert.ok(ctx.model !== app.model);
    });

    it('model not load non Sequelize files', async function() {
      assert(!('Other' in app.model));

      const ctx = app.mockContext();
      assert(!('Other' in ctx.model));
    });

    it('has right tableName', () => {
      assert(app.model.Person.tableName === 'people');
      assert(app.model.User.tableName === 'users');
      assert(app.model.Monkey.tableName === 'the_monkeys');
    });
  });

  describe('Database options', () => {
    let config;

    before(() => {
      config = app.model.options;
    });

    it('should work with default config', async function() {
      assert(config.define.freezeTableName === false);
      assert(config.port === '3306');
      assert(config.username === 'root');
      assert(config.password === '123456');
      assert(config.logging !== false);
      assert(config.benchmark === true);
    });

    it('should work with fixture configs', async function() {
      assert(config.dialect === 'mysql');
      assert(config.host === '127.0.0.1');
      assert(config.pool.idle === 10000);
      assert(config.timezone === '+08:01');
      assert(config.storage === 'db/test-foo.sqlite');
    });
  });

  describe('Test model', () => {
    it('User.test method work', async function() {
      await app.model.User.test();
    });

    it('should work timestramp', async function() {
      const user = await app.model.User.create({ name: 'huacnlee' });
      assert(user.isNewRecord === false);
      assert(user.name === 'huacnlee');
      assert(user.created_at !== null);
      assert(user.updated_at !== null);
    });
  });

  describe('Test controller', () => {
    it('should get data from create', async function() {
      app.mockCsrf();

      await app.httpRequest(app.callback())
        .post('/users')
        .send({
          name: 'popomore',
        });
      const user = await app.model.User.findOne({
        where: { name: 'popomore' },
      });
      assert.ok(user);
      assert(user.name === 'popomore');
      assert(user.isNewRecord === false);
      const res = await app.httpRequest(app.callback())
        .get(`/users/${user.id}`);
      assert(res.status === 200);
      assert(res.body.name === 'popomore');
    });
  });

  describe('Associate', () => {
    it('ctx model associate init success', () => {
      const ctx = app.mockContext();
      assert.ok(ctx.model);
      assert.ok(ctx.model.User);
      assert.ok(ctx.model.User.prototype.hasPosts);
      assert.ok(ctx.model.Post);
    });
  });
});
