-- Admin user (password: admin123 — change after first login)
INSERT OR IGNORE INTO users (id, email, passwordHash, name, role, createdAt)
VALUES (
  'admin-001',
  'admin@wolfitpark.online',
  '$2b$10$qZLtIgtR9i3jQCZ6x0Qu8.RRAdtBeQhr7OR8gZBaQSQSjIQteTx4G',
  'Wolfitpark Admin',
  'admin',
  '2026-07-01T00:00:00.000Z'
);
