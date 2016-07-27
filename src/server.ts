import * as Bunyan from "bunyan";
import * as Restify from "restify";
import {Routes} from "./routes";

let applicationName: string = "heroku-world";

let log: Bunyan.Logger = Bunyan.createLogger({
    name: applicationName,
});

let server: Restify.Server = Restify.createServer({
    log: log,
    name: applicationName,
    version: "0.0.1",
});

server.use(Restify.acceptParser(server.acceptable));
server.use(Restify.queryParser());
server.use(Restify.bodyParser());

// setup the logging.
interface IAuditLoggerOptions {
    body: boolean;
    log: Bunyan.Logger;
};

// log all requests.
server.on("after", Restify.auditLogger({
    body: true,
    log: log,
} as IAuditLoggerOptions));

let routes: Routes = new Routes();
routes.register(server);

server.listen(process.env.PORT || 3000, function(): any {
    log.info({ addr: server.address() }, "listening");
});
