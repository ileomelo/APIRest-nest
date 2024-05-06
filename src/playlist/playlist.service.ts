import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayList } from 'src/entities/playlist.entity';
import { Song } from 'src/entities/songs.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePlayListDTO } from './dto/create-playList.dto';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(PlayList)
    private playListRepository: Repository<PlayList>,

    @InjectRepository(Song)
    private songRepository: Repository<Song>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(playlistDTO: CreatePlayListDTO): Promise<PlayList> {
    const playList = new PlayList();
    playList.name = playlistDTO.name;

    // songs will be the array od IDs that we are getting from the DTO object
    const songs = await this.songRepository.findByIds(playlistDTO.songs);
    // Set the relation for the songs with playlist entity
    playList.songs = songs;

    const user = await this.userRepository.findOneBy({ id: playlistDTO.user });
    playList.user = user;

    return this.playListRepository.save(playList);
  }
}
