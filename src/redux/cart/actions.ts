export enum CartActionTypes {
  RemoveItemFromCart = 'CART/REMOVE_ITEM_FROM_CART',
  ClearCart = 'CART/CLEAR_CART',
  CheckoutItems = 'CART/CHECKOUT_ITEMS'
}

namespace CartActions {
  export function removeItemFromCart(itemId: number) {
    return { type: CartActionTypes.RemoveItemFromCart };
  }

  export function checkoutItems() {
    return { type: CartActionTypes.RemoveItemFromCart };
  }

  export function clearCart() {
    return { type: CartActionTypes.ClearCart };
  }
}

export default CartActions;
