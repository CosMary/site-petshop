// Lista de produtos
const productList = [
    { id: 8, title: "Bifinho de Carne", price: 29.90, image: "https://m.media-amazon.com/images/I/61PQS-DWj+L._AC_UF1000,1000_QL80_.jpg" },
    { id: 9, title: "Patê de Gato", price: 13.99, image: "https://amepettatix.vtexassets.com/arquivos/ids/185566-800-450?v=638496820616500000&width=800&height=450&aspect=true" },
    { id: 12, title: "Ração Canina Filhote", price: 165.99, image: "https://images.tcdn.com.br/img/img_prod/724553/racao_para_cachorro_filhote_gran_plus_carne_e_arroz_15kg_551_1_20200319192342.jpg" },
    { id: 14, title: "Ração Úmida Canina Adulto", price: 5.99, image: "https://uploads.consultaremedios.com.br/product_variation_images/full/f76cfcaae43e692b86bcd463272b8a0faeec0da9.jpg?1668447048" },
    { id: 15, title: "Ração de Gato Adulto", price: 169.99, image: "https://images.tcdn.com.br/img/img_prod/758683/racao_whiskas_para_gatos_adultos_sabor_peixe_1kg_2971_1_20200416114046.jpg" },
    { id: 16, title: "Petisco Palito para Cães", price: 149.99, image: "https://http2.mlstatic.com/D_NQ_NP_2X_685080-MLA95400775962_102025-F.webp" },
    { id: 17, title: "Ração de Gato Filhote", price: 169.99, image: "https://http2.mlstatic.com/D_NQ_NP_2X_827853-MLB94131979999_102025-F.webp" },
    { id: 18, title: "Petisco para Gato Adulto", price: 10.16, image: "https://th.bing.com/th/id/OPHS.EtorxFCQzfMOrQ474C474?w=300&h=300&o=5&pid=21.1" },
    { id: 19, title: "Ração de Cães Adultos", price: 199.99, image: "https://http2.mlstatic.com/D_NQ_NP_2X_880209-MLA96717914401_102025-F.webp" }
];

const productContainer = document.getElementById("product-list");
const cartTableBody = document.querySelector(".cart-table tbody");
const cartTotalPrice = document.querySelector(".cart-total-price");
let cart = [];

// Renderiza os produtos na página
function renderProducts() {
    productList.forEach(product => {
        const productCard = document.createElement("section");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <h2 class="product-title">${product.title}</h2>
            <img src="${product.image}" alt="${product.title}">
            <p>Preço: <strong>R$ ${product.price.toFixed(2)}</strong></p>
            <button type="button" class="inspect-product-button" data-product-id="${product.id}">Ver detalhes</button>
            <button type="button" class="button-hover-background add-to-cart-button" data-product-id="${product.id}">Adicionar ao Carrinho</button>
        `;
        productContainer.appendChild(productCard);
    });

    // Adiciona evento aos botões
    const addButtons = document.querySelectorAll(".add-to-cart-button");
    addButtons.forEach(button => {
        button.addEventListener("click", () => {
            const productId = parseInt(button.getAttribute("data-product-id"));
            addProductToCart(productId);
        });
    });
}

// Adiciona produto ao carrinho
function addProductToCart(productId) {
    const product = productList.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    renderCart();
}

// Remove produto do carrinho
function removeProduct(productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCart();
}

// Atualiza o carrinho na tela
function renderCart() {
    cartTableBody.innerHTML = "";

    cart.forEach(item => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td class="product-identification">
                <img src="${item.image}" class="cart-product-image" alt="${item.title}">
                <span>${item.title}</span>
            </td>
            <td>R$ ${item.price.toFixed(2)}</td>
            <td>
                <input type="number" class="product-qtd-input" value="${item.quantity}" min="1">
                <button class="remove-product-button">Remover</button>
            </td>
        `;

        // Evento de remover
        tr.querySelector(".remove-product-button").addEventListener("click", () => removeProduct(item.id));

        // Evento para alterar quantidade
        tr.querySelector(".product-qtd-input").addEventListener("change", e => {
            const qty = parseInt(e.target.value);
            if (qty <= 0) {
                removeProduct(item.id);
            } else {
                item.quantity = qty;
                updateTotal();
            }
        });

        cartTableBody.appendChild(tr);
    });

    updateTotal();
}

// Atualiza valor total
function updateTotal() {
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotalPrice.textContent = `R$ ${total.toFixed(2)}`;
}

// Finalizar compra
document.querySelector(".purchase-button").addEventListener("click", () => {
    if(cart.length === 0){
        alert("Seu carrinho está vazio!");
        return;
    }
    alert("Compra finalizada! Obrigado por comprar na Creature Petshop.");
    cart = [];
    renderCart();
});

// Inicializa
renderProducts();
