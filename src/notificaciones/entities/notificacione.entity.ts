import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("notificaciones")
export class Notificacione {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    usuario: string;

    @Column({ nullable: false })
    notificacion: string;

    @Column({ default: false })
    leido: boolean;

    @CreateDateColumn()
    fechaCreacion: Date;
}
