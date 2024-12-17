
type NivelRiesgo = {
  min: number;
  max: number;
  nivel: string;
};



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

  type RangosDimensionIntralaboral = {
    [key in DimensionesIntralaboral]: NivelRiesgo[];
  };
  
  type RangosDominioIntralaboral = {
    [key in DominiosIntralaboral]: NivelRiesgo[];
  };
  
  type RangosPorDominioIntralaboral = {
    [key in TipoForm]: RangosDominioIntralaboral;
  };
  type RangosPorDimensionIntralaboral = {
    [key in TipoForm]: RangosDimensionIntralaboral;
  };

  export const getRangosIntralaboralTotal = (tipoForm: TipoForm): NivelRiesgo[] => {
  const rangos = {
    'A': [
      { min: 0.0, max: 19.7, nivel: 'Sin riesgo' },
      { min: 19.8, max: 25.8, nivel: 'Riesgo bajo' },
      { min: 25.9, max: 31.5, nivel: 'Riesgo medio' },
      { min: 31.6, max: 38.0, nivel: 'Riesgo alto' },
      { min: 38.1, max: 100, nivel: 'Riesgo muy alto' }
    ],
    'B': [
      { min: 0.0, max: 20.6, nivel: 'Sin riesgo' },
      { min: 20.7, max: 26.0, nivel: 'Riesgo bajo' },
      { min: 26.1, max: 31.2, nivel: 'Riesgo medio' },
      { min: 31.3, max: 38.7, nivel: 'Riesgo alto' },
      { min: 38.8, max: 100, nivel: 'Riesgo muy alto' }
    ]
  };
  return rangos[tipoForm];
};

export const getRangosIntralaboralDominio = (tipoForm: TipoForm, dominio: DominiosIntralaboral): NivelRiesgo[] => {
  const rangos: RangosPorDominioIntralaboral = {
    'A': {
      liderazgoRelacionesSociales: [
        { min: 0.0, max: 9.1, nivel: 'Sin riesgo' },
        { min: 9.2, max: 17.7, nivel: 'Riesgo bajo' },
        { min: 17.8, max: 25.6, nivel: 'Riesgo medio' },
        { min: 25.7, max: 34.8, nivel: 'Riesgo alto' },
        { min: 34.9, max: 100, nivel: 'Riesgo muy alto' }
      ],
      controlSobreTrabajo: [
        { min: 0.0, max: 10.7, nivel: 'Sin riesgo' },
        { min: 10.8, max: 19.0, nivel: 'Riesgo bajo' },
        { min: 19.1, max: 29.8, nivel: 'Riesgo medio' },
        { min: 29.9, max: 40.5, nivel: 'Riesgo alto' },
        { min: 40.6, max: 100, nivel: 'Riesgo muy alto' }
      ],
      demandasTrabajo: [
        { min: 0.0, max: 28.5, nivel: 'Sin riesgo' },
        { min: 28.6, max: 35.0, nivel: 'Riesgo bajo' },
        { min: 35.1, max: 41.5, nivel: 'Riesgo medio' },
        { min: 41.6, max: 47.5, nivel: 'Riesgo alto' },
        { min: 47.6, max: 100, nivel: 'Riesgo muy alto' }
      ],
      recompensas: [
        { min: 0.0, max: 4.5, nivel: 'Sin riesgo' },
        { min: 4.6, max: 11.4, nivel: 'Riesgo bajo' },
        { min: 11.5, max: 20.5, nivel: 'Riesgo medio' },
        { min: 20.6, max: 29.5, nivel: 'Riesgo alto' },
        { min: 29.6, max: 100, nivel: 'Riesgo muy alto' }
      ]
    },
    'B': {
      liderazgoRelacionesSociales: [
        { min: 0.0, max: 8.3, nivel: 'Sin riesgo' },
        { min: 8.4, max: 17.5, nivel: 'Riesgo bajo' },
        { min: 17.6, max: 26.7, nivel: 'Riesgo medio' },
        { min: 26.8, max: 38.3, nivel: 'Riesgo alto' },
        { min: 38.4, max: 100, nivel: 'Riesgo muy alto' }
      ],
      controlSobreTrabajo: [
        { min: 0.0, max: 19.4, nivel: 'Sin riesgo' },
        { min: 19.5, max: 26.4, nivel: 'Riesgo bajo' },
        { min: 26.5, max: 34.7, nivel: 'Riesgo medio' },
        { min: 34.8, max: 43.1, nivel: 'Riesgo alto' },
        { min: 43.2, max: 100, nivel: 'Riesgo muy alto' }
      ],
      demandasTrabajo: [
        { min: 0.0, max: 26.9, nivel: 'Sin riesgo' },
        { min: 27.0, max: 33.3, nivel: 'Riesgo bajo' },
        { min: 33.4, max: 37.8, nivel: 'Riesgo medio' },
        { min: 37.9, max: 44.2, nivel: 'Riesgo alto' },
        { min: 44.3, max: 100, nivel: 'Riesgo muy alto' }
      ],
      recompensas: [
        { min: 0.0, max: 2.5, nivel: 'Sin riesgo' },
        { min: 2.6, max: 10.0, nivel: 'Riesgo bajo' },
        { min: 10.1, max: 17.5, nivel: 'Riesgo medio' },
        { min: 17.6, max: 27.5, nivel: 'Riesgo alto' },
        { min: 27.6, max: 100, nivel: 'Riesgo muy alto' }
      ]
    }
  };

  return rangos[tipoForm][dominio];
};

