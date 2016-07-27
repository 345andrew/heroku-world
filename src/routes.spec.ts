/**
 *   routes.spec.ts
 *   Copyright (c) 345 Systems LLP 2016, all rights reserved.
 */
import {Routes} from "./routes";

describe("Routes unit tests", function(): void {
    it("message should be correct", function(): void {
        let routes: Routes = new Routes();

        let message: string = routes.getMessage();

        expect(message).toEqual("Heroku World");
    });
  });
