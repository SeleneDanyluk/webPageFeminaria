import React, { useState } from 'react';
import './createUser.css';

const CreateUser = () => {
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
        console.log(formData);
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
        </form>
    );
};

export default CreateUser;
