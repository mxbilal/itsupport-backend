import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('services')
export class ServiceEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ name: 'serviceCode', type: 'varchar', length: 50, nullable: false })
  code: string;

  @Column({ type: 'integer', default: 0, nullable: false })
  serviceType: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdOn: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastModifiedOn: Date;

  @Column({ type: 'integer', nullable: true })
  srNo: number;
}
