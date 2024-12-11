import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { CfnInstanceStorageConfig } from "aws-cdk-lib/aws-connect";
import { CodeSigningConfig } from "aws-cdk-lib/aws-lambda";
import { prependListener } from "process";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    }),
  Empleado: a
    .model({
      tipoDocumento: a.enum(["CEDULA_CIUDADANIA", "CEDULA_EXTRANJERIA", "OTRA"]),
      numeroDocumento: a.id().required(),
      nombre: a.string(),
      email: a.email(),
      tipoForm: a.enum(["A","B"]),
      empresaId: a.id(),
      empresa: a.belongsTo("Empresa","empresaId") 
    }).identifier(["numeroDocumento"]),
  Empresa: a
    .model({
      empleados: a.hasMany("Empleado","empresaId"),
      sede: a.hasMany("Sedes","empresaId"),
      nit: a.id().required(),
      nombre: a.string(),
      plan: a.enum(["BASICO","PREMIUM"]),
    }).identifier(["nit"]),
  Sedes: a
    .model({
      citas: a.hasMany("Citas","sedeId"),
      nombre: a.string(),
      direccion: a.string(),
      empresaId: a.id(),
      empresa: a.belongsTo("Empresa","empresaId"),
      idsedes: a.id().required(),
    }).identifier(["idsedes"]),
  Citas: a
    .model({
      fecha: a.date(),
      estado: a.enum(["ACTIVA","DESACTIVADA"]),
      otp: a.id().required(),
      sedeId: a.id(),
      sede: a.belongsTo("Sedes","sedeId"),
      contadorFormularios: a.float().default(0),
      contadorCitas: a.float().default(0),
      formulario: a.hasMany("Formulario","citaId")
    }).identifier(["otp"]),
  Formulario: a
    .model({
      citaId: a.id(),
      cita: a.belongsTo("Citas","citaId"),
      documento: a.id().required(),
      preguntasBasicas: a.customType({
        nombre: a.string(),
        tipo: a.enum(["text","number","date"]),
      }),
      preguntasA: a.customType({
        nombre: a.string(),
        tipo: a.enum(["text","number","date"]),
      }),
      preguntasB: a.customType({
        nombre: a.string(),
        tipo: a.enum(["text","number","date"]),
      }),
      preguntasExtralaboral: a.customType({
        nombre: a.string(),
        tipo: a.enum(["text","number","date"]),
      }),
      preguntasEstres: a.customType({
        nombre: a.string(),
        tipo: a.enum(["text","number","date"]),
      }),
    }).secondaryIndexes((index) => [index("documento").queryField("listarFormPorDocumento")])
}).authorization((allow) => [allow.publicApiKey()]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
