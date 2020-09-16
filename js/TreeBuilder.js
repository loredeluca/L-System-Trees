var tmp = [];
var first;
var F1;
var f1;
var X1;
var x1;

function solveRule(axiom, iteration, A, B){//, f, x) {
    var finalRule = axiom.split('');
    //var F = f.split('');
    //var X = x.split('');
    //finalRule.push(ax);
    while (iteration > 0){
        var i =0;
        while (i<finalRule.length){
            /*if (finalRule[i] === "F"){
                i++;
                continue;
            }
            if (finalRule[i] === "X"){
                i++;
                continue;
            }*/
        //for (let i = 0; i < finalRule.length; i++) {
            if (finalRule[i] === "F") {
                for (var u=0; u < i; u++){
                    first = finalRule.shift();
                    tmp.unshift(first);
                }
                finalRule.shift();
                F = A;
                for (var v=F.length-1; v> -1; v--)
                    finalRule.unshift(F[v]);
                for (var z=0; z<tmp.length; z++)
                    finalRule.unshift(tmp[z]);
                tmp = [];
                i+=F.length;
                //iteration--;
                continue;
            }
            if (finalRule[i] === 'X') {
                for (var a=0; a < i; a++){
                    first = finalRule.shift();
                    tmp.unshift(first);
                }
                finalRule.shift();
                X = B;
                for (var b=X.length-1; b> -1; b--)
                    finalRule.unshift(X[b]);
                for (var c=0; c<tmp.length; c++)
                    finalRule.unshift(tmp[c]);
                tmp = [];
                i+=X.length;
                //finalRule.splice(i,1, X);
                continue;
            }
            if (finalRule[i] === 'A'){
                //solveRule(A, iter, A, B);
                for (var y=0; y < i; y++){
                    first = finalRule.shift();
                    tmp.unshift(first);
                }
                finalRule.shift();
                //F = stocasticF();
                ruleA = A.split('');
                for (var j=ruleA.length-1; j> -1; j--)
                    finalRule.unshift(ruleA[j]);
                for (var m=0; m<tmp.length; m++)
                    finalRule.unshift(tmp[m]);
                tmp = [];
                i+=ruleA.length;
                //iteration--;
                continue;
            }
            if (finalRule[i] === 'B'){
                //solveRule(B, iter, A, B);
                for (var k=0; k < i; k++){
                    first = finalRule.shift();
                    tmp.unshift(first);
                }
                finalRule.shift();
                //F = stocasticF();
                ruleB = B.split('');
                for (var l=ruleB.length-1; l> -1; l--)
                    finalRule.unshift(ruleB[l]);
                for (var n=0; n<tmp.length; n++)
                    finalRule.unshift(tmp[n]);
                tmp = [];
                i+=ruleB.length;
                //iteration--;
                continue;
            }
            if (finalRule[i] === '+') {
                i++;
                continue;
            }
            if (finalRule[i] === '-') {
                i++;
                continue;
            }
            if (finalRule[i] === 'v') {
                i++;
                continue;
            }
            if (finalRule[i] === '^') {
                i++;
                continue;
            }
            if (finalRule[i] === '>') {
                i++;
                continue;
            }
            if (finalRule[i] === '<') {
                i++;
                continue;
            }
            if (finalRule[i] === '[') {
                i++;
                continue;
            }
            if (finalRule[i] === ']') {
                i++;
            }
        }
        iteration--;
    }
    //elimino le A o le B dopo le x iterazioni, per poter leggere correttamente
    for (var h=0; h<finalRule.length; h++){
        if (finalRule[h]==='A' || finalRule[h]==='B'){
            finalRule.splice(h, 1);
            h--;
        }
    }
    return finalRule.join('');
}

function NewTreeBuilder(string, treeParameters){//startingPosition, degreeValueAngle, branchRadius) {
    let state = {
        dd : treeParameters.degreeValueAngle,
        bRadius : treeParameters.branchRadius,
        bLength : treeParameters.branchLength,
        bReduction : treeParameters.radiusReductionFactor,
        bMinRadius : 0.05,
        position : treeParameters.startingPosition,
        angleX : 0,
        angleY : 0,
        angleZ : 0
    };
    let stateStack = [];
    let tree = new THREE.Object3D();
    let textureLoader = new THREE.TextureLoader();

    for(let i = 0; i < string.length; i++) {
        if(string.charAt(i) === "F") {
            tree.add(buildRamo(state, textureLoader));
        }
        if(string.charAt(i) === "X") {
            tree.add(buildFoglia(state, textureLoader ));
        }
        if(string.charAt(i) === "+") {
            state.angleX +=1;
        }
        if(string.charAt(i) === "-") {
            state.angleX -=1;
        }
        if(string.charAt(i) === "^") {
            state.angleY +=1;
        }
        if(string.charAt(i) === "V") {
            state.angleY -=1;
        }
        if(string.charAt(i) === ">") {
            state.angleZ +=1;
        }
        if(string.charAt(i) === "<") {
            state.angleZ -=1;
        }
        if(string.charAt(i) === "[") {
            stateStack.push( cloneState(state) );
            state.bRadius = (state.bRadius - state.bReduction) > state.bMinRadius ? (state.bRadius - state.bReduction) : state.bRadius;
        }
        if(string.charAt(i) === "]") {
            state = cloneState( stateStack.pop() );
        }
    }
    tree.castShadow = true;
    return tree;
}