export const getRangosIntralaboralDimension = (tipoForm: TipoForm, dimension: DimensionesIntralaboral): NivelRiesgo[] => {
  const rangos: RangosPorDimensionIntralaboral = {
    'A': {
      caracteristicasLiderazgo: [
        { min: 0.0, max: 3.8, nivel: 'Sin riesgo' },
        { min: 3.9, max: 15.4, nivel: 'Riesgo bajo' },
        { min: 15.5, max: 30.8, nivel: 'Riesgo medio' },
        { min: 30.9, max: 46.2, nivel: 'Riesgo alto' },
        { min: 46.3, max: 100, nivel: 'Riesgo muy alto' }
      ],
      relacionesSociales: [
        { min: 0.0, max: 5.4, nivel: 'Sin riesgo' },
        { min: 5.5, max: 16.1, nivel: 'Riesgo bajo' },
        { min: 16.2, max: 25.0, nivel: 'Riesgo medio' },
        { min: 25.1, max: 37.5, nivel: 'Riesgo alto' },
        { min: 37.6, max: 100, nivel: 'Riesgo muy alto' }
      ],
      retroalimentacionDesempeno: [
        { min: 0.0, max: 10.0, nivel: 'Sin riesgo' },
        { min: 10.1, max: 25.0, nivel: 'Riesgo bajo' },
        { min: 25.1, max: 40.0, nivel: 'Riesgo medio' },
        { min: 40.1, max: 55.0, nivel: 'Riesgo alto' },
        { min: 55.1, max: 100, nivel: 'Riesgo muy alto' }
      ],
      relacionColaboradores: [
        { min: 0.0, max: 13.9, nivel: 'Sin riesgo' },
        { min: 14.0, max: 25.0, nivel: 'Riesgo bajo' },
        { min: 25.1, max: 33.3, nivel: 'Riesgo medio' },
        { min: 33.4, max: 47.2, nivel: 'Riesgo alto' },
        { min: 47.3, max: 100, nivel: 'Riesgo muy alto' }
      ],
      claridadRol: [
        { min: 0.0, max: 0.9, nivel: 'Sin riesgo' },
        { min: 1.0, max: 10.7, nivel: 'Riesgo bajo' },
        { min: 10.8, max: 21.4, nivel: 'Riesgo medio' },
        { min: 21.5, max: 39.3, nivel: 'Riesgo alto' },
        { min: 39.4, max: 100, nivel: 'Riesgo muy alto' }
      ],
      capacitacionEntrenamiento: [
        { min: 0.0, max: 0.9, nivel: 'Sin riesgo' },
        { min: 1.0, max: 16.7, nivel: 'Riesgo bajo' },
        { min: 16.8, max: 33.3, nivel: 'Riesgo medio' },
        { min: 33.4, max: 50.0, nivel: 'Riesgo alto' },
        { min: 50.1, max: 100, nivel: 'Riesgo muy alto' }
      ],
      participacionCambios: [
        { min: 0.0, max: 12.5, nivel: 'Sin riesgo' },
        { min: 12.6, max: 25.0, nivel: 'Riesgo bajo' },
        { min: 25.1, max: 37.5, nivel: 'Riesgo medio' },
        { min: 37.6, max: 50.0, nivel: 'Riesgo alto' },
        { min: 50.1, max: 100, nivel: 'Riesgo muy alto' }
      ],
      oportunidadesDesarrollo: [
        { min: 0.0, max: 0.9, nivel: 'Sin riesgo' },
        { min: 1.0, max: 6.3, nivel: 'Riesgo bajo' },
        { min: 6.4, max: 18.8, nivel: 'Riesgo medio' },
        { min: 18.9, max: 31.3, nivel: 'Riesgo alto' },
        { min: 31.4, max: 100, nivel: 'Riesgo muy alto' }
      ],
      controlAutonomia: [
        { min: 0.0, max: 8.3, nivel: 'Sin riesgo' },
        { min: 8.4, max: 25.0, nivel: 'Riesgo bajo' },
        { min: 25.1, max: 41.7, nivel: 'Riesgo medio' },
        { min: 41.8, max: 58.3, nivel: 'Riesgo alto' },
        { min: 58.4, max: 100, nivel: 'Riesgo muy alto' }
      ],
      demandasAmbientalesCarga: [
        { min: 0.0, max: 14.6, nivel: 'Sin riesgo' },
        { min: 14.7, max: 22.9, nivel: 'Riesgo bajo' },
        { min: 23.0, max: 31.3, nivel: 'Riesgo medio' },
        { min: 31.4, max: 39.6, nivel: 'Riesgo alto' },
        { min: 39.7, max: 100, nivel: 'Riesgo muy alto' }
      ],
      demandasEmocionales: [
        { min: 0.0, max: 16.7, nivel: 'Sin riesgo' },
        { min: 16.8, max: 25.0, nivel: 'Riesgo bajo' },
        { min: 25.1, max: 33.3, nivel: 'Riesgo medio' },
        { min: 33.4, max: 47.2, nivel: 'Riesgo alto' },
        { min: 47.3, max: 100, nivel: 'Riesgo muy alto' }
      ],
      demandasCuantitativas: [
        { min: 0.0, max: 25.0, nivel: 'Sin riesgo' },
        { min: 25.1, max: 33.3, nivel: 'Riesgo bajo' },
        { min: 33.4, max: 45.8, nivel: 'Riesgo medio' },
        { min: 45.9, max: 54.2, nivel: 'Riesgo alto' },
        { min: 54.3, max: 100, nivel: 'Riesgo muy alto' }
      ],
      influenciaTrabajo: [
        { min: 0.0, max: 18.8, nivel: 'Sin riesgo' },
        { min: 18.9, max: 31.3, nivel: 'Riesgo bajo' },
        { min: 31.4, max: 43.8, nivel: 'Riesgo medio' },
        { min: 43.9, max: 50.0, nivel: 'Riesgo alto' },
        { min: 50.1, max: 100, nivel: 'Riesgo muy alto' }
      ],
      responsabilidadCargo: [
        { min: 0.0, max: 37.5, nivel: 'Sin riesgo' },
        { min: 37.6, max: 54.2, nivel: 'Riesgo bajo' },
        { min: 54.3, max: 66.7, nivel: 'Riesgo medio' },
        { min: 66.8, max: 79.2, nivel: 'Riesgo alto' },
        { min: 79.3, max: 100, nivel: 'Riesgo muy alto' }
      ],
      demandaCargaMental: [
        { min: 0.0, max: 60.0, nivel: 'Sin riesgo' },
        { min: 60.1, max: 70.0, nivel: 'Riesgo bajo' },
        { min: 70.1, max: 80.0, nivel: 'Riesgo medio' },
        { min: 80.1, max: 90.0, nivel: 'Riesgo alto' },
        { min: 90.1, max: 100, nivel: 'Riesgo muy alto' }
      ],
      consistenciaRol: [
        { min: 0.0, max: 15.0, nivel: 'Sin riesgo' },
        { min: 15.1, max: 25.0, nivel: 'Riesgo bajo' },
        { min: 25.1, max: 35.0, nivel: 'Riesgo medio' },
        { min: 35.1, max: 45.0, nivel: 'Riesgo alto' },
        { min: 45.1, max: 100, nivel: 'Riesgo muy alto' }
      ],
      demandasJornada: [
        { min: 0.0, max: 8.3, nivel: 'Sin riesgo' },
        { min: 8.4, max: 25.0, nivel: 'Riesgo bajo' },
        { min: 25.1, max: 33.3, nivel: 'Riesgo medio' },
        { min: 33.4, max: 50.0, nivel: 'Riesgo alto' },
        { min: 50.1, max: 100, nivel: 'Riesgo muy alto' }
      ],
      recompensasPertenencia: [
        { min: 0.0, max: 0.9, nivel: 'Sin riesgo' },
        { min: 1.0, max: 5.0, nivel: 'Riesgo bajo' },
        { min: 5.1, max: 10.0, nivel: 'Riesgo medio' },
        { min: 10.1, max: 20.0, nivel: 'Riesgo alto' },
        { min: 20.1, max: 100, nivel: 'Riesgo muy alto' }
      ],
      recompensasReconocimiento: [
        { min: 0.0, max: 4.2, nivel: 'Sin riesgo' },
        { min: 4.3, max: 16.7, nivel: 'Riesgo bajo' },
        { min: 16.8, max: 25.0, nivel: 'Riesgo medio' },
        { min: 25.1, max: 37.5, nivel: 'Riesgo alto' },
        { min: 37.6, max: 100, nivel: 'Riesgo muy alto' }
      ]
    },
    'B': {
      caracteristicasLiderazgo: [
        { min: 0.0, max: 3.8, nivel: 'Sin riesgo' },
        { min: 3.9, max: 13.5, nivel: 'Riesgo bajo' },
        { min: 13.6, max: 25.0, nivel: 'Riesgo medio' },
        { min: 25.1, max: 38.5, nivel: 'Riesgo alto' },
        { min: 38.6, max: 100, nivel: 'Riesgo muy alto' }
      ],
      relacionesSociales: [
        { min: 0.0, max: 6.3, nivel: 'Sin riesgo' },
        { min: 6.4, max: 14.6, nivel: 'Riesgo bajo' },
        { min: 14.7, max: 27.1, nivel: 'Riesgo medio' },
        { min: 27.2, max: 37.5, nivel: 'Riesgo alto' },
        { min: 37.6, max: 100, nivel: 'Riesgo muy alto' }
      ],
      retroalimentacionDesempeno: [
        { min: 0.0, max: 5.0, nivel: 'Sin riesgo' },
        { min: 5.1, max: 20.0, nivel: 'Riesgo bajo' },
        { min: 20.1, max: 30.0, nivel: 'Riesgo medio' },
        { min: 30.1, max: 50.0, nivel: 'Riesgo alto' },
        { min: 50.1, max: 100, nivel: 'Riesgo muy alto' }
      ],
      claridadRol: [
        { min: 0.0, max: 0.9, nivel: 'Sin riesgo' },
        { min: 1.0, max: 5.0, nivel: 'Riesgo bajo' },
        { min: 5.1, max: 15.0, nivel: 'Riesgo medio' },
        { min: 15.1, max: 30.0, nivel: 'Riesgo alto' },
        { min: 30.1, max: 100, nivel: 'Riesgo muy alto' }
      ],
      capacitacionEntrenamiento: [
        { min: 0.0, max: 0.9, nivel: 'Sin riesgo' },
        { min: 1.0, max: 16.7, nivel: 'Riesgo bajo' },
        { min: 16.8, max: 25.0, nivel: 'Riesgo medio' },
        { min: 25.1, max: 50.0, nivel: 'Riesgo alto' },
        { min: 50.1, max: 100, nivel: 'Riesgo muy alto' }
      ],
      participacionCambios: [
        { min: 0.0, max: 16.7, nivel: 'Sin riesgo' },
        { min: 16.8, max: 33.3, nivel: 'Riesgo bajo' },
        { min: 33.4, max: 41.7, nivel: 'Riesgo medio' },
        { min: 41.8, max: 58.3, nivel: 'Riesgo alto' },
        { min: 58.4, max: 100, nivel: 'Riesgo muy alto' }
      ],
      oportunidadesDesarrollo: [
        { min: 0.0, max: 12.5, nivel: 'Sin riesgo' },
        { min: 12.6, max: 25.0, nivel: 'Riesgo bajo' },
        { min: 25.1, max: 37.5, nivel: 'Riesgo medio' },
        { min: 37.6, max: 56.3, nivel: 'Riesgo alto' },
        { min: 56.4, max: 100, nivel: 'Riesgo muy alto' }
      ],
      controlAutonomia: [
        { min: 0.0, max: 33.3, nivel: 'Sin riesgo' },
        { min: 33.4, max: 50.0, nivel: 'Riesgo bajo' },
        { min: 50.1, max: 66.7, nivel: 'Riesgo medio' },
        { min: 66.8, max: 75.0, nivel: 'Riesgo alto' },
        { min: 75.1, max: 100, nivel: 'Riesgo muy alto' }
      ],
      demandasAmbientalesCarga: [
        { min: 0.0, max: 22.9, nivel: 'Sin riesgo' },
        { min: 23.0, max: 31.3, nivel: 'Riesgo bajo' },
        { min: 31.4, max: 39.6, nivel: 'Riesgo medio' },
        { min: 39.7, max: 47.9, nivel: 'Riesgo alto' },
        { min: 48.0, max: 100, nivel: 'Riesgo muy alto' }
      ],
      demandasEmocionales: [
        { min: 0.0, max: 19.4, nivel: 'Sin riesgo' },
        { min: 19.5, max: 27.8, nivel: 'Riesgo bajo' },
        { min: 27.9, max: 38.9, nivel: 'Riesgo medio' },
        { min: 39.0, max: 47.2, nivel: 'Riesgo alto' },
        { min: 47.3, max: 100, nivel: 'Riesgo muy alto' }
      ],
      demandasCuantitativas: [
        { min: 0.0, max: 16.7, nivel: 'Sin riesgo' },
        { min: 16.8, max: 33.3, nivel: 'Riesgo bajo' },
        { min: 33.4, max: 41.7, nivel: 'Riesgo medio' },
        { min: 41.8, max: 50.0, nivel: 'Riesgo alto' },
        { min: 50.1, max: 100, nivel: 'Riesgo muy alto' }
      ],
      influenciaTrabajo: [
        { min: 0.0, max: 12.5, nivel: 'Sin riesgo' },
        { min: 12.6, max: 25.0, nivel: 'Riesgo bajo' },
        { min: 25.1, max: 31.3, nivel: 'Riesgo medio' },
        { min: 31.4, max: 50.0, nivel: 'Riesgo alto' },
        { min: 50.1, max: 100, nivel: 'Riesgo muy alto' }
      ],
      demandaCargaMental: [
        { min: 0.0, max: 50.0, nivel: 'Sin riesgo' },
        { min: 50.1, max: 65.0, nivel: 'Riesgo bajo' },
        { min: 65.1, max: 75.0, nivel: 'Riesgo medio' },
        { min: 75.1, max: 85.0, nivel: 'Riesgo alto' },
        { min: 85.1, max: 100, nivel: 'Riesgo muy alto' }
      ],
      demandasJornada: [
        { min: 0.0, max: 25.0, nivel: 'Sin riesgo' },
        { min: 25.1, max: 37.5, nivel: 'Riesgo bajo' },
        { min: 37.6, max: 45.8, nivel: 'Riesgo medio' },
        { min: 45.9, max: 58.3, nivel: 'Riesgo alto' },
        { min: 58.4, max: 100, nivel: 'Riesgo muy alto' }
      ],
      recompensasPertenencia: [
        { min: 0.0, max: 0.9, nivel: 'Sin riesgo' },
        { min: 1.0, max: 6.3, nivel: 'Riesgo bajo' },
        { min: 6.4, max: 12.5, nivel: 'Riesgo medio' },
        { min: 12.6, max: 18.8, nivel: 'Riesgo alto' },
        { min: 18.9, max: 100, nivel: 'Riesgo muy alto' }
      ],
      recompensasReconocimiento: [
        { min: 0.0, max: 0.9, nivel: 'Sin riesgo' },
        { min: 1.0, max: 12.5, nivel: 'Riesgo bajo' },
        { min: 12.6, max: 25.0, nivel: 'Riesgo medio' },
        { min: 25.1, max: 37.5, nivel: 'Riesgo alto' },
        { min: 37.6, max: 100, nivel: 'Riesgo muy alto' }
      ],
      relacionColaboradores: [
        { min: 0.0, max: 3.8, nivel: 'Sin riesgo' },
        { min: 3.9, max: 13.5, nivel: 'Riesgo bajo' },
        { min: 13.6, max: 25.0, nivel: 'Riesgo medio' },
        { min: 25.1, max: 38.5, nivel: 'Riesgo alto' },
        { min: 38.6, max: 100, nivel: 'Riesgo muy alto' }
      ],
      consistenciaRol: [
        { min: 0.0, max: 3.8, nivel: 'Sin riesgo' },
        { min: 3.9, max: 13.5, nivel: 'Riesgo bajo' },
        { min: 13.6, max: 25.0, nivel: 'Riesgo medio' },
        { min: 25.1, max: 38.5, nivel: 'Riesgo alto' },
        { min: 38.6, max: 100, nivel: 'Riesgo muy alto' }
      ],
      responsabilidadCargo: [
        { min: 0.0, max: 3.8, nivel: 'Sin riesgo' },
        { min: 3.9, max: 13.5, nivel: 'Riesgo bajo' },
        { min: 13.6, max: 25.0, nivel: 'Riesgo medio' },
        { min: 25.1, max: 38.5, nivel: 'Riesgo alto' },
        { min: 38.6, max: 100, nivel: 'Riesgo muy alto' }
      ],
   },
  };

  return rangos[tipoForm][dimension];
};

