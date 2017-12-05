# Laberinto             
1. El objetivo es crear un juego de laberinto utilizando las herramientas de interacción entre html y javascript

2. Los métodos usados para la elaboración de este programa son:

Web API reference
Cuando escribimos código para la web utilizando JavaScript, podemos usar gran númeroAPIs disponibles
Canvas
Es un nuevo elemento HTML que puede usarse para dibujar gráficos a través de scripting (normalmente JavaScript). Por ejemplo, puede emplearse para dibujar gráficos, hacer composición de fotos, crear animaciones e incluso procesamiento de vídeo en tiempo real.
window.onload
Un evento tipo handler para el evento load event de el window.
El evento load dispara el evento al final del proceso de carga del documento. En este punto, todos los objetos del documento son DOM,  y todas las imágenes y sub-frames han terminado de cargarse.
HTMLCanvasElement.getContext()
El método HTMLCanvasElement.getContext() retorna un contexto de dibujo en el lienzo, o null si el identificador del contexto no está soportado.
CanvasRenderingContext2D.fillRect()
El método CanvasRenderingContext2D.fillRect()  de la API Canvas 2D dibuja un rectángulo relleno en la posición ( x, y ). El tamaño del rectángulo se determina por width (anchura) y height (altura). El estilo de relleno se determina por el atributo fillStyle.
CanvasRenderingContext2D.beginPath()
El método CanvasRenderingContext2D.beginPath() del API Canvas 2D comienza una nueva ruta vaciando la lista de sub-rutas. Invoca este método cuando quieras crear una nueva ruta.
CanvasRenderingContext2D.lineTo()
El método CanvasRenderingContext2D.lineTo () del API Canvas 2D conecta el último punto de la subruta a las coordenadas x, y con una línea recta (pero en realidad no lo dibuja).
CanvasRenderingContext2D.stroke()
El método CanvasRenderingContext2D.stroke () del API Canvas 2D traza la ruta actual o determinada con el estilo de trazo actual utilizando la regla de bobinado diferente de cero).
CanvasRenderingContext2D.arc()
El CanvasRenderingContext2D .arc() del API de Canvas 2D añade un arco a la trayectoria centrada en la posición (x, y) con el radio r comenzando en startAngle y terminando en endAngle que va en la dirección dada en sentido antihorario(predeterminado en sentido  horario) .
CanvasRenderingContext2D.fill()
El método CanvasRenderingContext2D.fill () del  API Canvas 2D llena la ruta actual o determinada con el estilo de relleno actual utilizando la regla de devanado distinto de cero o incluso impar.
Math.PI
La propiedad Math.PI representa la relacion entre la longitud de la circunferencia de un circulo y su diametro, la cual es aproximadamente 3.14159.
Math.floor()
Devuelve el máximo entero menor o igual a un número.
Math.random()
La función Math.random() retorna un punto flotante, un número pseudo-aleatorio dentro del rango [0, 1). Esto es, desde el 0 (Incluido) hasta el 1 pero sin incluirlo (excluido), el cual se puede escalar hasta el rango deseado. La implementación selecciona la semilla inicial hasta el algoritmo que genera el número aleatorio; este no puede ser elegido o cambiado por el usuario.
CanvasRenderingContext2D.beginPath()
El método CanvasRenderingContext2D.beginPath() del API Canvas 2D comienza una nueva ruta vaciando la lista de sub-rutas. Invoca este método cuando quieras crear una nueva ruta.
CanvasRenderingContext2D.fillText()
El método CanvasRenderingContext2D fillText (), parte de Canvas API 2D, dibuja una cadena de texto en las coordenadas especificadas, llenando los caracteres de la cadena con el color de primer plano actual. Un parámetro opcional permite especificar un ancho máximo para el texto renderizado, que el agente de usuario logrará al condensar el texto o al usar un tamaño de letra más bajo.
El texto se representa con la configuración de fuente y diseño de texto definida por la fuente, textAlign, textBaseline y las propiedades de dirección.
