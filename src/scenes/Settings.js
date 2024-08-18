
export class Settings
{
    static controlElegido =
    {
        mobile: false,
        keyboard: true
    };

    static screen =
    {
        WIDTH: 1024,
        HEIGHT: 768,
        ESC_BOUNDS_X: 1.35,
        ESC_BOUNDS_Y: 1.90
    };

    static tileSize =
    {
        X: 32,
        Y: 32
    };

    static N_FILAS = Math.floor(Settings.screen.HEIGHT / Settings.tileSize.Y);
    static N_COLUMNAS = Math.floor(Settings.screen.WIDTH / Settings.tileSize.X);

    static FPS = 100;

    static estados =
    {
        preJuego: false,
        enJuego: true,
        gameOver: false,
    };

    static FONT_SETTINGS =
    {
        id: 'font-fire',
        arrayLetras: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.-@',
        size: 48,
        osX: 4,
        osY: 4,
        oriX: 0.5,
        oriY: 0.5,
        color: 0xffff00,
        alpha: 0.3
    };

    static cameraControles =
    {
        x: 0,
        y: Settings.screen.HEIGHT - (128 * 2), // 128px buttons controls
        ancho: Settings.screen.WIDTH,
        alto: 400,
        scrollX: -70,
        scrollY: -1080
    };

    static cameraScores =
    {
        x: 0,
        y: 0,
        ancho: Settings.screen.WIDTH,
        alto: 34,
        scrollX: 0,
        scrollY: -90
    };

    static depth =
    {
        fondo: 0,
        lineas: 100,
        pared: 200,
        efectos: 300,
        botones: 650,
        marcadores: 700,
        controles: 800,
        textos: 900
    };

    static colores =
    {
        BLANCO: "245, 245, 245",
        NEGRO: "5, 5, 5",
        GRIS_SUELO: "70, 75, 75",
        PARED_OSCURO: "150, 150, 150",
        PARED_CLARO: "128, 128, 128",
    };

    static audio =
    {
        numKey: null,
        key: null
    };

    /* static RECORDS =
    {
        URL_GET: process.env.URL_GET,
        URL_POST: process.env.URL_POST,
        URL_G: 'https://ejemplo-node-railway-production.up.railway.app/all',
        URL_P: 'https://ejemplo-node-railway-production.up.railway.app/create',
    }; */

    // ---------------------------------------------------
    //  G E T T E R S
    //  
    // ---------------------------------------------------
    static getScreen()
    {
        return Settings.screen;
    }

    static getTileSize()
    {
        return Settings.tileSize;
    }

    static getN_FILAS()
    {
        return Settings.N_FILAS;
    }

    static getN_COLUMNAS()
    {
        return Settings.N_COLUMNAS;
    }

    static getFPS()
    {
        return Settings.FPS;
    }

    static getEstadosPreJuego()
    {
        return Settings.estados.preJuego;
    }

    static getEstadosenJuego()
    {
        return Settings.estados.enJuego;
    }

    static getEstadosGameOver()
    {
        return Settings.estados.gameOver;
    }

    static getFONT_SETTINGS()
    {
        return Settings.FONT_SETTINGS;
    }

    static getCameraControles()
    {
        return Settings.cameraControles;
    }

    static getCameraScores()
    {
        return Settings.cameraScores;
    }

    static getDepth()
    {
        return Settings.depth;
    }

    static getAudio()
    {
        return Settings.audio;
    }

    // ---------------------------------------------------
    //  S E T T E R S
    //  
    // ---------------------------------------------------
    static setFPS(fps)
    {
        Settings.FPS = fps;
    }

    static setEstadosPreJuego(bool)
    {
        Settings.estados.preJuego = bool;
    }

    static setEstadosenJuego(bool)
    {
        Settings.estados.enJuego = bool;
    }

    static setEstadosGameOver(bool)
    {
        Settings.estados.gameOver = bool;
    }
}