function buildRamo(state, textureLoader) {
    var branchGeometry = new THREE.CylinderGeometry( state.bRadius, state.bRadius, state.bLength, 12 );
    var branchMaterial = new THREE.MeshBasicMaterial( {color: 'brown', map: textureLoader.load( "texture/branch.jpg" )} );
    //state.bRadius = state.bRadius*(1-state.bReduction);
    state.bRadius *= (1-state.bReduction);

    var branch = new THREE.Mesh( branchGeometry, branchMaterial);

    //calcolo attuale posizione del blocchetto
    var position = new THREE.Vector3( 0, state.bLength/2, 0);
    state.angleX = state.angleX * ((state.dd*Math.PI)/180);
    state.angleY = state.angleY * ((state.dd*Math.PI)/180);
    state.angleZ = state.angleZ * ((state.dd*Math.PI)/180);

    branch.rotation.set(state.angleX, state.angleY, state.angleZ);

    //calcolo dove posizionare il ramo:
    // applico a position la stessa rotazione del ramo e aggiorno il punto di top
    position.applyEuler(branch.rotation);
    state.position.add(position);
    //posiziono il ramo
    branch.position.copy( state.position );
    //aggiorno il nuovo top
    state.position.add(position);

    branch.castShadow = true;
    return branch;

}

function buildFoglia(state, textureLoader) {
    let leafMaterial = new THREE.MeshBasicMaterial( {color: 'green', map: textureLoader.load( "texture/leaf1.jpg" )} );

    let x = 0, y = 0;
    let leafShape = new THREE.Shape();
    /*leafShape.bezierCurveTo(x, y, x + 2, y, x, y);
    leafShape.bezierCurveTo(x - 0.5, y, x - 0.5, y + 1.16, x - 0.5, y + 1.1);
    leafShape.bezierCurveTo(x - 0.5, y + 1.83, x - 0.5, y + 2.56, x + 0.83, y + 4.16);
    leafShape.bezierCurveTo(x + 2, y + 2.56, x + 1.66, y + 1.83, x + 1.66, y + 1.16);
    leafShape.bezierCurveTo(x + 1.66, y + 1.16, x + 1.66, y, x + 0.66, y);
    leafShape.bezierCurveTo(x + 1.16, y, x + 0.83, y + 0.83, x, y);*/

    leafShape.bezierCurveTo(x, y, x + 4, y, x, y);
    leafShape.bezierCurveTo(x - 3, y, x - 3, y + 7, x - 3, y + 7);
    leafShape.bezierCurveTo(x - 3, y + 11, x - 3, y + 15.4, x + 5, y + 25);
    leafShape.bezierCurveTo(x + 12, y + 15.4, x + 10, y + 11, x + 10, y + 7);
    leafShape.bezierCurveTo(x + 10, y + 7, x + 10, y, x + 4, y);
    leafShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x, y);

    let curveGeometry = new THREE.ShapeGeometry(leafShape);

    let leafGeometry = new THREE.Geometry();
    leafGeometry.merge(curveGeometry);
    //leafGeometry.matrixAutoUpdate  = false;
    //da spessore alle foglie
    var mesh_arr = new Array();
    for(i = 0; i < 0.5 ; i += 0.01) {
        mesh_arr[i] = curveGeometry.clone();
        mesh_arr[i].translate(0, 0, i);
        leafGeometry.merge( mesh_arr[i] );
    }
    //leafGeometry.rotateX((-10*Math.PI)/180);
    //leafGeometry.rotateY((-90*Math.PI)/180);

    leafGeometry.translate(-3,-5,0);

    /*let stemGeometry = new THREE.CylinderGeometry(0.2, 0.6, 32, 10);
    let stemMesh = new THREE.Mesh(stemGeometry)*/

    /*let leafTotalGeometry = new THREE.Geometry();
    leafTotalGeometry.merge(stemMesh.geometry, stemMesh.matrix);
    leafTotalGeometry.merge(leaf);*/

    var leaf = new THREE.Mesh( leafGeometry, leafMaterial );
    leaf.material.side=THREE.doubleSide;
    //branch.castShadow = true;

    leaf.scale.x = 0.08;
    leaf.scale.y = 0.08;
    leaf.scale.z = 0.08;

    var position = new THREE.Vector3( 0, state.bLength/10, 0 );
    state.position.add( position );
    leaf.position.copy( state.position );
    leaf.rotation.set(0,80,0);

    leaf.castShadow = true;
    return leaf;
}

function cloneState(state) {
    return {
        dd : state.dd,
        bRadius : state.bRadius,
        bLength : state.bLength,
        bReduction : state.bReduction,
        bMinRadius : state.bMinRadius,
        position : new THREE.Vector3().copy(state.position),
        angleX : state.angleX,
        angleY : state.angleY,
        angleZ : state.angleZ
    }
}

function stocasticF() {
    //const f = Math.floor(Math.random() * 3);
    const f = 0;
    switch (f) {
        case 0:
            F1 = 'FF';
            //F1 = 'F[+F]F[-F]F';
            f1 = F1.split('');
            return f1;
        case 1:
            F1 = 'F[+F]F';
            f1 = F1.split('');
            return f1;
        case 2:
            F1 = 'F[-F]F';
            f1 = F1.split('');
            return f1;
    }
}
function stocasticX() {
    //const xx = Math.floor(Math.random() * 2);
    const xx = 0;
    switch (xx) {
        case 0:
            X1 = 'F[+X][-X]FX';
            //X1 = 'F-[[X]+X]+F[+FX]-X';
            x1 = X1.split('');
            return x1;
        case 1:
            X1 = 'F[+X]F[-X]+X';
            x1 = X1.split('');
            return x1;
    }
}
