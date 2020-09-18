let container;
let scene, camera, renderer;
let gui;

var terrain;
var axiom, A, B;
var values, stocValues;
var treeParameters;
var newTree;


function init() {
    container = document.querySelector( '#scene-container' );
    document.body.appendChild( container );
    //init Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x3BB9FF );
    scene.fog = new THREE.Fog( 0x3BB9FF, 300, 600 );
    //init Camera
    camera = new THREE.PerspectiveCamera( 75, container.clientWidth / container.clientHeight, 1, 1000 );
    camera.position.set( -100, 0, 0 );
    //init Lights
    let pointLight = new THREE.PointLight(0xFFFFFF, 150);
    let hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 2);
    pointLight.position.set(-20,30,-20);
    pointLight.castShadow = true;
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
    renderer.gammaOutput = true;
    renderer.physicallyCorrectLights = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;

    //init Controls
    let controls = new THREE.OrbitControls(camera, container);
    controls.maxPolarAngle = Math.PI * 0.5;
    controls.maxDistance = camera.far/1.9;
    controls.minDistance = camera.near;
    // Riduce la scena proporzionalmente riducendo le dimensioni dello schermo del browser
    window.addEventListener( 'resize', onWindowResize );

    gui = new dat.GUI({width: 260});
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

function renderTree() {
    var type = parameters.Type;
    switch (type) {
        case 'Plant1':
            values = choosePlant('1');
            axiom = values[0];
            A = values[1];
            B = values[2];
            break;
        case 'Plant2':
            values = choosePlant('2');
            axiom = values[0];
            A = values[1];
            B = values[2];
            break;
        case 'Plant3':
            values = choosePlant('3');
            axiom = values[0];
            A = values[1];
            B = values[2];
            break;
        case 'Plant4':
            values = choosePlant('4');
            axiom = values[0];
            A = values[1];
            B = values[2];
            break;
        case 'Plant5':
            values = choosePlant('5');
            axiom = values[0];
            A = values[1];
            B = values[2];
            break;
        case 'Plant6':
            values = choosePlant('6');
            axiom = values[0];
            A = values[1];
            B = values[2];
            break;
        case 'StochasticPlant':
            const randomPlant = Math.floor(Math.random() * 2);
            switch (randomPlant){
                case 0:
                    stocValues = stochasticTree1();
                    break;
                case 1:
                    stocValues = stochasticTree2();
                    break;
            }
            axiom = stocValues[0];
            A = stocValues[1];
            B = stocValues[2];
            break;
        case 'other':
            axiom = parameters.Axiom;
            A = parameters.rule1;
            B = parameters.rule2;
            break;
    }

    treeParameters = {
        startingPosition : new THREE.Vector3(parameters.posX, -50, parameters.posZ),
        degreeValueAngle: parameters.Stochastic ? (Math.round(Math.random()*5)+2)*10 : parameters.Angle,
        branchRadius : parameters.BranchRadius,
        radiusReductionFactor : parameters.RadiusReduction,
        branchLength : parameters.Stochastic ? (Math.round(Math.random()*5)+3) : parameters.BranchLength
    };

    var iteration = parameters.iteration;
    var string = solveRule(axiom, iteration, A, B);

    newTree = new treeBuilder(string, treeParameters);
    scene.add(newTree);
}

window.addEventListener( 'resize', onWindowResize );

init();