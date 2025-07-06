import { TodoEntity } from '../../entities/todo.entity';
import { TodoRepository } from '../../repositories/todo.repository';

export interface IDeleteTodoUseCase {
  execute(id: number): Promise<TodoEntity>;
}

export class DeleteTodoUseCase implements IDeleteTodoUseCase {
  constructor(private readonly _todoRepository: TodoRepository) {}
  execute(id: number): Promise<TodoEntity> {
    return this._todoRepository.deleteById(id);
  }
}
