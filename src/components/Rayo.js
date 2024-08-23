import { Settings } from "../scenes/Settings";
import { normalizaAngulo } from "../functions/Functions";

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
	    
	    //System.out.println(this.angulo + ": " + jugador.getAnguloRotacion());
	    
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

    get()
    {
        return this.rayo;
    }
}
