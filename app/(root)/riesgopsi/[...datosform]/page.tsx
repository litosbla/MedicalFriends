'use client'
import FormPersonales from '@/components/formularios/formPersonales';
import { set } from 'date-fns';
import { CheckCircle, Home } from 'lucide-react';
import Link from 'next/link';
import React, {  useState, useEffect } from 'react'

import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import FormCustom from '@/components/formularios/formIntralaboral';
import { dataintralaboralA,dataintralaboralB, dataextralaboral,dataestres, scaleOptions,scaleOptions2 } from "@/constants/questionsintralaboral";
import { getNivelRiesgo, getRangosRiesgoExtralaboral, getRangosRiesgoEstres, getRangosExtralaboralFinal, getRangosIntralaboralDimension, getRangosIntralaboralDominio, getRangosIntralaboralTotal } from '@/constants/risklevels';
import {  useToast } from '@/hooks/use-toast';
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from 'next/navigation';
Amplify.configure(outputs);

const client = generateClient<Schema>();
type TipoForm = 'A' | 'B';
type Dimensiones = 
  | 'tiempoFueraTrabajo'
  | 'relacionesFamiliares'
  | 'comunicacionRelaciones'
  | 'situacionEconomica'
  | 'caracteristicasVivienda'
  | 'influenciaEntorno'
  | 'desplazamientoVivienda';

type DominiosIntralaboral = 
  | 'liderazgoRelacionesSociales'
  | 'controlSobreTrabajo'
  | 'demandasTrabajo'
  | 'recompensas';

