import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// Swagger UI served at /docs. The assets come from a CDN so it also works on serverless hosts.
const CDN = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5';

export function setupDocs(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Tasks API')
    .setDescription('Create, list, update and delete tasks (NestJS + TypeORM + PostgreSQL).')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customCssUrl: `${CDN}/swagger-ui.css`,
    customJs: [`${CDN}/swagger-ui-bundle.js`, `${CDN}/swagger-ui-standalone-preset.js`],
  });
}
