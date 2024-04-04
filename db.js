const { DataSource } = require("typeorm")

const AppDataSource = new DataSource({
  type: "mysql",
  port: 3306,
  username: "root",
  password: "Qwertyu123",
  database: "the_mobile_hour",
  entities: [
    "src/models/*.js",
  ],
  migrations: [
    "src/migrations/*.js",
  ],
})

module.exports = {
  datasource: AppDataSource,
}