//VARIABLES
var canvas; 
var ctx; 
var planetaImg;
var sueloImg;
var audioJuego;
var sonidoSalto;
var sonidoMuerte;
var cronometro;
//CONSTANTES
var FPS = 20;
var width= 900;
var height=400;
var suelo = 300;
var contadorSaltos = 0;
var posicionX_M = 125;
var posicionX_max=175;
var velocidadY_M=0;
var gravedadY_M=2;
var velocidad_salto=20;
var salto_accion=false;
var marciano_muerto=false;
var posicionX_P1=width+50;
var posicionX_P2=width+100;
var posicionX_P3=width+150;
var cambio_nivel2=10;
var cambio_nivel3=15;
var level2=5;
var level3=10;

var puntuacion_inicial=0;
var level=1;
var velocidad_m=5;
var velocidad_p1=7;
var velocidad_p2=8;
var velocidad_p3=12;
var posicionX_suelo=0;
var posicionX_planeta=width+50;
var posicionY_planeta=5;

//dibuja el canvas
function precargar(){
	canvas = document.getElementById ('canvas');
	ctx = canvas.getContext('2d');
	imagenes();
	

	setInterval (function(){
		main();
		cambioMalos();
	},1000/FPS);

}

//Borra el canvas
function clearRect(x, y, width, height){
	ctx.clearRect(0,0,canvas.width, canvas.height);	
}

//Inicializa todas las variables a su valor inicial
function resetJuego() {

	estado.velocidad = 5; 
	estado.velocidad1 = 7;
	estado.velocidad2 = 8;
	estado.velocidad3 = 11;
	nivel.nivel2 = 10;
	nivel.nivel3 = 20;
	personaje1.posicionX = width+50;
	personaje2.posicionX = width+100;
	personaje3.posicionX = width+150;
	planeta.posicionX = width+50;       
	estado.puntuacion = 0;
	estado.nivel =1;
	marciano.muerto= false;
	audioJuego.currentTime = 0;
	audioJuego.play();
	sonidoMuerte.currentTime=0;
}

//dibuja el suelo y el planeta en el canvas
function imagenes(){

	sueloImg = new Image();
	sueloImg.src = 'img/suelo.jpg';
	planetaImg = new Image(); 
	planetaImg.src = 'img/sprite3.png';
	lunaImg = new Image(); 
	lunaImg.src = 'img/luna.png';

}

//evento: el marciano salta pulsando a la flecha hacia arriba del teclado 
	document.addEventListener('keydown', function(evento){
		if(evento.keyCode==38){
			if (marciano.muerto == false){
				marciano.saltar();
			}
		}		
	});


//Evento: reinicia el juego pulsando a espacio
	document.addEventListener('keydown', function(evento){
		if(evento.keyCode==32){
			if (marciano.muerto == true){
				resetJuego();

			}
		}
	});


/*dibuja al final de la partida la puntiacion, el nivel y si se desea volver a jugar 
aumenta el nivel cuando llega la puntacion a 10 y a 15
*/

function puntuacion (){
	ctx.font = "30px impact";
	ctx.fillStyle = '#00a5db';
	ctx.fillText (`${estado.puntuacion}`, 600, 50);

	if(marciano.muerto == true){
		ctx.font = "90px impact";
		ctx.fillText (`GAME OVER`, 350, 150);
		ctx.font = "30px impact";
		ctx.fillText (`¿Quieres volver a jugar? Pulse ESPACIO`, 260, 200);
	}
}

function niveles (){
	ctx.font = "30px impact";
	ctx.fillStyle = '#00a5db';
	ctx.fillText (`NIVEL ${estado.nivel}`, 650, 50);

	if (estado.puntuacion== cambio_nivel2){
		estado.nivel = 2;
	}else if (estado.puntuacion == cambio_nivel3){
		estado.nivel = 3;
	}
}

function Nivel (nivel2, nivel3){
	this.nivel2 = nivel2;
	this.nivel3 = nivel3;
}
var nivel = new Nivel (level2, level3);


//Inicializa la velocidad de los personajes, y de la decoracion del canvas, suelo y planeta
//Inicializa la puntuacion y el nivel 
function Estado (puntuacion,nivel,velocidad, velocidad1, velocidad2, velocidad3){
	this.puntuacion = puntuacion; 
	this.nivel = nivel;
	this.velocidad = velocidad;
	this.velocidad1 = velocidad1; 
	this.velocidad2 = velocidad2;
	this.velocidad3 = velocidad3;
}

var estado = new Estado (puntuacion_inicial, level, velocidad_m, velocidad_p1, velocidad_p2, velocidad_p3);


function Suelo(posicionX, posicionY) {
	this.posicionX = posicionX;
	this.posicionY =  posicionY;
}

var suelomov = new Suelo (posicionX_suelo, suelo);

function dibujaSuelo(){
	ctx.drawImage(sueloImg,suelomov.posicionX, 0, width,208,0, 320,width*7, 80);
}

function movimientoSuelo(){
 	if (suelomov.posicionX>width/4){
		suelomov.posicionX=0;
	}else{
		suelomov.posicionX +=estado.velocidad;
	}
}

function Planeta(posicionX, posicionY) {
	this.posicionX = posicionX;
	this.posicionY =  posicionY;
}

var planeta = new Planeta(posicionX_planeta, posicionY_planeta);

function dibujaPlaneta(){
	ctx.drawImage(planetaImg,0,0,512, 512, planeta.posicionX, planeta.posicionY, 150, 150);
}

function movimientoPlanetas(){
	if ((planeta.posicionX<-200) ){
		planeta.posicionX = width+200;		
	}else{
		planeta.posicionX -= estado.velocidad;		
	}
}

//Evento multimedia: cuando lleva 10 segundo de audio sale el personaje 2 y cuando pasan 20 segundos sale el último personaje
function cambioMalos(){
	audioJuego = document.getElementById("audioJuego");
	ctx.font = "30px impact";
	ctx.fillStyle = '#00a5db';
	ctx.fillText (`Tiempo Juego: ${parseFloat(Math.round(audioJuego.currentTime * 100) / 100).toFixed(2)}`, 100 , 50);
	if(audioJuego.currentTime >= 20.00 ){
			personaje3.movimiento();
			personaje3.dibuja();
		} 
		if (audioJuego.currentTime >= 10.00){
			personaje2.movimiento();
			personaje2.dibuja();
		}
}

// Evento: cuando salta el marciano suena una música
function audioSalto(){
	sonidoSalto=document.createElement('audio');
    sonidoSalto.setAttribute('src', 'media/Crash.mp3');
    sonidoSalto.play();
}

//Evento: cuando muere el marciano suena una música
function audioMuerte(){
   	sonidoMuerte=document.getElementById("myaudio")
   	sonidoMuerte.play();
   	if (sonidoMuerte.currentTime>=2.5){
   		sonidoMuerte.pause();
   		   		
   	}      
}

function main(){
	clearRect();
	//Movimiento
	marciano.gravedad();
	marciano.colisiones();
	movimientoSuelo();
	personaje1.movimiento();
	movimientoPlanetas();	
	//Dibujos
	dibujaPlaneta();
	dibujaSuelo();
	personaje1.dibuja();
	marciano.dibuja();	
	puntuacion();
	niveles();
	cambioMalos();	
	
}