type Dimensiones = 
  | 'tiempoFueraTrabajo'
  | 'relacionesFamiliares'
  | 'comunicacionRelaciones'
  | 'situacionEconomica'
  | 'caracteristicasVivienda'
  | 'influenciaEntorno'
  | 'desplazamientoVivienda';


type TipoForm = 'A' | 'B';

type RangosPorDimension = {
  [key in Dimensiones]: NivelRiesgo[];
};


type Rangos = {
  [key in TipoForm]: RangosPorDimension;
};

export const getRangosExtralaboralFinal = (tipoForm: TipoForm): NivelRiesgo[] => {
  const rangos: RangosFinales = {
    'A': [
      { min: 0, max: 11.3, nivel: 'Sin riesgo' },
      { min: 11.4, max: 16.9, nivel: 'Riesgo bajo' },
      { min: 17, max: 22.6, nivel: 'Riesgo medio' },
      { min: 22.7, max: 29, nivel: 'Riesgo alto' },
      { min: 29.1, max: 100.1, nivel: 'Riesgo muy alto' }
    ],
    'B': [
      { min: 0, max: 12.9, nivel: 'Sin riesgo' },
      { min: 13, max: 17.7, nivel: 'Riesgo bajo' },
      { min: 17.8, max: 24.2, nivel: 'Riesgo medio' },
      { min: 24.3, max: 32.3, nivel: 'Riesgo alto' },
      { min: 32.4, max: 100.1, nivel: 'Riesgo muy alto' }
    ]
  };

  return rangos[tipoForm];
}

