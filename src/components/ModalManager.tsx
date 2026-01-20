/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { type ReactNode, useState, forwardRef, useImperativeHandle } from "react";

export interface ModalManagerMethods {
    ShowError: (message: string, closedDelegate: () => void) => void;
    ShowMessage: (message: string, closedDelegate: () => void) => void;
    ShowConfirmation: (message: string, yesDelegate: () => void, noDelegate: () => void, closedDelegate: () => void) => void;
    Show: (modal: ReactNode, closeDelegate: () => void, closedDelegate: () => void) => void;
    Close: () => void;
    Count: () => number;
}

const ModalManager = forwardRef<ModalManagerMethods>((props, ref) => {
    const [modals, setModals] = useState<ReactNode[]>([]);
    useImperativeHandle(ref, () => ({
        Count: () => {
            return modals.length;
        },
        Close: () => {
            if (modals.length > 0) {
                closeModal(modals.length - 1, () => { });
            }
        },
        ShowError: (message: string, closedDelegate: () => void) => {
            setModals(prevModals => [
                ...prevModals,
                <div key={prevModals.length} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
                        <div className="text-red-600 dark:text-red-400 mb-4">
                            {message}
                        </div>
                        <button
                            onClick={() => closeModal(prevModals.length, closedDelegate)}
                            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            ]);
        },
        ShowMessage: (message: string, closedDelegate: () => void) => {
            setModals(prevModals => [
                ...prevModals,
                <div key={prevModals.length} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
                        <div className="mb-4">
                            {message}
                        </div>
                        <button
                            onClick={() => closeModal(prevModals.length, closedDelegate)}
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            OK
                        </button>
                    </div>
                </div>
            ]);
        },
        ShowConfirmation: (message: string, yesDelegate: () => void, noDelegate: () => void, closedDelegate: () => void) => {
            const index = modals.length;
            setModals(prevModals => [
                ...prevModals,
                <div key={index} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
                        <div className="mb-4 font-semibold">Please confirm</div>
                        <div className="mb-4">
                            {message}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleNo(index, noDelegate, closedDelegate)}
                                className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
                            >
                                No
                            </button>
                            <button
                                onClick={() => handleYes(index, yesDelegate, closedDelegate)}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            ]);
        },
        Show: (modal: ReactNode, closeDelegate: () => void, closedDelegate: () => void) => {
            setModals(prevModals => [
                ...prevModals,
                <div key={prevModals.length} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => { closeDelegate(); closeModal(prevModals.length, closedDelegate); }}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            ×
                        </button>
                        {modal}
                    </div>
                </div>
            ]);
        }
    }));

    const closeModal = (index: number, closedDelegate: () => void) => {
        setModals(prevModals => prevModals.filter((_, i) => i !== index));
        closedDelegate();
    };

    const handleYes = (index: number, yesDelegate: () => void, closedDelegate: () => void) => {
        closeModal(index, closedDelegate);
        yesDelegate();
    };

    const handleNo = (index: number, noDelegate: () => void, closedDelegate: () => void) => {
        closeModal(index, closedDelegate);
        noDelegate();
    };
    return (
        <>
            {modals.map((modal, index) => (
                <div key={index}>
                    {modal}
                </div>
            ))}
        </>
    );
});

ModalManager.displayName = 'ModalManager';

export default ModalManager;
