var a, X, F;
function choosePlant(type) {
    switch (type) {
        case '1':
            a = 'X';
            X = 'F+[>F[-FX]+X]-[<F[-FX]+X]-[<F[+FX]-X]+[>F[+FX]-X]';
            F = 'FF';
            return [a, F, X];
        case '2':
            a = 'X';
            X = 'F+[>F[-FX]+X]-[<F[-FX]+X]-[<F[+FX]-X]+[>F[+FX]-X]';
            F = 'FFF';
            return [a, F, X];
        case '3':
            a = 'X';
            X = 'F[+X][-X][>X][<X]FX';
            F = 'FF';
            return [a, F, X];
        case '4':
            a = 'X';
            X = 'F[-FX<X][+FX>X][<FX+X][>FX-X]';
            F = 'F';
            return [a, F, X];
    }
}

function stochasticTree1(){
    axiom = 'F';
    X = 'X';
    const f = Math.floor(Math.random() * 3);
    switch (f) {
        case 0:
            F = 'F[+F]F[-F]F';
            return [axiom, F, X];
        case 1:
            F = 'F[+F]F[-F][F]';
            return [axiom, F, X];
        case 2:
            F = 'FF-[-F+F+F]+[+F-F-F]';
            return [axiom, F, X];
    }
}

function stochasticTree2(){
    axiom = 'X';
    F = 'FF';
    const x = Math.floor(Math.random() * 3);
    switch (x) {
        case 0:
            X = 'F+[[X]-X]-F[-FX]+X';
            return [axiom, F, X];
        case 1:
            X = 'F[+X]F[-X]+X';
            return [axiom, F, X];
        case 2:
            X = 'F[+X][-X]FX';
            return [axiom, F, X];
    }
}