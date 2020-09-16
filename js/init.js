let container;
let scene, camera, renderer;
//let mouse;+

var terrain;

var axiom, A, B;

//var raycaster;+
//var threshold = 0.1;+
//var circleMesh = null;+

function init() {
    container = document.querySelector( '#scene-container' );
    document.body.appendChild( container );
    //init Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x3BB9FF ); //cce0ff 3BB9FF
    scene.fog = new THREE.Fog( 0x3BB9FF, 300, 600 );
    //init Camera
    camera = new THREE.PerspectiveCamera( 75, container.clientWidth / container.clientHeight, 1, 1000 );
    camera.position.set( -100, 0, -0 );
    //init Lights
    let pointLight = new THREE.PointLight(0xFFFFFF,150);
    let hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 2);
    pointLight.position.set(-30,0,0);
    scene.add(pointLight, hemisphereLight);
    //init Terrain
    let grassTexture = new THREE.TextureLoader().load('texture/grasslight-big.jpg');
    grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.set(10,10);
    let terrainGeometry = new THREE.PlaneBufferGeometry( 1000, 1000 );
    let terrainMaterial = new THREE.MeshPhongMaterial({map:grassTexture});
    terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
    terrain.position.y = -50;
    terrain.rotation.x = - Math.PI / 2;
    terrain.receiveShadow = true;
    //terrain.doubleSided = true;
    scene.add(terrain);
    //init Renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( container.clientWidth, container.clientHeight );
    container.appendChild( renderer.domElement );
    //renderer.gammaFactor = 2.2;
    //CAMBIA qualcosa sull'illuminazione
    renderer.gammaOutput = true;
    renderer.physicallyCorrectLights = true;
    //utile per le ombre
    //renderer.shadowMap.enabled = true;
    //renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    //init Controls
    let controls = new THREE.OrbitControls(camera, container);
    controls.maxPolarAngle = Math.PI * 0.5;
    controls.maxDistance = camera.far/1.9;
    controls.minDistance = camera.near;
    // Riduce la scena proporzionalmente riducendo le dimensioni dello schermo del browser
    window.addEventListener( 'resize', onWindowResize );

    /*mouse = new THREE.Vector2(0, 0);
    raycaster = new THREE.Raycaster();
    raycaster.params.Points.threshold = threshold;*/

    var gui = new dat.GUI();
    createGUI(gui);

    renderer.setAnimationLoop( () => {
        renderer.render( scene, camera );

    } );

}

function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( container.clientWidth, container.clientHeight );
}

var a;
var X;
var F;

function choosePlant(type) {
    switch (type) {
        case '1':
            a = 'X';
            X = 'F+[[X]-X]-F[-FX]+X';
            F = 'FF';
            return [a, F, X];
        case '2':
            a = 'X';
            X = 'F[+X]F[-X]+X';
            F = 'FF';
            return [a, F, X];
        case '3':
            a = 'F';
            X = 'X';
            F = 'F[+F]F[-F]F';
            return [a, F, X];
        case '4':
            a = 'F';
            X = 'X';
            F = 'F[+F]F[-F][F]';
            return [a, F, X];
        case '5':
            a = 'F';
            X = 'X';
            F = 'FF-[-F+F+F]+[+F-F-F]';
            return [a, F, X];
        case '6':
            a = 'X';
            X = 'F[+X][-X]FX';
            F = 'FF';
            return [a, F, X];
    }
}

function stocasticTree1() {
    axiom = 'F';
    X = 'X';
    const f = Math.floor(Math.random() * 3);
    switch (f) {
        case 0:
            F = 'F[+F]F[-F]F';
            return axiom, F, X;
        case 1:
            F = 'F[+F]F';
            return axiom, F, X;
        case 2:
            F = 'F[-F]F';
            return axiom, F, X;
    }
}

function stocasticTree2() {
    axiom = 'X';
    F = 'FF';
    const x = Math.floor(Math.random() * 2);
    switch (x) {
        case 0:
            X = 'F-[[X]+X]+F[+FX]-X';
            return axiom, F, X;
        case 1:
            X = 'F[+X]F[-X]+X';
            return axiom, F, X;
    }
}


/*function onMouseDown(e) {

    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );

    var intersections = raycaster.intersectObject(terrain);
    intersection = ( intersections.length ) > 0 ? intersections[ 0 ] : null;

    if (intersection != null && circleMesh === null) {
        // 3 = branchRadius
        var circle = new THREE.CircleGeometry(1 * 8, 32);
        var material = new THREE.MeshBasicMaterial( {color: 0x000000} );
        circleMesh = new THREE.Mesh(circle, material);

        circleMesh.rotateX((270 * Math.PI) / 180);
        circleMesh.position.copy(intersection.point);

        circleMesh.name = 'marker';

        scene.add(circleMesh);

    } else if (intersection != null) {
        circleMesh.position.copy(intersection.point);
    }

}*/

function renderTree() {
    if (parameters.Type === 'Simple Tree'){
        var values = choosePlant('2');
        console.log(values);
        axiom = values[0];
        A = values[1];
        B = values[2]

    }
    else {
        axiom = parameters.Axiom;
        A = parameters.rule1;
        B = parameters.rule2;
    }
    var iteration = parameters.iteration;
    var Assioma = solveRule(axiom, iteration, A, B);

    var treeParameters = {
        startingPosition : new THREE.Vector3(parameters.posX, -50, parameters.posZ),
        degreeValueAngle: parameters.Angle,
        branchRadius : parameters.BranchRadius,
        radiusReductionFactor : parameters.RadiusReduction,
        branchLength : parameters.BranchLenght
    };

    newTree = new NewTreeBuilder(Assioma, treeParameters);
    scene.add(newTree);


}


//document.getElementById("scene-container").addEventListener('mousedown', onMouseDown, false);
window.addEventListener( 'resize', onWindowResize );

init();