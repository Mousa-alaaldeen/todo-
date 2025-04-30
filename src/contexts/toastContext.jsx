import { createContext, useState, useContext } from 'react';

import MySnackBar from '../Component/MySnackBar';



 const ToastContext = createContext({});
export const ToastProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    function showHideToast(message) {
        setMessage(message);
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
        }, 6000);
    }
    return (
        <ToastContext.Provider value={{ showHideToast }}>
            {children}
            <MySnackBar open={open} message={message} />
        </ToastContext.Provider>
    )
}
export const useToast = () => {
    return useContext(ToastContext);
};