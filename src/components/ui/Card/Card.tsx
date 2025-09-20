import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format, isValid, parseISO } from 'date-fns';

interface CardProps {
    idPersona: string;
    evaluacion: string;
    fechaRespuesta: Date | string | null;
    fechaNacimiento: Date | string | null;
}

const Card: React.FC<CardProps> = ({ idPersona, fechaRespuesta, fechaNacimiento, evaluacion }) => {
    const navigate = useNavigate();

    const parseFecha = (fecha: Date | string | null): Date | null => {
        if (!fecha) return null;
        if (typeof fecha === 'string') {
            const parsedDate = parseISO(fecha);
            return isValid(parsedDate) ? parsedDate : null;
        }
        return isValid(fecha) ? fecha : null;
    };

    const handleNavigation = () => {
        console.log('Navigating to details with idPersona:', idPersona);
        navigate(`/detalle/${idPersona}`, { state: { evaluacion, fechaRespuesta, fechaNacimiento } });
    };

    const formattedFechaRespuesta = parseFecha(fechaRespuesta)
        ? format(parseFecha(fechaRespuesta)!, 'dd/MM/yyyy')
        : 'Fecha inválida';

    const formattedFechaNacimiento = parseFecha(fechaNacimiento)
        ? format(parseFecha(fechaNacimiento)!, 'dd/MM/yyyy')
        : 'Fecha inválida';

    return (
        <div className="card-body mere_card mb-2">
            <small className='text_cut'>{idPersona}</small>
            <p className="p_title_bold">Evaluación</p>
            <small className='small_answer'>{evaluacion}</small>
            <p className='p_title_bold'>Fecha de Respuesta</p>
            <small className='small_answer'>{formattedFechaRespuesta}</small>
            <p className='p_title_bold'>Fecha de Nacimiento</p>
            <small className='small_answer'>{formattedFechaNacimiento}</small>
            <button className='vlad_details_button' onClick={handleNavigation}>
                Ver más detalles
            </button>
        </div>
    );
};

export default Card;