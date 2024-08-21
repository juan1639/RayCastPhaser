import { play_sonidos } from "../functions/Functions";
import { Settings } from "../scenes/Settings";
import { getEscalaFondos } from "../functions/Functions";

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

            const escala = getEscalaFondos(
                Settings.escenarioTotales.WIDTH_SCREEN,
                Settings.escenarioTotales.HEIGHT_SCREEN,
                this.relatedScene.fondoSuelo.width,
                this.relatedScene.fondoSuelo.height
            );

            if (Settings.getVariablesModo3D())
            {
                Settings.setVariablesModo3D(false);

                this.relatedScene.add.image(0, 0, 'fondo-suelo').setOrigin(0, 0).setDepth(Settings.depth.fondo)
                    .setScale(escala[0], escala[1]);
                
                this.relatedScene.escenario.get().children.iterate(tile => {
                    tile.setVisible(true);
                });
            }
            else
            {
                Settings.setVariablesModo3D(true);

                this.relatedScene.add.image(0, 0, 'fondo-suelo').setOrigin(0, 0).setDepth(Settings.depth.fondo)
                    .setScale(escala[0], escala[1]);

                this.relatedScene.add.image(0, 0, 'fondo-cielo').setOrigin(0, 0).setDepth(Settings.depth.fondo)
                    .setScale(escala[0], escala[1] / 2);
                
                this.relatedScene.escenario.get().children.iterate(tile => {
                    tile.setVisible(false);
                });
            }
        }
    }

    get()
    {
        return this.jugador;
    }
}
