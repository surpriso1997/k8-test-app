import { Exclude } from 'class-transformer';
import { Report } from 'src/reports/report.entity';
import { Role } from 'src/utils/roleConst';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  /// allowed roles: superadmin, admin, client
  @Column({ default: Role.admin })
  role: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];
}
