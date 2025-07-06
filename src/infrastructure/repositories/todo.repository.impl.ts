import {
  CreateTodoDto,
  TodoDatasource,
  TodoEntity,
  TodoRepository,
  UpdateTodoDto,
} from '../../domain';

export class TodoRepositoryImpl implements TodoRepository {
  constructor(private readonly _todoDatasource: TodoDatasource) {}

  public create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this._todoDatasource.create(createTodoDto);
  }

  public getAll(): Promise<TodoEntity[]> {
    return this._todoDatasource.getAll();
  }

  public findById(id: number): Promise<TodoEntity> {
    return this._todoDatasource.findById(id);
  }

  public updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this._todoDatasource.updateById(updateTodoDto);
  }

  public deleteById(id: number): Promise<TodoEntity> {
    return this._todoDatasource.deleteById(id);
  }
}
