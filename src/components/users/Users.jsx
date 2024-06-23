import React, { useEffect, useState, useContext } from 'react';
import User from '../user/User';
import './Users.css';
import UserContext from '../../context/userContext';

const Users = () => {
    const { sub } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [titleModal, setTitleModal] = useState('')
    const [bodyModal, setBodyModal] = useState('')
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    useEffect(() => {
        fetch("https://localhost:7069/api/User", {
            method: "GET",
            mode: "cors",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al obtener los usuarios");
                }
                return response.json();
            })
            .then((usersData) => {
                setUsers(usersData.filter(u => u.userType == 1));
            })
            .catch((error) => {
                console.error("Error:", error);
                setTitleModal('Error')
                setBodyModal(error)
                handleShow()
            });
    }, [users]);

    const handleModify = (sub, password) => {

        console.log(sub)
        console.log(password)

        fetch(`https://localhost:7069/password?id=${sub}&password=${password}`, {
            method: "PUT",
            mode: "cors",
        })
            .then((response) => {
                if (response.status === 204) {
                    const updatedUser = users.find(user => user.sub === sub);
                    if (updatedUser) {
                        updatedUser.password = password;
                        setUsers([...users]);
                    }
                } else if (!response.ok) {
                    throw new Error("Error al modificar el usuario");
                } else {
                    return response.json();
                }
            })
            .then((updatedUser) => {
                if (updatedUser) {
                    setUsers(users.map(user => (user.sub === sub ? updatedUser : user)));
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                setTitleModal('Error')
                setBodyModal(error)
                handleShow()
            });
    };

    const handleDelete = (sub) => {
        fetch(`https://localhost:7069/api/User?id=${sub}`, {
            method: "DELETE",
            mode: "cors",
        })
            .then((response) => {
                if (response.status === 204 || response.ok) {
                    setUsers(users);
                } else {
                    throw new Error("Error al eliminar el usuario");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                setTitleModal('Error')
                setBodyModal(error)
                handleShow()
            });
    };

    return (
        <div className="users-container">
            {users.length > 0 ? (
                users.map((user) => (
                    <User
                        key={user.id}
                        id={user.id}
                        name={user.name}
                        password={user.password}
                        onModify={handleModify}
                        onDelete={handleDelete}
                        sub={sub}
                    />
                ))
            ) : (
                <p>NO HAY NADA PARA MOSTRAR</p>
            )}
            <ModalPage
                title={titleModal}
                body={bodyModal}
                show={showModal}
                onClose={handleClose}
            />
        </div>
    );
};

export default Users;