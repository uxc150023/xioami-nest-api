import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column({ length: 255 })
  username: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 255 })
  mobile: string;

  @Column({ length: 255 })
  email: string;

  @Column({ default: () => 1 })
  status: number;

  @Column({ default: () => 1 })
  role_id: number;

  @Column()
  is_super: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  add_time: Date;
}
