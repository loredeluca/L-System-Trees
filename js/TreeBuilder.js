var tmp = [];
var first;

function solveRule(axiom, iteration, A, B){
    var finalRule = axiom.split('');
    while (iteration > 0){
        var i =0;
        while (i<finalRule.length){
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
                continue;
            }
            if (finalRule[i] === '+' || finalRule[i] === '-') {
                i++;
                continue;
            }
            if (finalRule[i] === 'v' || finalRule[i] === '^') {
                i++;
                continue;
            }
            if (finalRule[i] === '>' || finalRule[i] === '<') {
                i++;
                continue;
            }
            if (finalRule[i] === '[' || finalRule[i] === ']') {
                i++;
            }
        }
        iteration--;
    }
    return finalRule.join('');
}

function treeBuilder(string, treeParameters){
    let state = {
        degValAng : treeParameters.degreeValueAngle,
        bRadius : treeParameters.branchRadius,
        bLength : treeParameters.branchLength,
        bReduction : treeParameters.radiusReductionFactor,
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
            tree.add(buildBranch(state, textureLoader));
        }
        if(string.charAt(i) === "X") {
            tree.add(buildLeaf(state));
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
            state.bRadius = (state.bRadius - state.bReduction) > 0.10 ? (state.bRadius - state.bReduction) : state.bRadius;
        }
        if(string.charAt(i) === "]") {
            state = cloneState( stateStack.pop() );
        }
    }
    tree.castShadow = true;
    return tree;
}

function buildBranch(state, textureLoader) {
    var branchGeometry = new THREE.CylinderGeometry( state.bRadius, state.bRadius, state.bLength, 12 );
    var branchMaterial = new THREE.MeshBasicMaterial( { map: textureLoader.load("texture/bark.jpg")});
    //var branchMaterial = new THREE.MeshBasicMaterial( { color: 0x1e1307 });
    var branch = new THREE.Mesh( branchGeometry, branchMaterial);

    state.bRadius *= (1-state.bReduction);

    //calcolo attuale posizione del blocchetto
    var position = new THREE.Vector3( 0, state.bLength/2, 0);
    state.angleX = state.angleX * ((state.degValAng*Math.PI)/180);
    state.angleY = state.angleY * ((state.degValAng*Math.PI)/180);
    state.angleZ = state.angleZ * ((state.degValAng*Math.PI)/180);

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
    branch.receiveShadow = true;
    return branch;

}

function buildLeaf(state) {
    let leafMaterial = new THREE.MeshBasicMaterial( {color: 'green'});

    let x = 0, y = 0;
    let leafShape = new THREE.Shape();

    leafShape.bezierCurveTo(x, y, x + 4, y, x, y);
    leafShape.bezierCurveTo(x - 3, y, x - 3, y + 7, x - 3, y + 7);
    leafShape.bezierCurveTo(x - 3, y + 11, x - 3, y + 15.4, x + 5, y + 25);
    leafShape.bezierCurveTo(x + 12, y + 15.4, x + 10, y + 11, x + 10, y + 7);
    leafShape.bezierCurveTo(x + 10, y + 7, x + 10, y, x + 4, y);
    leafShape.bezierCurveTo(x + 7, y, x + 5, y , x, y);

    //Forma foglia a cuore
    /*leafShape.moveTo( x + 5, y + 1 );
    leafShape.bezierCurveTo( x + 5, y + 1, x + 4, y, x, y );
    leafShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
    leafShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 12.4, x + 5, y + 30 );
    leafShape.bezierCurveTo( x + 12, y + 12.4, x + 16, y + 11, x + 16, y + 7 );
    leafShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
    leafShape.bezierCurveTo( x + 7, y, x + 5, y + 1, x + 5, y + 1 );*/

    let curveGeometry = new THREE.ShapeGeometry(leafShape);
    let leafGeometry = new THREE.Geometry();
    leafGeometry.merge(curveGeometry);

    var meshLeaf = new Array();
    for(var g = 0; g < 0.5; g += 0.01) {
        meshLeaf[g] = curveGeometry.clone();
        meshLeaf[g].translate(0, 0, g);
        leafGeometry.merge( meshLeaf[g] );
    }
    leafGeometry.translate(-3,-5,0);

    var leaf = new THREE.Mesh( leafGeometry, leafMaterial );
    leaf.material.side=THREE.doubleSide;
    leaf.castShadow = true;

    leaf.scale.x = 0.08;
    leaf.scale.y = 0.08;
    leaf.scale.z = 0.08;

    var position = new THREE.Vector3( 0, state.bLength/10, 0 );
    state.position.add( position );
    leaf.position.copy( state.position );
    leaf.rotation.set(0,80,0);

    leaf.castShadow = true;
    leaf.receiveShadow = true;
    return leaf;
}

function cloneState(state) {
    return {
        degValAng : state.degValAng,
        bRadius : state.bRadius,
        bLength : state.bLength,
        bReduction : state.bReduction,
        position : new THREE.Vector3().copy(state.position),
        angleX : state.angleX,
        angleY : state.angleY,
        angleZ : state.angleZ
    }
}
