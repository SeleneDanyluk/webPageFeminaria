import React, {useState} from 'react';
import { Button, FormControl } from 'react-bootstrap';
import './User.css';

const User = ({ id, name, password, onModify, onDelete, sub  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newPassword, setNewPassword] = useState('');

    const handleModifyClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        console.log(sub)
        onModify(id, newPassword);
        setIsEditing(false);
        setNewPassword('');
    };

    return (
        <div className="user-container">
            <p>Usuario: {name}</p>
            {isEditing ? (
                <>
                    <FormControl
                        type="password"
                        placeholder="Nueva Contraseña"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="user-input"
                    />
                    <Button variant="secondary" className="user-button" onClick={handleSaveClick}>Guardar</Button>
                </>
            ) : (
                <Button variant="secondary" className="user-button" onClick={handleModifyClick}>Modificar</Button>
            )}
            <Button variant="secondary" className="user-button" onClick={() => onDelete(id)}>Eliminar</Button>
            {sub === id && (
                <Button variant="primary" className="user-button">Acción Especial</Button>
            )}
        </div>
    );
};

export default User;