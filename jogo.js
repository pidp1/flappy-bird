
let frames = 0;
const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav'

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');



//chão
function criaChao() {
  const chao = {
    spriteX:0,
    spriteY:609,
    largura:224,
    altura:112,
    x:0,
    y: canvas.height - 112,
    atualiza(){
      const movimentodoChao = 1;
      const repeteEm = chao.largura/ 2;
      const movimentacao = chao.x - movimentodoChao;

      chao.x = movimentacao % repeteEm ;
    },
    desenha() {
      contexto.drawImage(
        sprites,
        chao.spriteX, chao.spriteY,
        chao.largura, chao.altura,
        chao.x, chao.y,
        chao.largura, chao.altura
      )
  
      contexto.drawImage(
        sprites,
        chao.spriteX, chao.spriteY,
        chao.largura, chao.altura,
        (chao.x + chao.largura) , chao.y,
        chao.largura, chao.altura
      )
    }
  }

  return chao;
}


//Background

const planoDeFundo = {
  spriteX:390,
  spriteY:0,
  largura:275,
  altura:205,
  x:0,
  y: canvas.height - 205,
  desenha() {
      contexto.fillStyle = '#70c5ce';
      contexto.fillRect(0,0, canvas.width, canvas.height)

      contexto.drawImage(
        sprites, 
        planoDeFundo.spriteX, planoDeFundo.spriteY,
        planoDeFundo.largura, planoDeFundo.altura,
        planoDeFundo.x, planoDeFundo.y,
        planoDeFundo.largura, planoDeFundo.altura,
      )

      contexto.drawImage(
        sprites, 
        planoDeFundo.spriteX, planoDeFundo.spriteY,
        planoDeFundo.largura, planoDeFundo.altura,
        (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
        planoDeFundo.largura, planoDeFundo.altura,
      )
  }

}


const mensagemGetReady = {
  spriteX:134,
  spriteY:0,
  largura:174,
  altura:152,
  x:(canvas.width / 2) - 174 / 2,
  y: 50,
  desenha() {
    contexto.drawImage(
      sprites,
      mensagemGetReady.spriteX, mensagemGetReady.spriteY,
      mensagemGetReady.largura, mensagemGetReady.altura,
      mensagemGetReady.x, mensagemGetReady.y,
      mensagemGetReady.largura, mensagemGetReady.altura
    )
  }
}

const mensagemGameOver = {
  spriteX:134,
  spriteY:153,
  largura:226,
  altura:200,
  x:(canvas.width / 2) - 226 / 2,
  y: 50,
  desenha() {
    contexto.drawImage(
      sprites,
      mensagemGameOver.spriteX, mensagemGameOver.spriteY,
      mensagemGameOver.largura, mensagemGameOver.altura,
      mensagemGameOver.x, mensagemGameOver.y,
      mensagemGameOver.largura, mensagemGameOver.altura
    )
  }
}

function fazColizao (flappyBird, chao) {
  const flappyBirdY = flappyBird.y + flappyBird.altura;
  const chaoY = chao.y;

  if (flappyBirdY >= chaoY) {
    return true;
  }
  return false
 
} 

//flappy bird

function criaFlappyBird() {
  const flappyBird = {
    spriteX:0,
    spriteY:0,
    largura:35,
    altura:25,
    x:10,
    y:50,
    velocidade: 0,
    gravidade: 0.19,
    pulo: 4.1,
  
    pula() {
      flappyBird.velocidade = - flappyBird.pulo;
    },
  
    atualiza(){
      if(fazColizao(flappyBird, globais.chao)) {
        console.log ("fez colisão");
        som_HIT.play();
  
        mudaParaTela(telas.GAME_OVER);
        return;
      }
      
      flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
      flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },
    movimentos:[
      {spriteX: 0,spriteY: 0}, //asa para cima
      {spriteX: 0,spriteY: 26}, // asa no meio
      {spriteX: 0,spriteY: 52}, // asa para baixo
    ],
    frameAtual: 0,
    atualizaOFrameAtual() {
      const intervaloDeFrames = 10;
      const passouOIntervalo = frames % intervaloDeFrames === 0;

      if(passouOIntervalo){
        const baseDoIncremento = 1;
      const incremento = baseDoIncremento + flappyBird.frameAtual;
      const baseRepeticao = flappyBird.movimentos.length;
      flappyBird.frameAtual = incremento % baseRepeticao
      }
      

    },
    desenha(){
      flappyBird.atualizaOFrameAtual();
      const { spriteX , spriteY } = flappyBird.movimentos[flappyBird.frameAtual];
      contexto.drawImage ( 
          sprites, 
          spriteX, spriteY, 
          flappyBird.largura, flappyBird.altura, 
          flappyBird.x, flappyBird.y,
          flappyBird.largura, flappyBird.altura,
      )
    }
  }
  return flappyBird;
}

function criaCanos() {
   const canos = {
    largura: 52,
    altura: 400,
    chao: {
      spriteX: 0,
      spriteY: 169,
    },
    ceu: {
      spriteX: 52, 
      spriteY: 169,
    },
    espaco: 80,
    desenha() {
      canos.pares.forEach(function(par){
        const yRandom = par.y;
        const espacamentoEntreCanos = 90;

        const canoCeuX = par.x;
        const canoCeuY = yRandom;
            // cano do ceu
          contexto.drawImage(
            sprites, 
            canos.ceu.spriteX, canos.ceu.spriteY,
            canos.largura, canos.altura,
            canoCeuX, canoCeuY, 
            canos.largura, canos.altura,
          )

          const canoChaoX = par.x;
          const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom; 
          contexto.drawImage(
            sprites, 
            canos.chao.spriteX, canos.chao.spriteY,
            canos.largura, canos.altura,
            canoChaoX, canoChaoY, 
            canos.largura, canos.altura,
          )

          par.canoCeu ={
            x: canoCeuX,
            y: canos.altura + canoCeuY
          }

          par.canoChao = {
            x: canoChaoX,
            y: canoChaoY
          }

      })
    },
    temColisaoComOFlappyBird (par) {
      const cabecaDoFlappy = globais.flappyBird.y;
      const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;

      if ((globais.flappyBird.x + globais.flappyBird.largura) >= par.x){

        if (cabecaDoFlappy <= par.canoCeu.y){
          return true;
        }

        if (peDoFlappy >= par.canoChao.y ){
          return true
        }

      }

      return false;


    },
    pares: [],
    atualiza(){
      const passou100Frammes = frames % 100 === 0 ;
      if (passou100Frammes){ 
        canos.pares.push({
          x: canvas.width,
          y: -150 * (Math.random() + 1),
        });
      }

      canos.pares.forEach(function(par){
        par.x = par.x - 2;

        if(canos.temColisaoComOFlappyBird(par)){
          mudaParaTela(telas.GAME_OVER);
          som_HIT.play();

        }

        if(par.x + canos.largura <= 0) {
          canos.pares.shift();
        }
      })

    }
   }
   return canos;
}

function criaPlacar() {
  const placar = {
    pontuacao: 0,
    desenha() {
      contexto.font = '35px "VT323"';
      contexto.textAlign = 'right';
      contexto.fillStyle = 'white';
      contexto.fillText(`${placar.pontuacao}`, canvas.width - 10, 35);

    },
    atualiza() {
      const intervaloDeFrames = 100;
      const passouOIntervalo = frames % intervaloDeFrames === 0;

      if(passouOIntervalo) {
        placar.pontuacao = placar.pontuacao + 1;
      }
    },
  }
  return placar;

};

//
// [telas]
//
const globais = {};
let telaAtiva = {};
function mudaParaTela (novaTela) {
  telaAtiva = novaTela;

  if (telaAtiva.inicializa) {
    telaAtiva.inicializa();
  }
}


const telas = {
  INICIO: {
    inicializa() {
      globais.flappyBird = criaFlappyBird();
      globais.chao = criaChao();
      globais.canos = criaCanos();
    },
    desenha(){
      planoDeFundo.desenha();
      
      globais.flappyBird.desenha();
    
      globais.chao.desenha();
      mensagemGetReady.desenha(); 
    },
    click(){
      mudaParaTela(telas.JOGO);

    },
    atualiza(){
      globais.chao.atualiza();
    },   
  }
}

telas.JOGO = {
  inicializa() {
    globais.placar = criaPlacar() 
  },
  desenha(){
    planoDeFundo.desenha();
    globais.canos.desenha();
    globais.chao.desenha();
    globais.flappyBird.desenha();
    globais.placar.desenha();
  },
  click(){
    globais.flappyBird.pula()
  },

  atualiza(){
    globais.chao.atualiza();
    globais.canos.atualiza();
    globais.flappyBird.atualiza();
    globais.placar.atualiza();
  },
}

telas.GAME_OVER = {
  desenha() {
    mensagemGameOver.desenha();
  },
  atualiza() {

  },
  click(){
    mudaParaTela(telas.INICIO);
  },
};

function loop() {

  telaAtiva.desenha();
  telaAtiva.atualiza();

  frames = frames + 1;

  requestAnimationFrame(loop);
};

window.addEventListener ('click', function (){
  if (telaAtiva.click){
    telaAtiva.click();
  }
})

mudaParaTela(telas.INICIO);
loop();
  
