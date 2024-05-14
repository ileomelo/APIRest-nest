import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PlayList } from './playlist.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  apiKey: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  phone: string;

  @OneToMany(() => PlayList, (playList) => playList.user)
  playList: PlayList;
}
