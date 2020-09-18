let parameters;
let folder1,folder2,folder3;

function createGUI(gui) {
    parameters = {
        Type : "Plant1",
        posX : 0,
        posZ : 0,
        Axiom : "X",
        rule1 : "FF",
        rule2 : "F[+X][-X]FX",
        iteration : 3,
        Angle : 50,
        BranchRadius : 0.5,
        RadiusReduction : 0.05,
        BranchLength : 3,
        Stochastic : false,
        renderTree: function() {renderTree()}
    };

    folder1 = gui.addFolder('Tree Parameters');
    folder1.add(parameters, 'Type', ["Plant1","Plant2","Plant3","Plant4","Plant5","Plant6","StochasticPlant","other"]).onChange(
        function (value) {
            values = changePlant(value);
            parameters.Axiom=values[0];
            parameters.rule1=values[1];
            parameters.rule2=values[2];
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
    folder3.add(parameters, 'iteration', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    folder3.add(parameters, 'Angle', 0, 360).name('Angle (Degree)');
    folder3.add(parameters, 'BranchRadius', 0, 10).step(0.5).name('Branch Radius');
    folder3.add(parameters, 'RadiusReduction', 0, 0.1).step(0.01).name('Radius Reduction');
    folder3.add(parameters, 'BranchLength', 1, 10).step(1).name('Branch Length');
    gui.add(parameters, 'renderTree').name('Press to Render');
}

function changePlant(type) {
    var a, X, F;
    switch (type) {
        case 'Plant1':
            a = 'X';
            X = 'F+[[X]-X]-F[-FX]+X';
            F = 'FF';
            return [a, F, X];
        case 'Plant2':
            a = 'X';
            X = 'F[+X]F[-X]+X';
            F = 'FF';
            return [a, F, X];
        case 'Plant3':
            a = 'F';
            X = 'X';
            F = 'F[+F]F[-F]F';
            return [a, F, X];
        case 'Plant4':
            a = 'F';
            X = 'X';
            F = 'F[+F]F[-F][F]';
            return [a, F, X];
        case 'Plant5':
            a = 'F';
            X = 'X';
            F = 'FF-[-F+F+F]+[+F-F-F]';
            return [a, F, X];
        case 'Plant6':
            a = 'X';
            X = 'F[+X][-X][>X][<X]FX';
            F = 'FF';
            return [a, F, X];
        case 'other':
            a = 'Change Me';
            X = 'Change Me';
            F = 'Change Me';
            return [a, F, X];
    }
}