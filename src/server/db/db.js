import Sequelize from 'sequelize'
const DB_NAME = 'consilience' //process.env.npm_package_name

const db = new Sequelize(
  `postgres://localhost:5432/${DB_NAME}`, {
    native: true,
    logging: false,
    operatorsAliases: Sequelize.Op
})

export default db
