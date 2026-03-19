// Lista de produtos - Adapte o nome e conteúdo da lista para o tema do arquivo
const productList = [
    { id: 1, title: "Tapete Higiênico", price: 89.99, image: "https://th.bing.com/th/id/OPHS.AtIoRGbfzQdKog474C474?w=300&h=300&qlt=20&o=5&pid=21.1" },
    { id: 2, title: "Shampoo Neutro para Pets", price: 28.99, image: "https://m.magazineluiza.com.br/a-static/420x420/shampoo-pet-para-caes-e-gatos-repelente-natural-500ml-pet-family/olistplus/opm5h74k72lz6s9b/265db998bee6b2fa7b132bd77194604c.jpeg" },
    { id: 3, title: "Shampoo Clareador para Pets", price: 28.99, image: "https://m.magazineluiza.com.br/a-static/420x420/shampoo-branqueador-para-caes-e-gatos-matizador-pet-500ml-pet-family/oliststore/mglsetg7sdhrv1c6/b6c32ce206dba325d0141fc60a041c57.jpeg" },
    { id: 4, title: "Escova Rastelo", price: 15.50, image: "https://http2.mlstatic.com/D_NQ_NP_2X_721489-MLB71805437060_092023-F-escova-plastica-rastelo-alca-regulavel-ces-cachorros-gatos.webp" },
    { id: 5, title: "Kit Higiene Bucal", price: 26.99, image: "https://http2.mlstatic.com/D_NQ_NP_2X_743439-MLB89120018209_082025-F-escova-gel-dental-dedeira-kit-higienico-co-gato-nospet-60g.webp" },
    { id: 6, title: "Areia Sanitária para Gatos", price: 26.99, image: "https://m.magazineluiza.com.br/a-static/420x420/areia-higienica-caixa-de-areia-biocat-fina-natural-10-kg/123wepet1/5726/df3d6c04be11ad8e28512713e82d995b.jpeg" }
];

const productContainer = document.getElementById("product-list");
// A linha abaixo usa o seletor mais específico para garantir que funcione se houver mais de uma tabela.
const cartTableBody = document.querySelector(".cart-table tbody"); 
const cartTotalPrice = document.querySelector(".cart-total-price");
let cart = []; // Array que armazena o estado do carrinho

// Renderiza os produtos na página
function renderProducts() {
    // Limpa o container antes de renderizar (útil se for re-renderizar)
    productContainer.innerHTML = ""; 
    
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

    // Adiciona evento aos botões de 'Adicionar ao Carrinho'
    const addButtons = document.querySelectorAll(".add-to-cart-button");
    addButtons.forEach(button => {
        button.addEventListener("click", () => {
            const productId = parseInt(button.getAttribute("data-product-id"));
            addProductToCart(productId);
        });
    });
    
    // Adiciona evento aos botões 'Ver detalhes' (opcional, mas bom para manter a funcionalidade)
    const inspectButtons = document.querySelectorAll(".inspect-product-button");
    inspectButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const productId = parseInt(e.target.getAttribute("data-product-id"));
            inspectProduct(productId);
        });
    });
}

// Adiciona produto ao carrinho (por ID)
function addProductToCart(productId) {
    const product = productList.find(p => p.id === productId);
    // Verifica se o produto já existe no array 'cart'
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        // Adiciona um novo objeto ao array 'cart' com a propriedade quantity
        cart.push({ ...product, quantity: 1 });
    }

    renderCart(); // Renderiza o carrinho atualizado
}

// Remove produto do carrinho (por ID)
function removeProduct(productId) {
    // Filtra o array, mantendo apenas itens cujo ID seja diferente do produto a ser removido
    cart = cart.filter(item => item.id !== productId);
    renderCart();
}

// Função de inspeção (adicionada para manter a funcionalidade do outro arquivo)
function inspectProduct(productId) {
    const product = productList.find(p => p.id === productId);
    if (product) {
        // Usa toFixed(2) para garantir duas casas decimais no preço, como no original
        alert(`Produto: ${product.title}\nPreço: R$ ${product.price.toFixed(2).replace('.', ',')}`);
    }
}

// Atualiza o carrinho na tela com base no array 'cart'
function renderCart() {
    cartTableBody.innerHTML = ""; // Limpa o corpo da tabela

    cart.forEach(item => {
        const tr = document.createElement("tr");

        // Cria a linha da tabela dinamicamente
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
            
            // Se a quantidade for menor ou igual a zero, remove o produto
            if (qty <= 0) {
                removeProduct(item.id);
            } else {
                // Atualiza a quantidade no array 'cart'
                item.quantity = qty;
                updateTotal(); // Apenas atualiza o total, pois a linha já foi atualizada
            }
        });

        cartTableBody.appendChild(tr);
    });

    updateTotal(); // Recalcula e exibe o total
}

// Atualiza valor total
function updateTotal() {
    // Usa 'reduce' para calcular o total somando (preço * quantidade) de cada item
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    // Formata o valor total para exibição
    cartTotalPrice.textContent = `R$ ${total.toFixed(2)}`;
}

// Finalizar compra (usando querySelector, como no original)
document.querySelector(".purchase-button")?.addEventListener("click", () => {
    if(cart.length === 0){
        alert("Seu carrinho está vazio!");
        return;
    }
    // O texto do alerta deve ser ajustado, o arquivo 'alimentacao.js' original não mostra o total no alerta de compra.
    alert("Compra finalizada! Obrigado por comprar na Creature Petshop."); 
    cart = [];
    renderCart(); // Limpa a exibição do carrinho
});

// Inicializa
renderProducts();