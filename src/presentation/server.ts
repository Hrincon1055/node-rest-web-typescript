import compression from 'compression';
import express, { Router } from 'express';
import path from 'path';
interface Options {
  port: number;
  router: Router;
  public_path?: string;
}
export class Server {
  private _app = express();
  private readonly _port: number;
  private readonly _publicPath: string;
  private readonly _routes: Router;

  constructor(options: Options) {
    const { port, router, public_path = 'public' } = options;
    this._port = port;
    this._publicPath = public_path;
    this._routes = router;
  }

  public async start(): Promise<void> {
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: true }));
    this._app.use(compression());
    this._app.use(express.static(this._publicPath));
    this._app.use(this._routes);
    this._app.get('/{*splat}', (req, res) => {
      const indexPath = path.join(
        __dirname + `../../../${this._publicPath}/index.html`
      );
      res.sendFile(indexPath);
    });
    this._app.listen(this._port, () => {
      console.log(`Server is running on port ${this._port}`);
    });
  }
}
