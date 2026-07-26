export async function createSubmission(db: D1Database, submission: { id: string; type: string; data: string; createdAt: string }) {
  await db.prepare("INSERT INTO submissions (id, type, data, createdAt) VALUES (?, ?, ?, ?)").bind(submission.id, submission.type, submission.data, submission.createdAt).run()
}

export async function getSubmissions(db: D1Database, type?: string) {
  if (type) {
    return db.prepare("SELECT * FROM submissions WHERE type = ? ORDER BY createdAt DESC").bind(type).all().then(r => r.results)
  }
  return db.prepare("SELECT * FROM submissions ORDER BY createdAt DESC").all().then(r => r.results)
}
