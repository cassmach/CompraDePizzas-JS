// Funções utilitárias para seleção de elementos
let modalQt = 1;
let cart = [];
let modalKey = 0;
const c = (el) => document.querySelector(el); 
const cs = (el) => document.querySelectorAll(el); 


// Listagem das Pizzas
// Preencher informações de pizza
pizzaJson.map((item, index) => {
    let pizzaItem = c('.models .pizza-item').cloneNode(true);

    // Atribuir índice da pizza
    pizzaItem.setAttribute('data-key', index);

    // Atualizar elementos com dados da pizza
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    // Adicionar evento de clique na pizza
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQt = 1;
        modalKey = key;

    
        // Atualizar modal com informações da pizza selecionada
        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        c('.pizzaInfo--size.selected').classList.remove('selected');
        cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if(sizeIndex == 2){
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML =  pizzaJson[key].sizes[sizeIndex]
        });

        // colocar uma quantidade padrão 
        c('.pizzaInfo--qt').innerHTML = modalQt;

        // Exibir modal com animação
        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200);
    });


    // Adicionar pizza à área de exibição
    c('.pizza-area').append(pizzaItem);
});



// Eventos do Modal

                // Fechar modal
function closeModal () {
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        c('.pizzaWindowArea').style.display = 'none';
    }, 500);

}

cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton ').forEach((item) =>{
        item.addEventListener('click', closeModal);
});

      // para diminuir  e aumentar a quantidade
c('.pizzaInfo--qtmenos').addEventListener('click', ()=> {
    if (modalQt > 1){
        modalQt--;
        c('.pizzaInfo--qt').innerHTML = modalQt;
    }
   
});


c('.pizzaInfo--qtmais').addEventListener('click', ()=> {
    modalQt++;
    c('.pizzaInfo--qt').innerHTML = modalQt;
});

cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', (e)=> {
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
  })
});


                // Para colocar os produtos no carrinho

c('.pizzaInfo--addButton').addEventListener('click', ()=> {
    let size =  parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));

    let identifier = pizzaJson[modalKey].id+'@'+size

    let key = cart.findIndex((item)=> item.identifier == identifier);

    if(key > -1){
        cart[key].qt += modalQt  // se ele achou só muda a quantidade

    } else { // se não adiciona um novo
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,// identificação do modelo da pizza
            size, // tamanho
            qt:modalQt  // quantidade
        });

    }
    updateCart(); 
    closeModal();
});
        // Fazer o aside aparecer no mobile
c('.menu-openner').addEventListener('click', ()=> {
    if (cart.length >0){
        c('aside').style.left = '0';

    }
});

    // Para fechar o  aside no mobile
c('.menu-closer').addEventListener('click', ()=> {
    c('aside').style.left = '100vw';
})

            // Mostrar o Carrinho 
function updateCart () {
        
    c('.menu-openner span').innerHTML = cart.length; // ajustes para o mobile

                    // Versão PC
    if (cart.length > 0) {
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';

        
        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart){
            let pizzaItem = pizzaJson.find((item)=> item.id == cart[i].id);
            subtotal += pizzaItem.price * cart[i].qt   // para aumentar no subtotal




            let cartItem = c('.models .cart--item').cloneNode(true);

            let pizzaSizeName;
            switch(cart[i].size) {
                case 0:
                pizzaSizeName = 'P';
                break;
                case 1:
                pizzaSizeName = 'M';
                break;
                case 2:
                pizzaSizeName = 'G';
                break;
            }
                    // Exibir os itens no carrinho

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;


            cartItem.querySelector('img').src = pizzaItem.img; // add imagem
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName; // nome da pizza
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt; // quantidade
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if(cart[i].qt > 1) {
                    cart[i].qt--;
                }else {
                    cart.splice(i, 1);  // diminuição da qt  usando o updateCart para fechar o carrinho caso qt estejá 0
                }
                updateCart()
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qt++;   //Adicionar quantidade
                updateCart();
            });
            


            c('.cart').append(cartItem);

        }

        // cálculo basico de total com desconto
        desconto = subtotal * 0.1 ;
        total = subtotal - desconto;

        // Exibir os valores
        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`


        // Para fechar o carrinho
    }else {
        c('aside').classList.remove('show');
        c('aside').style.left = '100vw';
    }
};
