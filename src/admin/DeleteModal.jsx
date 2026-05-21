import React from 'react';
import { AlertCircle } from 'lucide-react';

const DeleteModal = ({ deleteModal, setDeleteModal, confirmDelete }) => {
    if (!deleteModal.isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-spin-slow">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <AlertCircle size={32} strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-extrabold text-center text-gray-900 mb-2">Delete Stay</h3>
                <p className="text-center text-gray-500 font-medium mb-8 leading-relaxed">
                    Are you sure you want to delete <span className="font-bold text-gray-900">{deleteModal.name}</span>? This action cannot be undone.
                </p>
                <div className="flex gap-4">
                    <button 
                        onClick={() => setDeleteModal({ isOpen: false, id: null, name: '' })}
                        className="flex-1 py-3.5 px-4 bg-gray-100 text-gray-700 hover:bg-gray-200 font-bold rounded-xl transition-colors uppercase text-sm tracking-wider"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={confirmDelete}
                        className="flex-1 py-3.5 px-4 bg-red-600 text-white hover:bg-red-700 font-bold rounded-xl shadow-md transition-colors uppercase text-sm tracking-wider"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
