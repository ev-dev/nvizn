import { STRING } from 'sequelize'

const Paper = db.define('paper', {
  title: STRING
})

export default Paper