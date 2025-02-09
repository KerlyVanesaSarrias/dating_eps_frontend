import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Header } from '../../components/Header/Header';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface FormData {
    especialidad: string;
    medico: string;
    fecha: string;
    horario: string;
}

export interface Medico {
    id: number;
    nombre: string;
    especialidad: string;
}

const API_URL = 'http://localhost:8080/api/medicos';

const horariosDisponibles: Record<string, string[]> = {
    '2024-02-10': ['10:00 AM', '02:00 PM', '04:30 PM'],
    '2024-02-11': ['09:00 AM', '01:00 PM', '03:00 PM'],
};

export const DatingPage = () => {
    const { control, handleSubmit, watch, setValue } = useForm({
        defaultValues: {
            especialidad: '',
            medico: '',
            fecha: '',
            horario: '',
        },
    });

    const especialidadSeleccionada = watch('especialidad');
    const fechaSeleccionada: string = watch('fecha');

    const [medicos, setMedicos] = useState<Medico[]>([]);
    const [especialidades, setEspecialidades] = useState<string[]>([]);
    const [fechasDisponibles, setFechasDisponibles] = useState<string[]>([]);
    const [horarios, setHorarios] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMedicos = async () => {
            try {
                const response = await axios.get<Medico[]>(API_URL);
                setMedicos(response.data);

                const especialidadesUnicas = Array.from(
                    new Set(response.data.map((med) => med.especialidad))
                );
                setEspecialidades(especialidadesUnicas);
            } catch (err) {
                console.error('Error al cargar los médicos:', err);
                setError('Error al cargar los médicos');
            } finally {
                setLoading(false);
            }
        };

        fetchMedicos();
    }, []);

    useEffect(() => {
        if (especialidadSeleccionada) {
            setValue('medico', '');
            setValue('fecha', '');
            setValue('horario', '');
        }
    }, [especialidadSeleccionada, setValue]);

    useEffect(() => {
        setFechasDisponibles(Object.keys(horariosDisponibles));
    }, [especialidadSeleccionada]);

    useEffect(() => {
        if (fechaSeleccionada && horariosDisponibles[fechaSeleccionada]) {
            setHorarios(horariosDisponibles[fechaSeleccionada]);
        } else {
            setHorarios([]);
        }
    }, [fechaSeleccionada]);

    const onSubmit = (data: FormData) => {
        console.log('Cita confirmada', data);
        alert('Cita confirmada con éxito');
    };

    return (
        <div>
            <Header />
            <div className="flex justify-center items-center py-10">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="text-5xl font-semibold text-[#16254c] text-center">
                        Agendar Cita Médica
                    </h2>

                    <Controller
                        name="especialidad"
                        control={control}
                        render={({ field }) => (
                            <div className="flex gap-10 pt-20">
                                {loading ? (
                                    <p>Cargando especialidades...</p>
                                ) : error ? (
                                    <p>{error}</p>
                                ) : (
                                    especialidades.map((esp) => (
                                        <label
                                            key={esp}
                                            className="cursor-pointer"
                                        >
                                            <input
                                                className="absolute opacity-0 peer"
                                                type="radio"
                                                {...field}
                                                value={esp}
                                            />
                                            <span className="bg-[#16254c] text-white p-5 rounded-md peer-checked:bg-blue-900 transition">
                                                {esp}
                                            </span>
                                        </label>
                                    ))
                                )}
                            </div>
                        )}
                    />

                    {especialidadSeleccionada && (
                        <div className="flex flex-col pt-10 justify-center items-center">
                            <div className="flex pt-5">
                                <Controller
                                    name="medico"
                                    control={control}
                                    render={({ field }) => (
                                        <select
                                            {...field}
                                            className="p-2 border rounded-md"
                                        >
                                            <option value="">
                                                Seleccione un médico
                                            </option>
                                            {loading ? (
                                                <option>
                                                    Cargando médicos...
                                                </option>
                                            ) : error ? (
                                                <option>{error}</option>
                                            ) : (
                                                medicos
                                                    .filter(
                                                        (med) =>
                                                            med.especialidad ===
                                                            especialidadSeleccionada
                                                    )
                                                    .map((med) => (
                                                        <option
                                                            key={med.id}
                                                            value={med.nombre}
                                                        >
                                                            {med.nombre}
                                                        </option>
                                                    ))
                                            )}
                                        </select>
                                    )}
                                />
                            </div>

                            <div className="flex pt-5">
                                <Controller
                                    name="fecha"
                                    control={control}
                                    render={({ field }) => (
                                        <select
                                            {...field}
                                            className="p-2 border rounded-md"
                                        >
                                            <option value="">
                                                Seleccione una fecha
                                            </option>
                                            {fechasDisponibles.map((fecha) => (
                                                <option
                                                    key={fecha}
                                                    value={fecha}
                                                >
                                                    {fecha}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                />
                            </div>

                            <div className="flex pt-5">
                                <Controller
                                    name="horario"
                                    control={control}
                                    render={({ field }) => (
                                        <select
                                            {...field}
                                            className="p-2 border rounded-md"
                                        >
                                            <option value="">
                                                Seleccione un horario
                                            </option>
                                            {horarios.map((hora) => (
                                                <option key={hora} value={hora}>
                                                    {hora}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                />
                            </div>

                            <div className="flex pt-5">
                                <Link to="/dating-confirmed">
                                    <button
                                        type="submit"
                                        className=" bg-[#16254c] hover:bg-blue-900 text-white py-2 px-4 rounded-md"
                                    >
                                        Confirmar Cita
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};
