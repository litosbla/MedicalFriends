import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
// import { CfnInstanceStorageConfig } from "aws-cdk-lib/aws-connect";
// import { CfnOrganizationAdmin } from "aws-cdk-lib/aws-detective";
// import { CodeSigningConfig } from "aws-cdk-lib/aws-lambda";
// import { prependListener } from "process";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Empleado: a
    .model({
      tipoDocumento: a.enum(["CEDULA_CIUDADANIA", "CEDULA_EXTRANJERIA", "OTRA"]),
      numeroDocumento: a.id().required(),
      nombre: a.string(),
      email: a.email(),
      tipoForm: a.enum(["A","B"]),
      empresaId: a.id(),
      empresa: a.belongsTo("Empresa","empresaId"),
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
      formularioPersonales: a.hasMany("FormularioPersonales","citaId"),
      formularioIntralaboralA: a.hasMany("FormularioIntralaboralA","citaIdIntraA"),
      formularioIntralaboralB: a.hasMany("FormularioIntralaboralB","citaIdIntraB"),
      formularioExtralaboral: a.hasMany("FormularioExtralaboral","citaIdExtra"),
      formularioEstres: a.hasMany("FormularioEstres","citaIdEstres")
    }).identifier(["otp"]),
    FormularioPersonales: a
      .model({
        citaId: a.id().required(),
        cita: a.belongsTo("Citas","citaId"),
        documento: a.id(),
        formularioId: a.id().required(),
        sexo: a.enum(["Masculino", "Femenino"]),
        anoNacimiento: a.string(),
        estadoCivil: a.enum([
          "Soltero",
          "Casado",
          "Ul",
          "Separado",
          "Divorciado",
          "Viudo",
          "Credo"
        ]),
        nivelEstudios: a.enum([
          "Ninguno",
          "Primaria_incompleta",
          "Primaria_completa", 
          "Bachillerato_incompleto",
          "Bachillerato_completo",
          "Tecnico_tecnologico_incompleto",
          "Tecnico_tecnologico_completo",
          "Profesional_incompleto",
          "Profesional_completo",
          "Carrera_militar_policia",
          "Post_grado_incompleto",
          "Post_grado_completo"
        ]),
        ocupacion: a.string(),
        lugarResidencia: a.customType({
          ciudad: a.string(),
          departamento: a.string()
        }),
        estrato: a.enum(["ESTRATO_1", "ESTRATO_2", "ESTRATO_3", "ESTRATO_4", "ESTRATO_5", "ESTRATO_6", "FINCA", "NO_SE"]),
        tipoVivienda: a.enum(["Propia", "Arriendo", "Familiar"]),
        personasACargo: a.string(),
        lugarTrabajo: a.customType({
          ciudad: a.string(),
          departamento: a.string()
        }),
        antiguedadEmpresa: a.customType({
          menosDeUnAno: a.boolean(),
          anos: a.string()
        }),
        cargo: a.string(),
        tipoCargo: a.enum([
          "Jefatura",
          "ProfesionalAnalistaTecnicoTecnologo",
          "AuxiliarAsistente",
          "OperarioServiciosGenerales"
        ]),
        antiguedadCargo: a.customType({
          menosDeUnAno: a.boolean(),
          anos: a.string()
        }),
        departamentoEmpresa: a.string(),
        tipoContrato: a.enum([
          "Temporalless1",
          "Temporalmore1",
          "Tindefinido",
          "Cooperado",
          "Ops",
          "Nose"
        ]),
        horasDiarias: a.string(),
        tipoSalario: a.enum([
          "Fijo",
          "Mixto",
          "Variable"
        ])
      }).identifier(["formularioId"]),
    FormularioIntralaboralA: a
      .model({
        formularioId: a.id().required(),
        citaIdIntraA: a.id().required(),
        cita: a.belongsTo("Citas","citaIdIntraA"),
        documento: a.id().required(),
        controlSobreTrabajo: a.customType({
          nivelRiesgo: a.string(),
          puntajeTransformado: a.float(),
          puntajeBruto: a.float(),
          dimensiones: a.customType({
            capacitacionEntrenamiento: a.customType({
              nivelRiesgo: a.string(),
              puntajeTransformado: a.float(),
              puntajeBruto: a.float(),
            }),
            claridadRol: a.customType({
              nivelRiesgo: a.string(),
              puntajeTransformado: a.float(),
              puntajeBruto: a.float(),
            }),
            controlAutonomia: a.customType({
              nivelRiesgo: a.string(),
              puntajeTransformado: a.float(),
              puntajeBruto: a.float(),
            }),
            oportunidadesDesarrollo: a.customType({
              nivelRiesgo: a.string(),
              puntajeTransformado: a.float(),
              puntajeBruto: a.float(),
            }),
            participacionCambios: a.customType({
              nivelRiesgo: a.string(),
              puntajeTransformado: a.float(),
              puntajeBruto: a.float(),
            })
          })
        }),
    

        demandasTrabajo: a.customType({
          nivelRiesgo: a.string(),
          puntajeTransformado: a.float(),
          puntajeBruto: a.float(),
          dimensiones: a.customType({
            consistenciaRol: a.customType({
              nivelRiesgo: a.string(),
              puntajeTransformado: a.float(),
              puntajeBruto: a.float(),
            }),
            demandaCargaMental: a.customType({
              nivelRiesgo: a.string(),
              puntajeTransformado: a.float(),
              puntajeBruto: a.float(),
            }),
            demandasAmbientalesCarga: a.customType({
              nivelRiesgo: a.string(),
              puntajeTransformado: a.float(),
              puntajeBruto: a.float(),
            }),
            demandasCuantitativas: a.customType({
              nivelRiesgo: a.string(),
              puntajeTransformado: a.float(),
              puntajeBruto: a.float(),
            }),
            demandasEmocionales: a.customType({
              nivelRiesgo: a.string(),
              puntajeTransformado: a.float(),
              puntajeBruto: a.float(),
            }),
            demandasJornada: a.customType({
              nivelRiesgo: a.string(),
              puntajeTransformado: a.float(),
              puntajeBruto: a.float(),
            }),
            influenciaTrabajo: a.customType({
              nivelRiesgo: a.string(),
              puntajeTransformado: a.float(),
              puntajeBruto: a.float(),
            }),
            responsabilidadCargo: a.customType({
              nivelRiesgo: a.string(),
              puntajeTransformado: a.float(),
              puntajeBruto: a.float(),
            })
          })
        }),
    
       
        liderazgoRelacionesSociales: a.customType({
          nivelRiesgo: a.string(),
          puntajeTransformado: a.float(),
          puntajeBruto: a.float(),
          dimensiones: a.customType({
            caracteristicasLiderazgo: a.customType({
              nivelRiesgo: a.string(),
              puntajeTransformado: a.float(),
              puntajeBruto: a.float(),
            }),
            relacionColaboradores: a.customType({
              nivelRiesgo: a.string(),
              puntajeTransformado: a.float(),
              puntajeBruto: a.float(),
            }),
            relacionesSociales: a.customType({
              nivelRiesgo: a.string(),
              puntajeTransformado: a.float(),
              puntajeBruto: a.float(),
            }),
            retroalimentacionDesempeno: a.customType({
              nivelRiesgo: a.string(),
              puntajeTransformado: a.float(),
              puntajeBruto: a.float(),
            })
          })
        }),
    
      
        recompensas: a.customType({
          nivelRiesgo: a.string(),
          puntajeTransformado: a.float(),
          puntajeBruto: a.float(),
          dimensiones: a.customType({
            recompensasPertenencia: a.customType({
              nivelRiesgo: a.string(),
              puntajeTransformado: a.float(),
              puntajeBruto: a.float(),
            }),
            recompensasReconocimiento: a.customType({
              nivelRiesgo: a.string(),
              puntajeTransformado: a.float(),
              puntajeBruto: a.float(),
            })
          })
        }),
        puntajeTotal: a.float(),
        nivelRiesgoTotal: a.string(),
        servicioCliente: a.enum(["si", "no"]),
      }).identifier(["formularioId"]),
    FormularioIntralaboralB: a
    .model({
      formularioId: a.id().required(),
      citaIdIntraB: a.id().required(),
      cita: a.belongsTo("Citas","citaIdIntraB"),
      documento: a.id().required(),
      controlSobreTrabajo: a.customType({
        nivelRiesgo: a.string(),
        puntajeTransformado: a.float(),
        puntajeBruto: a.float(),
        dimensiones: a.customType({
          capacitacionEntrenamiento: a.customType({
            nivelRiesgo: a.string(),
            puntajeTransformado: a.float(),
            puntajeBruto: a.float(),
          }),
          claridadRol: a.customType({
            nivelRiesgo: a.string(),
            puntajeTransformado: a.float(),
            puntajeBruto: a.float(),
          }),
          controlAutonomia: a.customType({
            nivelRiesgo: a.string(),
            puntajeTransformado: a.float(),
            puntajeBruto: a.float(),
          }),
          oportunidadesDesarrollo: a.customType({
            nivelRiesgo: a.string(),
            puntajeTransformado: a.float(),
            puntajeBruto: a.float(),
          }),
          participacionCambios: a.customType({
            nivelRiesgo: a.string(),
            puntajeTransformado: a.float(),
            puntajeBruto: a.float(),
          })
        })
      }),
  
      
      demandasTrabajo: a.customType({
        nivelRiesgo: a.string(),
        puntajeTransformado: a.float(),
        puntajeBruto: a.float(),
        dimensiones: a.customType({
          consistenciaRol: a.customType({
            nivelRiesgo: a.string(),
            puntajeTransformado: a.float(),
            puntajeBruto: a.float(),
          }),
          demandaCargaMental: a.customType({
            nivelRiesgo: a.string(),
            puntajeTransformado: a.float(),
            puntajeBruto: a.float(),
          }),
          demandasAmbientalesCarga: a.customType({
            nivelRiesgo: a.string(),
            puntajeTransformado: a.float(),
            puntajeBruto: a.float(),
          }),
          demandasCuantitativas: a.customType({
            nivelRiesgo: a.string(),
            puntajeTransformado: a.float(),
            puntajeBruto: a.float(),
          }),
          demandasEmocionales: a.customType({
            nivelRiesgo: a.string(),
            puntajeTransformado: a.float(),
            puntajeBruto: a.float(),
          }),
          demandasJornada: a.customType({
            nivelRiesgo: a.string(),
            puntajeTransformado: a.float(),
            puntajeBruto: a.float(),
          }),
          influenciaTrabajo: a.customType({
            nivelRiesgo: a.string(),
            puntajeTransformado: a.float(),
            puntajeBruto: a.float(),
          }),
          responsabilidadCargo: a.customType({
            nivelRiesgo: a.string(),
            puntajeTransformado: a.float(),
            puntajeBruto: a.float(),
          })
        })
      }),
  
    
      liderazgoRelacionesSociales: a.customType({
        nivelRiesgo: a.string(),
        puntajeTransformado: a.float(),
        puntajeBruto: a.float(),
        dimensiones: a.customType({
          caracteristicasLiderazgo: a.customType({
            nivelRiesgo: a.string(),
            puntajeTransformado: a.float(),
            puntajeBruto: a.float(),
          }),
          relacionColaboradores: a.customType({
            nivelRiesgo: a.string(),
            puntajeTransformado: a.float(),
            puntajeBruto: a.float(),
          }),
          relacionesSociales: a.customType({
            nivelRiesgo: a.string(),
            puntajeTransformado: a.float(),
            puntajeBruto: a.float(),
          }),
          retroalimentacionDesempeno: a.customType({
            nivelRiesgo: a.string(),
            puntajeTransformado: a.float(),
            puntajeBruto: a.float(),
          })
        })
      }),
  
    
      recompensas: a.customType({
        nivelRiesgo: a.string(),
        puntajeTransformado: a.float(),
        puntajeBruto: a.float(),
        dimensiones: a.customType({
          recompensasPertenencia: a.customType({
            nivelRiesgo: a.string(),
            puntajeTransformado: a.float(),
            puntajeBruto: a.float(),
          }),
          recompensasReconocimiento: a.customType({
            nivelRiesgo: a.string(),
            puntajeTransformado: a.float(),
            puntajeBruto: a.float(),
          })
        })
      }),
      puntajeTotal: a.float(),
      nivelRiesgoTotal: a.string(),
      servicioCliente: a.enum(["si", "no"])
      
    }).identifier(["formularioId"]),
    FormularioExtralaboral: a
    .model({
      citaIdExtra: a.id().required(),
      cita: a.belongsTo("Citas","citaIdExtra"),
      documento: a.id().required(),
      formularioId: a.id().required(),
      
      // Características de vivienda
      caracteristicasVivienda: a.customType({
        nivelRiesgo: a.string(),
        puntajeBruto: a.float(),
        puntajeTransformado: a.float()
      }),

      // Comunicación y relaciones
      comunicacionRelaciones: a.customType({
        nivelRiesgo: a.string(),
        puntajeBruto: a.float(),
        puntajeTransformado: a.float()
      }),

      // Desplazamiento vivienda
      desplazamientoVivienda: a.customType({
        nivelRiesgo: a.string(),
        puntajeBruto: a.float(),
        puntajeTransformado: a.float()
      }),

      // Influencia entorno
      influenciaEntorno: a.customType({
        nivelRiesgo: a.string(),
        puntajeBruto: a.float(),
        puntajeTransformado: a.float()
      }),

      // Relaciones familiares
      relacionesFamiliares: a.customType({
        nivelRiesgo: a.string(),
        puntajeBruto: a.float(),
        puntajeTransformado: a.float()
      }),

      // Situación económica
      situacionEconomica: a.customType({
        nivelRiesgo: a.string(),
        puntajeBruto: a.float(),
        puntajeTransformado: a.float()
      }),

      // Tiempo fuera del trabajo
      tiempoFueraTrabajo: a.customType({
        nivelRiesgo: a.string(),
        puntajeBruto: a.float(),
        puntajeTransformado: a.float()
      }),
      puntajeTotal: a.float(),
      nivelRiesgoTotal: a.string(),

    }).identifier(["formularioId"]),
    FormularioEstres: a
    .model({
      citaIdEstres: a.id().required(),
      cita: a.belongsTo("Citas","citaIdEstres"),
      documento: a.id().required(),
      formularioId: a.id().required(),

      // Comunicación y relaciones
      comunicacionRelaciones: a.customType({
        puntajeBruto: a.float(),
        puntajeTransformado: a.float(),
      }),

      // Relaciones familiares
      relacionesFamiliares: a.customType({
        puntajeBruto: a.float(),
        puntajeTransformado: a.float()
      }),

      // Situación económica
      situacionEconomica: a.customType({
        puntajeBruto: a.float(),
        puntajeTransformado: a.float()
      }),

      // Tiempo fuera del trabajo
      tiempoFueraTrabajo: a.customType({
        puntajeBruto: a.float(),
        puntajeTransformado: a.float()
      }),
      puntajeTotal: a.float(),
      nivelRiesgoTotal: a.string(),

    }).identifier(["formularioId"])
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
