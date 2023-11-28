import Jwt from 'jsonwebtoken'

export function generateToken(id: string, name: string, email?: string) {
    const payload: Object = { id, name, email }
    const token: string = Jwt.sign(payload, process.env.SECRET || '', { expiresIn: '100000m' })
    return token
}