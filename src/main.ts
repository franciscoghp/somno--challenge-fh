import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupDocs } from './setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupDocs(app);
  await app.listen(3000);
}
bootstrap();
