// Funções utilitárias para seleção de elementos
let modalQt = 1;
const c = (el) => document.querySelector(el); 
const cs = (el) => document.querySelectorAll(el); 

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
