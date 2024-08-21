import { Scene } from 'phaser';
import { Settings } from './Settings.js';
import { Textos } from "../components/Textos.js";
import { getEscalaFondos } from '../functions/Functions.js';

export class Boot extends Scene
{
    constructor()
    {
        super('Boot');
    }

    init()
    {
        this.txt = new Textos(this, {
            x: Math.floor(this.sys.game.config.width / 2),
            y: Math.floor(this.sys.game.config.height / 2),
            txt: ' Touch screen or \n \n click to start... ',
            size: 60, color: '#ffa', style: 'bold',
            stroke: '#fb1', sizeStroke: 16,
            shadowOsx: 2, shadowOsy: 2, shadowColor: '#111',
            bool1: false, bool2: true, origin: [0.5, 0.5],
            elastic: false, dura: 0
        });
    }

    preload()
    {
        this.load.image('fondo-cielo', 'assets/bg.png');
    }

    create()
    {
        this.fondo = this.add.image(0, 0, 'fondo-cielo').setOrigin(0, 0);
        const escala = getEscalaFondos(
            Settings.escenarioTotales.WIDTH_SCREEN,
            Settings.escenarioTotales.HEIGHT_SCREEN,
            this.fondo.width,
            this.fondo.height
        );
        this.fondo = this.add.image(0, 0, 'fondo-cielo').setOrigin(0, 0)
            .setScale(escala[0], escala[1]);
        
        this.txt.create();

        this.input.on('pointerdown', () => this.scene.start('Preloader'));

        console.log(this.txt);
    }
}
