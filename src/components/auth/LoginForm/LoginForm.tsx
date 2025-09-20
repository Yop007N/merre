import React, { useState } from 'react';
import { useAuth } from '../../../services/auth-service';
import { Link, useNavigate } from 'react-router-dom';

interface LoginFormProps {
    isAdmin?: boolean;
}

interface LoginFormData {
    email: string;
    password: string;
}

interface ValidationErrors {
    email?: string;
    password?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ isAdmin = false }) => {
    const { login } = useAuth() as { login: (email: string, password: string) => Promise<void> };

    const [formData, setFormData] = useState<LoginFormData>({
        email: isAdmin ? 'admin@gmail.com' : '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

    const navigate = useNavigate();

    const validateForm = (): ValidationErrors => {
        const errors: ValidationErrors = {};

        if (!formData.email) {
            errors.email = 'El correo electrónico es requerido';
        } else if (!isEmailValid(formData.email)) {
            errors.email = 'Por favor, introduce un correo electrónico válido';
        }

        if (!formData.password) {
            errors.password = 'La contraseña es requerida';
        } else if (!isPasswordValid(formData.password)) {
            errors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        return errors;
    };

    const handleInputChange = (field: keyof LoginFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Clear validation error for this field
        if (validationErrors[field]) {
            setValidationErrors(prev => ({ ...prev, [field]: undefined }));
        }

        // Clear general error
        if (error) {
            setError('');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        try {
            setError('');
            setValidationErrors({});
            setIsLoading(true);

            await login(formData.email, formData.password);

            // Navigate based on user type
            const redirectPath = isAdmin ? '/admin-page' : '/user-page';
            navigate(redirectPath);

        } catch (error) {
            const errorMessage = error instanceof Error
                ? error.message
                : 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const isEmailValid = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isPasswordValid = (password: string): boolean => {
        return password.length >= 6;
    };

    return (
        <div className="login-form-container" style={{ maxWidth: '400px', margin: 'auto' }}>
            <form onSubmit={handleSubmit} noValidate>
                <div className="text-center mb-4">
                    <h1 className="h3 mb-3 font-weight-normal">
                        ¡Bienvenido a AnxieSense!
                    </h1>
                    <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px', color: '#666' }}>
                        {isAdmin ? 'Acceso de Administrador' : 'Iniciar sesión'}
                    </h5>
                </div>

                {error && (
                    <div className="alert alert-danger mb-3" role="alert">
                        {error}
                    </div>
                )}

                <div className="form-outline inputGroup-sizing-sm">
                    <input
                        type="email"
                        id="email"
                        className={`form-control form-control-sm mb-3 ${validationErrors.email ? 'is-invalid' : ''}`}
                        placeholder="Correo electrónico"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        disabled={isAdmin || isLoading}
                        required
                        aria-describedby="email-error"
                    />
                    {validationErrors.email && (
                        <div id="email-error" className="invalid-feedback d-block">
                            {validationErrors.email}
                        </div>
                    )}
                </div>

                <div className="input-group mb-3">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        className={`form-control form-control-sm ${validationErrors.password ? 'is-invalid' : ''}`}
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        disabled={isLoading}
                        required
                        aria-describedby="password-error"
                    />
                    <button
                        type="button"
                        className="input-group-text"
                        style={{ cursor: 'pointer' }}
                        onClick={togglePasswordVisibility}
                        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        disabled={isLoading}
                    >
                        <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} style={{ color: '#666' }}></i>
                    </button>
                    {validationErrors.password && (
                        <div id="password-error" className="invalid-feedback d-block">
                            {validationErrors.password}
                        </div>
                    )}
                </div>

                <div className="pt-1 mb-4 d-flex justify-content-center">
                    <button
                        className="btn btn-primary btn-boton btn-sm btn-block"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Accediendo...
                            </>
                        ) : (
                            'Acceder'
                        )}
                    </button>
                </div>

                <small className="mb-2 d-flex justify-content-center" style={{ color: '#666' }}>
                    {!isAdmin ? (
                        <>
                            ¿Eres administrador?{' '}
                            <Link to="/login-admin" style={{ color: '#508bfc', marginLeft: '10px' }}>
                                Ingresa aquí
                            </Link>
                        </>
                    ) : (
                        <>
                            ¿No eres administrador?{' '}
                            <Link to="/" style={{ color: '#508bfc', marginLeft: '10px' }}>
                                Ingresa aquí
                            </Link>
                        </>
                    )}
                </small>

                {!isAdmin && (
                    <small className="mb-4 d-flex justify-content-center" style={{ color: '#666' }}>
                        ¿No tienes una cuenta?{' '}
                        <Link to="/register-page" style={{ color: '#508bfc', marginLeft: '10px' }}>
                            Regístrate aquí
                        </Link>
                    </small>
                )}
            </form>
        </div>
    );
};

export default LoginForm;