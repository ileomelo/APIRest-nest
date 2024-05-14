import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { LoginUserDTO } from 'src/user/dto/login-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { v4 as uuid4 } from 'uuid';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async signup(@Body() userDTO: CreateUserDTO): Promise<User> {
    const user = new User();
    user.apiKey = uuid4();
    user.firstName = userDTO.firstName;
    user.lastName = userDTO.lastName;
    user.email = userDTO.email;
    user.password = userDTO.password;

    const savedUser = await this.userService.create(user);

    delete savedUser.password;

    return savedUser;
  }

  @Post('login')
  signIn(@Body() loginDTO: LoginUserDTO) {
    return this.authService.login(loginDTO);
  }

  @Get('test')
  testEnv() {
    return this.authService.getEnvVariables();
  }
}
