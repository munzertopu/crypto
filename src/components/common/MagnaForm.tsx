import React, { FormEvent } from "react";

interface MagnaFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const MagnaForm: React.FC<MagnaFormProps> = ({ onSubmit, children, ...props }) => {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && activeElement.blur) {
            activeElement.blur();
        }

        // Call the provided onSubmit function after blurring all inputs
        // Introduce a slight delay to ensure the model is updated
        onSubmit(event);
    };

    return (
        <form {...props} onSubmit={handleSubmit}>
            {children}
        </form>
    );
};

export default MagnaForm;
