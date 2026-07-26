export type UserRole = "admin" | "user"

export type User = {
  id: string
  email: string
  passwordHash: string
  role: UserRole
  name: string
  createdAt: string
  phone?: string
  company?: string
}

export type Registration = {
  id: string
  userId: string
  userEmail: string
  userName: string
  companyName: string
  entityType: string
  filingState: string
  registeredAgent: string
  einNeeded: boolean
  boirNeeded: boolean
  itinNeeded: boolean
  mailForwarding: boolean
  paymentMethod: string
  totalAmount: number
  phone: string
  address: string
  usCitizen: boolean
  status: "pending" | "review" | "approved" | "rejected"
  createdAt: string
}

export function rowToUser(row: any): User {
  return {
    id: row.id,
    email: row.email,
    passwordHash: row.passwordHash,
    name: row.name,
    role: row.role as UserRole,
    phone: row.phone || undefined,
    company: row.company || undefined,
    createdAt: row.createdAt,
  }
}

export function rowToRegistration(row: any): Registration {
  return {
    id: row.id,
    userId: row.userId,
    userEmail: row.userEmail,
    userName: row.userName,
    companyName: row.companyName,
    entityType: row.entityType,
    filingState: row.filingState,
    registeredAgent: row.registeredAgent,
    einNeeded: !!row.einNeeded,
    boirNeeded: !!row.boirNeeded,
    itinNeeded: !!row.itinNeeded,
    mailForwarding: !!row.mailForwarding,
    paymentMethod: row.paymentMethod || "card",
    totalAmount: row.totalAmount || 0,
    phone: row.phone || "",
    address: row.address || "",
    usCitizen: !!row.usCitizen,
    status: row.status as Registration["status"],
    createdAt: row.createdAt,
  }
}

export async function getUsers(db: D1Database): Promise<User[]> {
  const { results } = await db.prepare("SELECT * FROM users ORDER BY createdAt DESC").all()
  return (results as any[]).map(rowToUser)
}

export async function getUserByEmail(db: D1Database, email: string): Promise<User | undefined> {
  const row = await db.prepare("SELECT * FROM users WHERE email = ?").bind(email).first()
  return row ? rowToUser(row) : undefined
}

export async function getUserById(db: D1Database, id: string): Promise<User | undefined> {
  const row = await db.prepare("SELECT * FROM users WHERE id = ?").bind(id).first()
  return row ? rowToUser(row) : undefined
}

export async function createUser(db: D1Database, user: User): Promise<void> {
  await db.prepare(
    "INSERT INTO users (id, email, passwordHash, name, role, phone, company, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
  ).bind(
    user.id, user.email, user.passwordHash, user.name, user.role,
    user.phone || "", user.company || "", user.createdAt
  ).run()
}

export async function getRegistrations(db: D1Database): Promise<Registration[]> {
  const { results } = await db.prepare("SELECT * FROM registrations ORDER BY createdAt DESC").all()
  return (results as any[]).map(rowToRegistration)
}

export async function getRegistrationsByUser(db: D1Database, userId: string): Promise<Registration[]> {
  const { results } = await db.prepare("SELECT * FROM registrations WHERE userId = ? ORDER BY createdAt DESC").bind(userId).all()
  return (results as any[]).map(rowToRegistration)
}

export async function getRegistrationById(db: D1Database, id: string): Promise<Registration | undefined> {
  const row = await db.prepare("SELECT * FROM registrations WHERE id = ?").bind(id).first()
  return row ? rowToRegistration(row) : undefined
}

export async function createRegistration(db: D1Database, reg: Registration): Promise<void> {
  await db.prepare(
    `INSERT INTO registrations (id, userId, userEmail, userName, companyName, entityType, filingState,
     registeredAgent, einNeeded, boirNeeded, itinNeeded, mailForwarding, paymentMethod, totalAmount,
     phone, address, usCitizen, status, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    reg.id, reg.userId, reg.userEmail, reg.userName, reg.companyName, reg.entityType, reg.filingState,
    reg.registeredAgent, reg.einNeeded ? 1 : 0, reg.boirNeeded ? 1 : 0, reg.itinNeeded ? 1 : 0,
    reg.mailForwarding ? 1 : 0, reg.paymentMethod, reg.totalAmount,
    reg.phone, reg.address, reg.usCitizen ? 1 : 0, reg.status, reg.createdAt
  ).run()
}

export async function updateRegistrationStatus(
  db: D1Database,
  id: string,
  status: Registration["status"]
): Promise<void> {
  await db.prepare("UPDATE registrations SET status = ? WHERE id = ?").bind(status, id).run()
}
