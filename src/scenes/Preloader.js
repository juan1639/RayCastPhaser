import { Scene } from 'phaser';
import { Settings } from './Settings.js';
import { Textos } from '../components/Textos.js';
import { getEscalaFondos } from '../functions/Functions.js';

export class Preloader extends Scene
{
    constructor()
    {
        super('Preloader');
    }

    init()
    {
        const widthScreen = this.sys.game.config.width;
        const heightScreen = this.sys.game.config.height;

        this.load.image('fondo-cielo', 'assets/bg.png');

        this.fondo = this.add.image(0, 0, 'fondo-cielo').setOrigin(0, 0);
        const escala = getEscalaFondos(
            Settings.escenarioTotales.WIDTH_SCREEN,
            Settings.escenarioTotales.HEIGHT_SCREEN,
            this.fondo.width,
            this.fondo.height
        );
        this.fondo = this.add.image(0, 0, 'fondo-cielo').setOrigin(0, 0)
            .setScale(escala[0], escala[1]);

        this.txt = new Textos(this, {
            x: Math.floor(widthScreen / 2),
            y: Math.floor(heightScreen / 3.5),
            txt: ' Loading...',
            size: 55, color: '#ffa', style: 'bold',
            stroke: '#f91', sizeStroke: 16,
            shadowOsx: 2, shadowOsy: 2, shadowColor: '#111',
            bool1: false, bool2: true, origin: [0.5, 0.5],
            elastic: false, dura: 0
        });

        this.txt.create();

        this.add.rectangle(
            Math.floor(widthScreen / 2), Math.floor(heightScreen / 2),
            Math.floor(widthScreen / 1.5), Math.floor(heightScreen / 12)
        ).setStrokeStyle(1, 0xffee88);

        const bar = this.add.rectangle(
            Math.floor(widthScreen / 2) - Math.floor(widthScreen / 3) + 4,
            Math.floor(heightScreen / 2),
            4,
            Math.floor(heightScreen / 14),
            0xff9911
        );

        this.load.on('progress', (progress) => {
            bar.width = (Math.floor(widthScreen / 1.52) * progress);
        });
    } 
    
    preload()
    {
        this.load.setPath('assets');

        this.load.image('fondo-cielo', 'bg.png');
        this.load.image('fondo-suelo', 'fondo-suelo-rayCast.png');

        this.load.image('particula1', '/img/particula1.png');

        this.load.spritesheet('radio-buttons', '/img/radio-buttons-ssheet.png', {frameWidth: 50, frameHeight: 50});
        this.load.spritesheet('boton-fullscreen', '/img/boton-fullscreen.png', {frameWidth: 64, frameHeight: 64});
        this.load.image('cruceta', '/img/cruceta-up.png');

        this.load.image('ui-1', '/img/ui-1.png');
        this.load.image('ui-newgame', '/img/ui-newgame.png');

        this.load.image('tile-gris', '/img/tile-gris.png');

        //this.load.bitmapFont('font-fire', '/img/azo-fire.png', '/img/azo-fire.xml');

        //  Archivos de audio
        this.load.audio('key', './audio/key.wav');
        this.load.audio('numkey', './audio/numkey.wav');
    }

    create()
    {
        this.scene.start('MainMenu');
    }
}
