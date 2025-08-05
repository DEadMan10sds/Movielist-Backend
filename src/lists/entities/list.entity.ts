import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'List' })
export class List {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;
}
