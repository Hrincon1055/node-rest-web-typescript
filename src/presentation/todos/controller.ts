import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';

export class TodosController {
  constructor() {}

  public getTodos = async (req: Request, res: Response): Promise<void> => {
    const todos = await prisma.todo.findMany();
    res.json(todos);
    return;
  };

  public getTodoById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const id = +req.params.id;
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID format' });
      return;
    }
    const todo = await prisma.todo.findFirst({
      where: {
        id,
      },
    });

    if (!todo) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }
    res.status(200).json(todo);
    return;
  };

  public createTodo = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body || {});
    if (error || !createTodoDto) {
      res.status(400).json({ error });
    }
    const todo = await prisma.todo.create({
      data: createTodoDto!,
    });
    res.status(201).json(todo);
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
    const todo = await prisma.todo.findFirst({
      where: {
        id,
      },
    });
    if (!todo) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }
    const updateTodo = await prisma.todo.update({
      where: { id },
      data: updateTodoDto!.values,
    });
    res.status(200).json(updateTodo);
    return;
  };

  public deleteTodo = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const id = +req.params.id;
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID format' });
      return;
    }
    const todo = await prisma.todo.findFirst({
      where: {
        id,
      },
    });

    if (!todo) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }
    const todoDeleted = await prisma.todo.delete({
      where: { id },
    });
    todoDeleted
      ? res.status(200).json(todoDeleted)
      : res.status(404).json({ error: 'Todo not found' });
    return;
  };
}
