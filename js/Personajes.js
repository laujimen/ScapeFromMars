
/* Los personajes enemigos son tres objetos, los tres funcionan de la misma manera. 
a todo los personajes se les da una posicion relativa fuera del canvas.
funcion dibuja: dibuja a los personajes dentro del canvas
función movimiento: mueve los personajes por el canvas, cada vez que el personaje principal salta
a uno de los enemigos se le suma 1 a la puntuación, si llega a 10 la velocidad de lo personajes 
aumenta y se sube al nivel 2 y si llega a 15 vuelve a aumentar la velocidad y se sube de nivel.*/


function Personaje1(posicionX, posicionY){
	//
	this.posicionX = posicionX;
	this.posicionY = posicionY;

	this.imgPers1 = document.createElement('img');
	this.imgPers1.src = 'img/personaje1.png';

	this.dibuja = function (){
		ctx.drawImage(this.imgPers1,0,0,5420,2686, this.posicionX, this.posicionY,80, 40);
	};

	this.movimiento = function (){
		if (this.posicionX<-50){
			this.posicionX = width+50;
			estado.puntuacion++;
		}else{
			if (estado.puntuacion<10){
				this.posicionX -=estado.velocidad1;
			}else if(estado.puntuacion>=10&&estado.puntuacion<15){
				this.posicionX -=estado.velocidad1+nivel.nivel2;
				if (marciano.muerto == true){
					nivel.nivel2 = 0;
				}
			}else if(estado.puntuacion>=15){
				this.posicionX -=estado.velocidad1+nivel.nivel3;
				if (marciano.muerto == true){
					nivel.nivel3 = 0;
				}
			}
		}
	};
}
var personaje1 = new Personaje1 (posicionX_P1, suelo);


function Personaje2(posicionX, posicionY){
	this.posicionX = posicionX;
	this.posicionY = posicionY;

	this.imgPers2 = document.createElement('img');
	this.imgPers2.src = 'img/personaje2.png';
 
	this.dibuja = function (){
		ctx.drawImage(this.imgPers2,0,0,1114,590, this.posicionX, this.posicionY, 80, 43);
	};

	this.movimiento = function (){
		if (this.posicionX<-100){
			this.posicionX = width+100;
			estado.puntuacion++;
		}else{
			if (estado.puntuacion<10){
				this.posicionX -=estado.velocidad2;
			}else if(estado.puntuacion>=10&&estado.puntuacion<15){
				this.posicionX -=estado.velocidad2+nivel.nivel2;
				if (marciano.muerto == true){
					nivel.nivel3 = 0;
				}
			}else if(estado.puntuacion>=15){
				this.posicionX -=estado.velocidad2+nivel.nivel3;
				if (marciano.muerto == true){
					nivel.nivel3 = 0;
				}
			}
		}
	};
}

var personaje2 = new Personaje2 (posicionX_P2,suelo);

function Personaje3(posicionX, posicionY){
	this.posicionX = posicionX;
	this.posicionY = posicionY;

	this.imgPers3 = document.createElement('img');
	this.imgPers3.src = 'img/personaje3.png';

	this.dibuja = function (){
		ctx.drawImage(this.imgPers3,0,0,1001,718, this.posicionX, this.posicionY, 90, 65);
	};

	this.movimiento = function(){
		if (this.posicionX<-150){
			this.posicionX = width+150;
			estado.puntuacion++;
		}else{
			if (estado.puntuacion<10){
				this.posicionX -=estado.velocidad3;
			}else if(estado.puntuacion>=10&&estado.puntuacion<15){
				this.posicionX -=estado.velocidad3+nivel.nivel2;
				if (marciano.muerto == true){
					nivel.nivel3 = 0;
				}
			}else if(estado.puntuacion>=15){
				this.posicionX -=estado.velocidad3+nivel.nivel3;
				if (marciano.muerto == true){
					nivel.nivel3 = 0;
				}
			}
		}
	};
}

var personaje3 = new Personaje3 (posicionX_P3, suelo);
