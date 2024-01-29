import React, { useState } from 'react';

interface Alumno {
    nombre: string;
    edad: number;
    calificaciones: {
        [key: string]: number;
    };
    promedio: number;
    paso: boolean;
}

const inicializarAlumnos: Alumno[] = [
    {
        nombre: "Viviana",
        edad: 19,
        calificaciones: {
            calificacion1: 0,
            calificacion2: 0,
            calificacion3: 0
        },
        promedio: 0,
        paso: false,
    },
    {
        nombre: "Wendy",
        edad: 20,
        calificaciones: {
            calificacion1: 0,
            calificacion2: 0,
            calificacion3: 0
        },
        promedio: 0,
        paso: false,
    },
    {
        nombre: "Gerson",
        edad: 18,
        calificaciones: {
            calificacion1: 0,
            calificacion2: 0,
            calificacion3: 0
        },
        promedio: 0,
        paso: false,
    }
];

const RegistroCalificaciones = () => {
    const [alumnos, setAlumnos] = useState<Alumno[]>(inicializarAlumnos);

    const handleCalificacionChange = (index: number, calificacionKey: string, value: string) => {
        const newAlumnos = [...alumnos];
        const parsedValue = parseInt(value);
        if (!isNaN(parsedValue)) {
            newAlumnos[index].calificaciones[calificacionKey] = parsedValue;
            setAlumnos(newAlumnos);
        } else {
            console.error("Valor ingresado no es un número válido.");
        }
    };

    const calcularPromedio = (calificaciones: { [key: string]: number }): number => {
        const suma = Object.values(calificaciones).reduce((acc, curr) => acc + curr, 0);
        return suma / Object.keys(calificaciones).length;
    };

    const handleCalcularPromedio = (index: number) => {
        const promedio = calcularPromedio(alumnos[index].calificaciones);
        const paso = promedio >= 7;
        const newAlumnos = [...alumnos];
        newAlumnos[index] = {
            ...newAlumnos[index],
            promedio: promedio,
            paso: paso
        };
        setAlumnos(newAlumnos);
    };

    return (
        <div>
            {alumnos.map((alumno, index) => (
                <div key={index}>
                    <h3>{alumno.nombre} - Edad: {alumno.edad}</h3>
                    {Object.keys(alumno.calificaciones).map((calificacionKey, calificacionIndex) => (
                        <input 
                            key={calificacionIndex}
                            type="number"
                            min="0"
                            max="10"
                            value={alumno.calificaciones[calificacionKey]} 
                            onChange={(e) => handleCalificacionChange(index, calificacionKey, e.target.value)}
                        />
                    ))}
                    <button onClick={() => handleCalcularPromedio(index)}>Calcular Promedio</button>
                    <p>
                        Promedio: {alumno.promedio.toFixed(2)} 
                        {alumno.paso ? " - Pasa" : " - No Pasa"}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default RegistroCalificaciones;

