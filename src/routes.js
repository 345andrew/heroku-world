"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var Routes = (function () {
    function Routes() {
    }
    Routes.prototype.register = function (server) {
        server.get("/", this.herokuWorld);
    };
    Routes.prototype.getMessage = function () {
        return "Heroku World";
    };
    Routes.prototype.herokuWorld = function (req, res, next) {
        return __awaiter(this, void 0, Promise, function* () {
            res.send("Heroku World");
            res.status(200);
            return next();
        });
    };
    return Routes;
}());
exports.Routes = Routes;
