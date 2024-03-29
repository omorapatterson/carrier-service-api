import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToOne,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Order } from '../order/order.entity';

@Entity()
export class Manifest {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    clientRut?: string;

    @Column()
    manifestNumber?: string;

    @Column()
    productName?: string;

    @Column()
    trackingReference?: string;

    @Column()
    packagesCount?: number;

    @Column()
    barCode?: string;

    @Column()
    expNumber?: string;

    @Column({ nullable: true })
    admissionCode?: string;

    @Column()
    createdAt?: Date;

    @Column()
    updatedAt?: Date;

    @OneToOne(() => Order, order => order.manifest, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
    order: Order;
}
