import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto, RegisterDto } from 'src/user/dto/user.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.userService.register(
      registerDto.username,
      registerDto.password,
    );
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto.username, loginDto.password);
  }
}
