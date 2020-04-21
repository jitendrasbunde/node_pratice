module.exports = {
  HOST: "localhost",
  USER: "jitendra",
  PASSWORD: "jitu2121",
  DB: "sample",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};