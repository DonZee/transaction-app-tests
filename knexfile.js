module.exports = {
  development: {
      client: 'pg',
      connection: {
        database: "transactions_dev",
        host: "transactions-dev.cbcp0inbl2z6.us-east-2.rds.amazonaws.com",
        user: 'root',
        password: ''
      },
      migrations: {
          directory: __dirname + '/db/migrations',
        },
      seeds: {
          directory: __dirname + '/db/seeds',
        },
    },
  production: {
      client: 'pg',
      connection: process.env.DATABASE_URL,
      migrations: {
          directory: __dirname + '/db/migrations',
        },
      seeds: {
          directory: __dirname + '/db/seeds/production',
        },
    },
}
