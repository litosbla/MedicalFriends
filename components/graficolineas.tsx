"use client"
import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const chartConfig = {
    alto: {
        label: "Riesgo Alto",
        color: "hsl(0 84% 60%)",
    },
    medio: {
        label: "Riesgo Medio",
        color: "hsl( 32 95% 44%)",
    },
    bajo: {
        label: "Riesgo Bajo",
        color: "hsl(174 72% 56%)",
    },
    sinRiesgo: {
        label: "Sin Riesgo",
        color: "hsl(142 72% 29%)",
    },
} satisfies ChartConfig

type ChartItem = {
  month: string;
  alto: number;
  medio: number;
  bajo: number;
  sinRiesgo: number;
}
type CardProps = {
  title: string;
  description?: string;
  chartData: ChartItem[];
  className?: string;
}



export function GraficoLineas(
{  title,
  description="Evaluación de los ultimos 6 meses",
  chartData,
  className,
}: CardProps) {
  return (
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="alto"
              type="natural"
              fill="var(--color-alto)"
              fillOpacity={0.4}
              stroke="var(--color-alto)"
              stackId="a"
            />
            <Area
              dataKey="medio"
              type="natural"
              fill="var(--color-medio)"
              fillOpacity={0.4}
              stroke="var(--color-medio)"
              stackId="b"
            />
            <Area
              dataKey="bajo"
              type="natural"
              fill="var(--color-bajo)"
              fillOpacity={0.4}
              stroke="var(--color-bajo)"
              stackId="c"
            />
            <Area
              dataKey="sinRiesgo"
              type="natural"
              fill="var(--color-sinRiesgo)"
              fillOpacity={0.4}
              stroke="var(--color-sinRiesgo)"
              stackId="d"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
