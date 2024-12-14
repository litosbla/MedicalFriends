
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    RadioGroup,
    RadioGroupItem
  } from "@/components/ui/radio-group";

import { Button } from "@/components/ui/button"
import { Input } from "../ui/input"


const colombiaRegions = {
  "Amazonas": ["Leticia", "Puerto Nariño"],
  "Antioquia": ["Medellín", "Bello", "Envigado", "Itagüí", "Rionegro","Sabaneta",],
  "Arauca": ["Arauca", "Saravena", "Tame"],
  "Atlántico": ["Barranquilla", "Soledad", "Malambo"],
  "Bogotá D.C.": ["Bogotá"],
  "Bolívar": ["Cartagena", "Magangué", "Turbaco"],
  "Boyacá": ["Tunja", "Duitama", "Sogamoso"],
  "Caldas": ["Manizales", "La Dorada", "Chinchiná"],
  "Caquetá": ["Florencia", "San Vicente del Caguán"],
  "Casanare": ["Yopal", "Aguazul", "Villanueva"],
  "Cauca": ["Popayán", "Santander de Quilichao"],
  "Cesar": ["Valledupar", "Aguachica", "Bosconia"],
  "Chocó": ["Quibdó", "Nuquí"],
  "Córdoba": ["Montería", "Sahagún", "Lorica"],
  "Cundinamarca": ["Soacha", "Facatativá", "Zipaquirá", "Chía", "Mosquera"],
  "Guainía": ["Inírida"],
  "Guaviare": ["San José del Guaviare"],
  "Huila": ["Neiva", "Pitalito", "Garzón"],
  "La Guajira": ["Riohacha", "Maicao", "Uribia"],
  "Magdalena": ["Santa Marta", "Ciénaga", "Fundación"],
  "Meta": ["Villavicencio", "Acacías", "Granada"],
  "Nariño": ["Pasto", "Ipiales", "Tumaco"],
  "Norte de Santander": ["Cúcuta", "Ocaña", "Pamplona"],
  "Putumayo": ["Mocoa", "Puerto Asís"],
  "Quindío": ["Armenia", "Calarcá", "Montenegro"],
  "Risaralda": ["Pereira", "Dosquebradas", "Santa Rosa de Cabal"],
  "San Andrés y Providencia": ["San Andrés", "Providencia"],
  "Santander": ["Bucaramanga", "Floridablanca", "Girón", "Piedecuesta", "Barrancabermeja"],
  "Sucre": ["Sincelejo", "Corozal"],
  "Tolima": ["Ibagué", "Espinal", "Melgar"],
  "Valle del Cauca": ["Cali", "Buenaventura", "Palmira", "Tuluá", "Yumbo"],
  "Vaupés": ["Mitú"],
  "Vichada": ["Puerto Carreño"]
}

type formPersonalesProps ={
    onHitSubmit: (data:any) => void 
  }

