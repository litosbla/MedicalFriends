import React from 'react'

function Empleados({params}:{params:{nit:string}}) {
  const {nit} = params
  return (
    <div>{nit}</div>
  )
}

export default Empleados