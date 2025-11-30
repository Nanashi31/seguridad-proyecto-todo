import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Usuario } from '../../../domain/usuario/usuario';
import { UsuarioRepository } from '../../ports/usuario/usuario.repository';
import { RolRepository } from '../../ports/rol/rol.repository';

export class LoginUser {
    constructor(
        private readonly usuarioRepository: UsuarioRepository,
        private readonly rolRepository: RolRepository
    ) {}

    async execute(username: string, password: string): Promise<string | null> {
        const user = await this.usuarioRepository.findByUsername(username);

        if (!user) {
            return null;
        }

        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatch) {
            return null;
        }

        // Obtener el rol del usuario para validar que sea admin
        const rol = await this.rolRepository.findById(user.id_rol);

        if (!rol || rol.nombre_rol.toLowerCase() !== 'admin') {
            throw new Error('Acceso denegado: Solo administradores');
        }

        const token = jwt.sign({ id: user.id_usuario, username: user.username }, 'your-secret-key', {
            expiresIn: '1h',
        });

        return token;
    }
}
