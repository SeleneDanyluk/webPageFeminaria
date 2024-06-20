import React from 'react'
import { useContext, useEffect, useState, createContext } from "react";
import axios from 'axios';

const UseAxios = () => {
    const { token } = useAuth();

    useEffect(() => {
        const axiosInstance = axios.create();

        const requestInterceptor = axiosInstance.interceptors.request.use(
            config => {
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );

        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
        };
    }, [token])
    return axios;
};

export default UseAxios;