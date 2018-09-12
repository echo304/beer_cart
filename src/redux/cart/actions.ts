export enum CartActionTypes {
  AddItemToCart = 'CART/ADD_ITEM_TO_CART',
  RemoveItemFromCart = 'CART/REMOVE_ITEM_FROM_CART',
  ClearCart = 'CART/CLEAR_CART',
  CheckoutItems = 'CART/CHECKOUT_ITEMS'
}

namespace CartActions {
  export function addItemToCart(itemId: number) {
    return { type: CartActionTypes.AddItemToCart, itemId };
  }

  export function removeItemFromCart(itemId: number) {
    return { type: CartActionTypes.RemoveItemFromCart, itemId };
  }

  export function checkoutItems() {
    return { type: CartActionTypes.CheckoutItems };
  }

  export function clearCart() {
    return { type: CartActionTypes.ClearCart };
  }
}

export default CartActions;
