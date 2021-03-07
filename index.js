require('best-sqlite3-frontend')({
  bestSqlite3: require('best-sqlite3'),
  databasePath: 'databases/filmvisarna.db',
  addDatabaseFunctions: {
    UP: x => x.toUpperCase(),
    LOW: x => x.toLowerCase()
  },
  express: require('express'),
  port: 3000,
  staticFolder: 'www'
}).then(({ app, db }) => {

})
