import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("notificaciones")
export class Notificacione {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    notificacion: string;
}
