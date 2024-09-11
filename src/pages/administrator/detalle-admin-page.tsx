import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Layout from '../../components/layout-component';
import { useAuth } from '../../services/auth-service';
import axios from 'axios';

interface PreguntaRespuesta {
    id_pregunta: string;
    texto_pregunta: string;
    texto_respuesta: string;
}

interface PersonaDetalle {
    id_persona: string;
    fecha_nacimiento: string;
    universidad: string;
    carrera: string;
    sexo: string;
    evaluacion: string;
    fecha_respuesta: string;
    puntuacion: number; // Puntuación total
    preguntas_respuestas: PreguntaRespuesta[];
}

const DetalleAdmin: React.FC = () => {
    const { idPersona } = useParams<{ idPersona: string }>();
    const [detalles, setDetalles] = useState<PersonaDetalle | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { user, logout } = useAuth();
    const location = useLocation();
    const API_BASE_URL = 'http://localhost:3001/api';

    useEffect(() => {
        console.log('ID de Persona desde useParams:', idPersona);  // Verifica que el ID se esté obteniendo correctamente
        const fetchDetalles = async () => {
            try {
                if (idPersona) {
                    const response = await axios.get(`${API_BASE_URL}/detalle/${idPersona}`);
                    const personaData = response.data[0]; // Acceder al primer (y único) elemento del array           
                    console.log('Datos de la persona:', personaData);
                    setDetalles(response.data);
                    setLoading(false);
                } else {
                    console.error('ID de persona no proporcionado');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los detalles de la persona:', error);
                setLoading(false);
            }
        };

        fetchDetalles();
    }, [idPersona]);

    if (loading) {
        return <p>Cargando datos...</p>;
    }

    if (!detalles) {
        return <div>No se encontraron datos de la persona.</div>;
    }

    // Verificar los datos que llegan desde el estado de la navegación
    console.log('location state:', location.state);

    return (
        <Layout
            user={user}
            handleLogout={logout}
            title='Detalles del Test Seleccionado'
            subtitle=''
            titleClassName="vlad_result_title"
        >
            <section className='mere_detalles_section'>
                <small className='carrera'>
                    {detalles.carrera}
                </small>
                <div className="mere_card_detalles_container">
                    <div className="mere_card_detalles">
                        <p className="detalles_title">Fecha de Nacimiento</p>
                        <p className="detalles_answer">{new Date(detalles.fecha_nacimiento).toLocaleDateString()}</p>

                    </div>
                    <div className="mere_card_detalles">
                        <p className='detalles_title'>Fecha de Evaluación <br /> </p>
                        <p className="detalles_answer">{new Date(detalles.fecha_respuesta).toLocaleDateString()}</p>

                    </div>
                    <div className="mere_card_detalles">
                        <p className='detalles_title'>Sexo <br /> </p>
                        <p className='detalles_answer'> {detalles.sexo} </p>
                    </div>
                    <div className="mere_card_detalles">
                        <p className='detalles_title'>Facultad <br /> </p>
                        <p className='detalles_answer'> {detalles.universidad} </p>
                    </div>
                    {/* <div className="vlad_card">
                        <p className='mere_p'>Carrera <br /> </p>
                        <p className='vlad_p'> {detalles.carrera} </p>
                    </div> */}

                </div>
                <article className="mere_sofa">
                    <div className="mere_detalles_respuestas">
                        <div>
                            <div className='mere_detalles_header'>
                                <div className='mere_detalles_header_item table_item_1'>
                                    <h4>
                                        N°
                                    </h4>
                                </div>
                                <div className='mere_detalles_header_item table_item_2'>
                                    <h4>
                                        Preguntas
                                    </h4>
                                </div>
                                <div className='mere_detalles_header_item table_item_3'>
                                    <h4>
                                        Respuestas
                                    </h4>
                                </div>
                            </div>
                            <div className='mere_detalles_cuerpo'>
                                {detalles.preguntas_respuestas.map((pr, index) => (
                                    <div key={index} className='mere_detalles_filas'>
                                        <div className='mere_detalles_cp_item table_item_1'>
                                            <p>
                                                {index + 1}
                                            </p>
                                        </div>
                                        <div className='mere_detalles_cp_item table_item_2'>
                                            <p>
                                                {pr.texto_pregunta}
                                            </p>
                                        </div>
                                        <div className='mere_detalles_cp_item table_item_3'>
                                            <p>
                                                {pr.texto_respuesta || 'Nada'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mere_resultado_detalle">
                        <p className="mere_resultado_detalle_p">
                            {detalles.evaluacion}
                        </p>
                    </div>

                </article>
                <div className="mere_resultado_detalle">
                    <p className="mere_resultado_detalle_p">
                            Puntuación Total: {detalles.puntuacion}
                        </p>
                    </div>
            </section>
        </Layout>
    );
};

export default DetalleAdmin;
