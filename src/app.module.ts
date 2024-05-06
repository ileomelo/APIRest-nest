import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerModule } from './common/middleware/logger/logger.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './entities/songs.entity';
import { User } from './entities/user.entity';
import { Artist } from './entities/artist.entity';
import { PlaylistModule } from './playlist/playlist.module';
import { PlayList } from './entities/playlist.entity';

@Module({
  imports: [
    SongsModule,
    LoggerModule,
    PlaylistModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'n-test',
      entities: [Song, User, Artist, PlayList],
      synchronize: true,
    }),
  ],
  controllers: [AppController, SongsController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(SongsController);
  }
  constructor(private dataSource: DataSource) {
    console.log(dataSource.driver.database);
  }
}
