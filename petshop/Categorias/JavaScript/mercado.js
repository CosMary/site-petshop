// --- Lista de produtos (Brinquedos e Acessórios) ---
const productList = [
    { id: 1, title: "Brinquedo de Corda Dupla", price: 39.99, image: "https://static3.tcdn.com.br/img/img_prod/719253/brinquedo_de_corda_para_cachorro_duplo_com_bola_pet_go_laranja_721_1_20200907141051.jpg" },
    { id: 2, title: "Brinquedo de Corda Simples", price: 29.99, image: "https://images.tcdn.com.br/img/img_prod/699275/brinquedo_corda_com_bola_de_tenis_para_caes_4485_1_07dc5759a1dffca990cf42ff70a8cebc.jpg" },
    { id: 3, title: "Osso de Borracha", price: 15.50, image: "https://images.tcdn.com.br/img/img_prod/573283/brinquedo_para_caes_osso_de_vinil_chalesco_534692_1_20180126111840.jpg" },
    { id: 4, title: "Coleira de Peitoral", price: 65.50, image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-ltp6uwp93zugdf" },
    { id: 5, title: "Coleira de Pescoço Para Cães", price: 35.50, image: "https://static.netshoes.com.br/produtos/coleira-para-cachorro-em-couro-legitimo-resistente-paws/16/MT1-0003-016/MT1-0003-016_zoom1.jpg?ts=1680003766" },
    { id: 6, title: "Coleira Para Gatos Com Sino", price: 29.99, image: "https://static.petnautasloja.com.br/public/nunesagropecuaria/imagens/produtos/coleira-gato-luxo-jecot-pet-6670336902934.jpg" },
    { id: 7, title: "Bolinha Giratória Elétrica", price: 30.90, image: "https://m.media-amazon.com/images/I/51iHiQlncSL._AC_SX679_.jpg" },
    { id: 8, title: "Torre Arranhador para Gatos", price: 389.99, image: "https://http2.mlstatic.com/D_NQ_NP_2X_620556-MLB94544594759_102025-F.webp" },
    { id: 9, title: "Comedouro Elevado", price: 140.00, image: "https://omeuj.b-cdn.net/wp-content/uploads/Comedouro-Elevado-para-Caes-com-4-Alturas-Ajustaveis-com-Tigela-de-1000-ml-e-Comedouro-Lento-de-600-ml-de-Aco-Inoxidavel-43x25x30-cm-Preto-1-1536x1536.jpg" }
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