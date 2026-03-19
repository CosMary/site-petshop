// --- Lista completa de produtos do catálogo (atualizada) ---
const productList = [
    { id: 1, title: "Brinquedo de Corda Dupla", price: 39.99, image: "https://static3.tcdn.com.br/img/img_prod/719253/brinquedo_de_corda_para_cachorro_duplo_com_bola_pet_go_laranja_721_1_20200907141051.jpg" },
    { id: 2, title: "Brinquedo de Corda Simples", price: 29.99, image: "https://images.tcdn.com.br/img/img_prod/699275/brinquedo_corda_com_bola_de_tenis_para_caes_4485_1_07dc5759a1dffca990cf42ff70a8cebc.jpg" },
    { id: 3, title: "Osso de Borracha", price: 15.50, image: "https://images.tcdn.com.br/img/img_prod/573283/brinquedo_para_caes_osso_de_vinil_chalesco_534692_1_20180126111840.jpg" },
    { id: 4, title: "Coleira de Peitoral", price: 65.50, image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-ltp6uwp93zugdf" },
    { id: 5, title: "Coleira de Pescoço Para Cães", price: 35.50, image: "https://static.netshoes.com.br/produtos/coleira-para-cachorro-em-couro-legitimo-resistente-paws/16/MT1-0003-016/MT1-0003-016_zoom1.jpg?ts=1680003766" },
    { id: 6, title: "Coleira Para Gatos Com Sino", price: 29.99, image: "https://static.petnautasloja.com.br/public/nunesagropecuaria/imagens/produtos/coleira-gato-luxo-jecot-pet-6670336902934.jpg" },
    { id: 7, title: "Bolinha Giratória Elétrica", price: 30.90, image: "https://m.media-amazon.com/images/I/51iHiQlncSL._AC_SX679_.jpg" },
    { id: 13, title: "Torre Arranhador para Gatos", price: 389.99, image: "https://http2.mlstatic.com/D_NQ_NP_2X_620556-MLB94544594759_102025-F.webp" },
    { id: 14, title: "Comedouro Elevado", price: 140.00, image: "https://omeuj.b-cdn.net/wp-content/uploads/Comedouro-Elevado-para-Caes-com-4-Alturas-Ajustaveis-com-Tigela-de-1000-ml-e-Comedouro-Lento-de-600-ml-de-Aco-Inoxidavel-43x25x30-cm-Preto-1-1536x1536.jpg" }
];

// --- Resto do código JS continua igual ---
function renderProducts() {
    const productListContainer = document.getElementById("product-list");
    productListContainer.innerHTML = "";

    productList.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img class="product-image" src="${product.image}" alt="${product.title}">
            <strong class="product-title">${product.title}</strong>
            <span class="product-price" data-price-value="${product.price}">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
            <button type="button" class="inspect-product-button" data-product-id="${product.id}">Inspecionar</button>
            <button type="button" class="button-hover-background add-to-cart-button">Adicionar ao Carrinho</button>
        `;

        productListContainer.appendChild(productCard);
    });
}

// Função para renderizar os produtos
function renderProducts() {
    const productListContainer = document.getElementById("product-list");
    productListContainer.innerHTML = "";

    productList.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img class="product-image" src="${product.image}" alt="${product.title}">
            <strong class="product-title">${product.title}</strong>
            <span class="product-price" data-price-value="${product.price}">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
            <button type="button" class="inspect-product-button" data-product-id="${product.id}">Ver detalhes</button>
            <button type="button" class="button-hover-background add-to-cart-button">Adicionar ao Carrinho</button>
        `;
        productListContainer.appendChild(productCard);
    });
}

// Funções do carrinho (mesmas do primeiro código)
var totalAmount = "0,00";

