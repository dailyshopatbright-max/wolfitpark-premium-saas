-- Admin user (password: admin123 — change after first login)
INSERT OR IGNORE INTO users (id, email, passwordHash, name, role, createdAt)
VALUES (
  'admin-001',
  'admin@wolfitpark.online',
  '$2a$10$dG4P6LPV.9q5qRq5bLq9eO5P9e5qRq5bLq9eO5P9e5qRq5bLq9e',
  'Wolfitpark Admin',
  'admin',
  '2026-07-01T00:00:00.000Z'
);
