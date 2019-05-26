let strawberryHasFound = false;
let strawberriesIds = [];
let tentativas = 2;
const morangosContainer = $(".container-imagens").children().children();
let positionValueToSort = 6;
let scrollPosAfter = 0;

// função para recomeçar o jogo
const refreshPage = () => {
  for (let m = 0; m < morangosContainer.length; m++) {
    let morangoImg = $(morangosContainer[m]);
    $(morangoImg).removeClass('disabled');
    $(morangoImg).addClass('morango-enable');
    $(morangoImg).attr('src', 'morango.png');
    strawberryHasFound = false;
    tentativas = 2;
    $(".tentativas").html(`You have <b>${tentativas}</b> attempts`);
  }
  randNumberEscolhido = generateRandNumber(6);
}

$("#tryAgain").on('click', () => {
  refreshPage();
})

const generateRandNumber = (_max) => {
  // +1 para não começar em 0
  let _numb = Math.floor((Math.random() * _max) + 1);
  return _numb;
}

// Função de animação do topo do layout ao navegar na pagina
const scrollAnimation = function () {
  let scrollPosWhileScrolling = $(this).scrollTop();
  let heigthTopo = $(".topo").height()
  if (scrollPosWhileScrolling > scrollPosAfter) {
    if ($(".topo").css('top') != ('-' + (heigthTopo + 15) + 'px')) {
      $(".topo").css('top', '-' + (heigthTopo + 15) + 'px');
    }
  } else {
    if ($(".topo").css('top') != (15 + 'px')) {
      $(".topo").css('top', 15 + 'px');
    }
  }
  scrollPosAfter = scrollPosWhileScrolling;
}

$(window).scroll(
  _.debounce(() => {
    scrollAnimation();
  }, 100)
)

// $(window).scroll(() => {
// scrollAnimation();
// })

scrollAnimation();

// o numero sorteado da rodada é gerado aleatóriamente pela função generateRandNumber
let randNumberEscolhido = generateRandNumber(6);

// cria um array que serão os ids dos morangos, com números de 1 a 6
for (let i = 1; i <= 6; i++) {
  strawberriesIds.push(i);
}

// atribui ids aleatórios aos morangos utilizando os ids do array strawberriesIds
for (let j = 0; j < morangosContainer.length; j++) {
  let morangoImg = $(morangosContainer[j]);
  // o positionValueToSort vai decrementando 1 a cado repetição, vai ser usado como valor máximo a ser gerado um número aleatórioç
  positionValueToSort--;
  let randPosition = generateRandNumber(positionValueToSort);
  if (strawberriesIds.length > 1) {
    // pega um numero do array strawberriesIds em uma posição aleatória com o 'randPosition'
    let m = strawberriesIds[randPosition];
    // atribui a cada morango um id com o numero escolhido
    $(morangoImg).attr('id', `morango-${m}`);
    // tira este número que foi escolhido do array de ids 'strawberriesIds'
    strawberriesIds.splice(strawberriesIds.indexOf(m), 1);
  } else {
    // atribui a cada morango um id com o numero escolhido
    $(morangoImg).attr('id', `morango-${strawberriesIds[0]}`);
  }
}

$(".morango").on('click', function () {
  // caso ainda tenha tentativas, o morango não tenha sido achado e este não possua a classe de desabilitado
  if (tentativas > 0 && !strawberryHasFound && !$(this).hasClass('disabled')) {
    // atualiza a qtde de tentativas
    tentativas -= 1;
    $(".tentativas").html(`You have <b>${tentativas}</b> attempts`);
    // pega o numero do morango a partir do id do mesmo
    let numbMorango = $(this).attr('id').split('-')[1];
    // uma vez clicado perde a classe de habilitado
    $(this).removeClass('morango-enable');
    // caso não seja o morango escolhido recebe a classe de desabilitado
    if (randNumberEscolhido != numbMorango) {
      $(this).addClass('disabled');
    }
    // se o morango clicado for o morango de ouro
    if (randNumberEscolhido == numbMorango) {
      // faz um loop por todos os morangos
      for (let k = 0; k < morangosContainer.length; k++) {
        let morangoImg = $(morangosContainer[k]);
        // remove de todos a classe de habilitado, que é a que transforma o cursor no tipo 'pointer'
        $(morangoImg).removeClass('morango-enable');
        // compara o id do morando clicado com os ids de todos os morangos, caso seja diferente atribui a classe de desabilitado
        if ($(morangoImg).attr('id') != $(this).attr('id')) {
          $(morangoImg).addClass('disabled');
        }
      }
      // muda o src do morango escolhido para o morango de ouro
      $(this).attr('src', 'morango_ouro.png');
      // muda o conteudo do .tentativas e muda a variavel que indica que o morango de ouro foi achado
      $(".tentativas").html(`You won the game!!`);
      strawberryHasFound = true;
    }
  }
  // caso acabem as tentativas
  if (tentativas == 0 && !strawberryHasFound) {
    for (let l = 0; l < morangosContainer.length; l++) {
      let morangoImg = $(morangosContainer[l]);
      // muda as classes de todos os morangos para desabilitados
      $(morangoImg).removeClass('morango-enable');
      $(morangoImg).addClass('disabled');
      $(".tentativas").html(`You lose`);
    }
  }
});