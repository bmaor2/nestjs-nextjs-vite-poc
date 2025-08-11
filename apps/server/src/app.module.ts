import { Module } from '@nestjs/common';
import { TRPCModule } from 'nestjs-trpc';
import { TodoModule } from './todos/todo.module';

@Module({
  imports: [
    TRPCModule.forRoot({
      autoSchemaFile: '../../packages/trpc/src/server',
    }),
    TodoModule,
  ],
})
export class AppModule {}
