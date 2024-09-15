import { Module } from '@nestjs/common';

import { LangchainModule } from '../langchain/langchain.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { EventsModule } from '../events/events.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from 'src/config/app.config';
import databaseConfig from 'src/config/database.config';
import environmentValidation from '../../config/environment.validation';

// Get the current NODE_ENV
const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    LangchainModule,
    UserModule,
    AuthModule,
    EventsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      //envFilePath: ['.env.development', '.env'],
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig, databaseConfig],
      validationSchema: environmentValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        //entities: [User],
        synchronize: configService.get('database.synchronize'),
        port: configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        host: configService.get('database.host'),
        autoLoadEntities: configService.get('database.autoLoadEntities'),
        database: configService.get('database.name'),
      }),
    }),
  ],
})
export class AppModule {}
