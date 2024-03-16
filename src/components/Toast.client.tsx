"use client";

import React, { useEffect } from 'react';

export default function Toast({ message, type, isVisible, setIsVisible }: any) {
    useEffect(() => {
        if (!message || !isVisible) return;

        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, [message, isVisible]);

    if (!message || !isVisible) return null;

    return (
        <div className={`absolute top-0 right-0 m-4 p-4 rounded shadow-lg text-white ${type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
            {message}
        </div>
    );
}
