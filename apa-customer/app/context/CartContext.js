'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('optima_cart');
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart from localStorage', e);
            }
        }
    }, []);

    // Sync cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('optima_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.isbn === product.isbn);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.isbn === product.isbn
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity }];
        });
    };

    const removeFromCart = (isbn) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.isbn !== isbn));
    };

    const updateQuantity = (isbn, quantity) => {
        if (quantity < 1) return;
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.isbn === isbn ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotal = cartItems.reduce(
        (total, item) => total + (item.promo && item.promo > 0 ? item.promo : item.price) * item.quantity,
        0
    );

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                cartCount,
                isCartOpen,
                setIsCartOpen,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
