import { Empleado } from "src/empleados/entities/empleado.entity";
import { Role } from "src/roles/entities/role.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'usuarios' })
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    documento: string;

    @Column({ nullable: false })
    password: string;

    @ManyToOne(() => Role, rol => rol.usuarios, { nullable: false })
    @JoinColumn({ name: 'rol_id' })
    role: Role;

    @OneToOne(() => Empleado, (empleado) => empleado.usuario_id, { eager: true })
    empleado: Empleado;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

}
