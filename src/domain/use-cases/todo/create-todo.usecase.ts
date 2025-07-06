import { CreateTodoDto } from '../../dtos';
import { TodoEntity } from '../../entities/todo.entity';
import { TodoRepository } from '../../repositories/todo.repository';

export interface ICreateTodoUseCase {
  execute(dto: CreateTodoDto): Promise<TodoEntity>;
}

export class CreateTodoUseCase implements ICreateTodoUseCase {
  constructor(private readonly _todoRepository: TodoRepository) {}
  execute(dto: CreateTodoDto): Promise<TodoEntity> {
    return this._todoRepository.create(dto);
  }
}
