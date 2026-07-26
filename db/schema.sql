CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  passwordHash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  phone TEXT DEFAULT '',
  company TEXT DEFAULT '',
  createdAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS registrations (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  userEmail TEXT NOT NULL,
  userName TEXT NOT NULL,
  companyName TEXT NOT NULL,
  entityType TEXT NOT NULL,
  filingState TEXT NOT NULL,
  registeredAgent TEXT NOT NULL,
  einNeeded INTEGER DEFAULT 0,
  boirNeeded INTEGER DEFAULT 0,
  itinNeeded INTEGER DEFAULT 0,
  mailForwarding INTEGER DEFAULT 0,
  paymentMethod TEXT DEFAULT 'card',
  totalAmount REAL DEFAULT 0,
  phone TEXT DEFAULT '',
  address TEXT DEFAULT '',
  usCitizen INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending',
  createdAt TEXT NOT NULL
);
