import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Movies' })
export class Movie {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text', { nullable: true })
  image: string;

  @Column('text', { unique: true })
  name: string;

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.Movies)
  User: User;
}
