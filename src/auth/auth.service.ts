import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDTO } from 'src/user/dto/login-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ArtistService } from 'src/artist/artist.service';
import { PayloadType } from './types/payload.type';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
    private artistService: ArtistService,
  ) {}

  async login(loginDTO: LoginUserDTO): Promise<{ accessToken: string }> {
    const user = await this.userService.findOne(loginDTO);

    const payload: PayloadType = { email: user.email, userId: user.id };

    const artist = await this.artistService.findArtist(user.id);

    if (artist) {
      payload.artistId = artist.id;
    }

    const passwordMatched = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );

    if (passwordMatched) {
      delete user.password;
      const payload = { email: user.email, userId: user.id };
      return { accessToken: this.jwtService.sign(payload) };
    } else {
      throw new UnauthorizedException('Password does not match');
    }
  }
}
