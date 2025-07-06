import { TodoEntity } from '../../entities/todo.entity';
import { TodoRepository } from '../../repositories/todo.repository';

export interface IGetTodosUseCase {
  execute(): Promise<TodoEntity[]>;
}

export class GetTodosUseCase implements IGetTodosUseCase {
  constructor(private readonly _todoRepository: TodoRepository) {}
  execute(): Promise<TodoEntity[]> {
    return this._todoRepository.getAll();
  }
}
