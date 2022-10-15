import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Token Vote API')
    .setDescription('API of voting')
    .setVersion('1.0')
    .addTag('Vote')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api_doc', app, document);

  await app.listen(3000);
}
bootstrap();
