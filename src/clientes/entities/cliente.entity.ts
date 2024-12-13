import { Preregistro } from "src/preregistros/entities/preregistro.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'clientes' })
export class Cliente {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    nombres: string;

    @Column({ nullable: false })
    apellidos: string;

    @Column({ nullable: false })
    tipo_documento: string;

    @Column({ nullable: false, unique: true })
    documento: string;

    @Column({ nullable: false })
    pais: string;

    @Column()
    departamento: string;

    @Column()
    ciudad: string;

    @Column()
    direccion: string;

    @Column({ nullable: false })
    telefono: string;

    @Column({ nullable: false })
    email: string;

    @Column()
    fecha_nacimiento: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: string;

    @UpdateDateColumn({ type: 'timestamp' })
    update_at: string;

    @OneToMany(() => Preregistro, preregistro => preregistro.cliente)
    preregistro: Preregistro[];
}
