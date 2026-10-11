import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TasksModule,
    TypeOrmModule.forRoot(
      process.env.DATABASE_URL
        ? {
            // Hosted Postgres (Neon, Vercel): single connection string, SSL, small pool for serverless
            type: "postgres",
            url: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false },
            extra: { max: 5 },
            entities: [__dirname + "/**/*.entity{.ts,.js}"],
            synchronize: true,
          }
        : {
            type: process.env.DB_TYPE as any,
            host: process.env.PG_HOST,
            port: parseInt(process.env.PG_PORT),
            username: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            database: process.env.PG_DB,
            entities: [__dirname + "/**/*.entity{.ts,.js}"],
            synchronize: true,
          },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
