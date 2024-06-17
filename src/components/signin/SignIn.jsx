import React, { useState } from 'react';
import './SignIn.css';

const SignInForm = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        mail: '',
        telefono: '',
        tarjeta: '',
        direccion: '',
        dni: '',
        contrasena1: '',
        contrasena2: '',
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
        <form onSubmit={handleSubmit} className="sign-in-form">
            <h2>Tus datos</h2>
            <div>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="direccion"
                    placeholder="Dirección"
                    value={formData.direccion}
                    onChange={handleChange}
                />
            </div>
            <div>
                <input
                    type="text"
                    name="apellido"
                    placeholder="Apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="dni"
                    placeholder="Dni"
                    value={formData.dni}
                    onChange={handleChange}
                />
            </div>
            <div>
                <input
                    type="email"
                    name="mail"
                    placeholder="Mail"
                    value={formData.mail}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="contrasena1"
                    placeholder="Contraseña"
                    value={formData.contrasena1}
                    onChange={handleChange}
                />
            </div>
            <div>
                <input
                    type="tel"
                    name="telefono"
                    placeholder="Teléfono"
                    value={formData.telefono}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="contrasena2"
                    placeholder="Repetir contraseña"
                    value={formData.contrasena2}
                    onChange={handleChange}
                />
            </div>
            <div>
                <input
                    type="text"
                    name="tarjeta"
                    placeholder="Ingresar tarjeta (opcional)"
                    value={formData.tarjeta}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Enviar</button>
        </form>
    );
};

export default SignInForm;
