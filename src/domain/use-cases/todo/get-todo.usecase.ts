import { TodoEntity } from '../../entities/todo.entity';
import { TodoRepository } from '../../repositories/todo.repository';

export interface IGetTodoUseCase {
  execute(id: number): Promise<TodoEntity>;
}

export class GetTodoUseCase implements IGetTodoUseCase {
  constructor(private readonly _todoRepository: TodoRepository) {}
  execute(id: number): Promise<TodoEntity> {
    return this._todoRepository.findById(id);
  }
}
