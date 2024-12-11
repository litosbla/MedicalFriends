"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts"

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
const chartData = [
    { riesgo: "alto", personas: 50, fill: "var(--color-alto)" },
    { riesgo: "medio", personas: 60, fill: "var(--color-medio)" },
    { riesgo: "bajo", personas: 80, fill: "var(--color-bajo)" },
    { riesgo: "sinRiesgo", personas: 75, fill: "var(--color-sinRiesgo)" }
  ]
  
  const chartConfig = {
    personas: {
      label: "Personas",
    },
    alto: {
      label: "Alto",
      color: "hsl(var(--chart-1))",
    },
    medio: {
      label: "Medio",
      color: "hsl(var(--chart-2))",
    },
    bajo: {
      label: "Bajo",
      color: "hsl(var(--chart-3))",
    },
    sinRiesgo: {
      label: "Sin Riesgo",
      color: "hsl(var(--chart-4))",
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
export function GraficoBarras({  title,
    description="Evaluación Actual",
    chartData,
    className,
  }: CardProps) {
  return (
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="riesgo"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="personas"
              strokeWidth={2}
              radius={8}
              activeIndex={2}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                )
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
