let parameters;
let folder1,folder2,folder3;

function createGUI(gui) {
    parameters = {
        Type : "Plant1",
        posX : 0,
        posZ : 0,
        Axiom : "X",
        rule1 : "FF",
        rule2 : "F+[>F[-FX]+X]-[<F[-FX]+X]-[<F[+FX]-X]+[>F[+FX]-X]",
        iteration : 3,
        Angle : 50,
        BranchRadius : 1,
        RadiusReduction : 0.1,
        BranchLength : 3,
        Stochastic : false,
        renderTree: function() {renderTree()}
    };

    folder1 = gui.addFolder('Tree Parameters');
    folder1.add(parameters, 'Type', ["Plant1","Plant2","Plant3","Plant4","StochasticPlant","other"]).onChange(
        function (value) {
            values = changePlant(value);
            parameters.Axiom = values[0];
            parameters.rule1 = values[1];
            parameters.rule2 = values[2];
            parameters.BranchRadius = values[3];
            parameters.RadiusReduction = values[4];
            parameters.iteration =  values[5];
        }
    );
    folder1.add(parameters, 'Stochastic');
    folder1.add(parameters, 'posZ', -300,300).name('posX');
    folder1.add(parameters, 'posX', -300,300).name('posY');


    folder2 = gui.addFolder(`L-System rules`);
    folder2.add(parameters, 'Axiom').listen();
    folder2.add(parameters, 'rule1').listen();
    folder2.add(parameters, 'rule2').listen();

    folder3 = gui.addFolder(`L-System Parameters`);
    folder3.add(parameters, 'iteration', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).listen();
    folder3.add(parameters, 'Angle', 0, 360).name('Angle (Degree)');
    folder3.add(parameters, 'BranchRadius', 0, 10).step(0.5).name('Branch Radius').listen();
    folder3.add(parameters, 'RadiusReduction', 0, 0.1).step(0.01).name('Radius Reduction').listen();
    folder3.add(parameters, 'BranchLength', 1, 10).step(1).name('Branch Length');
    gui.add(parameters, 'renderTree').name('Press to Render');
}

function changePlant(type) {
    var a, X, F, br, rrf, it;
    switch (type) {
        case 'Plant1':
            a = 'X';
            X = 'F+[>F[-FX]+X]-[<F[-FX]+X]-[<F[+FX]-X]+[>F[+FX]-X]';
            F = 'FF';
            br = 1;
            rrf = 0.1;
            it = 3;
            return [a, F, X, br, rrf, it];
        case 'Plant2':
            a = 'X';
            X = 'F+[>F[-FX]+X]-[<F[-FX]+X]-[<F[+FX]-X]+[>F[+FX]-X]';
            //X = 'F[+X]F[-X]+X';
            F = 'FFF';
            br = 1;
            rrf = 0.07;
            it = 3;
            return [a, F, X, br, rrf, it];
        case 'Plant3':
            a = 'X';
            X = 'F[+X][-X][>X][<X]FX';
            F = 'FF';
            br = 1;
            rrf = 0.1;
            it = 4;
            return [a, F, X, br, rrf, it];
        case 'Plant4':
            a = 'X';
            X = 'F[-FX<X][+FX>X][<FX+X][>FX-X]';
            F = 'F';
            br = 0.5;
            rrf = 0.1;
            it = 3;
            return [a, F, X, br, rrf, it];
        case 'other':
            a = 'Change Me';
            X = 'Change Me';
            F = 'Change Me';
            br = 0.5;
            rrf = 0.05;
            it = 3;
            return [a, F, X, br, rrf, it];
    }
}