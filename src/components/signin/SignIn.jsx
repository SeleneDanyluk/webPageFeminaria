import React, { useState, useRef } from 'react';
import './SignIn.css';
import { useNavigate } from "react-router-dom";
import ModalPage from '../modalPage/ModalPage'
import useModal from '../../hooks/useModal';


const SignInForm = () => {
    const [titleModal, setTitleModal] = useState('')
    const [bodyModal, setBodyModal] = useState('')
    const { isShown, showModal, hideModal } = useModal()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        userType: 0
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const name = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.password) {
            setErrorMessage('Todos los campos son obligatorios. Por favor, complete todos los campos.');
            setTitleModal('Error')
            setBodyModal('Todos los campos son obligatorios. Por favor, complete todos los campos.')
            showModal()
            setTimeout(() => {
                setErrorMessage('');
            }, 10000);
            return;
        }
        try {
            const response = await fetch('https://localhost:7069/api/User', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),

            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const data = await response.json();
            setTitleModal('¡Usuario creado éxitosamente!')
            setBodyModal('')
            showModal()

            setTimeout(() => {
                navigate('/login');
            }, 2500);

            setFormData({
                name: '',
                email: '',
                password: '',
                userType: 0
            });

        } catch (error) {
            setFormData({
                name: '',
                email: '',
                password: '',
                userType: 0
            });
            setTitleModal('Error')
            setBodyModal(error.message)
            showModal()
            setTimeout(() => {
                setErrorMessage('');
            }, 5000);
        }
    };

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit} className="sign-in-form">
                <h2>REGISTRATE EN FEMINARIA</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Registrarse</button>
                <ModalPage
                    title={titleModal}
                    body={bodyModal}
                    show={isShown}
                    onClose={hideModal}
                />
            </form>
        </div>
    );
};

export default SignInForm;
