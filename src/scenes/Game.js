import { Scene } from 'phaser';
import { Settings } from './Settings';
import { Escenario } from '../components/Escenario';
import { Jugador } from '../components/Jugador';
import { Rayo } from '../components/Rayo';
import {
    getAngInicialCadaRayo,
    getEscalaFondos,
    play_sonidos
} from '../functions/Functions';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    init()
    {
        this.escenario = new Escenario(this);

        this.jugador = new Jugador(this, {
            
            x: Settings.JUGADOR_INI.X,
            y: Settings.JUGADOR_INI.Y,
            ancho: Settings.JUGADOR_INI.ANCHO2D,
            alto: Settings.JUGADOR_INI.ALTO2D,
            avanza: Settings.JUGADOR_INI.AVANZA,
            gira: Settings.JUGADOR_INI.GIRA_INI,
            anguloRotacion: Settings.JUGADOR_INI.ANGULO_ROTACION_INI,
            velGiro: Settings.JUGADOR_INI.VEL_GIRO,
            velMovimiento: Settings.JUGADOR_INI.VEL_MOVIMIENTO
        });

        this.rayo = [];

        for (let i = 0; i < Settings.NRO_RAYOS; i ++)
        {
            //const i = 0;
            const incAng = Settings.FOV / Settings.NRO_RAYOS;
            const ang = getAngInicialCadaRayo(Settings.JUGADOR_INI.ANGULO_ROTACION_INI) + (incAng * i);
            const distPlanoProy = (Settings.escenarioTotales.WIDTH_SCREEN / 2) / Math.tan(Settings.FOV_MITAD);

            this.rayo.push(new Rayo(this, {

                x: Settings.JUGADOR_INI.X,
                y: Settings.JUGADOR_INI.Y,
                anguloRotacion: Settings.JUGADOR_INI.ANGULO_ROTACION_INI,
                incrAngulo: incAng,
                angulo: ang,
                wallHitX: 0,
                wallHitY: 0,
                wallHitXHorizontal: 0,
                wallHitYHorizontal: 0,
                wallHitXVertical: 0,
                wallHitYVertical: 0,
                columna: i,
                distancia: 0,
                pixelTextura: 0,
                idTextura: 0,
                valorTH: 0,
                valorTV: 0,
                distanciaPlanoProyeccion: distPlanoProy,
                hCamara: 0
            }));
        }
    }
    
    preload()
    {
        Settings.audio.numKey = this.sound.add('numkey');
    }

    create ()
    {
        //this.cameras.main.setBackgroundColor(0x00ff00);

        this.graphics = this.add.graphics();

        this.fondoSuelo = this.add.image(0, 0, 'fondo-suelo').setOrigin(0, 0).setDepth(Settings.depth.fondo);
        const escala = getEscalaFondos(
            Settings.escenarioTotales.WIDTH_SCREEN,
            Settings.escenarioTotales.HEIGHT_SCREEN,
            this.fondoSuelo.width,
            this.fondoSuelo.height
        );

        this.fondoSuelo = this.add.image(0, 0, 'fondo-suelo').setOrigin(0, 0).setDepth(Settings.depth.fondo)
            .setScale(escala[0], escala[1]);

        this.escenario.create();
        this.escenario.get().children.iterate(tile => {
            tile.setVisible(true);
        });
        
        this.jugador.create();
        this.jugador.get().setVisible(true);

        for (let i = 0; i < Settings.NRO_RAYOS; i ++)
        {
            this.rayo[i].create();
        }

        this.line1 = new Phaser.Geom.Line(260, 200, 450, 450);
        this.line2 = new Phaser.Geom.Line(300, 400, 500, 500);

        this.graphics.lineStyle(2, 0x00ff00);
        this.graphics.strokeLineShape(this.line1);
        this.graphics.lineStyle(2, 0xffff00);
        this.graphics.strokeLineShape(this.line2);

        this.input.once('pointerdown', () => {

            play_sonidos(Settings.audio.numKey, false, 0.9);
            this.scene.start('GameOver');
        });
    }

    update()
    {
        this.graphics.clear();
        this.jugador.update();

        for (let i = 0; i < Settings.NRO_RAYOS; i ++)
        {
            this.rayo[i].update();
        }

        if (Settings.getVariablesModo3D())
        {
            this.renderiza3D();
            
        }
        else
        {
            this.renderiza2D();
        }
    }

    renderiza2D()
    {

    }

    renderiza3D()
    {
        
    }
}
