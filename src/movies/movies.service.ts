import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    try {
      const createdMovie = this.movieRepository.create({
        ...createMovieDto,
      });
      const savedMovie = await this.movieRepository.save(createdMovie);
      return savedMovie;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    const allMovies = await this.movieRepository.find({
      where: { isActive: true },
    });
    if (!allMovies || !allMovies.length)
      throw new NotFoundException('No hay películas registradas');

    return allMovies;
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
