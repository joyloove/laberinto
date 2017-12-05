window.onload = function() { //.onload permite que se desarrolle el evento hasta que esté cargada la página//
    maze = document.getElementById('maze'); //Introduce el elemento "maze"(laberinto)//
    mazec = maze.getContext('2d'); //Asinga un contexto 2D al canvas//
    start(); //Inicio//
    document.addEventListener("keydown", keyPush); //sigue el evento con un keydown//
    document.getElementsByTagName('input')[0].addEventListener("input", newGame);
}

function start() { //funcion de inicio del juego
    Difficulty = [10, 20, 50, 100];
    move = null;
    end = false;
    d = Difficulty[document.getElementsByTagName('input')[0].value];
    cols = maze.width / d;
    rows = maze.height / d;
    cells = [];
    stack = [];
    for (var x = 0; x < cols; ++x) { //itera dentro de las columnas//
        for (var y = 0; y < rows; ++y) { //itera dentro de las filas//
            cells.push(new Cell(x, y)); // agrega una nueva celda al final//
        }
    }
    current = cells[cells.length - 1];
    while (buildMaze()) {}
    current = cells[cells.length - 1];
    startPoint = cells[cells.length - 1];
    endPoint = cells[0];
    path = [startPoint];
    DrawMaze();//Dibuja el laberinto//
}

function newGame() { // genera un nuevo juego//
    d = Difficulty[document.getElementsByTagName('input')[0].value];
    move = null;
    end = false;
    resetCells();
    current = cells[cells.length - 1];
    while (buildMaze()) {} //Dibuja un nuevo laberinto//
    current = cells[cells.length - 1];
    startPoint = cells[cells.length - 1];
    endPoint = cells[0];
    path = [startPoint];
    DrawMaze();
}

function resetCells() { //itera en las celdas (recorre el laberinto)//
    for (var i = 0; i < cells.length; ++i) {
        delete cells[i];
    }
    cols = maze.width / d;
    rows = maze.height / d;
    cells = [];
    stack = [];
    for (var x = 0; x < cols; ++x) {
        for (var y = 0; y < rows; ++y) {
            cells.push(new Cell(x, y));//genera una nueva linea del laberinto//
        }
    }
}

function buildMaze() { //Construye el laberinto//
    current.visited = true;
    next = current.checkNeighbours();
    if (next) {
        stack.push(next);
        removeWalls(current, next);
        current = next;
    } else {
        if (stack.length > 0) {
            current = stack.pop();
        } else {
            return 0;
        }
    }
    return 1;
}

function DrawMaze() { // Dibuja el fondo del Laberinto, determina las dimensiones e itera en x y y para mostrarlo//
    mazec.fillStyle = '#009cb8';
    mazec.fillRect(0, 0, maze.width, maze.height);

    for (var x = 0; x < rows; ++x) {
        for (var y = 0; y < cols; ++y) {
            cells[x * cols + y].show();
        }
    }

    mazec.beginPath(); //genera las rutas del laberinto///
    mazec.strokeStyle = "#d9dee2";
    mazec.lineWidth = d / 4; //difucultad /4//
    mazec.moveTo(startPoint.x + d / 2, startPoint.y + d / 2); //determina la ruta a mostrar iterando en x y y dependiendo de la dificultad//
    for (var i = 0; i < path.length; ++i) {
        mazec.lineTo(path[i].x + d / 2, path[i].y + d / 2);
    }
    mazec.stroke();//muestra la ruta del usuario//

    mazec.beginPath(); //comienza la nueva ruta//
    mazec.lineWidth = 1;
    mazec.arc(startPoint.x + d / 2, startPoint.y + d / 2, d / 4, 0, 2 * Math.PI); //determina los puntos de inicio "x" y "y" y lo multiplica por el .pi del circulo de inicio.
    mazec.fillStyle = "#fccd01";//yellow//
    mazec.fill();

    mazec.beginPath();
    mazec.arc(endPoint.x + d / 2, endPoint.y + d / 2, d / 4, 0, 2 * Math.PI);
    mazec.fillStyle = "#c3ff4d";//lime//
    mazec.fill();

    mazec.beginPath();
    mazec.fillStyle = "#e4005a";//magent//
    mazec.arc(current.x + d / 2, current.y + d / 2, d / 4, 0, 2 * Math.PI);
    mazec.fill();
}

function index(x, y) { //genera la dificultad del laberinto//
    if (x < 0 || y < 0 || x >= cols * d || y >= rows * d) {
        return -1;
    }
    return (y + x * rows) / d;
}

