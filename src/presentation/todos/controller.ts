import { Request, Response } from 'express';
const todos: {
  id: number;
  text: string;
  completedAt: Date | null;
}[] = [
  { id: 1, text: 'Learn TypeScript', completedAt: new Date() },
  { id: 2, text: 'Build a web app', completedAt: new Date() },
];
export class TodosController {
  constructor() {}

  public getTodos = (req: Request, res: Response): void => {
    res.json(todos);
    return;
  };

  public getTodoById = (req: Request, res: Response): void => {
    const id = +req.params.id;
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID format' });
      return;
    }
    const todo = todos.find((t) => t.id === id);
    if (!todo) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }
    res.status(200).json(todo);
    return;
  };

  public createTodo = (req: Request, res: Response): void => {
    const { text } = req.body;
    if (!text || typeof text !== 'string') {
      res
        .status(400)
        .json({ error: 'Text is required and must be a string' });
      return;
    }
    const newTodo = {
      id: todos.length + 1,
      text,
      completedAt: null,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
    return;
  };

  public updateTodo = (req: Request, res: Response): void => {
    const id = +req.params.id;
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID format' });
      return;
    }
    const todo = todos.find((t) => t.id === id);
    if (!todo) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }
    const { text, completedAt } = req.body;
    todo.text = text || todo.text;
    completedAt === null
      ? (todo.completedAt = null)
      : (todo.completedAt = new Date(completedAt || todo.completedAt));
    res.status(200).json(todo);
    return;
  };

  public deleteTodo = (req: Request, res: Response): void => {
    const id = +req.params.id;
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID format' });
      return;
    }
    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }
    todos.splice(index, 1);
    res.status(204).send();
    return;
  };
}
