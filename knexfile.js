module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/webpushdev',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};