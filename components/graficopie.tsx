'use client'
import React from 'react'
import { TrendingUp } from 'lucide-react';
import { Label, Pie, PieChart } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
 
const chartConfig = {
    personas: {
        label: "Personas",
    },
    alto: {
        label: "Alto Riesgo",
        color: "hsl(0 84% 60%)",
    },
    medio: {
        label: "Medio Riesgo",
        color: "hsl( 32 95% 44%)",
    },
    bajo: {
        label: "Bajo Riesgo",
        color: "hsl(174 72% 56%)",
    },
    sinRiesgo: {
        label: "Sin Riesgo",
        color: "hsl(142 72% 29%)",
    }
} satisfies ChartConfig
type ChartItem = {
    riesgo: string;
    personas: number;
    fill: string;
  }
type CardProps = {
    title: string;
    description?: string;
    chartData: ChartItem[];
    className?: string;
  }



function GraficoPie({
    title,
    description="Evaluación Actual",
    chartData,
    className,
  }: CardProps) {
    const totalPersonas = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.personas, 0)
    }, [])
    const getRiesgoMasComun = React.useMemo(() => {
        return chartData.reduce((max, current) => 
            current.personas > max.personas ? current : max
        , chartData[0]);
    }, [chartData]);
    const formatRiesgo = (riesgo: string) => {
        const formatMap: { [key: string]: string } = {
            'alto': 'Riesgo Alto',
            'medio': 'Riesgo Medio',
            'bajo': 'Riesgo Bajo',
            'sinRiesgo': 'Sin Riesgo'
        };
        return formatMap[riesgo] || riesgo;
    };
    const getShadowClass = (riesgo: string) => {
        const shadowMap: { [key: string]: string } = {
            'alto': 'shadow-[inset_0_2px_15px_0_rgba(220,38,38,0.3)]',
            'medio': 'shadow-[inset_0_2px_15px_0_rgba(234,179,8,0.3)]',
            'bajo': 'shadow-[inset_0_2px_15px_0_rgba(45,212,191,0.3)]',
            'sinRiesgo': 'shadow-[inset_0_2px_15px_0_rgba(34,197,94,0.3)]'
        };
        return shadowMap[riesgo] || '';
    };

    return (
        <div className='flex border rounded-2xl shadow-md bg-gray-50  md:w-full xl:w-full lg:w-full 2xl:w-[49%] justify-between'>
            <Card className={`flex flex-col ${className} ${getShadowClass(getRiesgoMasComun.riesgo)}`}>
                <CardHeader className="items-center pb-0">
                    <CardTitle className='text-center'>{title}</CardTitle>
                    <CardDescription className='font-bold'>{formatRiesgo(getRiesgoMasComun.riesgo)}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square max-h-[250px]"
                    >
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Pie
                                data={chartData}
                                dataKey="personas"
                                nameKey="riesgo"
                                innerRadius={60}
                                strokeWidth={5}
                            >
                                <Label
                                    content={({ viewBox }) => {
                                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                            return (
                                                <text
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                >
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        className="fill-foreground text-3xl font-bold"
                                                    >
                                                        {((getRiesgoMasComun.personas / totalPersonas) * 100).toFixed(0)}%
          
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={(viewBox.cy || 0) + 24}
                                                        className="fill-muted-foreground"
                                                    >
                                                        {formatRiesgo(getRiesgoMasComun.riesgo)}
                                                        
                                                    </tspan>
                                                </text>
                                            )
                                        }
                                    }}
                                />
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 font-medium leading-none">
                        Variación del 5.2% respecto al mes anterior <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="leading-none text-muted-foreground">
                        Mostrando distribución total de riesgo psicosocial
                    </div>
                </CardFooter>
            </Card>
            <div className='w-[60%] p-4 flex flex-col justify-center ml-4'>
                <h3 className="text-lg font-bold mb-2 text-center">Recomendación</h3>
                <ul className="list-disc list-inside marker:text-green-500 ">
                    <li className="mb-2">Primer elemento de la lista</li>
                    <li className="mb-2">Segundo elemento de la lista</li>
                    <li className="mb-2">Tercer elemento de la lista</li>
                    <li className="mb-2">Cuarto elemento de la lista</li>
                </ul>
            </div>
        </div>
    )
}

export default GraficoPie