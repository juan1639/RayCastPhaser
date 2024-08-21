import { Scene } from 'phaser';
import { Settings } from './Settings';
import { Jugador } from '../components/Jugador';
import { play_sonidos } from '../functions/Functions';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    init()
    {
        this.jugador = new Jugador(this);
    }
    
    preload()
    {
        Settings.audio.numKey = this.sound.add('numkey');
    }

    create ()
    {
        //this.cameras.main.setBackgroundColor(0x00ff00);
        this.add.image(0, 0, 'fondo-suelo').setOrigin(0, 0).setDepth(Settings.depth.fondo);

        this.jugador.create();

        this.graphics = this.add.graphics();

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