function Cell(x, y) { //genera las celdas dentro del laberinto//
    this.x = x * d;
    this.y = y * d;
    this.walls = [true, true, true, true]; // top -> right -> bottom -> left
    this.visited = false;

    this.show = function() { //dibija las paredes del laberinto//
        mazec.strokeStyle = "#8931b9";
        if (this.walls[0]) { // top
            DLine(this.x, this.y, this.x + d, this.y);
        }
        if (this.walls[1]) { // right
            DLine(this.x + d, this.y, this.x + d, this.y + d);
        }
        if (this.walls[2]) { // bottom
            DLine(this.x + d, this.y + d, this.x, this.y + d);
        }
        if (this.walls[3]) { // left
            DLine(this.x, this.y + d, this.x, this.y);
        }
    }

    this.Neighbours = function() { //Dibija las "salidas" del laberinto//
        var num = [];

        if (!this.walls[0]) { // top
            num.push(cells[index(this.x, this.y - d)]);
        }
        if (!this.walls[1]) { // right
            num.push(cells[index(this.x + d, this.y)]);
        }
        if (!this.walls[2]) { // bottom
            num.push(cells[index(this.x, this.y + d)]);
        }
        if (!this.walls[3]) { //left
            num.push(cells[index(this.x - d, this.y)]);
        }
        return num;
    }

    this.checkNeighbours = function() { //celdas del laberinto por niveles//
        var temp = [];
        var top = cells[index(this.x, this.y - d)];
        var right = cells[index(this.x + d, this.y)];
        var bottom = cells[index(this.x, this.y + d)];
        var left = cells[index(this.x - d, this.y)];

        if (top && !top.visited) {
            temp.push(top);
        }
        if (right && !right.visited) {
            temp.push(right);
        }
        if (bottom && !bottom.visited) {
            temp.push(bottom);
        }
        if (left && !left.visited) {
            temp.push(left);
        }
        if (temp.length > 0) {
            return temp[Math.floor(Math.random() * temp.length)]; // Math.floor devuelve un máximo entero- Math.random retorna un nuemero pseudo-aleatorio-Genera un laberinto "aleatorio"
        }
        return undefined;
    }
}

function removeWalls(a, b) { //Remueve paredes del Laberinto
    if (a.x > b.x) {
        a.walls[3] = b.walls[1] = false; // top
    } else if (a.x < b.x) {
        a.walls[1] = b.walls[3] = false; // right
    } else if (a.y > b.y) {
        a.walls[0] = b.walls[2] = false; //bottom
    } else if (a.y < b.y) {
        a.walls[2] = b.walls[0] = false; //left
    }
}

function DLine(x1, y1, x2, y2) {
    mazec.lineWidth = 3;
    mazec.beginPath(); // comienza una nueva ruta vaciando la lista de sub-rutas
    mazec.moveTo(x1, y1); // mueve el punto de inicio de una nueva subruta a las coordenadas
    mazec.lineTo(x2, y2); // conecta el último punto de la subruta a las coordenadas
    mazec.stroke(); // traza la ruta determinada con el estilo de trazo actual
}

function CheckPath(dirc) { // direccion de moviminentos segun dificultad (autocompletado del camino)//
    if (!current.walls[dirc]) {
        var newCell;
        switch (dirc) {
            case 0: // top
                newCell = cells[index(current.x, current.y - d)];
                break;
            case 1: //right
                newCell = cells[index(current.x + d, current.y)];
                break;
            case 2: // bottom
                newCell = cells[index(current.x, current.y + d)];
                break;
            case 3: //left
                newCell = cells[index(current.x - d, current.y)];
                break;
        }
        keepMoving(newCell == path[path.length - 2], newCell);

    }
    return;
}

function keepMoving(dirc, n) { // redireccion del movimiento y velocidad del camino
    if (dirc) {
        move = setInterval(function() {
            if (!(path[path.length - 2] && path[path.length - 2].Neighbours().length < 3)) {
                if (path[path.length - 2]) {
                    current = path[path.length - 2];
                    path.pop();
                }
                clearInterval(move);
                move = null;
            } else {
                current = path[path.length - 2];
                path.pop();
            }
            DrawMaze(); // Mostrar laberinto //
        }, 200);

    } else { // detectando el final//
        current = n;
        path.push(current);
        move = setInterval(function() {
            DrawMaze();
            if (!(current != endPoint && current.Neighbours().length < 3)) {
                clearInterval(move);
                move = null;
                if (current == endPoint) {
                    win();
                }
            } else { //si no hay más movimiento//
                if (current.Neighbours().length == 1) {
                    clearInterval(move);
                    move = null;
                } else {
                    current = (current.Neighbours()[0] == path[path.length - 2]) ? current.Neighbours()[1] : current.Neighbours()[0];
                    path.push(current);
                }
            }
        }, 200); //velocidad del juego//

    }
}

function win() { //función ganaste//
    end = true;
    mazec.font = "50px Arial";
    mazec.textAlign = "center";
    mazec.fillStyle = '#8cffd4'; //mint//
    mazec.fillText("You Won!", maze.width / 2, maze.height / 2);
    mazec.font = "20px Arial";
    mazec.fillText("Press Space to play again", maze.width / 2, maze.height / 2 + 50);
}

function keyPush(e) { //regresar//
    if (move) {
        return;
    }
    if (e.keyCode == 38) { // top
        CheckPath(0);
    } else if (e.keyCode == 39) { // right
        CheckPath(1);
    } else if (e.keyCode == 40) { // bottom
        CheckPath(2);
    } else if (e.keyCode == 37) { // left
        CheckPath(3);
    } else if (e.keyCode == 32) { // Space
        if (end) {
            newGame(); //Nuevo juego//
        }
    }
}
