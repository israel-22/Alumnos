import React from 'react';

interface Alumno {
    nombre: string;
    edad: number;
    calificaciones: number[];
}

interface Props {
    alumno: Alumno;
    index: number;
    handleCalificacionChange: (index: number, calificacionIndex: number, value: string) => void;
    calcularAprobacion: (calificacion: number) => string;
}

const AlumnoItem: React.FC<Props> = ({ alumno, index, handleCalificacionChange, calcularAprobacion }) => {
    return (
        <div>
            <h3>{alumno.nombre}</h3>
            <div>
                {alumno.calificaciones.map((calificacion, calificacionIndex) => (
                    <input 
                        key={calificacionIndex}
                        type="number" 
                        value={calificacion} 
                        onChange={(e) => handleCalificacionChange(index, calificacionIndex, e.target.value)}
                    />
                ))}
            </div>
            <p>Resultado: {calcularAprobacion(Math.max(...alumno.calificaciones))}</p>
        </div>
    );
};

export default AlumnoItem;
