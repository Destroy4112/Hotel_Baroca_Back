import { Cliente } from "src/clientes/entities/cliente.entity";
import { Espacio } from "src/espacios/entities/espacio.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "preregistros" })
export class Preregistro {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    fecha_ingreso: string;

    @Column({ nullable: true })
    fecha_salida: string;

    @Column({ nullable: false })
    tipo_habitacion: string;

    @ManyToOne(() => Cliente, (cliente) => cliente.preregistro, { nullable: false })
    @JoinColumn({ name: 'cliente_id' })
    cliente: Cliente;

    @ManyToOne(() => Espacio, (espacio) => espacio.preregistro, { nullable: false })
    @JoinColumn({ name: 'espacio_id' })
    espacio: Espacio;

    @Column({ nullable: true })
    observacion: string;

    @Column({ default: 'En proceso' })
    estado: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: string;

    @UpdateDateColumn({ type: 'timestamp' })
    update_at: string;
}
