import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true });
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true }),
  );
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
  await app.listen(port);
  console.log(`Stall API running on http://localhost:${port}`);
}
bootstrap();
