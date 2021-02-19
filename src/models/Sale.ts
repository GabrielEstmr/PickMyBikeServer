import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import User from './User';

@Entity('sales')
class Sale {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    //@Column(): default = varchar = string
    @Column()
    provider_id: string;

    @ManyToOne(() => User)//Aqui fica salvo objeto que é do tipo User
    @JoinColumn({ name: 'provider_id' })
    provider: User;

    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}


export default Sale;