export const getRangosRiesgoExtralaboral = (tipoForm: TipoForm, dimension: Dimensiones): NivelRiesgo[] => {
  const rangos: Rangos = {
    'A': {
      tiempoFueraTrabajo: [
        { min: 0, max: 6.3, nivel: 'Sin riesgo' },
        { min: 6.4, max: 25.0, nivel: 'Riesgo bajo' },
        { min: 25.1, max: 37.5, nivel: 'Riesgo medio' },
        { min: 37.6, max: 50.0, nivel: 'Riesgo alto' },
        { min: 50.1, max: 100.0, nivel: 'Riesgo muy alto' }
      ],
      relacionesFamiliares: [
        { min: 0, max: 8.3, nivel: 'Sin riesgo' },
        { min: 8.4, max: 25.0, nivel: 'Riesgo bajo' },
        { min: 25.1, max: 33.3, nivel: 'Riesgo medio' },
        { min: 33.4, max: 50.0, nivel: 'Riesgo alto' },
        { min: 50.1, max: 100.0, nivel: 'Riesgo muy alto' }
      ],
      comunicacionRelaciones: [
        { min: 0, max: 0.9, nivel: 'Sin riesgo' },
        { min: 1, max: 10, nivel: 'Riesgo bajo' },
        { min: 10.1, max: 20, nivel: 'Riesgo medio' },
        { min: 20.1, max: 30.0, nivel: 'Riesgo alto' },
        { min: 30.1, max: 100.0, nivel: 'Riesgo muy alto' }
      ],
      situacionEconomica: [
        { min: 0, max: 8.3, nivel: 'Sin riesgo' },
        { min: 8.4, max: 25, nivel: 'Riesgo bajo' },
        { min: 25.1, max: 33.3, nivel: 'Riesgo medio' },
        { min: 33.4, max: 50.0, nivel: 'Riesgo alto' },
        { min: 50.1, max: 100.0, nivel: 'Riesgo muy alto' }
      ],
      caracteristicasVivienda: [
        { min: 0, max: 5.6, nivel: 'Sin riesgo' },
        { min: 5.7, max: 11.1, nivel: 'Riesgo bajo' },
        { min: 11.2, max: 13.9, nivel: 'Riesgo medio' },
        { min: 14.0, max: 22.2, nivel: 'Riesgo alto' },
        { min: 22.3, max: 100.0, nivel: 'Riesgo muy alto' }
      ],
      influenciaEntorno: [
        { min: 0, max: 8.3, nivel: 'Sin riesgo' },
        { min: 8.4, max: 16.7, nivel: 'Riesgo bajo' },
        { min: 16.8, max: 25, nivel: 'Riesgo medio' },
        { min: 25.1, max: 41.7, nivel: 'Riesgo alto' },
        { min: 41.8, max: 100.0, nivel: 'Riesgo muy alto' }
      ],
      desplazamientoVivienda: [
        { min: 0, max: 0.9, nivel: 'Sin riesgo' },
        { min: 1, max: 12.5, nivel: 'Riesgo bajo' },
        { min: 12.6, max: 25.0, nivel: 'Riesgo medio' },
        { min: 25.1, max: 43.8, nivel: 'Riesgo alto' },
        { min: 43.9, max: 100.0, nivel: 'Riesgo muy alto' }
      ]
    },
    'B': {
      tiempoFueraTrabajo: [
        { min: 0, max: 6.3, nivel: 'Sin riesgo' },
        { min: 6.4, max: 25.0, nivel: 'Riesgo bajo' },
        { min: 25.1, max: 37.5, nivel: 'Riesgo medio' },
        { min: 37.6, max: 50.0, nivel: 'Riesgo alto' },
        { min: 50.1, max: 100.0, nivel: 'Riesgo muy alto' }
      ],
      relacionesFamiliares: [
        { min: 0, max: 8.3, nivel: 'Sin riesgo' },
        { min: 8.4, max: 25.0, nivel: 'Riesgo bajo' },
        { min: 25.1, max: 33.3, nivel: 'Riesgo medio' },
        { min: 33.4, max: 50.0, nivel: 'Riesgo alto' },
        { min: 50.1, max: 100.0, nivel: 'Riesgo muy alto' }
      ],
      comunicacionRelaciones: [
        { min: 0, max: 5, nivel: 'Sin riesgo' },
        { min: 5.1, max: 15, nivel: 'Riesgo bajo' },
        { min: 15.1, max: 25.0, nivel: 'Riesgo medio' },
        { min: 25.1, max: 35, nivel: 'Riesgo alto' },
        { min: 35.1, max: 100.0, nivel: 'Riesgo muy alto' }
      ],
      situacionEconomica: [
        { min: 0, max: 16.7, nivel: 'Sin riesgo' },
        { min: 16.8, max: 25.0, nivel: 'Riesgo bajo' },
        { min: 25.1, max: 41.7, nivel: 'Riesgo medio' },
        { min: 41.8, max: 50.0, nivel: 'Riesgo alto' },
        { min: 50.1, max: 100.0, nivel: 'Riesgo muy alto' }
      ],
      caracteristicasVivienda: [
        { min: 0, max: 5.6, nivel: 'Sin riesgo' },
        { min: 5.7, max: 11.1, nivel: 'Riesgo bajo' },
        { min: 11.2, max: 16.7, nivel: 'Riesgo medio' },
        { min: 16.8, max: 27.8, nivel: 'Riesgo alto' },
        { min: 27.9, max: 100.0, nivel: 'Riesgo muy alto' }
      ],
      influenciaEntorno: [
        { min: 0, max: 0.9, nivel: 'Sin riesgo' },
        { min: 1, max: 16.7, nivel: 'Riesgo bajo' },
        { min: 16.8, max: 25, nivel: 'Riesgo medio' },
        { min: 25.1, max: 41.7, nivel: 'Riesgo alto' },
        { min: 41.8, max: 100.0, nivel: 'Riesgo muy alto' }
      ],
      desplazamientoVivienda: [
        { min: 0, max: 0.9, nivel: 'Sin riesgo' },
        { min: 1, max: 12.5, nivel: 'Riesgo bajo' },
        { min: 12.6, max: 25.0, nivel: 'Riesgo medio' },
        { min: 25.1, max: 43.8, nivel: 'Riesgo alto' },
        { min: 43.9, max: 100.0, nivel: 'Riesgo muy alto' }
      ]
    }
  };

  return rangos[tipoForm][dimension];
};

