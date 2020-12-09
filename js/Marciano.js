/*Funcionamiento del personaje principal: 
Cremaos un objeto Marciano con sus respectivas variables, posiciones, gravedad, salto y muerte, 
dibujamos el marciano en el canvas, indicando sus posiciones relativas. 
Para el movimiento del marciano hemos implementado tres funciones, saltar, gravedad y colisiones.*/

function Marciano (posicionX, posicionY, velocidadY, gravedadY, salto, saltoAccion, muerto){
	this.posicionX = posicionX;
	this.posicionY = posicionY; 
	this.velocidadY = velocidadY; 
	//this.velocidadYMax = velocidadYMax;
	this.gravedadY = gravedadY; 
	this.salto = salto; 
	this.saltoAccion = saltoAccion; 
	this.muerto = muerto;
	
	this.img = document.createElement('img')
	this.img.src = 'img/extraterrestre.png';
	this.dibuja = function(){
		ctx.drawImage(this.img,0,0,458, 419, this.posicionX, this.posicionY-45, 80, 80);
	};

	/* La función saltar funciona en base a un contador y a la variable booleana saltoAccion, 
	si el marciano esta saltando, la velocidad de marciano en el eje Y aumenta y el contador sube
	hasta que llega a dos, ya que solo puede saltar dos veces*/
	
	this.saltar = function(){
		if (contadorSaltos < 2 ) {
			this.saltoAccion = true;
			this.velocidadY = this.salto;
			contadorSaltos++;
			audioSalto();
		}
	};

	/*La función gravedad sirve para que cuando el marciano salta vuelva a su posición inicial.
	Si la variable saltoAccion es true, se fuerza a que sea false y se le resta la velocidad,
	y el contador de saltos se pone a 0 */

	this.gravedad = function (){
		if (this.saltoAccion == true){
			if (this.posicionY>0){
				if (this.posicionY - this.velocidadY- this.gravedadY >suelo){//mayor al suelo
				 	this.saltoAccion = false;
				 	this.velocidadY = 0;
				 	this.posicionY = suelo; //para que se quede en la posicion inicial
				 	contadorSaltos = 0;
				
				}else{
					this.velocidadY -= this.gravedadY;
					this.posicionY -= this.velocidadY;
				}

			}else{
				this.posicionY = 0;
				this.velocidadY -= this.gravedadY;
				this.posicionY -= this.velocidadY;		
			}

		}
	};

	/* La función colisiones detecta cuando el marciano se choca con uno de sus enemigos*/

	this.colisiones = function(){
		if (personaje1.posicionX >= posicionX_M && personaje1.posicionX<= posicionX_max||personaje2.posicionX >= posicionX_M && personaje2.posicionX<= posicionX_max||personaje3.posicionX >= posicionX_M && personaje3.posicionX<= posicionX_max){
			
			if (marciano.posicionY >= suelo){
				audioJuego.pause();
				audioMuerte();
				//estoymuerto=false;	
				marciano.muerto = true;
				estado.velocidad =0;
				estado.velocidad1 = 0;
				estado.velocidad2 = 0;
				estado.velocidad3 = 0;
			}
		}
	};
}

var marciano = new Marciano (posicionX_M, suelo, velocidadY_M, gravedadY_M, velocidad_salto, salto_accion, marciano_muerto);