function ready() {
    renderProducts();

    // Botão remover produto
    const removeCartProductButtons = document.getElementsByClassName("remove-product-button");
    for (var i = 0; i < removeCartProductButtons.length; i++) {
        removeCartProductButtons[i].addEventListener("click", removeProduct);
    }

    // Mudança valor dos inputs
    const quantityInputs = document.getElementsByClassName("product-qtd-input");
    for (var i = 0; i < quantityInputs.length; i++) {
        quantityInputs[i].addEventListener("change", checkIfInputIsNull);
    }

    // Botão add produto ao carrinho
    const addToCartButtons = document.getElementsByClassName("add-to-cart-button");
    for (var i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener("click", addProductToCart);
    }

    // Botão inspecionar produto 
    const inspectProductButtons = document.getElementsByClassName("inspect-product-button");
    for (var i = 0; i < inspectProductButtons.length; i++) {
        inspectProductButtons[i].addEventListener("click", inspectProduct);
    }

    // Botão comprar
    const purchaseButton = document.getElementsByClassName("purchase-button")[0];
    if (purchaseButton) {
        purchaseButton.addEventListener("click", makePurchase);
    }
}

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

// Funções auxiliares
function inspectProduct(event) {
    const button = event.target;
    const productId = button.getAttribute("data-product-id");
    const productDetail = productList.find(p => p.id == productId);

    if (productDetail) {
        alert(`Inspecionando: ${productDetail.title}\nPreço: R$${productDetail.price.toFixed(2).replace('.', ',')}`);
    } else {
        alert("Detalhes do produto não encontrados.");
    }
}

function removeProduct(event) {
    event.target.closest(".cart-product").remove();
    updateTotal();
}

function checkIfInputIsNull(event) {
    if (event.target.value === "0" || event.target.value < 0 || event.target.value === "") { 
        event.target.closest(".cart-product").remove();
    } else {
        event.target.value = Math.max(1, parseInt(event.target.value)); 
    }
    updateTotal();
}

function addProductToCart(event) {
    const button = event.target;
    const productInfos = button.parentElement;
    const productId = productInfos.querySelector(".inspect-product-button").getAttribute("data-product-id");
    
    const product = productList.find(p => p.id == parseInt(productId));

    if (!product) return;

    const productName = product.title;
    const productPrice = product.price;
    const productImage = product.image;
    const displayPrice = `R$ ${productPrice.toFixed(2).replace('.', ',')}`;

    const productsCartNames = document.getElementsByClassName("cart-product-title");
    for (var i = 0; i < productsCartNames.length; i++) {
        if (productsCartNames[i].innerText === productName) {
            productsCartNames[i].closest(".cart-product").querySelector(".product-qtd-input").value++;
            updateTotal();
            return;
        }
    }

    let newCartProduct = document.createElement("tr");
    newCartProduct.classList.add("cart-product");
    newCartProduct.setAttribute("data-product-id", productId);

    newCartProduct.innerHTML = `
        <td class="product-identification">
            <img src="${productImage}" alt="${productName}" class="cart-product-image">
            <strong class="cart-product-title">${productName}</strong>
        </td>
        <td>
            <span class="cart-product-price">${displayPrice}</span>
            <input type="hidden" class="cart-product-price-hidden" value="${productPrice}">
        </td>
        <td>
            <input type="number" value="1" min="1" class="product-qtd-input">
            <button type="button" class="remove-product-button">Remover</button>
        </td>
    `;
    
    const tableBody = document.querySelector(".cart-table tbody");
    tableBody.append(newCartProduct);

    newCartProduct.querySelector(".remove-product-button").addEventListener("click", removeProduct);
    newCartProduct.querySelector(".product-qtd-input").addEventListener("change", checkIfInputIsNull);

    updateTotal();
}

function makePurchase() {
    if (totalAmount === "0,00") {
        alert("Seu carrinho está vazio!");
    } else {    
        alert(`Obrigado pela sua compra!\nValor do pedido: R$${totalAmount}\nVolte sempre :)`);
        document.querySelector(".cart-table tbody").innerHTML = "";
        updateTotal();
    }
}

function updateTotal() {
    const cartProducts = document.getElementsByClassName("cart-product");
    let currentTotalAmount = 0;

    for (var i = 0; i < cartProducts.length; i++) {
        let productPriceElement = cartProducts[i].querySelector(".cart-product-price-hidden");
        let productPrice = 0;
        
        if (productPriceElement) productPrice = parseFloat(productPriceElement.value);
        const productQuantity = cartProducts[i].getElementsByClassName("product-qtd-input")[0]?.value || 0;
        currentTotalAmount += productPrice * productQuantity;
    }
    
    totalAmount = currentTotalAmount.toFixed(2).replace(".", ",");
    document.querySelector(".cart-total-price").innerText = "R$" + totalAmount;
}
