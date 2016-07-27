/**
 *   routes.ts
 *   Copyright (c) 345 Systems LLP 2016, all rights reserved.
 */
import * as Restify from "restify";

/**
 *   class Routes
 *   Configures the routes available for users REST calls.
 */
export class Routes {

    // registers the routes.
    public register(server: Restify.Server): void {
      server.get("/", this.herokuWorld);
    }

// a dummy method to plug into a dummy unit test.
    public getMessage(): string {
      return "Heroku World";
    }

    // registers the signup route.
    private async herokuWorld(req: Restify.Request, res: Restify.Response, next: Restify.Next): Promise<Restify.Next> {
        res.send("Heroku World");
        res.status(200);
        return next();
    }
}
