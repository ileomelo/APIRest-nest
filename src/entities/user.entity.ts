import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PlayList } from './playlist.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => PlayList, (playList) => playList.user)
  playList: PlayList;
}
