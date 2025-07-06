import { Request, Response } from 'express';
import {
  CreateTodoUseCase,
  DeleteTodoUseCase,
  GetTodosUseCase,
  GetTodoUseCase,
  TodoRepository,
  UpdateTodoUseCase,
} from '../../domain';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';

export class TodosController {
  constructor(private readonly _todoRepository: TodoRepository) {}

  public getTodos = (req: Request, res: Response): void => {
    new GetTodosUseCase(this._todoRepository)
      .execute()
      .then((todos) => res.status(200).json(todos))
      .catch((error) => res.status(400).json({ error }));
  };

  public getTodoById = (req: Request, res: Response): void => {
    const id = +req.params.id;
    new GetTodoUseCase(this._todoRepository)
      .execute(id)
      .then((todo) => res.status(200).json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  public createTodo = (req: Request, res: Response): void => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body || {});
    if (error || !createTodoDto) {
      res.status(400).json({ error });
      return;
    }
    new CreateTodoUseCase(this._todoRepository)
      .execute(createTodoDto)
      .then((todo) => res.status(201).json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  public updateTodo = (req: Request, res: Response): void => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({
      ...req.body,
      id,
    });
    if (error || !updateTodoDto) {
      res.status(400).json({ error });
      return;
    }
    new UpdateTodoUseCase(this._todoRepository)
      .execute(updateTodoDto)
      .then((todo) => res.status(200).json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  public deleteTodo = (req: Request, res: Response): void => {
    const id = +req.params.id;
    new DeleteTodoUseCase(this._todoRepository)
      .execute(id)
      .then((todo) => res.status(200).json(todo))
      .catch((error) => res.status(400).json({ error }));
  };
}
