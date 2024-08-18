import { Scene } from 'phaser';
import { Textos } from '../components/Textos.js';

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

        this.load.image('fondo', 'assets/bg.png');
        this.add.image(0, 0, 'fondo').setOrigin(0, 0);

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

        this.load.image('fondo', 'bg.png');

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
