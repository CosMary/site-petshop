// --- Lista de produtos de Medicina ---
const productList = [
    { id: 1, title: "Remédio Anti-Pulga e Carrapato Canino (7,6-15kg)", price: 85.99, image: "https://m.magazineluiza.com.br/a-static/420x420/nexgard-spectra-antipulgas-e-carrapatos-para-caes-de-76-a-15kg-boehringer-ingelheim/petcarone/15952427054/90c848c6850a144610b471975997672f.jpeg" },
    { id: 2, title: "Remédio Anti-Pulga e Carrapato Canino (3,6-7,5kg)", price: 75.99, image: "https://m.magazineluiza.com.br/a-static/420x420/nexgard-spectra-anti-pulgas-e-carrapatos-para-caes-de-36-a-75kg-1-tablete-mastigavel/drogariaaraujosa/99341/e69a8d96044d76e7f432e24aea21ee4f.jpeg" },
    { id: 3, title: "Remédio Anti-Pulga e Carrapato Felino", price: 15.50, image: "https://m.magazineluiza.com.br/a-static/420x420/antipulgas-e-carrapatos-frontline-topspot-para-gatos-1-a-10-kg/petsuper/494/6eb0547a2c82b1d4893530cc2077103d.jpeg" },
    { id: 4, title: "Seringa Aplicadora de Medicação", price: 14.50, image: "https://m.magazineluiza.com.br/a-static/420x420/aplicador-de-comprimidos-alimentador-caes-gatos-pet-atmx/lojaapolomix/5037/da02880bdf0ba37a143f3c7109700350.jpeg" },
    { id: 5, title: "Coleira Antipulgas e Carrapatos", price: 145.50, image: "https://m.magazineluiza.com.br/a-static/420x420/coleira-antipulgas-e-carrapatos-elanco-seresto-para-caes-e-gatos-ate-8-kg/patypet/9334968088/f5966e30f9b469e5b6bdc6c1cba53cc3.jpeg" },
    { id: 6, title: "Ivermectina", price: 99.99, image: "https://m.media-amazon.com/images/I/61q-kuPZxZL.jpg" }
];

// VARIÁVEIS GLOBAIS DO DOM E ESTADO (COMO EM alimentacao.js)
const productContainer = document.getElementById("product-list");
const cartTableBody = document.querySelector(".cart-table tbody");
const cartTotalPrice = document.querySelector(".cart-total-price");
let cart = [];

// Renderiza os produtos na página
function renderProducts() {
    // Garante que o container de produtos seja limpo antes de renderizar
    productContainer.innerHTML = ""; 

    productList.forEach(product => {
        // Usa <section> e a estrutura de preço do alimentacao.js
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

    // Adiciona evento de 'Adicionar ao Carrinho' chamando a função por ID
    const addButtons = document.querySelectorAll(".add-to-cart-button");
    addButtons.forEach(button => {
        button.addEventListener("click", () => {
            const productId = parseInt(button.getAttribute("data-product-id"));
            addProductToCart(productId);
        });
    });
    
    // Adiciona evento de 'Ver detalhes' (opcional, mas bom para manter a funcionalidade)
    const inspectButtons = document.querySelectorAll(".inspect-product-button");
    inspectButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const productId = parseInt(e.target.getAttribute("data-product-id"));
            inspectProduct(productId);
        });
    });
}

// Adiciona produto ao carrinho (baseado em array 'cart')
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

// Remove produto do carrinho (baseado em array 'cart')
function removeProduct(productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCart();
}

// Atualiza o carrinho na tela (função principal que renderiza o array 'cart')
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

        // Evento de remover (chama a função por ID)
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

// Atualiza valor total (baseado em array 'cart')
function updateTotal() {
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotalPrice.textContent = `R$ ${total.toFixed(2)}`;
}

// Finalizar compra (usando querySelector, como no alimentacao.js)
document.querySelector(".purchase-button")?.addEventListener("click", () => {
    if(cart.length === 0){
        alert("Seu carrinho está vazio!");
        return;
    }
    alert("Compra finalizada! Obrigado por comprar na Creature Petshop.");
    cart = [];
    renderCart();
});

// Função de inspeção (adaptada para a estrutura de array)
function inspectProduct(productId) {
    const product = productList.find(p => p.id === productId);
    if (product) {
        alert(`Produto: ${product.title}\nPreço: R$ ${product.price.toFixed(2).replace('.', ',')}`);
    }
}


// Inicializa a página
renderProducts();