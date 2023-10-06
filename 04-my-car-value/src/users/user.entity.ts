import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// hooks
import { AfterInsert, AfterRemove, AfterUpdate } from 'typeorm';
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