import fs from "fs"
import path from "path"

const DATA_DIR = path.join(process.cwd(), "data")

let usersCache: User[] | null = null
let registrationsCache: Registration[] | null = null
let lastUsersRead = 0
let lastRegistrationsRead = 0
const CACHE_TTL = 2000

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
}

function readJSON<T>(filename: string, fallback: T): T {
  ensureDataDir()
  const fp = path.join(DATA_DIR, filename)
  if (!fs.existsSync(fp)) return fallback
  try {
    return JSON.parse(fs.readFileSync(fp, "utf-8")) as T
  } catch {
    return fallback
  }
}

function writeJSON<T>(filename: string, data: T) {
  ensureDataDir()
  fs.writeFileSync(path.join(DATA_DIR, filename), JSON.stringify(data, null, 2))
}

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

export function getUsers(): User[] {
  const now = Date.now()
  if (usersCache && now - lastUsersRead < CACHE_TTL) return usersCache
  usersCache = readJSON<User[]>("users.json", [])
  lastUsersRead = now
  return usersCache
}

export function getUserByEmail(email: string): User | undefined {
  return getUsers().find((u) => u.email === email)
}

export function getUserById(id: string): User | undefined {
  return getUsers().find((u) => u.id === id)
}

export function createUser(user: User): void {
  const users = getUsers()
  users.push(user)
  writeJSON("users.json", users)
  usersCache = users
  lastUsersRead = Date.now()
}

export function getRegistrations(): Registration[] {
  const now = Date.now()
  if (registrationsCache && now - lastRegistrationsRead < CACHE_TTL) return registrationsCache
  registrationsCache = readJSON<Registration[]>("registrations.json", [])
  lastRegistrationsRead = now
  return registrationsCache
}

export function getRegistrationsByUser(userId: string): Registration[] {
  return getRegistrations().filter((r) => r.userId === userId)
}

export function getRegistrationById(id: string): Registration | undefined {
  return getRegistrations().find((r) => r.id === id)
}

export function createRegistration(reg: Registration): void {
  const all = getRegistrations()
  all.push(reg)
  writeJSON("registrations.json", all)
  registrationsCache = all
  lastRegistrationsRead = Date.now()
}

export function updateRegistrationStatus(
  id: string,
  status: Registration["status"]
): void {
  const all = getRegistrations()
  const idx = all.findIndex((r) => r.id === id)
  if (idx !== -1) {
    all[idx].status = status
    writeJSON("registrations.json", all)
    registrationsCache = all
    lastRegistrationsRead = Date.now()
  }
}