import Database from 'better-sqlite3';

const db = new Database('app.db');
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    payload TEXT NOT NULL
  )
`);

const insertStmt = db.prepare('INSERT INTO events (type, payload) VALUES (@type, @payload)');

export const insertManyEvents = db.transaction((events: Array<{ type: string; payload: string }>) => {
  for (const ev of events) {
    insertStmt.run(ev);
  }
});
