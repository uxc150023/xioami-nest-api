import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 255 })
  description: string;

  @Column({ default: () => 1 })
  status: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  add_time: Date;
}