export const getNivelRiesgo = (puntaje: number, rangos: NivelRiesgo[]):string => {
    for (const rango of rangos) {
      if (puntaje >= rango.min && puntaje <= rango.max) {
        return rango.nivel;
      }
    }
    return 'No clasificado';
  
  };

type RangosFinales = {
    [key in TipoForm]: NivelRiesgo[];
  };
export const getRangosRiesgoEstres = (tipoForm: TipoForm): NivelRiesgo[] => {
  const rangos: RangosFinales = {
    'A': [
      { min: 0, max: 7.8, nivel: 'Sin riesgo' },
      { min: 7.9, max: 12.6, nivel: 'Riesgo bajo' },
      { min: 12.7, max: 17.7, nivel: 'Riesgo medio' },
      { min: 17.8, max: 25, nivel: 'Riesgo alto' },
      { min: 25.1, max: 100.1, nivel: 'Riesgo muy alto' }
    ],
    'B': [
      { min: 0, max: 6.5, nivel: 'Sin riesgo' },
      { min: 6.6, max: 11.8, nivel: 'Riesgo bajo' },
      { min: 11.9, max: 17, nivel: 'Riesgo medio' },
      { min: 17.1, max: 23.4, nivel: 'Riesgo alto' },
      { min: 23.5, max: 100.1, nivel: 'Riesgo muy alto' }
    ]
  };

  return rangos[tipoForm];
}


