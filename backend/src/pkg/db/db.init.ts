import DatabaseService from "./db.service"

export async function initializeDatabase() {
  await DatabaseService.connect()
}