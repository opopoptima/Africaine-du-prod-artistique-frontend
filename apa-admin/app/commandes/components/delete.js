'use client';

import { useEffect } from 'react';

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm, loading = false }) {
    // Fermer avec Escape
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            aria-modal="true"
            role="dialog"
            aria-labelledby="confirm-delete-title"
        >
            {/* Modal */}
            <div
                className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 transform transition-all animate-in fade-in zoom-in duration-200 pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col items-center text-center space-y-6">
                    <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>

                    <h3 id="confirm-delete-title" className="text-xl font-semibold text-gray-900">
                        Êtes-vous sûr de vouloir supprimer cet commande ?
                    </h3>

                    <div className="flex gap-4 w-full">
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-gray-300"
                        >
                            Non
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={loading}
                            className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            {loading ? 'Suppression...' : 'Oui !'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
