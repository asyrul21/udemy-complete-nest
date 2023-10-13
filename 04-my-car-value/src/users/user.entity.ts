import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// hooks
import { AfterInsert, AfterRemove, AfterUpdate } from 'typeorm';
import { OneToMany } from 'typeorm';
import { Report } from '../reports/report.entity';
// import { Exclude } from 'class-transformer'; // alternative

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  // @Exclude()
  password: string;

  @Column({ default: true }) // temporary
  admin: boolean;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id:', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated user with id:', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed user with id:', this.id);
  }
}
