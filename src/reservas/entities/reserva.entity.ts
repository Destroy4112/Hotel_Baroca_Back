import { Habitacione } from "src/habitaciones/entities/habitacione.entity";
import { Preregistro } from "src/preregistros/entities/preregistro.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "reservas" })
export class Reserva {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    ciudad_procedencia: string;

    @Column({ nullable: false })
    ciudad_destino: string;

    @Column({ nullable: false })
    transporte: string;

    @Column({ nullable: false })
    motivo_viaje: string;

    @ManyToOne(() => Habitacione, (habitacion) => habitacion.reserva, { nullable: false })
    @JoinColumn({ name: 'habitacion_id' })
    habitacion: Habitacione;

    @OneToOne(() => Preregistro, preregistro => preregistro.reserva, { nullable: false })
    @JoinColumn({ name: 'preregistro_id' })
    preregistro: Preregistro;

    @Column({ nullable: false })
    noches: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: string;

    @UpdateDateColumn({ type: 'timestamp' })
    update_at: string;
}