// type DimensionesEstres = 
//   | 'sintomasFisiologicos'
//   | 'comportamientoSocial'
//   | 'sintomasLaborales'
//   | 'sintomasPsicoemocionales';

// type RangosPorDimensionEstres = {
//     [key in DimensionesEstres]: NivelRiesgo[];
//   };
// type RangosEstres = {
//     [key in TipoForm]: RangosPorDimensionEstres;
//   };

//   export const getRangosRiesgoEstres = (tipoForm: TipoForm, dimension: DimensionesEstres): NivelRiesgo[] => {
//     const rangos: RangosEstres = {
//       'A': {
//         sintomasFisiologicos: [
//           { min: 0, max: 6.3, nivel: 'Sin riesgo' },
//           { min: 6.4, max: 25.0, nivel: 'Riesgo bajo' },
//           { min: 25.1, max: 37.5, nivel: 'Riesgo medio' },
//           { min: 37.6, max: 50.0, nivel: 'Riesgo alto' },
//           { min: 50.1, max: 100.0, nivel: 'Riesgo muy alto' }
//         ],
//         comportamientoSocial: [
//           { min: 0, max: 8.3, nivel: 'Sin riesgo' },
//           { min: 8.4, max: 25.0, nivel: 'Riesgo bajo' },
//           { min: 25.1, max: 33.3, nivel: 'Riesgo medio' },
//           { min: 33.4, max: 50.0, nivel: 'Riesgo alto' },
//           { min: 50.1, max: 100.0, nivel: 'Riesgo muy alto' }
//         ],
//         sintomasLaborales: [
//           { min: 0, max: 5.0, nivel: 'Sin riesgo' },
//           { min: 5.1, max: 15.0, nivel: 'Riesgo bajo' },
//           { min: 15.1, max: 25.0, nivel: 'Riesgo medio' },
//           { min: 25.1, max: 35.0, nivel: 'Riesgo alto' },
//           { min: 35.1, max: 100.0, nivel: 'Riesgo muy alto' }
//         ],
//         sintomasPsicoemocionales: [
//           { min: 0, max: 16.7, nivel: 'Sin riesgo' },
//           { min: 16.8, max: 25.0, nivel: 'Riesgo bajo' },
//           { min: 25.1, max: 41.7, nivel: 'Riesgo medio' },
//           { min: 41.8, max: 50.0, nivel: 'Riesgo alto' },
//           { min: 50.1, max: 100.0, nivel: 'Riesgo muy alto' }
//         ]
//       },
//       'B': {
//         sintomasFisiologicos: [
//           { min: 0, max: 6.3, nivel: 'Sin riesgo' },
//           { min: 6.4, max: 25.0, nivel: 'Riesgo bajo' },
//           { min: 25.1, max: 37.5, nivel: 'Riesgo medio' },
//           { min: 37.6, max: 50.0, nivel: 'Riesgo alto' },
//           { min: 50.1, max: 100.0, nivel: 'Riesgo muy alto' }
//         ],
//         comportamientoSocial: [
//           { min: 0, max: 8.3, nivel: 'Sin riesgo' },
//           { min: 8.4, max: 25.0, nivel: 'Riesgo bajo' },
//           { min: 25.1, max: 33.3, nivel: 'Riesgo medio' },
//           { min: 33.4, max: 50.0, nivel: 'Riesgo alto' },
//           { min: 50.1, max: 100.0, nivel: 'Riesgo muy alto' }
//         ],
//         sintomasLaborales: [
//           { min: 0, max: 5.0, nivel: 'Sin riesgo' },
//           { min: 5.1, max: 15.0, nivel: 'Riesgo bajo' },
//           { min: 15.1, max: 25.0, nivel: 'Riesgo medio' },
//           { min: 25.1, max: 35.0, nivel: 'Riesgo alto' },
//           { min: 35.1, max: 100.0, nivel: 'Riesgo muy alto' }
//         ],
//         sintomasPsicoemocionales: [
//           { min: 0, max: 16.7, nivel: 'Sin riesgo' },
//           { min: 16.8, max: 25.0, nivel: 'Riesgo bajo' },
//           { min: 25.1, max: 41.7, nivel: 'Riesgo medio' },
//           { min: 41.8, max: 50.0, nivel: 'Riesgo alto' },
//           { min: 50.1, max: 100.0, nivel: 'Riesgo muy alto' }
//         ]
//       }
//     };
  
//     return rangos[tipoForm][dimension];
//   };