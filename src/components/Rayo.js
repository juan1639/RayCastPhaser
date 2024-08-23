import { Escenario } from "./Escenario";
import { Settings } from "../scenes/Settings";
import { normalizaAngulo, calculaDistanciaEntrePtos } from "../functions/Functions";

export class Rayo {

    constructor(scene, args)
    {
        this.relatedScene = scene;
        this.args = args;
    }

    create()
    {
        const {
            x, y,
            anguloRotacion,
            incrAngulo,
            angulo,
            wallHitX,
            wallHitY,
            wallHitXHorizontal,
            wallHitYHorizontal,
            wallHitXVertical,
            wallHitYVertical,
            columna,
            distancia,
            pixelTextura,
            idTextura,
            valorTH,
            valorTV,
            distanciaPlanoProyeccion,
            hCamara
        } = this.args;

        this.rayo =
        {
            x: x,
            y: y,
            anguloRotacion: anguloRotacion,
            incrAngulo: incrAngulo,
            angulo: angulo,
            wallHitX: wallHitX,
            wallHitY: wallHitY,
            wallHitXHorizontal: wallHitXHorizontal,
            wallHitYHorizontal: wallHitYHorizontal,
            wallHitXVertical: wallHitXVertical,
            wallHitYVertical: wallHitYVertical,
            columna: columna,
            distancia: distancia,
            pixelTextura: pixelTextura,
            idTextura: idTextura,
            valorTH: valorTH,
            valorTV: valorTV,
            distanciaPlanoProyeccion: distanciaPlanoProyeccion,
            hCamara: hCamara
        };

        console.log(this.rayo);
    }

    update()
    {
        this.dibujaRayo();
    }

    dibujaRayo()
    {
        this.actualizaRayo();

        const distanciaHorizontal = 9999;
        const distanciaVertical = 9999;

        if (this.colisionesHorizontales())
        {
            const whx = this.wallHitXHorizontal;
            const why = this.wallHitYHorizontal;
            const distanciaEntrePtos = calculaDistanciaEntrePtos(whx, why, this.rayo.x, this.rayo.y);
            distanciaHorizontal = distanciaEntrePtos;
        }

        if (this.colisionesVerticales())
        {
            const whx = this.wallHitXVertical;
            const why = this.wallHitYVertical;
            const distanciaEntrePtos = calculaDistanciaEntrePtos(whx, why, this.rayo.x, this.rayo.y);
            distanciaVertical = distanciaEntrePtos;
        }

        let colorPared;

        if (distanciaHorizontal < distanciaVertical) {
			
			this.wallHitX = this.wallHitXHorizontal;
	        this.wallHitY = this.wallHitYHorizontal;
	        this.distancia = distanciaHorizontal;
	        colorPared = Settings.colores.PARED_CLARO;
	        
	        // ********* LINEA DE LA TEXTURA a dibujar *******
	        //casilla = Int(rayo(a).wallHitX / TILE_X) * TILE_X
	        //rayo(a).pixelTextura = rayo(a).wallHitX - casilla
	        //rayo(a).idTextura = 0 + rayo(a).valorTH
		}
        else
        {
			this.wallHitX = this.wallHitXVertical;
	        this.wallHitY = this.wallHitYVertical;
	        this.distancia = distanciaVertical;
	        colorPared = Settings.colores.PARED_OSCURO;
	        
	        // ********* LINEA DE LA TEXTURA a dibujar *******
	        //casilla = Int(rayo(a).wallHitY / TILE_Y) * TILE_Y
	        //rayo(a).pixelTextura = rayo(a).wallHitY - casilla
	        //rayo(a).idTextura = 0 + rayo(a).valorTV + 10
		}
		
	    //this.distancia = Funciones.corregirOjoPez(this.distancia, this.anguloRotacion, this.angulo);
        this.renderizaRayo();
    }

    actualizaRayo()
    {
        this.rayo.anguloRotacion = this.relatedScene.jugador.get().getData('anguloRotacion');
		
		//this.angulo += jugador.getGira() * jugador.getVelGiro();
		/* this.angulo = new BigDecimal(this.anguloRotacion - Funciones.getRadianes(Settings.FOV_MITAD)).add(
				this.incrAngulo.multiply(new BigDecimal(this.columna))); */
        
        this.rayo.angulo = (this.rayo.anguloRotacion - Settings.FOV_MITAD) + this.rayo.incrAngulo * this.rayo.columna;
		
	    this.rayo.angulo = normalizaAngulo(this.rayo.angulo);

	    this.rayo.x = this.relatedScene.jugador.get().x;
	    this.rayo.y = this.relatedScene.jugador.get().y;
    }

