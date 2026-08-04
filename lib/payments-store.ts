export interface CheckoutRecord {
  id: string
  invoiceNumber: string
  method: string
  amount: number
  email: string
  customerName: string
  status: string
  createdAt: string
}

export async function createCheckout(db: D1Database, record: CheckoutRecord) {
  await db
    .prepare(
      `INSERT INTO checkouts (id, invoice_number, method, amount, email, customer_name, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      record.id,
      record.invoiceNumber,
      record.method,
      record.amount,
      record.email,
      record.customerName,
      record.status,
      record.createdAt
    )
    .run()
}