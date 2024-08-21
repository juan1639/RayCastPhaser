import { play_sonidos } from "../functions/Functions";
import { Settings } from "../scenes/Settings";

export class Jugador
{
    constructor(scene, args)
    {
        this.relatedScene = scene;
        this.args = args;
    }

    create()
    {
        this.jugador = null;

        this.banderaCambioModo3D = true;

        this.controles = this.relatedScene.input.keyboard.createCursorKeys();

        console.log(this.jugador);
    }

    update()
    {
        this.cambiarModo3D();
        
    }

    cambiarModo3D()
    {
        if (this.banderaCambioModo3D && this.controles.shift.isDown)
        {
            play_sonidos(Settings.audio.numKey, false, 0.9);
            this.banderaCambioModo3D = false;

            this.relatedScene.time.delayedCall(200, () => {
                this.banderaCambioModo3D = true;
            }, []);

            if (Settings.getVariablesModo3D())
            {
                Settings.setVariablesModo3D(false);

                this.relatedScene.add.image(0, 0, 'fondo-suelo').setOrigin(0, 0).setDepth(Settings.depth.fondo);
            }
            else
            {
                Settings.setVariablesModo3D(true);

                this.relatedScene.add.image(0, 0, 'fondo-suelo').setOrigin(0, 0).setDepth(Settings.depth.fondo);
                this.relatedScene.add.image(0, 0, 'fondo-cielo').setScale(1, 0.5).setOrigin(0, 0)
                    .setDepth(Settings.depth.fondo);
            }
        }
    }

    get()
    {
        return this.jugador;
    }
}