type DimensionesIntralaboral = 
  | 'caracteristicasLiderazgo'
  | 'relacionesSociales'
  | 'retroalimentacionDesempeno'
  | 'relacionColaboradores'
  | 'claridadRol'
  | 'capacitacionEntrenamiento'
  | 'participacionCambios'
  | 'oportunidadesDesarrollo'
  | 'controlAutonomia'
  | 'demandasAmbientalesCarga'
  | 'demandasEmocionales'
  | 'demandasCuantitativas'
  | 'influenciaTrabajo'
  | 'responsabilidadCargo'
  | 'demandaCargaMental'
  | 'consistenciaRol'
  | 'demandasJornada'
  | 'recompensasPertenencia'
  | 'recompensasReconocimiento';

  const estructuraIntralaboral = {
    liderazgoRelacionesSociales: {
      dimensiones: {
        caracteristicasLiderazgo: {
          preguntas: ['q63', 'q64', 'q65', 'q66', 'q67', 'q68', 'q69', 'q70', 'q71', 'q72', 'q73', 'q74', 'q75'],
          factor: 52
        },
        relacionesSociales: {
          preguntas: ['q76', 'q77', 'q78', 'q79', 'q80', 'q81', 'q82', 'q83', 'q84', 'q85', 'q86', 'q87', 'q88', 'q89'],
          factor: 56
        },
        retroalimentacionDesempeno: {
          preguntas: ['q90', 'q91', 'q92', 'q93', 'q94'],
          factor: 20
        },
        relacionColaboradores: {
          preguntas: ['q115', 'q116', 'q117','q118','q119','q120','q121','q122','q123'],
          factor: 36
        }
      },
      factorDominio: 164
    },
    controlSobreTrabajo: {
      dimensiones: {
        claridadRol: {
          preguntas: ['q53', 'q54', 'q55', 'q56', 'q57', 'q58', 'q59'],
          factor: 28
        },
        capacitacionEntrenamiento: {
          preguntas: ['q60', 'q61', 'q62'],
          factor: 12
        },
        participacionCambios: {
          preguntas: ['q48', 'q49', 'q50', 'q51'],
          factor: 16
        },
        oportunidadesDesarrollo: {
          preguntas: ['q39', 'q40', 'q41', 'q42'],
          factor: 16
        },
        controlAutonomia: {
          preguntas: ['q44', 'q45', 'q46'],
          factor: 12
        }
      },
      factorDominio: 84
    },
    demandasTrabajo: {
      dimensiones: {
        demandasAmbientalesCarga: {
          preguntas: ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12'],
          factor: 48
        },
        demandasEmocionales: {
          preguntas: ['q106', 'q107', 'q108', 'q109', 'q110', 'q111', 'q112', 'q113', 'q114'],
          factor: 36
        },
        demandasCuantitativas: {
          preguntas: ['q13', 'q14', 'q15', 'q32', 'q43', 'q47'],
          factor: 24
        },
        influenciaTrabajo: {
          preguntas: ['q35', 'q36', 'q37', 'q38'],
          factor: 16
        },
        responsabilidadCargo: {
          preguntas: ['q19','q22', 'q23', 'q24', 'q25', 'q26'],
          factor: 24
        },
        demandaCargaMental: {
          preguntas: ['q16', 'q17', 'q18', 'q20', 'q21'],
          factor: 20
        },
        consistenciaRol: {
          preguntas: ['q27', 'q28', 'q29', 'q30', 'q52'],
          factor: 20
        },
        demandasJornada: {
          preguntas: ['q31', 'q33', 'q34'],
          factor: 12
        }
      },
      factorDominio: 200
    },
    recompensas: {
      dimensiones: {
        recompensasReconocimiento: {
          preguntas: ['q95','q102', 'q103', 'q104', 'q105'],
          factor: 20
        },
        recompensasPertenencia: {
          preguntas: [ 'q96', 'q97', 'q98', 'q99', 'q100', 'q101'],
          factor: 24
        }
      },
      factorDominio: 44
    }
  };
  

  const estructuraIntralaboralB = {
    liderazgoRelacionesSociales: {
      dimensiones: {
        caracteristicasLiderazgo: {
          preguntas: ['q49', 'q50', 'q51', 'q52', 'q53', 'q54', 'q55', 'q56', 'q57', 'q58', 'q59', 'q60', 'q61'],
          factor: 52
        },
        relacionesSociales: {
          preguntas: ['q62', 'q63', 'q64', 'q65', 'q66', 'q67', 'q68', 'q69', 'q70', 'q71', 'q72', 'q73'],
          factor: 48
        },
        retroalimentacionDesempeno: {
          preguntas: ['q74', 'q75', 'q76', 'q77', 'q78'],
          factor: 20
        },
  
      },
      factorDominio: 120
    },
    controlSobreTrabajo: {
      dimensiones: {
        claridadRol: {
          preguntas: ['q41', 'q42', 'q43', 'q44', 'q45'],
          factor: 20
        },
        capacitacionEntrenamiento: {
          preguntas: ['q46', 'q47', 'q48'],
          factor: 12
        },
        participacionCambios: {
          preguntas: ['q38', 'q39', 'q40'],
          factor: 12
        },
        oportunidadesDesarrollo: {
          preguntas: ['q29', 'q30', 'q31', 'q32'],
          factor: 16
        },
        controlAutonomia: {
          preguntas: ['q34', 'q35', 'q36'],
          factor: 12
        }
      },
      factorDominio: 72
    },
    demandasTrabajo: {
      dimensiones: {
        demandasAmbientalesCarga: {
          preguntas: ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12'],
          factor: 48
        },
        demandasEmocionales: {
          preguntas:['q89', 'q90', 'q91', 'q92', 'q93', 'q94', 'q95', 'q96', 'q97'],
          factor: 36
        },
        demandasCuantitativas: {
          preguntas: ['q13', 'q14', 'q15'],
          factor: 12
        },
        influenciaTrabajo: {
          preguntas: ['q25', 'q26', 'q27', 'q28'],
          factor: 16
        },
        demandaCargaMental: {
          preguntas: ['q16', 'q17', 'q18', 'q19', 'q20'],
          factor: 20
        },
        demandasJornada: {
          preguntas: ['q21', 'q22', 'q23', 'q24', 'q33', 'q37'],
          factor: 24
        }
      },
      factorDominio: 156
    },
    recompensas: {
      dimensiones: {
        recompensasReconocimiento: {
          preguntas: ['q85', 'q86', 'q87', 'q88'],
          factor: 16
        },
        recompensasPertenencia: {
          preguntas: ['q79', 'q80', 'q81', 'q82', 'q83', 'q84'],
          factor: 24
        }
      },
      factorDominio: 40
    }
  };
  const normalScoring: Record<string, number> = {
    'siempre': 0,
    'casiSiempre': 1,
    'algunasVeces': 2,
    'casiNunca': 3,
    'nunca': 4
  };

  const reverseScoring: Record<string, number> = {
    'siempre': 4,
    'casiSiempre': 3,
    'algunasVeces': 2,
    'casiNunca': 1,
    'nunca': 0
  };

  // Definición de dimensiones y sus preguntas
  const dimensiones = {
    tiempoFueraTrabajo: {
      preguntas: ['q14', 'q15', 'q16', 'q17'],
      factor: 16
    },
    relacionesFamiliares: {
      preguntas: ['q22', 'q25', 'q27'],
      factor: 12
    },
    comunicacionRelaciones: {
      preguntas: ['q18', 'q19', 'q20', 'q21', 'q23'],
      factor: 20
    },
    situacionEconomica: {
      preguntas: ['q29', 'q30', 'q31'],
      factor: 12
    },
    caracteristicasVivienda: {
      preguntas: ['q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12', 'q13'],
      factor: 36
    },
    influenciaEntorno: {
      preguntas: ['q24', 'q26', 'q28'],
      factor: 12
    },
    desplazamientoVivienda: {
      preguntas: ['q1', 'q2', 'q3', 'q4'],
      factor: 16
    }
  };

  
