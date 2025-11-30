import { Request, Response } from 'express';
import { LoginUser } from '../../../application/use-cases/auth/login-user';

export class AuthController {
    constructor(private readonly loginUser: LoginUser) {}

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body;
            const token = await this.loginUser.execute(username, password);

            if (token) {
                res.status(200).json({ token });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error: any) {
            // Manejar error de acceso denegado (403)
            if (error.message && error.message.includes('Acceso denegado')) {
                res.status(403).json({ message: 'Acceso denegado: Solo administradores' });
            } else {
                res.status(500).json({ message: 'Error logging in', error: error.message });
            }
        }
    }
}
