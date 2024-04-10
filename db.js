const { DataSource } = require('typeorm');

const AppDataSource = new DataSource({
  type: 'mysql',
  port: 3306,
  username: 'root',
  password: 'Qwertyu123',
  database: 'high_street_gym',
  entities: ['src/models/*.js'],
  migrations: ['src/migrations/*.js'],
});

module.exports = {
  datasource: AppDataSource,
};
