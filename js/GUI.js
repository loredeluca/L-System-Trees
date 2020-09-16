function createGUI(gui) {
    parameters = {
        Type : "Simple Tree",
        posX : 0,
        posZ : 0,
        Axiom : "X",
        rule1 : "FF",
        rule2 : "F[+X][-X]FX",
        iteration : 3,
        Angle : 50,
        BranchRadius : 0.5,
        RadiusReduction : 0.05,
        BranchLenght : 3,
        stocastic : false,
        renderTree: function() {renderTree()}
    };

    folder1 = gui.addFolder('Tree Parameters');
    folder1.add(parameters, 'Type', ["Simple Tree","other"]);
    folder1.add(parameters, 'stocastic');
    folder1.add(parameters, 'posX', -300,300);
    folder1.add(parameters, 'posZ', -300,300);

    folder2 = gui.addFolder(`L-System rules`);
    folder2.add(parameters, 'Axiom');
    folder2.add(parameters, 'rule1');
    folder2.add(parameters, 'rule2');

    folder3 = gui.addFolder(`L-System Parameters`);
    folder3.add(parameters, 'iteration', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    folder3.add(parameters, 'Angle', 0, 360);
    folder3.add(parameters, 'BranchRadius', 0, 10);
    folder3.add(parameters, 'RadiusReduction', 0, 0.1);
    folder3.add(parameters, 'BranchLenght', 0, 10);
    gui.add(parameters, 'renderTree').name('Press to Render');
}