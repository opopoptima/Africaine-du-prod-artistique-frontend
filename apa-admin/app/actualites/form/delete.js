'use client';

import { useEffect } from 'react';
import { Trash2 } from 'lucide-react';

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
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            aria-modal="true"
            role="dialog"
            aria-labelledby="confirm-delete-title"
        >
            {/* Backdrop transparent gris */}
            <div
                className="absolute inset-0 bg-gray-400/30 pointer-events-auto"
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 transform transition-all animate-in fade-in zoom-in duration-200 pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col items-center text-center space-y-6">
                    <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center">
                        <Trash2 className="w-12 h-12 text-purple-600" strokeWidth={1.5} />
                    </div>

                    <h3 id="confirm-delete-title" className="text-xl font-semibold text-gray-900 leading-tight">
                        Êtes-vous sûr de vouloir supprimer<br />cette actualité ?
                    </h3>

                    <div className="flex gap-4 w-full pt-2">
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 px-6 py-3 border border-gray-300 rounded-2xl font-semibold text-gray-800 hover:bg-gray-50 transition disabled:opacity-50"
                        >
                            Non
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={loading}
                            className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-semibold transition disabled:opacity-70"
                        >
                            {loading ? 'Suppression...' : 'Oui !'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
