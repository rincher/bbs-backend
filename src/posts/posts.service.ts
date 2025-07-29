import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  findOne(id: number): Promise<Post | null> {
    return this.postsRepository.findOneBy({ id });
  }

  create(post: Post): Promise<Post> {
    return this.postsRepository.save(post);
  }

  async update(id: number, post: Post): Promise<void> {
    await this.postsRepository.update(id, post);
  }

  async remove(id: number): Promise<void> {
    await this.postsRepository.delete(id);
  }
}
