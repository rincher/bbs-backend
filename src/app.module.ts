import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/post.entity';
import { SecretsModule } from './secrets/secrets.module';
import { SecretsService } from './secrets/secrets.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [SecretsModule],
      inject: [SecretsService],
      useFactory: async (secretsService: SecretsService) => {
        const secretString = await secretsService.getSecret(
          'rds!db-33d0058b-facd-4121-a761-060e0022df25',
        ); // Replace with your Secrets Manager secret name
        const dbSecret = JSON.parse(secretString);
        return {
          type: 'mysql',
          host: 'bbs-db.c2b2wgk08yd3.us-east-1.rds.amazonaws.com',
          port: 3306,
          username: dbSecret.username,
          password: dbSecret.password,
          database: 'testdb', // Replace with your database name
          entities: [Post],
          synchronize: true, // Set to false in production
        };
      },
    }),
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
