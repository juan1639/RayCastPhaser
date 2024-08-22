import { play_sonidos } from "../functions/Functions";
import { Settings } from "../scenes/Settings";
import { getEscalaFondos } from "../functions/Functions";
import { Escenario } from "./Escenario";

export class Jugador
{
    constructor(scene, args)
    {
        this.relatedScene = scene;
        this.args = args;
    }

    create()
    {
        const {
            x, y,
            ancho, alto,
            avanza,
            gira,
            anguloRotacion,
            velGiro,
            velMovimiento
        } = this.args;

        this.jugador = this.relatedScene.physics.add.sprite(
            Settings.JUGADOR_INI.X, Settings.JUGADOR_INI.Y, 'jugador-mapa'
        );

        this.jugador.setTint(0xffff00).setDepth(Settings.depth.jugador2D);

        this.jugador.setData('x', x);
        this.jugador.setData('y', y);
        this.jugador.setData('ancho', ancho);
        this.jugador.setData('alto', alto);
        this.jugador.setData('avanza', avanza);
        this.jugador.setData('gira', gira);
        this.jugador.setData('anguloRotacion', anguloRotacion);
        this.jugador.setData('velGiro', velGiro);
        this.jugador.setData('velMovimiento', velMovimiento);

        this.banderaCambioModo3D = true;

        this.controles = this.relatedScene.input.keyboard.createCursorKeys();

        console.log(this.jugador);
    }

    update()
    {
        this.cambiarModo3D();
        this.leerTeclado();
        this.actualiza();
    }

    leerTeclado()
    {
        this.jugador.setData('avanza', 0);
        this.jugador.setData('gira', 0);

        if (this.controles.up.isDown) {

            this.jugador.setData('avanza', 1);
        }
        else if (this.controles.down.isDown)
        {
            this.jugador.setData('avanza', -1);
        }
        
        if (this.controles.left.isDown) {
            
            this.jugador.setData('gira', 1);
        }
        else if (this.controles.right.isDown)
        {
            this.jugador.setData('gira', -1);
        }
            
        //console.log(this.jugador.getData('avanza'));
        //console.log(this.jugador.getData('gira'));
    }

    actualiza()
    {
        const nuevaX = this.jugador.getData('x') + this.jugador.getData('avanza') * Math.cos(this.getData('anguloRotacion')) *
            this.getData('velMovimiento');

        const nuevaY = this.jugador.getData('y') + this.jugador.getData('avanza') * Math.sin(this.getData('anguloRotacion')) *
            this.getData('velMovimiento');
        
        const tryX = Math.floor(nuevaX / Settings.escenarioMedidas.TILE_X);
        const tryY = Math.floor(nuevaY / Settings.escenarioMedidas.TILE_Y);

        if (!Escenario.checkColision(tryX, tryY)) {

            this.jugador.setData('x', nuevaX);
            this.jugador.setData('y', nuevaY);
        }

        this.jugador.setData('anguloRotacion',
            this.jugador.getData('anguloRotacion') + this.jugador.getData('gira') * this.jugador.getData('velGiro'));
        
        this.jugador.setData('anguloRotacion', normalizaAngulo(this.jugador.getData('anguloRotacion')));
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

                this.relatedScene.jugador.get().setVisible(true);
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

                this.relatedScene.jugador.get().setVisible(false);
            }
        }
    }

    get()
    {
        return this.jugador;
    }
}
