import { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from '../../components/Header/Header';

interface Cita {
    id: number;
    usuario: {
        id: number;
        email: string;
    };
    medico: {
        id: number;
        nombre: string;
        especialidad: string;
    };
    fechaHora: number[];
    estado: string;
}

export const DatingConfirmed = () => {
    const [citas, setCitas] = useState<Cita[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCitas = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:8080/api/citas?estado=CONFIRMADA'
                );
                setCitas(response.data);
            } catch (err) {
                console.error('Error al obtener las citas:', err);
                setError('No se pudieron cargar las citas confirmadas.');
            } finally {
                setLoading(false);
            }
        };

        fetchCitas();
    }, []);

    const formatFechaHora = (fechaHora: number[]) => {
        if (!fechaHora || fechaHora.length < 5) return 'Fecha inválida';
        const [year, month, day, hour, minute] = fechaHora;
        const date = new Date(year, month - 1, day, hour, minute);
        return date.toLocaleString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    return (
        <div>
            <Header />
            <div className="p-10">
                <h2 className="text-3xl font-semibold text-[#16254c]">
                    Citas Confirmadas
                </h2>

                {loading && <p className="text-gray-600">Cargando citas...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {!loading && !error && citas.length === 0 && (
                    <p className="text-gray-600">No hay citas confirmadas.</p>
                )}

                {!loading && !error && citas.length > 0 && (
                    <table className="w-full mt-5 border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-[#16254c] text-white">
                                <th className="p-2 border">ID</th>
                                <th className="p-2 border">Paciente</th>
                                <th className="p-2 border">Especialidad</th>
                                <th className="p-2 border">Médico</th>
                                <th className="p-2 border">Fecha y Hora</th>
                            </tr>
                        </thead>
                        <tbody>
                            {citas.map((cita) => (
                                <tr
                                    key={cita.id}
                                    className="text-center border"
                                >
                                    <td className="p-2 border">{cita.id}</td>
                                    <td className="p-2 border">
                                        {cita.usuario.email}
                                    </td>
                                    <td className="p-2 border">
                                        {cita.medico.especialidad}
                                    </td>
                                    <td className="p-2 border">
                                        {cita.medico.nombre}
                                    </td>
                                    <td className="p-2 border">
                                        {formatFechaHora(cita.fechaHora)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};
