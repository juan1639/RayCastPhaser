import { Scene } from 'phaser';
import { Settings } from './Settings';
import { Jugador } from '../components/Jugador';
import { getEscalaFondos, play_sonidos } from '../functions/Functions';
import { Escenario } from '../components/Escenario';

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
        this.jugador.update();

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
        Phaser.Geom.Line.Rotate(this.line1, 0.02);

        this.graphics.clear();
        //this.graphics.fillStyle(0xffffff);
        this.graphics.lineStyle(2, 0x00ff00);
        this.graphics.strokeLineShape(this.line1);
        this.graphics.lineStyle(2, 0xffaa00);
        this.graphics.strokeLineShape(this.line2);
    }
}
