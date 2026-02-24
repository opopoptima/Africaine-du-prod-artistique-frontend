'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoCloseOutline, IoAddOutline, IoRemoveOutline, IoTrashOutline } from 'react-icons/io5';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
    const { cartItems, cartTotal, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen } = useCart();
    const drawerRef = useRef(null);

    // Close drawer on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') setIsCartOpen(false);
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [setIsCartOpen]);

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isCartOpen]);

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={() => setIsCartOpen(false)}
            />

            {/* Drawer */}
            <div
                ref={drawerRef}
                className={`relative w-full sm:max-w-75 h-full bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-primary-500 uppercase tracking-wider">Panier</h2>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 cursor-pointer"
                    >
                        <IoCloseOutline className="text-3xl" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto py-6">
                    {cartItems.length > 0 ? (
                        <div className="px-6 space-y-6">
                            {cartItems.map((item) => {
                                const currentPrice = (item.promo && item.promo > 0) ? item.promo : item.price;
                                return (
                                    <div key={item.isbn} className="flex gap-4 group">
                                        {/* Item Image */}
                                        <div className="relative w-20 h-28 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                                            <Image
                                                src={item.cover || "/images/placeholder.jpg"}
                                                alt={item.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>

                                        {/* Item Details */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between gap-2">
                                                    <h3 className="font-bold text-gray-800 line-clamp-2 leading-tight uppercase text-xs">
                                                        {item.title}
                                                    </h3>
                                                    <button
                                                        onClick={() => removeFromCart(item.isbn)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                                                    >
                                                        <IoCloseOutline className="text-xl" />
                                                    </button>
                                                </div>
                                                <p className="text-primary-500 font-bold mt-1 text-sm">{currentPrice} dt</p>
                                            </div>

                                            {/* Quantity Selector */}
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden scale-90 origin-left">
                                                    <button
                                                        onClick={() => updateQuantity(item.isbn, item.quantity - 1)}
                                                        className="p-1.5 hover:bg-gray-100 text-gray-500 transition-colors cursor-pointer"
                                                    >
                                                        <IoRemoveOutline />
                                                    </button>
                                                    <span className="w-8 text-center font-medium text-gray-700 text-xs">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.isbn, item.quantity + 1)}
                                                        className="p-1.5 hover:bg-gray-100 text-gray-500 transition-colors cursor-pointer"
                                                    >
                                                        <IoAddOutline />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center px-10">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <Image src="/images/apa-logo.png" alt="Empty Cart" width={30} height={30} className="grayscale opacity-50" />
                            </div>
                            <p className="text-gray-500 font-medium text-sm">Votre panier est vide</p>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="mt-4 font-bold hover:underline text-sm cursor-pointer bg-primary-500 text-white px-4 py-2 rounded-lg"
                            >
                                Retour à la boutique
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer / Summary */}
                {cartItems.length > 0 && (
                    <div className="p-6 bg-gray-50 border-t border-gray-100 shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.05)]">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-gray-600 font-medium font-bold uppercase tracking-wide">Sous-total</span>
                            <span className="text-2xl font-black text-primary-500 space-x-1">
                                <span>{cartTotal}</span>
                                <span className="text-sm font-bold">dt</span>
                            </span>
                        </div>

                        <div className="space-y-3">
                            <Link
                                href="/boutique"
                                onClick={() => setIsCartOpen(false)}
                                className="block w-full py-4 bg-primary-500 text-white font-bold rounded-lg text-center transition-all shadow-md active:scale-95 uppercase tracking-wider"
                            >
                                Poursuivre les achats
                            </Link>
                            <Link
                                href="/commande"
                                onClick={() => setIsCartOpen(false)}
                                className="block w-full py-4 bg-primary-100 text-white font-bold rounded-lg text-center transition-all shadow-md active:scale-95 uppercase tracking-wider"
                            >
                                COMMANDER
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