function PaginaFormulario({params}: {params: {datosform: string[]}}) {
   
    const { toast } = useToast()
    const router = useRouter();
    const [otp, numeroDocumento, tipoForm] = params.datosform;
  

    const subirPersonales = async (data: any) => {
      console.log(data);
      const datosCompletos = {
        ...data,
        citaId: otp,
        documento: numeroDocumento,
        formularioId: `${otp}_${numeroDocumento}` // Unión de otp y documentoId
      
      };

      console.log(datosCompletos);
      await client.models.FormularioPersonales.create(datosCompletos);
      setPersonales(false);
      setIntralaboral(true);
    }


    const subirIntralaboralA = async (data: Record<string, string>) => {
      console.log(data);
      const { clientService, ...respuestas } = data;

      // Preguntas con puntuación inversa
      const reversedQuestions = new Set(
        [
          'q1','q2', 'q3', 'q7', 'q8','q10','q11','q13','q15','q16','q17',
          'q18','q19', 'q20', 'q21', 'q22','q23','q24','q25','q26','q27',
          'q28','q29','q30','q31','q33','q35','q36','q37','q38',
          'q52','q80','q106','q107','q108','q109','q110','q111','q112','q113',
          'q114','q115','q116','q117','q118','q119','q120','q121','q122','q123'
        ]); // A
      // Calcular puntajes por pregunta
      const scores = Object.entries(respuestas).reduce((acc, [question, answer]) => {
        const scoring = reversedQuestions.has(question) ? reverseScoring : normalScoring;
        return {
          ...acc,
          [question]: scoring[answer]
        };
      }, {} as Record<string, number>);
    
      // Calcular puntajes por dimensión y dominio
      const resultados = Object.entries(estructuraIntralaboral).reduce((accDominios, [dominio, infoDominio]) => {
        const resultadosDimensiones = Object.entries(infoDominio.dimensiones).reduce((accDimensiones, [dimension, infoDimension]) => {
          const sumaPuntajes = infoDimension.preguntas.reduce((sum, pregunta) => {
            return sum + (scores[pregunta] || 0);
          }, 0);
    
          const puntajeTransformado = (sumaPuntajes / infoDimension.factor) * 100;
          const puntajeRedondeado = Math.round(puntajeTransformado * 10) / 10;

          const rangosRiesgoDimension = getRangosIntralaboralDimension(tipoForm as TipoForm, dimension as DimensionesIntralaboral);

          const nivelRiesgoDimension = getNivelRiesgo(puntajeRedondeado, rangosRiesgoDimension);
          return {
            ...accDimensiones,
            [dimension]: {
              puntajeBruto: sumaPuntajes,
              nivelRiesgo: nivelRiesgoDimension,
              puntajeTransformado: puntajeRedondeado,
              
            }
          };
        }, {});
        console.log("esto es el resultado de la dimension");
        console.log(resultadosDimensiones);
        console.log("//////////////////////////////");

        // Calcular puntaje del dominio
        const sumaPuntajesDominio = Object.values(resultadosDimensiones).reduce((total: number, dimension: any) => {
          return total + dimension.puntajeBruto;
        }, 0);
    
        const puntajeDominioTransformado = (sumaPuntajesDominio / infoDominio.factorDominio) * 100;
        const puntajeDominioRedondeado = Math.round(puntajeDominioTransformado * 10) / 10;
 
        const rangosRiesgoDominio = getRangosIntralaboralDominio(tipoForm as TipoForm, dominio as DominiosIntralaboral);

        const nivelRiesgoDominio = getNivelRiesgo(puntajeDominioRedondeado, rangosRiesgoDominio);
        
        return {
          ...accDominios,
          [dominio]: {
            puntajeBruto: sumaPuntajesDominio,
            puntajeTransformado: puntajeDominioRedondeado,
            nivelRiesgo: nivelRiesgoDominio,
            dimensiones: resultadosDimensiones
          }
        };
      }, {});
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@");
      console.log("esto es el resultado de la DOMINIOOOOOOO");
      console.log(resultados);
      console.log("//////////////////////////////");
      // Calcular puntaje total
      const sumaPuntajesTotal = Object.values(resultados).reduce((total: number, dominio: any) => {
        return total + dominio.puntajeBruto;
      }, 0);
    
      const puntajeFinal = Math.round(((sumaPuntajesTotal / 492) * 100) * 10) / 10;
      const nivelRiesgoFinal = getNivelRiesgo(puntajeFinal, getRangosIntralaboralTotal(tipoForm as TipoForm));
      
      console.log('resultado final o puntaje final');
      console.log(scores);
      console.log(puntajeFinal);
      console.log(nivelRiesgoFinal);

      const datosCompletos = {
        ...resultados,
        citaIdIntraA: otp,
        documento: numeroDocumento,
        formularioId: `${otp}_${numeroDocumento}`,
        servicioCliente: clientService as 'si' | 'no',
        puntajeTotal: puntajeFinal,
        nivelRiesgo: nivelRiesgoFinal
      };

      console.log(datosCompletos);
      await client.models.FormularioIntralaboralA.create(datosCompletos);
     
      setIntralaboral(false);
      setExtralaboral(true);
 
    };


    const subirIntralaboralB = async (data: Record<string, string>) => {
      const { clientService, ...respuestas } = data;    
      // Preguntas con puntuación inversa
      const reversedQuestions = new Set(
        [
          'q1','q2', 'q3', 'q7', 'q8','q10','q11','q13','q15','q16','q17',
          'q18','q19', 'q20', 'q21', 'q22','q23','q25','q26','q27',
          'q28','q66','q89','q90','q91','q92','q93','q94','q95','q96'
        ]); // B
      // Calcular puntajes por pregunta
      const scores = Object.entries(respuestas).reduce((acc, [question, answer]) => {
        const scoring = reversedQuestions.has(question) ? reverseScoring : normalScoring;
        return {
          ...acc,
          [question]: scoring[answer]
        };
      }, {} as Record<string, number>);
    
      // Calcular puntajes por dimensión y dominio
      const resultados = Object.entries(estructuraIntralaboralB).reduce((accDominios, [dominio, infoDominio]) => {
        const resultadosDimensiones = Object.entries(infoDominio.dimensiones).reduce((accDimensiones, [dimension, infoDimension]) => {
          const sumaPuntajes = infoDimension.preguntas.reduce((sum, pregunta) => {
            return sum + (scores[pregunta] || 0);
          }, 0);
    
          const puntajeTransformado = (sumaPuntajes / infoDimension.factor) * 100;
          const puntajeRedondeado = Math.round(puntajeTransformado * 10) / 10;
          const rangosRiesgoDimension = getRangosIntralaboralDimension(tipoForm as TipoForm, dimension as DimensionesIntralaboral);
          const nivelRiesgoDimension = getNivelRiesgo(puntajeRedondeado, rangosRiesgoDimension);
          return {
            ...accDimensiones,
            [dimension]: {
              puntajeBruto: sumaPuntajes,
              puntajeTransformado: puntajeRedondeado,
              nivelRiesgo: nivelRiesgoDimension,
            
            }
          };
        }, {});
        console.log("esto es el resultado de la dimension");
        console.log(resultadosDimensiones);
        console.log("//////////////////////////////");

        // Calcular puntaje del dominio
        const sumaPuntajesDominio = Object.values(resultadosDimensiones).reduce((total: number, dimension: any) => {
          return total + dimension.puntajeBruto;
        }, 0);
    
        const puntajeDominioTransformado = (sumaPuntajesDominio / infoDominio.factorDominio) * 100;
        const puntajeDominioRedondeado = Math.round(puntajeDominioTransformado * 10) / 10;
        const rangosRiesgoDominio = getRangosIntralaboralDominio(tipoForm as TipoForm, dominio as DominiosIntralaboral);
        const nivelRiesgoDominio = getNivelRiesgo(puntajeDominioRedondeado, rangosRiesgoDominio);
        
        return {
          ...accDominios,
          [dominio]: {
            puntajeBruto: sumaPuntajesDominio,
            puntajeTransformado: puntajeDominioRedondeado,
            nivelRiesgo: nivelRiesgoDominio,
            dimensiones: resultadosDimensiones
          }
        };
      }, {});
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@");
      console.log("esto es el resultado de la DOMINIOOOOOOO");
      console.log(resultados);
      console.log("//////////////////////////////");
      // Calcular puntaje total
      const sumaPuntajesTotal = Object.values(resultados).reduce((total: number, dominio: any) => {
        return total + dominio.puntajeBruto;
      }, 0);
    
      const puntajeFinal = Math.round(((sumaPuntajesTotal / 388) * 100) * 10) / 10;
      const nivelRiesgoFinal = getNivelRiesgo(puntajeFinal, getRangosIntralaboralTotal(tipoForm as TipoForm));
      
      console.log('resultado final o puntaje final');
      console.log(scores);
      console.log(puntajeFinal);
      console.log(nivelRiesgoFinal);
      const datosCompletos = {
        ...resultados,
        citaIdIntraB: otp,
        documento: numeroDocumento,
        formularioId: `${otp}_${numeroDocumento}`,
        servicioCliente: clientService as 'si' | 'no',
        puntajeTotal: puntajeFinal,
        nivelRiesgo: nivelRiesgoFinal
      };

      console.log(datosCompletos);
      await client.models.FormularioIntralaboralB.create(datosCompletos);
      setIntralaboral(false);
      setExtralaboral(true);
 
    };



    const subirExtralaboral = async (data: Record<string, string>) => {

    
      // Determinar qué preguntas usan puntuación inversa
      const reversedQuestions = new Set(['q2', 'q3', 'q6', 'q24','q24','q26','q28','q30','q31']); // Ajusta según tus necesidades
    
      // Calcular puntaje para cada pregunta
      const scores = Object.entries(data).reduce((acc, [question, answer]) => {
        const scoring = reversedQuestions.has(question) ? reverseScoring : normalScoring;
        return {
          ...acc,
          [question]: scoring[answer]
        };
      }, {} as Record<string, number>);
    
      // Calcular puntajes por dimensión
      const puntajesDimensiones = Object.entries(dimensiones).reduce((acc, [dimension, info]) => {
        // Sumar los puntajes de las preguntas de esta dimensión
        const sumaPuntajes = info.preguntas.reduce((sum, pregunta) => {
          return sum + (scores[pregunta] || 0);
        }, 0);
    
        // Aplicar factor de transformación
        
        const puntajeTransformado = (sumaPuntajes / info.factor) * 100;
        const puntajeRedondeado = Math.round(puntajeTransformado * 10) / 10;
        const rangosRiesgo = getRangosRiesgoExtralaboral(tipoForm as TipoForm , dimension as Dimensiones);
        const nivelRiesgo = getNivelRiesgo(puntajeRedondeado, rangosRiesgo);
        return {
          ...acc,
          [dimension]: {
            puntajeBruto: sumaPuntajes,
            puntajeTransformado: puntajeRedondeado,
            nivelRiesgo:nivelRiesgo,
           
          }
        };
      }, {});
      const sumaPuntajesFinal = Object.values(puntajesDimensiones).reduce((total: number, dimension: any) => {
        return total + dimension.puntajeBruto;
      }, 0);
    
      // Aplicar la fórmula: (suma / 61.1) * 100
      const puntajeFinal = Math.round(((sumaPuntajesFinal / 124) * 100) * 10) / 10;
      const nivelRiesgo = getNivelRiesgo(puntajeFinal, getRangosExtralaboralFinal(tipoForm as TipoForm));
      console.log(scores);
      console.log(puntajesDimensiones);
      console.log(puntajeFinal);
      console.log(nivelRiesgo);
    
      const datosCompletos = {
        ...puntajesDimensiones,
        citaIdExtra: otp,
        documento: numeroDocumento,
        formularioId: `${otp}_${numeroDocumento}`,
        puntajeTotal: puntajeFinal,
        nivelRiesgoTotal: nivelRiesgo
      };

      console.log(datosCompletos);
      await client.models.FormularioExtralaboral.create(datosCompletos);
     
      setExtralaboral(false);
      setEstres(true);
    }


    const subirEstres = async (data:  Record<string, string>) => {
      const scoringTypes: Record<string, Record<string, number>> = {
        tipo1: {
          'siempre': 9,
          'casiSiempre': 6,
          'aVeces': 3,
          'nunca': 0
        },
        tipo2: {
          'siempre': 6,
          'casiSiempre': 4,
          'aVeces': 2,
          'nunca': 0
        },
        tipo3: {
          'siempre': 3,
          'casiSiempre': 2,
          'aVeces': 1,
          'nunca': 0
        }
      };
     
      // Definición de dimensiones y sus preguntas
      const dimensionesEstres = {
        tiempoFueraTrabajo: {
          preguntas: ['q1', 'q2', 'q3', 'q4','q5', 'q6', 'q7', 'q8'],
          factor: 8,
          multiplo: 4
        },
        relacionesFamiliares: {
          preguntas: ['q9', 'q10', 'q11','q12'],
          factor: 4,
          multiplo: 3
        },
        comunicacionRelaciones: {
          preguntas: ['q13', 'q14', 'q15', 'q16', 'q17','q18', 'q19', 'q20', 'q21', 'q22'],
          factor: 10,
          multiplo: 2
        },
        situacionEconomica: {
          preguntas: ['q23', 'q24', 'q25','q26','q27','q28','q29', 'q30', 'q31'],
          factor: 9,
          multiplo: 1
        },
       
      };
    
      // Determinar qué preguntas usan puntuación inversa
      const tipo1Questions = new Set([
        'q1', 'q2', 'q3', 'q9','q13', 'q14', 'q15', 'q23','q24'
        // ... agregar todas las preguntas tipo1
      ]);
    
      const tipo2Questions = new Set([
        'q4', 'q5', 'q6', 'q10', 'q11', 'q16', 'q17', 'q18','q19', 'q25', 'q26', 'q27', 'q28'
        // ... agregar todas las preguntas tipo2
      ]);
    
      const tipo3Questions = new Set([
        'q7', 'q8', 'q12', 'q20', 'q21', 'q22', 'q29', 'q30', 'q31'
      ]);
      // Calcular puntaje para cada pregunta
      const scores = Object.entries(data).reduce((acc, [question, answer]) => {
        let scoringType = 'tipo1'; // tipo1 por defecto
        if (tipo2Questions.has(question)) {
          scoringType = 'tipo2';
        } else if (tipo3Questions.has(question)) {
          scoringType = 'tipo3';
        }
        const scoring = scoringTypes[scoringType];
        return {
          ...acc,
          [question]: scoring[answer]
        };
      }, {} as Record<string, number>);
    
      // Calcular puntajes por dimensión
      const puntajesDimensiones = Object.entries(dimensionesEstres).reduce((acc, [dimension, info]) => {
        // Sumar los puntajes de las preguntas de esta dimensión
        const sumaPuntajes = info.preguntas.reduce((sum, pregunta) => {
          return sum + (scores[pregunta] || 0);
        }, 0);
    
        // Aplicar factor de transformación
        
        const puntajeTransformado = (sumaPuntajes / info.factor) * info.multiplo;
        console.log(puntajeTransformado);
        const puntajeRedondeado = Math.round(puntajeTransformado * 10) / 10;
        console.log(puntajeRedondeado);
       
        return {
          ...acc,
          [dimension]: {
            puntajeBruto: sumaPuntajes,
            puntajeTransformado: puntajeTransformado,
            preguntas: info.preguntas.reduce((acc, pregunta) => {
              return {
                ...acc,
                [pregunta]: scores[pregunta] || 0
              };
            }, {})
          }
        };
      }, {});

      
      console.log(scores);
      console.log(puntajesDimensiones);
      const sumaPuntajes = Object.values(puntajesDimensiones).reduce((total: number, dimension: any) => {
        return total + dimension.puntajeTransformado;
      }, 0);
    
      // Aplicar la fórmula: (suma / 61.1) * 100
      const puntajeFinal = Math.round(((sumaPuntajes / 61.16) * 100) * 10) / 10;
      const nivelRiesgo = getNivelRiesgo(puntajeFinal, getRangosRiesgoEstres(tipoForm as TipoForm));
      console.log(nivelRiesgo);
      console.log(puntajeFinal);
      console.log(puntajesDimensiones);
      const datosCompletos = {
        ...puntajesDimensiones,
        citaIdEstres: otp,
        documento: numeroDocumento,
        formularioId: `${otp}_${numeroDocumento}`,
        puntajeTotal: puntajeFinal,
        nivelRiesgo: nivelRiesgo
      };

      console.log(datosCompletos);
      await client.models.FormularioEstres.create(datosCompletos);
     
      toast({
        title: "finalizado",
        description: "Friday, February 10, 2023 at 5:57 PM",
        action: (
          <ToastAction altText="Go to home" onClick={() => router.push('/')}>
            Ir a inicio
          </ToastAction>
        ),
      })    
      setEstres(false);
      setUltimaPantalla(true);
    }


    const [personales, setPersonales] = useState(true);
    const [intralaboral, setIntralaboral] = useState(false);
    const [extralaboral, setExtralaboral] = useState(false);
    const [estres, setEstres] = useState(false);
    const [ultimapantalla, setUltimaPantalla] = useState(false);
    useEffect(() => {
      if (ultimapantalla) {
        const timer = setTimeout(() => {
          router.push('/');
        }, 3000); // Redirige después de 3 segundos
    
        return () => clearTimeout(timer);
      }
    }, [ultimapantalla]);

  return (
    <div className="w-full flex justify-center p-6 bg-white min-h-max">
      <Link href={"/"} className="fixed top-6 left-6 text-black flex items-center">
          <Home size={24} className="text-green-500 mr-3" />  Volver al inicio
      </Link>
      {personales && (<FormPersonales onHitSubmit={subirPersonales} />)}
      {intralaboral && (
        tipoForm === 'A' ? (
          <FormCustom onHitSubmit={subirIntralaboralA} titulo='Formulario Intralaboral A' surveyData={dataintralaboralA} scaleOptions={scaleOptions} />
        ) : (
          <FormCustom onHitSubmit={subirIntralaboralB} titulo='Formulario Intralaboral B' surveyData={dataintralaboralB} scaleOptions={scaleOptions} />
        )
      )
      }
      {extralaboral && (
        <FormCustom onHitSubmit={subirExtralaboral} titulo='Formulario Extralaboral' surveyData={dataextralaboral} scaleOptions={scaleOptions}/>
        )}
      {estres && (
        <FormCustom onHitSubmit={subirEstres} titulo='Formulario Estrés' surveyData={dataestres} scaleOptions={scaleOptions2}/>
        )}

      {ultimapantalla && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100">
          <div className="text-center space-y-4 p-8 rounded-lg">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto animate-bounce" />
            <h2 className="text-2xl font-bold text-gray-800">¡Proceso Completado!</h2>
            <p className="text-gray-600">El formulario se ha guardado exitosamente</p>
            <div className="mt-6">
              <button 
                onClick={() => router.push('/')}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Volver al inicio
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  )
}

export default PaginaFormulario