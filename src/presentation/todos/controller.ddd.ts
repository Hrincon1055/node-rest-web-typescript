import { Request, Response } from 'express';
import { TodoRepository } from '../../domain';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';

export class TodosController {
  constructor(private readonly _todoRepository: TodoRepository) {}

  public getTodos = async (req: Request, res: Response): Promise<void> => {
    const todos = await this._todoRepository.getAll();
    res.json(todos);
    return;
  };

  public getTodoById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const id = +req.params.id;
    try {
      const todo = await this._todoRepository.findById(id);
      res.status(200).json(todo);
      return;
    } catch (error) {
      res.status(400).json({ error });
      return;
    }
  };

  public createTodo = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body || {});
    if (error || !createTodoDto) {
      res.status(400).json({ error });
      return;
    }
    const todo = await this._todoRepository.create(createTodoDto);
    res.status(201).json(todo);
    return;
  };

  public updateTodo = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({
      ...req.body,
      id,
    });
    if (error) {
      res.status(400).json({ error });
      return;
    }
    const updateTodo = await this._todoRepository.updateById(
      updateTodoDto!
    );
    res.status(200).json(updateTodo);
    return;
  };

  public deleteTodo = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const id = +req.params.id;
    const todoDeleted = await this._todoRepository.deleteById(id);
    res.status(200).json(todoDeleted);
    return;
  };
}
