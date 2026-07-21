// ================= 1. MẢNG CÁC OBJECTS SẢN PHẨM =================
const productsData = [
    {
        id: "1",
        name: "Sách Thiên Văn Học",
        price: "150.000₫",
        img: "./images/DSC06418.jpg",
        description: "Cuốn sách thiên văn học toàn diện với hình ảnh đẹp và kiến thức sâu về vũ trụ."
    },
    {
        id: "2",
        name: "Mô hình Sao Hỏa",
        price: "850.000₫",
        img: "./images/saohoa.jpg",
        description: "Mô hình Sao Hỏa chi tiết với bề mặt đỏ rực rỡ. Được chế tạo từ vật liệu cao cấp."
    },
    {
        id: "3",
        name: "Mô hình Sao Mộc",
        price: "1.200.000₫",
        img: "./images/saomoc.jpg",
        description: "Mô hình Sao Mộc khổng lồ với các vệ tinh nhỏ. Đây là sản phẩm tuyệt vời."
    },
    {
        id: "4",
        name: "Kính Thiên Văn Mini",
        price: "3.000.000₫",
        img: "./images/45.jpg",
        description: "Kính thiên văn mini chuyên nghiệp với độ phóng đại cao. Dễ dàng sử dụng."
    },
    {
        id: "5",
        name: "Mô hình Sao Thổ",
        price: "1.450.000₫",
        img: "./images/saotho.jpg",
        description: "Mô hình Sao Thổ với hệ thống vành đai tinh xảo, chất liệu nhựa ABS cao cấp."
    },
    {
        id: "6",
        name: "Móc khoá phi hành gia",
        price: "95.000₫",
        img: "./images/12.jpg",
        description: "Mô hình địa cầu tích hợp đèn LED phát sáng, mô phỏng chân thực các châu lục."
    },
    {
        id: "7",
        name: "Mô hình lắp ghép tàu vũ trụ",
        price: "450.000₫",
        img: "./images/tauvutru.jpg",
        description: "Mô Hình Lắp Ghép 3D Mini Bệ Phóng Tàu Vũ trụ và Tên Lửa Không Gian - Bộ Đồ Chơi Phát Triển Trí Tuệ Cho Bé."
    },
    {
        id: "8",
        name: "Mô hình Hệ Mặt Trời",
        price: "650.000₫",
        img: "./images/mhhmt.jpg",
        description: "Mô hình gồm 9 hành tinh hệ mặt trời pha lê."
    }
];


function openModalById(productId) {
    const product = productsData.find(item => item.id === String(productId));
    if (!product) return;

    // 1. Tạo Khung Modal bao ngoài
    const modalElement = document.createElement('div');
    modalElement.id = 'productModal';
    modalElement.className = 'modal';

    // 2. Thẻ Article
    const cardElement = document.createElement('article');
    cardElement.className = 'modal__card';

    // 3. Nút Đóng (✕)
    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal__close-btn';
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', closeModal);

    
    const bodyElement = document.createElement('div');
    bodyElement.className = 'modal__body';

    
    const imgBox = document.createElement('div');
    imgBox.className = 'modal__img-box';

    const imgElement = document.createElement('img');
    imgElement.src = product.img;
    imgElement.alt = product.name;
    imgBox.appendChild(imgElement);

    
    const infoBox = document.createElement('div');
    infoBox.className = 'modal__info';

    const titleElement = document.createElement('h2');
    titleElement.textContent = product.name;

    const priceElement = document.createElement('p');
    priceElement.className = 'modal__price';
    priceElement.textContent = product.price;

    const descBox = document.createElement('div');
    descBox.className = 'modal__description-box';

    const descTitle = document.createElement('h3');
    descTitle.textContent = 'Mô tả chi tiết:';

    const descText = document.createElement('p');
    descText.textContent = product.description;

    
    descBox.appendChild(descTitle);
    descBox.appendChild(descText);

    infoBox.appendChild(titleElement);
    infoBox.appendChild(priceElement);
    infoBox.appendChild(descBox);

   
    bodyElement.appendChild(imgBox);
    bodyElement.appendChild(infoBox);

   
    cardElement.appendChild(closeBtn);
    cardElement.appendChild(bodyElement);

    
    modalElement.appendChild(cardElement);

    modalElement.addEventListener('click', (event) => {
        if (event.target.id === 'productModal') {
            closeModal();
        }
    });

    // Thêm vào giao diện DOM
    document.body.appendChild(modalElement);

    // Kích hoạt hiệu ứng mượt
    setTimeout(() => {
        modalElement.classList.add('is-active');
    }, 10);

    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.remove('is-active');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    }
}


// ================= 3. QUẢN LÝ GIỎ HÀNG =================
function showToast(message) {
    const toast = document.getElementById('toast-notification');
    if (toast) {
        if (message) {
            const spanText = toast.querySelector('span');
            if (spanText) spanText.textContent = message;
        }
        
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        let totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);
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

    let updatedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let index = isExistedinCart(newItem, updatedCartItems);

    if (index >= 0) {
        updatedCartItems[index].quantity++;
    } else {
        updatedCartItems.push(newItem);
    }

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    updateCartCount();
}

const Add2Cart = document.querySelectorAll(".product__btn-cart");
Add2Cart.forEach((button) => {
    button.addEventListener("click", (evt) => {
        const productInfo = evt.target.closest('.product');
        let itemName = productInfo.querySelector("h3").textContent.trim();
        
        saveToCart(productInfo);
        showToast(`Đã thêm "${itemName}" vào giỏ hàng!`);
    });
});

function buyNow(button) {
    const productInfo = button.closest('.product');
    saveToCart(productInfo);
    window.location.href = "/CART/cart.html";
}

document.addEventListener("DOMContentLoaded", updateCartCount);
