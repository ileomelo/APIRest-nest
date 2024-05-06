import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayList } from 'src/entities/playlist.entity';
import { Song } from 'src/entities/songs.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlayList, Song, User])],
  providers: [PlaylistService],
  controllers: [PlaylistController],
})
export class PlaylistModule {}
