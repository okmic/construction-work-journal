export interface IUser {
    _id: string
    role: "admin" | "user"
    name: string
    email: string
    psw?: string | null
    rate: "0" | "1" | "2" | "3" | "4"
}