import { createSlice } from '@reduxjs/toolkit';

// Initial state for the cart
const initialState = {
    items: [],
    totalAmount: 0
};

// Create cart slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Add item to cart
        addItem: (state, action) => {
            const newItem = action.payload;
            const existingItemIndex = state.items.findIndex(item => item.name === newItem.name);
            
            if (existingItemIndex >= 0) {
                // If item already exists, increase quantity by 1
                state.items[existingItemIndex].quantity += 1;
            } else {
                // If item doesn't exist, add it with quantity 1
                state.items.push({
                    ...newItem,
                    quantity: 1
                });
            }
            
            // Calculate total amount
            state.totalAmount = calculateTotalAmount(state.items);
        },
        
        // Remove item from cart
        removeItem: (state, action) => {
            const itemName = action.payload;
            const itemIndex = state.items.findIndex(item => item.name === itemName);
            
            if (itemIndex >= 0) {
                // Remove item from array
                state.items.splice(itemIndex, 1);
                
                // Calculate total amount
                state.totalAmount = calculateTotalAmount(state.items);
            }
        },
        
        // Update item quantity
        updateQuantity: (state, action) => {
            const { name, amount } = action.payload;
            const itemIndex = state.items.findIndex(item => item.name === name);
            
            if (itemIndex >= 0) {
                // Update quantity to the new amount
                state.items[itemIndex].quantity = amount;
                
                // If quantity is 0 or negative, remove the item
                if (state.items[itemIndex].quantity <= 0) {
                    state.items.splice(itemIndex, 1);
                }
                
                // Calculate total amount
                state.totalAmount = calculateTotalAmount(state.items);
            }
        },
        
        // Clear entire cart (optional)
        clearCart: (state) => {
            state.items = [];
            state.totalAmount = 0;
        }
    }
});

// Helper function to calculate total amount
const calculateTotalAmount = (items) => {
    return items.reduce((total, item) => {
        // Remove $ sign and convert to number
        const price = parseFloat(item.cost.replace('$', ''));
        return total + (price * item.quantity);
    }, 0).toFixed(2); // Keep 2 decimal places
};

// Export action creators
export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
