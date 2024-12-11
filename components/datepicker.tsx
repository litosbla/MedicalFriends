"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function DatePickerForm() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Crea una nueva cita</CardTitle>
        <CardDescription>Escoge la fecha ideal para la cita</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Selecciona una fecha</Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button className="text-white bg-green-500 border">Agregar</Button>
      </CardFooter>
    </Card>
  )
}
