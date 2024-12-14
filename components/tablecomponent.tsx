'use client'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";
import { useState } from "react";
  

  type ChartItem = {
    tipoDocumento: string;
    numeroDocumento: number;
    nombre: string;
    email: string;
    tipoForm: string;
  }
  type CardProps = {

    chartData: any[];
    className?: string;
  }
  
  export function TableComponent(
    {  
        chartData,
        className,
      }: CardProps
  ) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(chartData.length / itemsPerPage);

    // Obtener los elementos de la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = chartData.slice(indexOfFirstItem, indexOfLastItem);
  
    // Calcular el total de todos los elementos

    
    // Manejar el cambio de página
    const handlePageChange = (pageNumber : number) => {
      setCurrentPage(pageNumber);
    };
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <div className="space-y-4">
      <Table className={`${className}`}>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Documento</TableHead>
            <TableHead>Tipo Documento</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Tipo Form</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((empleado) => (
            <TableRow key={empleado.numeroDocumento}>
              <TableCell className="font-medium">{empleado.numeroDocumento}</TableCell>
              <TableCell>{empleado.tipoDocumento}</TableCell>
              <TableCell>{empleado.nombre}</TableCell>
              <TableCell>{empleado.email}</TableCell>
              <TableCell >{empleado.tipoForm}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>
          
          {pageNumbers.map((number) => (
            <PaginationItem key={number}>
              <PaginationLink
                onClick={() => handlePageChange(number)}
                isActive={currentPage === number}
                className="cursor-pointer"
              >
                {number}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      </div>
    )
  }
  