import { Preregistro } from "src/preregistros/entities/preregistro.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('espacios')
export class Espacio {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    descripcion: string;

    @Column({ nullable: false })
    tipo_espacio: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    update_at: Date;

    @OneToMany(() => Preregistro, preregistro => preregistro.espacio)
    preregistro: Preregistro;
}
