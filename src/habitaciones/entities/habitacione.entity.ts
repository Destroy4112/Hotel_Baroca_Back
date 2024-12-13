import { Espacio } from "src/espacios/entities/espacio.entity";
import { Reserva } from "src/reservas/entities/reserva.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('habitaciones')
export class Habitacione {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    nombre_habitacion: string;

    @Column({ nullable: false })
    descripcion_habitacion: string;

    @Column({ nullable: false })
    numero_habitacion: number;

    @Column({ nullable: false })
    capacidad_habitacion: number;

    @Column({ nullable: false })
    precio_habitacion: string;

    @Column({ nullable: false })
    tipo_habitacion: string;

    @Column({ nullable: false })
    piso: number;

    @Column({ default: 'Disponible' })
    disponibilidad: string;

    @ManyToOne(() => Espacio, (espacio) => espacio.habitacion, { nullable: false })
    @JoinColumn({ name: 'espacio_id' })
    espacio: Espacio;

    @Column({ default: 'Limpia' })
    estado: string;

    @Column({ nullable: false })
    ventana: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: string;

    @UpdateDateColumn({ type: 'timestamp' })
    update_at: string;

    @OneToMany(() => Reserva, reserva => reserva.habitacion)
    reserva: Reserva[];
}
