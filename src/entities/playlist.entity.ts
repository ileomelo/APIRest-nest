import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Song } from './songs.entity';
import { User } from './user.entity';

@Entity('playlists')
export class PlayList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Song, (song) => song.playList)
  songs: Song[];

  @ManyToOne(() => User, (user) => user.playList)
  user: User;
}
