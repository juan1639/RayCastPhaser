import { Scene } from 'phaser';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    init()
    {

    }

    preload()
    {}

    create ()
    {
        //this.cameras.main.setBackgroundColor(0x00ff00);

        this.add.image(0, 0, 'fondo-suelo').setOrigin(0, 0);
        this.add.image(0, 0, 'fondo-cielo').setScale(1, 0.5).setOrigin(0, 0);

        this.graphics = this.add.graphics();

        this.line1 = new Phaser.Geom.Line(260, 200, 450, 450);
        this.line2 = new Phaser.Geom.Line(300, 400, 500, 500);

        this.graphics.lineStyle(2, 0x00ff00);
        this.graphics.strokeLineShape(this.line1);
        this.graphics.lineStyle(2, 0xffff00);
        this.graphics.strokeLineShape(this.line2);

        this.input.once('pointerdown', () => {

            this.scene.start('GameOver');
        });
    }

    update()
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
