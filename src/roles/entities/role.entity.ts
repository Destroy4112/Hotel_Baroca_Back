import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'roles' })
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    descripcion: string;

    @OneToMany(() => Usuario, user => user.role)
    usuarios: Usuario[];

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
