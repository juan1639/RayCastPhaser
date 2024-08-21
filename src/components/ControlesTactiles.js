import { Settings } from "../scenes/Settings";

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
