function addToCart() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        let count = parseInt(cartCount.textContent);
        cartCount.textContent = count + 1;
    }
}