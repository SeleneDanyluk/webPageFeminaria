import React, { useState } from 'react';
import './createUser.css';
import ModalPage from '../modalPage/ModalPage'
import useModal from '../../hooks/useModal';

const CreateUser = () => {
    const [titleModal, setTitleModal] = useState('')
    const [bodyModal, setBodyModal] = useState('')
    const { isShown, showModal, hideModal } = useModal()

    const [formData, setFormData] = useState({
        nombre: '',
        mail: '',
        contrasena1: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            name: formData.nombre,
            email: formData.mail,
            password: formData.contrasena1,
            userType: 1
    };

    

    fetch('https://localhost:7069/api/User', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('El email ingresado ya existe en una cuenta');
            }
            return response.json();
        })
        .then(data => {
            setTitleModal('¡Admin creado éxitosamente!')
            setBodyModal('')
            showModal()
            setFormData({
                nombre: '',
                mail: '',
                contrasena1: '',
            });
        })
        .catch(error => {
            setTitleModal('Email inválido')
            setBodyModal(error.message)
            showModal()
        });
    };

    return (
        <form onSubmit={handleSubmit} className="create-user-form">
            <h2>Crear admin</h2>
            <div className="input-group">
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                />
            </div>
            <div className="input-group">
                <input
                    type="email"
                    name="mail"
                    placeholder="Mail"
                    value={formData.mail}
                    onChange={handleChange}
                />
            </div>
            <div className="input-group">
                <input
                    type="password"
                    name="contrasena1"
                    placeholder="Contraseña"
                    value={formData.contrasena1}
                    onChange={handleChange}
                />
            </div>
            <div className="button-group">
                <button type="submit">Enviar</button>
            </div>
            <ModalPage 
                title={titleModal}
                body={bodyModal}
                show={isShown}
                onClose={hideModal}
            />
        </form>
    );
};

export default CreateUser;
