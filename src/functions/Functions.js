import { Settings } from "../scenes/Settings.js";
import { Textos } from "../components/Textos.js";

function getEscalaFondos(screenWidth, screenHeight, x, y)
{
  return [screenWidth / x, screenHeight / y];
}

function getRadianes(grados)
{
  return grados * (Math.PI / 180);
}

function normalizaAngulo(angRotacion)
{  
  angRotacion = angRotacion % (2 * Math.PI);
	
	if (angRotacion < 0)
  {
		angRotacion = (2 * Math.PI) + angRotacion;	//si es negativo damos toda la vuelta en el otro sentido
	}
	
	return angRotacion;

  /* if (angRotacion < 0) {
    return angRotacion + Math.PI * 2;
  }

  if (angRotacion > Math.PI * 2) {
    return angRotacion - Math.PI * 2;
  }

  return angRotacion; */
}

function calculaDistanciaEntrePtos(whx, why, x, y)
{
  return Math.sqrt((x - whx) * (x - whx) + (y - why) * (y - why));
}

function corregirOjoPez(distancia, angRotacion, angulo)
{
  return distancia * Math.cos(angRotacion - angulo);
}

function getAngInicialCadaRayo(angRotacion)
{
  return angRotacion - Settings.FOV_MITAD;
}

function particulas(x, y, particula, vel, span, size, color, sprite, bool, scene)
{
  const partis = scene.add.particles(x, y, particula, {
    speed: vel,
    lifespan: span,
    scale: size,
    tint: color,
    // gravityY: 200
    blendMode: 'ADD'
  });

  partis.setDepth(Settings.depth.efectos);

  if (bool) partis.startFollow(sprite);
}

function suma_puntos(puntos, scene)
{
  const bonus = Settings.getPuntos() + puntos.getData('puntos');
  Settings.setPuntos(bonus);
  scene.marcadorPtos.update(Settings.getTxtScore(), Settings.getPuntos());
  // console.log(bonus, Settings.getPuntos());
}

function restar_vida()
{
  const actualizar = Settings.getVidas() - 1;
  Settings.setVidas(actualizar);
}

function play_sonidos(id, loop, volumen)
{
  id.volume = volumen;
  id.loop = loop;
  id.play();
}

export {
  getEscalaFondos,
  getRadianes,
  normalizaAngulo,
  calculaDistanciaEntrePtos,
  corregirOjoPez,
  getAngInicialCadaRayo,
  particulas,
  play_sonidos
};
