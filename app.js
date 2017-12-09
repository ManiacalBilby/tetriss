var campo = new Campo({ x: 20, y: 30 });

var game = new Game({
	campo: campo,
	velocidade: 300
});

var pecaAtual = new Peca({});

$(document).ready(function() {
	game.getCampo().gerar();
	
	// Loop principal
	setInterval(function() {
		
		if(game.colidiuY(pecaAtual) || game.getCampo().fimY(pecaAtual)) {
			game.mataPeca(pecaAtual);
			pecaAtual = new Peca({});

		}

		pecaAtual.desce(game.getCampo());

	}, game.getVelocidade());

	// Verifica se alguma tecla foi pressionada
	$("body").keydown(function(e) {

	  	// up
	  	if(e.keyCode == 38) {	
	  		pecaAtual.rotaciona();
	  	}

	  	// baixo
	  	else if(e.keyCode == 40) {
	  		if(!game.colidiuY(pecaAtual) && !game.getCampo().fimY(pecaAtual)) {
		  		pecaAtual.desce(game.getCampo());
	  		}
  		}

		// left
	  	if(e.keyCode == 37 && !game.getCampo().fimEsquerda(pecaAtual)) {
			if(!game.colidiuEsquerda(pecaAtual)) {
				pecaAtual.praEsquerda(game.getCampo());
			} else {
				// Fazer barulho/feedback visual indicando que não é possível
			}
	  	}	  	

	  	// right
	  	else if(e.keyCode == 39 && !game.getCampo().fimDireita(pecaAtual)) {
			if(!game.colidiuDireita(pecaAtual)) {
				pecaAtual.praDireita(game.getCampo());
			} else {
				// Fazer barulho/feedback visual indicando que não é possível
			}
	  	}
	});
});