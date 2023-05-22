import pgp from "pg-promise";
import pg from "pg-promise/typescript/pg-subset.js";
declare global {
  var db: pgp.IConnected<{}, pg.IClient>;
}