const FormSchema = z.object({
    sexo: z.enum(["Masculino", "Femenino"], {
        required_error: "Por favor seleccione su sexo",
    }),

    anoNacimiento: z.string().min(4, { message: "Ingrese un año válido" }),
    estadoCivil: z.enum([
        "Soltero",
        "Casado",
        "Ul",
        "Separado",
        "Divorciado",
        "Viudo",
        "Credo"
    ], {
        required_error: "Por favor seleccione su estado civil",
    }),
    nivelEstudios: z.enum([
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
    ], {
        required_error: "Por favor seleccione su nivel de estudios",
    }),
    ocupacion: z.string().min(2, { message: "Por favor ingrese su ocupación" }),
    lugarResidencia: z.object({
        ciudad: z.string().min(2, { message: "Ingrese la ciudad" }),
        departamento: z.string().min(2, { message: "Ingrese el departamento" })
    }),
    estrato: z.enum(["ESTRATO_1", "ESTRATO_2", "ESTRATO_3", "ESTRATO_4", "ESTRATO_5", "ESTRATO_6", "FINCA", "NO_SE"], {
        required_error: "Seleccione su estrato",
    }),
    tipoVivienda: z.enum(["Propia", "Arriendo", "Familiar"], {
        required_error: "Seleccione el tipo de vivienda",
    }),
    personasACargo: z.string().min(1, { message: "Ingrese el número de personas" }),
    lugarTrabajo: z.object({
        ciudad: z.string().min(2, { message: "Ingrese la ciudad" }),
        departamento: z.string().min(2, { message: "Ingrese el departamento" })
    }),
    antiguedadEmpresa: z.object({ /////////
        menosDeUnAno: z.boolean(),
        anos: z.string().optional()
    }),
    cargo: z.string().min(2, { message: "Ingrese su cargo" }),
    tipoCargo: z.enum([
        "Jefatura",
        "ProfesionalAnalistaTecnicoTecnologo",
        "AuxiliarAsistente",
        "OperarioServiciosGenerales"
    ], {
        required_error: "Seleccione el tipo de cargo",
    }),
    antiguedadCargo: z.object({
        menosDeUnAno: z.boolean(),
        anos: z.string().optional()
    }),
    departamentoEmpresa: z.string().min(2, { message: "Ingrese el departamento o área" }),
    tipoContrato: z.enum([
        "Temporalless1",
        "Temporalmore1",
        "Tindefinido",
        "Cooperado",
        "Ops",
        "Nose"
    ], {
        required_error: "Seleccione el tipo de contrato",
    }),
    horasDiarias: z.string().min(1, { message: "Ingrese las horas diarias" }),
    tipoSalario: z.enum([
        "Fijo",
        "Mixto",
        "Variable"
    ], {
        required_error: "Seleccione el tipo de salario",
    })
});
  
   
export default function FormPersonales({onHitSubmit}: formPersonalesProps) {	
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            sexo: undefined,
            anoNacimiento: undefined,
            estadoCivil: undefined,
            nivelEstudios: undefined,
            ocupacion: "",
            lugarResidencia: {
              ciudad: "",
              departamento: ""
            },
            lugarTrabajo: {
              ciudad: "",
              departamento: ""
            },
            estrato: undefined,
            tipoVivienda: undefined,
            personasACargo: undefined,
            antiguedadEmpresa: {
              menosDeUnAno: false,
              anos: ""
            },
            cargo: "",
            
            antiguedadCargo: {
              menosDeUnAno: false,
              anos: ""
            },
            departamentoEmpresa: "",
            tipoContrato: undefined,
            horasDiarias: undefined,
            tipoSalario: undefined
          }
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        onHitSubmit(data);
        form.reset();
      }
    
  return (
    <div className="w-full max-w-4xl mx-auto p-6 text-black">
      <h1 className="text-2xl font-bold text-center mb-6">
        Formulario de datos personales
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="sexo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>1. Sexo</FormLabel>
                <FormControl>
                  <RadioGroup 
                    onValueChange={field.onChange} 
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Masculino" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Masculino
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Femenino" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Femenino
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="anoNacimiento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>2. Año de nacimiento</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="1989"  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="estadoCivil"
            render={({ field }) => (
              <FormItem>
                <FormLabel>4. Estado civil</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione su estado civil" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Soltero">Soltero (a)</SelectItem>
                    <SelectItem value="Casado">Casado (a)</SelectItem>
                    <SelectItem value="Ul">Unión libre</SelectItem>
                    <SelectItem value="Separado">Separado (a)</SelectItem>
                    <SelectItem value="Divorciado">Divorciado (a)</SelectItem>
                    <SelectItem value="Viudo">Viudo (a)</SelectItem>
                    <SelectItem value="Credo">Sacerdote / Monja</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nivelEstudios"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Último nivel de estudios alcanzado</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione su nivel de estudios" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Ninguno">Ninguno</SelectItem>
                    <SelectItem value="Primaria_incompleta">Primaria incompleta</SelectItem>
                    <SelectItem value="Primaria_completa">Primaria completa</SelectItem>
                    <SelectItem value="Bachillerato_incompleto">Bachillerato incompleto</SelectItem>
                    <SelectItem value="Bachillerato_completo">Bachillerato completo</SelectItem>
                    <SelectItem value="TEcnico_tecnologico_incompleto">Técnico / tecnológico incompleto</SelectItem>
                    <SelectItem value="Técnico_tecnologico_completo">Técnico / tecnológico completo</SelectItem>
                    <SelectItem value="Profesional_incompleto">Profesional incompleto</SelectItem>
                    <SelectItem value="Profesional_completo">Profesional completo</SelectItem>
                    <SelectItem value="Carrera_militar_policia">Carrera militar / policía</SelectItem>
                    <SelectItem value="Post_grado_incompleto">Post-grado incompleto</SelectItem>
                    <SelectItem value="Post_grado_completo">Post-grado completo</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ocupacion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>¿Cuál es su ocupación o profesión?</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Ej: Ingeniero de Software" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
          <FormField
              control={form.control}
              name="lugarResidencia.departamento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departamento de residencia</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      // Resetear la ciudad cuando cambie el departamento
                      form.setValue("lugarResidencia.ciudad", "");
                    }} 
                    value={field.value || ""} 
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione departamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(colombiaRegions).map((departamento) => (
                        <SelectItem key={departamento} value={departamento}>
                          {departamento}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lugarResidencia.ciudad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ciudad de residencia</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value || ""} 
                    disabled={!form.watch("lugarResidencia.departamento")}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione ciudad" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {form.watch("lugarResidencia.departamento") &&
                        colombiaRegions[form.watch("lugarResidencia.departamento") as keyof typeof colombiaRegions]?.map((ciudad) => (
                          <SelectItem key={ciudad} value={ciudad}>
                            {ciudad}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
              control={form.control}
              name="estrato"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estrato de los servicios públicos de su vivienda</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione su estrato" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ESTRATO_1">1</SelectItem>
                      <SelectItem value="ESTRATO_2">2</SelectItem>
                      <SelectItem value="ESTRATO_3">3</SelectItem>
                      <SelectItem value="ESTRATO_4">4</SelectItem>
                      <SelectItem value="ESTRATO_5">5</SelectItem>
                      <SelectItem value="ESTRATO_6">6</SelectItem>
                      <SelectItem value="FINCA">Finca</SelectItem>
                      <SelectItem value="NO_SE">No sé</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          <FormField
            control={form.control}
            name="tipoVivienda"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de vivienda</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el tipo de vivienda" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Propia">Propia</SelectItem>
                    <SelectItem value="Arriendo">En arriendo</SelectItem>
                    <SelectItem value="Familiar">Familiar</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="personasACargo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de personas que dependen económicamente de usted</FormLabel>
                <FormControl>
                  <Input type="number" {...field} min="0"  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
          <FormField
              control={form.control}
              name="lugarTrabajo.departamento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departamento donde trabaja</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      // Resetear la ciudad cuando cambie el departamento
                      form.setValue("lugarTrabajo.ciudad", "");
                    }} 
                    value={field.value || ""} 
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione departamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(colombiaRegions).map((departamento) => (
                        <SelectItem key={departamento} value={departamento}>
                          {departamento}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lugarTrabajo.ciudad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ciudad donde trabaja</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value || ""} 
                    disabled={!form.watch("lugarTrabajo.departamento")}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione ciudad" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {form.watch("lugarTrabajo.departamento") &&
                        colombiaRegions[form.watch("lugarTrabajo.departamento") as keyof typeof colombiaRegions].map((ciudad) => (
                          <SelectItem key={ciudad} value={ciudad}>
                            {ciudad}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
               />
            </div>
            <FormField
                control={form.control}
                name="antiguedadEmpresa.menosDeUnAno"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>¿Hace cuántos años que trabaja en esta empresa?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          field.onChange(value === "true");
                          if (value === "true") {
                            form.setValue("antiguedadEmpresa.anos", "");
                          }
                        }}
                        defaultValue={field.value ? "true" : "false"}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="true" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Menos de un año
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="false" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Más de un año
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!form.watch("antiguedadEmpresa.menosDeUnAno") && (
                <FormField
                  control={form.control}
                  name="antiguedadEmpresa.anos"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de años</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} min="1"  />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="cargo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>¿Cuál es el nombre del cargo que ocupa en la empresa?</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ej: Analista de Sistemas" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tipoCargo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de cargo</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione el tipo de cargo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Jefatura">Jefatura - tiene personal a cargo</SelectItem>
                        <SelectItem value="ProfesionalAnalistaTecnicoTecnologo">Profesional, analista, técnico, tecnólogo</SelectItem>
                        <SelectItem value="AuxiliarAsistente">Auxiliar, asistente administrativo, asistente técnico</SelectItem>
                        <SelectItem value="OperarioServiciosGenerales">Operario, operador, ayudante, servicios generales</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                  control={form.control}
                  name="antiguedadCargo.menosDeUnAno"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>¿Hace cuántos años desempeña el cargo actual?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value === "true");
                            if (value === "true") {
                              form.setValue("antiguedadCargo.anos", "");
                            }
                          }}
                          defaultValue={field.value ? "true" : "false"}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="true" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Menos de un año
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="false" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Más de un año
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {!form.watch("antiguedadCargo.menosDeUnAno") && (
                  <FormField
                    control={form.control}
                    name="antiguedadCargo.anos"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número de años</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} min="1"   />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="departamentoEmpresa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Departamento, área o sección de la empresa</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Ej: Recursos Humanos" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                    control={form.control}
                    name="tipoContrato"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de contrato actual</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione el tipo de contrato" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Temporalless1">Temporal de menos de 1 año</SelectItem>
                            <SelectItem value="Temporalmore1">Temporal de 1 año o más</SelectItem>
                            <SelectItem value="Tindefinido">Término indefinido</SelectItem>
                            <SelectItem value="Cooperado">Cooperado (cooperativa)</SelectItem>
                            <SelectItem value="Ops">Prestación de servicios</SelectItem>
                            <SelectItem value="Nose">No sé</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="horasDiarias"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Horas diarias de trabajo establecidas</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} placeholder="Ej: 8" min="1" max="24"  />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tipoSalario"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de salario</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione el tipo de salario" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Fijo">
                              Fijo (diario, semanal, quincenal o mensual)
                            </SelectItem>
                            <SelectItem value="Mixto">
                              Una parte fija y otra variable
                            </SelectItem>
                            <SelectItem value="Variable">
                              Variable (a destajo, por producción, por comisión)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
          <Button type="submit" className="w-full">Enviar formulario</Button>
        </form>
      </Form>
    </div>
  )
}

