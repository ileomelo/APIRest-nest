import { Body, Controller, Post } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlayListDTO } from './dto/create-playList.dto';
import { PlayList } from 'src/entities/playlist.entity';

@Controller('playlist')
export class PlaylistController {
  constructor(private playListService: PlaylistService) {}

  @Post()
  create(@Body() createPlayListDTO: CreatePlayListDTO): Promise<PlayList> {
    return this.playListService.create(createPlayListDTO);
  }
}
