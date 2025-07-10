import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { compareSync } from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginData: LoginDto) {
    const { email, password } = loginData;
    const user = await this.userService.findOneByEmail(email);

    const validPassword = compareSync(password, user.password);

    if (!validPassword)
      throw new UnauthorizedException('Las claves no son válidas');

    const { password: UserPassword, ...userData } = user;

    return { ...userData, token: this.getJwt({ id: userData.id }) };
  }

  private getJwt(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
