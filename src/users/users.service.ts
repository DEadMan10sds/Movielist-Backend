import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const password = hashSync(createUserDto.password, 10);
      const newUser = this.userRepository.create({
        ...createUserDto,
        password,
      });

      const savedUser = await this.userRepository.save(newUser);

      return savedUser;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    const existsUser = await this.userRepository.findOne({
      where: { email, isActive: true },
      select: { id: true, password: true },
    });
    if (!existsUser)
      throw new NotFoundException('No existe usuario con este E-mail');

    return existsUser;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException('No existe el usuario');

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
