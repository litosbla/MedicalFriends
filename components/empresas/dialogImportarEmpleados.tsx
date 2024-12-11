import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Upload } from "lucide-react"
import * as XLSX from 'xlsx'
import { toast } from "@/hooks/use-toast"
interface DialogImportarEmpleadosProps {
    onDataLoad: (data: EmpleadoData[]) => void;
  }

interface EmpleadoData {
    tipoDocumento: "CEDULA_CIUDADANIA" | "CEDULA_EXTRANJERIA" | "OTRA";
    numeroDocumento: string;
    nombre: string;
    email: string;
    tipoForm: "A" | "B";
  }
export function DialogImportarEmpleados({ onDataLoad }: DialogImportarEmpleadosProps) {
    const [open, setOpen] = useState(false)
    const [dragActive, setDragActive] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
          setDragActive(true)
        } else if (e.type === "dragleave") {
          setDragActive(false)
        }
      }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
    
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          setFile(e.dataTransfer.files[0])
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
          setFile(e.target.files[0])
        }
      }
    const handleSubmit = async () => {
        if (!file) return;
        setLoading(true)
    
        try {
          const data = await file.arrayBuffer();
          const workbook = XLSX.read(data);
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(worksheet) as EmpleadoData[];
          
          console.log('Datos del Excel:', jsonData);
          onDataLoad(jsonData);
          
          
    
          setOpen(false);
          setFile(null);
          
        } catch (error) {
          console.error('Error al leer el Excel:', error);
          toast({
            title: "Error",
            description: "Hubo un error al leer el archivo Excel",
            variant: "destructive"
          });
        } finally {
          setLoading(false);
        }
    }
    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Importa</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-black">
        <DialogHeader>
          <DialogTitle className="text-green-500 text-xl">Importa a los empleados</DialogTitle>
          <DialogDescription>
            Solo se aceptan aarchivos .xlsx (excel)
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-center w-full">
          <label
              htmlFor="dropzone-file"
              className={`flex flex-col items-center justify-center w-full h-64 
              border-2 border-dashed rounded-lg cursor-pointer 
              ${dragActive 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-300 bg-gray-50'} 
              hover:bg-gray-100`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                </p>
                <p className="text-xs text-gray-500">Archivo Excel (XLSX)</p>
                {file && (
                  <p className="mt-2 text-sm text-green-500">
                    Archivo seleccionado: {file.name}
                  </p>
                )}
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept=".xlsx"
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={!file || loading}> {loading ? 'Procesando...' : 'Importar Empleados'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
