import { Settings } from "../scenes/Settings";

export class Escenario {

    constructor(scene)
    {
        this.relatedScene = scene;
    }

    create()
    {
        this.tile = this.relatedScene.physics.add.staticGroup();

        for (let y = 0; y < Settings.escenarioMedidas.NRO_FILAS; y ++)
        {
            for (let x = 0; x < Settings.escenarioMedidas.NRO_COLUMNAS; x ++)
            {
                const valor = Settings.arrayEscenario[y][x];

                if (valor > 0)
                {
                    this.tile.create(
                        (x * Settings.escenarioMedidas.TILE_X),
                        (y * Settings.escenarioMedidas.TILE_Y),
                        'tile-gris'
                    ).setOrigin(0, 0).setScale(1).setDepth(Settings.depth.escenario2D);
                }
            }
        }

        console.log(this.tile);
    }

    static checkColision(x, y)
    {
        if (Settings.arrayEscenario[y][x] > 0)
        {
            return true;
        }
        return false;
    }

    static checkColisionVsRayo(x, y)
    {
        if (x >= Settings.escenarioMedidas.NRO_COLUMNAS || y >= Settings.escenarioMedidas.NRO_FILAS || x < 0 || y < 0)
        {
			return false;
		}
		
		if (Settings.arrayEscenario[y][x] > 0)
        {
			return true;
		}
		
		return false;
    }

    get()
    {
        return this.tile;
    }
}
