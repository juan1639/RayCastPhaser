import { Settings } from "../scenes/Settings";
import { Textos } from "./Textos";
import { play_sonidos } from '../functions/Functions.js';

export class BotonNewGame
{
  constructor(scene, args)
  {
    this.relatedScene = scene;
    this.args = args;
  }

  create()
  {
    Settings.audio.numKey = this.relatedScene.sound.add('numkey');

    const {left, top, id, scX, scY, angle, originX, originY, texto, nextScene} = this.args;

    this.boton = this.relatedScene.add.sprite(left, top, id).setInteractive();
    this.boton.setScale(scX, scY).setAngle(1).setDepth(Settings.depth.botones);

    let text_size = 24;
    if (id.includes('settings')) text_size = 20;

    this.txt = new Textos(this.relatedScene, {
      x: left,
      y: top,
      txt: texto,
      size: text_size, color: '#ff1', style: 'bold',
      stroke: '#1bd', sizeStroke: 16,
      shadowOsx: 2, shadowOsy: 2, shadowColor: '#111111',
      bool1: false, bool2: true, origin: [0.5, 0.5],
      elastic: false, dura: 0
    });

    this.txt.create();
    this.txt.get().setDepth(Settings.depth.textos).setAlpha(1).setScale(1);

    this.boton.on('pointerover', () =>
    {
      // this.boton.setFrame(1);
      this.boton.setScale(scX + 0.04, scY + 0.04);
    });

    this.boton.on('pointerout', () =>
    {
      // this.boton.setFrame(0);
      this.boton.setScale(scX, scY);
    });

    this.boton.on('pointerdown', (e) =>
    {
      // console.log(e);
      play_sonidos(Settings.audio.numKey, false, 0.8);

      this.relatedScene.scene.start(nextScene);
    });

    this.relatedScene.tweens.add(
    {
      targets: [this.boton, this.txt.get()],
      angle: 359,
      ease: 'Elastic',
      yoyo: true,
      hold: 3000,
      duration: 2000,
      repeat: -1
    });
  }

  get()
  {
    return this.boton;
  }
}

// ==================================================================================
export class BotonFullScreen
{
  constructor(scene, args)
  {
    this.relatedScene = scene;
    this.args = args;
  }

  create()
  {
    const {x, y, id, orX, orY, scX, scY, ang} = this.args;

    this.boton = this.relatedScene.add.image(x, y, id).setInteractive();
    this.boton.setOrigin(orX, orY).setScale(scX, scY);
    this.boton.setAngle(ang).setFrame(0).setDepth(Settings.depth.marcadores);
    this.boton.setX(x).setY(y);

    this.boton.on('pointerover', () =>
    {
      // this.boton.setFrame(1);
      this.boton.setScale(scX + 0.1, scY + 0.1);
    });
    
    this.boton.on('pointerout', () =>
    {
      // this.boton.setFrame(0);
      this.boton.setScale(scX, scY);
    });

    this.boton.on('pointerdown', () =>
    {
      if (!this.relatedScene.scale.isFullscreen)
      {
        this.relatedScene.scale.startFullscreen();

      } else
      {
        this.relatedScene.scale.stopFullscreen();
      }
    });
  }
}

// ==================================================================
export class BotonEsc
{
  constructor(scene, args)
  {
    this.relatedScene = scene;
    this.args = args;
  }

  create()
  {
    const {left, top, id, scX, scY, angle, originX, originY, texto, nextScene} = this.args;

    this.boton = this.relatedScene.add.sprite(left, top, id).setInteractive();
    this.boton.setOrigin(originX, originY).setScale(scX, scY).setAngle(angle).setDepth(Settings.depth.botones);

    this.txt = new Textos(this.relatedScene, {
      x: left,
      y: top,
      txt: texto,
      size: 25, color: '#fb1', style: 'bold',
      stroke: '#f81', sizeStroke: 8,
      shadowOsx: 2, shadowOsy: 2, shadowColor: '#111111',
      bool1: false, bool2: true, origin: [0.5, 0.5],
      elastic: false, dura: 0
    });

    this.txt.create();
    this.txt.get().setDepth(Settings.depth.textos).setAlpha(1).setScale(1);

    this.boton.on('pointerover', () =>
    {
      // this.boton.setFrame(1);
      this.boton.setScale(scX + 0.03, scY + 0.03);
    });

    this.boton.on('pointerout', () =>
    {
      // this.boton.setFrame(0);
      this.boton.setScale(scX, scY);
    });

    this.boton.on('pointerdown', (e) =>
    {
      if (texto.includes('Music'))
      {
        if (Settings.audio.musicaFondo.volume > 0)
        {
          Settings.audio.musicaFondo.volume = 0;
          this.txt.get().setAlpha(0.3);
        }
        else
        {
          Settings.audio.musicaFondo.volume = 0.6;
          this.txt.get().setAlpha(1);
        }
      }
      
      /* if (texto.includes('?'))
      {
        if (!this.relatedScene.bg.visible)
        {
          this.relatedScene.bg.setVisible(true);
          this.relatedScene.txthowtoplay.get().setVisible(true);
        }
        else
        {
          this.relatedScene.bg.setVisible(false);
          this.relatedScene.txthowtoplay.get().setVisible(false);
        }
      } */

      if (nextScene !== '') this.relatedScene.scene.start(nextScene);
    });
  }

  get()
  {
    return this.boton;
  }
}

// ========================================================================
export class CrucetaControl
{
  constructor(scene, args)
  {
    this.relatedScene = scene;
    this.args = args;
  }

  create()
  {
    const {x, y, id, orX, orY, scX, scY, ang, alpha, texto} = this.args;

    this.boton = this.relatedScene.add.image(x, y, id.slice(0, 7)).setInteractive();
    this.boton.setOrigin(orX, orY).setScale(scX, scY);
    this.boton.setAngle(ang).setDepth(Settings.depth.controles);
    this.boton.setX(x).setY(y);

    this.isDown = false; // By default No pressed

    this.boton.on('pointerover', () =>
    {
      // this.boton.setFrame(1);
      this.boton.setScale(scX + 0.05, scY + 0.05);
    });
    
    this.boton.on('pointerout', () =>
    {
      // this.boton.setFrame(0);
      this.boton.setScale(scX, scY);
      this.isDown = false;
    });

    this.boton.on('pointerdown', () =>
    {
      console.log(id);
      this.isDown = true;
    });
  }

  get()
  {
    return this.boton;
  }
}
