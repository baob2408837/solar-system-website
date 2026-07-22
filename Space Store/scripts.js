// ================= XEM CHI TIẾT SẢN PHẨM =================
function openModal(element) {
    // Tìm thẻ <article class="product"> bao bọc phần tử được click
    const productCard = element.closest('.product');
    if (!productCard) return;
    
    // Đọc thông tin trực tiếp 
    const imgElement = productCard.querySelector('.product__img-box img');
    const imgSrc = imgElement ? imgElement.getAttribute('src') : '';
    
    const titleElement = productCard.querySelector('h3');
    const title = titleElement ? titleElement.textContent.trim() : '';

    const priceElement = productCard.querySelector('.product__price');
    const price = priceElement ? priceElement.textContent.trim() : '';
    
    const descElement = productCard.querySelector('.product__description');
    const desc = descElement ? descElement.textContent.trim() : 'Chưa có mô tả cho sản phẩm này.';

    // Gán dữ liệu sang Modal 
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalPrice = document.getElementById('modalPrice');
    const modalDesc = document.getElementById('modalDesc');

    if (modalImg) modalImg.setAttribute('src', imgSrc);
    if (modalTitle) modalTitle.textContent = title;
    if (modalPrice) modalPrice.textContent = price;
    if (modalDesc) modalDesc.textContent = desc;

    
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.add('is-active');
        document.body.style.overflow = 'hidden'; // Khóa cuộn trang khi mở modal
    }
}

function closeModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.remove('is-active');
        document.body.style.overflow = 'auto'; // Cho phép cuộn lại
    }
}

function closeModalOnOutsideClick(event) {
    if (event.target.id === 'productModal') {
        closeModal();
    }
}

// ================= GIỎ HÀNG & THÔNG BÁO =================
function showToast(message) {
    const toast = document.getElementById('toast-notification');
    const toastMsg = document.getElementById('toast-message');
    if (toast && toastMsg) {
        toastMsg.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    } else {
        alert(message);
    }
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        let cartItems = [];
        const rawCart = localStorage.getItem("cartItems");
        if (rawCart) {
            cartItems = JSON.parse(rawCart);
        }

        let totalCount = 0;
        for (let i = 0; i < cartItems.length; i++) {
            totalCount += Number(cartItems[i].quantity || 0);
        }
        cartCountElement.textContent = totalCount;
    }
}

function isExistedinCart(item, itemCartArray) {
    let myIndex = -1;
    for (let i = 0; i < itemCartArray.length; i++) {
        if (itemCartArray[i].id === item.id) {
            myIndex = i;
            break;
        }
    }
    return myIndex;
}

function saveToCart(productElement) {
    let itemID = productElement.querySelector(".product__id").textContent.trim();
    let itemIMG = productElement.querySelector("img").getAttribute("src");
    let itemName = productElement.querySelector("h3").textContent.trim();
    let itemPrice = productElement.querySelector(".product__price").textContent.trim();

    let newItem = {
        id: itemID,
        img: itemIMG,
        name: itemName,
        price: itemPrice,
        quantity: 1
    };

    let updatedCartItems = [];
    const rawCart = localStorage.getItem("cartItems");
    if (rawCart) {
        updatedCartItems = JSON.parse(rawCart);
    }

    let index = isExistedinCart(newItem, updatedCartItems);

    if (index >= 0) {
        updatedCartItems[index].quantity++;
    } else {
        updatedCartItems.push(newItem);
    }

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    updateCartCount();
}

function buyNow(button) {
    const productInfo = button.closest('.product');
    if (productInfo) {
        saveToCart(productInfo);
        window.location.href = "/CART/cart.html";
    }
}


document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();

    const add2CartButtons = document.querySelectorAll(".product__btn-cart");
    add2CartButtons.forEach((button) => {
        button.addEventListener("click", (evt) => {
            const productInfo = evt.target.closest('.product');
            if (productInfo) {
                let itemName = productInfo.querySelector("h3").textContent.trim();
                saveToCart(productInfo);
                showToast(`Đã thêm "${itemName}" vào giỏ hàng!`);
            }
        });
    });
});
