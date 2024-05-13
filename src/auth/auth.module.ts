import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './auth.constants';
import { JWTStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ArtistModule } from 'src/artist/artist.module';
import { ApiKeyStrategy } from './strategies/apiKey.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    ArtistModule,
    JwtModule.register({
      secret: authConstants.secret,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  providers: [AuthService, JWTStrategy, ApiKeyStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