    renderizaRayo()
    {
	    const xD = this.rayo.wallHitX;
	    const yD = this.rayo.wallHitY;
	    
	    if (!Settings.getVariablesModo3D())
        {
	    	//this.relatedScene.graphics.clear();
            
            const lineaRayo = new Phaser.Geom.Line(
                this.rayo.x,
                this.rayo.y,
                this.rayo.x + Math.cos(this.rayo.angulo) * 80,
                this.rayo.y + Math.sin(this.rayo.angulo) * 80
            );

            this.relatedScene.graphics.lineStyle(2, 0xff9900);
            this.relatedScene.graphics.strokeLineShape(lineaRayo);
	    }
        else
        {
	    	this.renderParedPseudo3D();
	    }
    }

    renderParedPseudo3D()
    {

    }

    colisionesHorizontales()
    {	
	    let colisionH = false;

	    let xIntercept = 0;
	    let yIntercept = 0;
	    
	    let adyacente;

	    let xStep = 0;
	    let yStep = 0;

	    // Buscamos la 1ra INSTERSECCION HORIZONTAL
	    yIntercept = Math.floor(this.rayo.y / Settings.escenarioMedidas.TILE_Y) * Settings.escenarioMedidas.TILE_Y;

	    // Si apunta hacia ABAJO, INCREMENTAMOS 1Tile
	    if (this.haciaAbajo(this.rayo.angulo))
        {
	    	yIntercept += Settings.escenarioMedidas.TILE_Y;
	    }
	    
	    // Se le SUMA el CATETO ADYACENTE
	    adyacente = (yIntercept - this.rayo.y) / Math.tan(this.rayo.angulo);
	    xIntercept = Math.floor(this.rayo.x + adyacente);

	    // Calcular los STEPs
	    yStep = Settings.escenarioMedidas.TILE_Y;
	    xStep = Math.floor(yStep / Math.tan(this.rayo.angulo));

	    // Si vamos a la IZQUIERDA o ARRIBA, el paso es NEGATIVO
	    if (!this.haciaAbajo(this.rayo.angulo))
        {
	    	yStep *= -1;
	    }

	    if ((this.haciaIzquierda(this.rayo.angulo) && xStep > 0) || (!this.haciaIzquierda(this.rayo.angulo) && xStep < 0))
        {
	    	xStep *= -1;
	    }

	    let siguienteXHorizontal = xIntercept;
	    let siguienteYHorizontal = yIntercept;

	    // Si apunta hacia ARRIBA, forzamos '-1' PIXEL EXTRA
	    if (!this.haciaAbajo(this.rayo.angulo))
        {
	    	siguienteYHorizontal -= 1;
	    }
	    
	    let casillaX;
	    let casillaY;
	    
	    // -------------------------------------------------------------------
	    //  BUCLE para BUSCAR el PTO de COLISION (Horizontal)
	    // -------------------------------------------------------------------
	    do {
	        casillaX = Math.floor(siguienteXHorizontal / Settings.escenarioMedidas.TILE_X);
	        casillaY = Math.floor(siguienteYHorizontal / Settings.escenarioMedidas.TILE_Y);
	        
	        if (Escenario.checkColision(casillaX, casillaY))
            {
	        	
	            colisionH = true;
	            //this.valorTH = valorTile(casillaX, casillaY);
	            this.wallHitXHorizontal = siguienteXHorizontal;
	            this.wallHitYHorizontal = siguienteYHorizontal;
	            return true;
           	}
            else
            {
           		siguienteXHorizontal = siguienteXHorizontal + xStep;
   				siguienteYHorizontal = siguienteYHorizontal + yStep;
           	}

	    } while (!colisionH && casillaX < Settings.escenarioMedidas.NRO_COLUMNAS &&
	    		casillaY < Settings.escenarioMedidas.NRO_FILAS && casillaX >= 0 && casillaY >= 0);
	    
	    return false;
    }

    colisionesVerticales()
    {

    }

    haciaAbajo(angulo)
    {
        if (angulo < Math.PI) return true;
		
		return false;
    }

    haciaIzquierda(angulo)
    {
        if (angulo > Math.PI / 2 && angulo < Math.PI * 1.5) return true;
		
		return false;
    }

    get()
    {
        return this.rayo;
    }
}
