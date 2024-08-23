import { Escenario } from "./Escenario";
import { Settings } from "../scenes/Settings";
import { normalizaAngulo, calculaDistanciaEntrePtos, corregirOjoPez } from "../functions/Functions";

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

        let distanciaHorizontal = 9999;
        let distanciaVertical = 9999;

        if (this.colisionesHorizontales())
        {
            const whx = this.rayo.wallHitXHorizontal;
            const why = this.rayo.wallHitYHorizontal;
            const distanciaEntrePtos = calculaDistanciaEntrePtos(whx, why, this.rayo.x, this.rayo.y);
            distanciaHorizontal = distanciaEntrePtos;
            //console.log(distanciaHorizontal);
        }

        if (this.colisionesVerticales())
        {
            const whx = this.rayo.wallHitXVertical;
            const why = this.rayo.wallHitYVertical;
            const distanciaEntrePtos = calculaDistanciaEntrePtos(whx, why, this.rayo.x, this.rayo.y);
            distanciaVertical = distanciaEntrePtos;
            //console.log(distanciaVertical);
        }

        let colorPared;

        if (distanciaHorizontal < distanciaVertical) {
			
			this.rayo.wallHitX = this.rayo.wallHitXHorizontal;
	        this.rayo.wallHitY = this.rayo.wallHitYHorizontal;
	        this.rayo.distancia = distanciaHorizontal;
	        colorPared = Settings.colores.hex.PARED_CLARO;
	        
	        // ********* LINEA DE LA TEXTURA a dibujar *******
	        //casilla = Int(rayo(a).wallHitX / TILE_X) * TILE_X
	        //rayo(a).pixelTextura = rayo(a).wallHitX - casilla
	        //rayo(a).idTextura = 0 + rayo(a).valorTH
		}
        else
        {
			this.rayo.wallHitX = this.rayo.wallHitXVertical;
	        this.rayo.wallHitY = this.rayo.wallHitYVertical;
	        this.rayo.distancia = distanciaVertical;
	        colorPared = Settings.colores.hex.PARED_OSCURO;
	        
	        // ********* LINEA DE LA TEXTURA a dibujar *******
	        //casilla = Int(rayo(a).wallHitY / TILE_Y) * TILE_Y
	        //rayo(a).pixelTextura = rayo(a).wallHitY - casilla
	        //rayo(a).idTextura = 0 + rayo(a).valorTV + 10
		}
		
	    this.rayo.distancia = corregirOjoPez(this.rayo.distancia, this.rayo.anguloRotacion, this.rayo.angulo);
        this.renderizaRayo(colorPared);
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

    renderizaRayo(colorPared)
    {
	    if (!Settings.getVariablesModo3D())
        {
	    	//this.relatedScene.graphics.clear();
            
            const lineaRayo = new Phaser.Geom.Line(
                this.rayo.x,
                this.rayo.y,
                this.rayo.wallHitX,
                this.rayo.wallHitY
                //this.rayo.x + Math.cos(this.rayo.angulo) * 80,
                //this.rayo.y + Math.sin(this.rayo.angulo) * 80
            );

            this.relatedScene.graphics.lineStyle(2, 0xff9900);
            this.relatedScene.graphics.strokeLineShape(lineaRayo);
	    }
        else
        {
	    	this.renderParedPseudo3D(colorPared);
	    }
    }

    renderParedPseudo3D(colorPared)
    {
        const altoTile = Settings.escenarioTotales.HEIGHT_SCREEN;
		const alturaMuro = (altoTile / this.rayo.distancia) *
            (this.rayo.distanciaPlanoProyeccion * Settings.MODIFICACION_DIST_PLANO_PROYECCION);
		//console.log(altoTile, alturaMuro);

	    const y0 = (Settings.escenarioTotales.HEIGHT_SCREEN / 2) - (alturaMuro / 2);
	    const y1 = y0 + alturaMuro;
	    //console.log(y0 + ": " + y1);
	    
	    const x = this.rayo.columna;
	    const alturaLinea = Math.abs(y1 - y0);

	    const altura = 0;
	    const altoTextura = 64; // px
	    const alturaTextura = y0 - y1;
	    
	    if (!Settings.getVariablesRenderConTextura())
        {
	    	//g.setColor(new Color(colorPared[0], colorPared[1], colorPared[2]));
	        //g.drawLine(x, y0, x, y1);
	    	//g.fillRect(x, y1, 1, alturaLinea);

            const lineaPseudo3D = new Phaser.Geom.Line(x, y0, x, y1);     
            //const lineaPseudo3D = new Phaser.Geom.Line(100, 100, 100, 400);     
            this.relatedScene.graphics.lineStyle(2, colorPared);
            this.relatedScene.graphics.strokeLineShape(lineaPseudo3D);
       	}
        else
        {
	        //idTxt = rayo(a).idTextura
	        //_PutImage (x, y0)-(x, y1), texturaPared(idTxt), , (rayo(a).pixelTextura, 0)-Step(0, altoTextura)
        }
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
        //  
	    // -------------------------------------------------------------------
	    do {
	        casillaX = Math.floor(siguienteXHorizontal / Settings.escenarioMedidas.TILE_X);
	        casillaY = Math.floor(siguienteYHorizontal / Settings.escenarioMedidas.TILE_Y);
	        
	        if (Escenario.checkColisionVsRayo(casillaX, casillaY))
            {
	        	
	            colisionH = true;
	            //this.valorTH = valorTile(casillaX, casillaY);
	            this.rayo.wallHitXHorizontal = siguienteXHorizontal;
	            this.rayo.wallHitYHorizontal = siguienteYHorizontal;
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
        let colisionV = false;

	    let xIntercept = 0;
	    let yIntercept = 0;
	    
	    let opuesto;

	    let xStep = 0;
	    let yStep = 0;
	    
	    // Buscamos la 1ra INSTERSECCION VERTICAL
	    xIntercept = Math.floor(this.rayo.x / Settings.escenarioMedidas.TILE_X) * Settings.escenarioMedidas.TILE_X;
	
	    // Si apunta hacia la DCHA, INCREMENTAMOS 1 Tile
	    if (!this.haciaIzquierda(this.rayo.angulo))
        {
	    	xIntercept += Settings.escenarioMedidas.TILE_X;
	    }
	    
	    // Se le SUMA el CATETO OPUESTO
	    opuesto = (xIntercept - this.rayo.x) * Math.tan(this.rayo.angulo);
	    yIntercept = this.rayo.y + opuesto;
	    
	    // Calcular los STEPs
	    xStep = Settings.escenarioMedidas.TILE_X;
	
	    // SI vamos a la IZQUIERDA, INVERTIMOS
	    if (this.haciaIzquierda(this.rayo.angulo))
        {
	    	xStep *= -1;
	    }
	
	    yStep = Settings.escenarioMedidas.TILE_X * Math.tan(this.rayo.angulo);
	
	    if ((!this.haciaAbajo(this.rayo.angulo) && yStep > 0) || (this.haciaAbajo(this.rayo.angulo) && yStep < 0))
        {
	    	yStep *= -1;
	    }
	
	    let siguienteXVertical = xIntercept;
	    let siguienteYVertical = yIntercept;
	    
	    // Si apunta hacia la IZQUIERDA, forzamos -1 PIXEL
	    if (this.haciaIzquierda(this.rayo.angulo))
        {
	    	siguienteXVertical -= 1;
	    }
	    
	    let casillaX;
	    let casillaY;
	    
	    // -------------------------------------------------------------------
	    //  BUCLE para BUSCAR el PTO de COLISION (Vertical)
	    // -------------------------------------------------------------------
	    do {
	        casillaX = Math.floor(siguienteXVertical / Settings.escenarioMedidas.TILE_X);
	        casillaY = Math.floor(siguienteYVertical / Settings.escenarioMedidas.TILE_Y);
	        
	        if (Escenario.checkColisionVsRayo(casillaX, casillaY))
            {
	            colisionV = true;
	            //this.valorTV = valorTile(casillaX, casillaY);
	            this.rayo.wallHitXVertical = siguienteXVertical;
	            this.rayo.wallHitYVertical = siguienteYVertical;
	            return true;
	        }
            else
            {
	        	siguienteXVertical = siguienteXVertical + xStep;
	        	siguienteYVertical = siguienteYVertical + yStep;
	        }
	
	    } while (!colisionV && casillaX < Settings.escenarioMedidas.NRO_COLUMNAS &&
	    		casillaY < Settings.escenarioMedidas.NRO_FILAS && casillaX >= 0 && casillaY >= 0);
		
		return false;
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
