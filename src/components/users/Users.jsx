import React, { useEffect, useState } from 'react';
import User from '../user/User';
import './Users.css';

const Users = () => {
    const [users, setUsers] = useState([]);

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
                console.log(usersData)
                setUsers(usersData);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    return (
        <div className="users-container">
            {users.length > 0 ? (
                users.map((user) => (
                    <User
                        key={user.id}
                        name={user.name}
                    />
                ))
            ) : (
                <p>NO HAY NADA PARA MOSTRAR</p>
            )}
        </div>
    );
};

export default Users;
