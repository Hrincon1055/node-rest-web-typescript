import { UpdateTodoDto } from '../../dtos';
import { TodoEntity } from '../../entities/todo.entity';
import { TodoRepository } from '../../repositories/todo.repository';

export interface IUpdateTodoUseCase {
  execute(dto: UpdateTodoDto): Promise<TodoEntity>;
}

export class UpdateTodoUseCase implements IUpdateTodoUseCase {
  constructor(private readonly _todoRepository: TodoRepository) {}
  execute(dto: UpdateTodoDto): Promise<TodoEntity> {
    return this._todoRepository.updateById(dto);
  }
}
