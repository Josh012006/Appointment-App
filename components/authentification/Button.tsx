import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    Form?: string;
    children: React.ReactNode;
    OnClick?: () => void;
}

function Button({type, Form, children, OnClick, ...rest}: ButtonProps) {

    const handleClick = (OnClick)? OnClick : () => {};

    return (
        <button type={type} form={Form} style={{backgroundColor: 'var(--main_color)'}} className="text-white p-4 h-12 rounded-lg items-center flex justify-center mt-5" onClick={handleClick}>{children}</button>
    );
}


export default Button;