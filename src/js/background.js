import * as THREE from './three.module.js';

let container;
let camera, scene, renderer, clock;
let uniforms;

init();
animate();

function init() {
    container = document.getElementById('canvas-container');

    camera = new THREE.PerspectiveCamera(10, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 0);

    scene = new THREE.Scene();
    clock = new THREE.Clock();

    var geometry = new THREE.PlaneGeometry(10, 5); // Изменяем на 3D плоскость

    uniforms = {
        u_time: {type: "f", value: 70.0},
        u_resolution: {type: "v2", value: new THREE.Vector2()},
        u_mouse: {type: "v2", value: new THREE.Vector2()}
    };

    var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: `void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,
        fragmentShader:
            `#ifdef GL_ES
        precision mediump float;
        #endif
        
        uniform float u_time;
        uniform vec2 u_resolution;
        uniform vec2 u_mouse;
        
        //\t<https://www.shadertoy.com/view/4dS3Wd>
        //\tBy Morgan McGuire @morgan3d, http://graphicscodex.com
        //
        float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }
        
        
        float noise(vec2 x) {
            vec2 i = floor(x);
            vec2 f = fract(x);
        
            // Four corners in 2D of a tile
            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));
        
            // Simple 2D lerp using smoothstep envelope between the values.
            // return vec3(mix(mix(a, b, smoothstep(0.0, 1.0, f.x)),
            //\t\t\tmix(c, d, smoothstep(0.0, 1.0, f.x)),
            //\t\t\tsmoothstep(0.0, 1.0, f.y)));
        
            // Same code, with the clamps in smoothstep and common subexpressions
            // optimized away.
            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }
        
        
        #define NUM_OCTAVES 6
        
        float fbm(vec2 x) {
            float v = 0.0;
            float a = 0.5;
            vec2 shift = vec2(100);
            // Rotate to reduce axial bias
            mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
            for (int i = 0; i < NUM_OCTAVES; ++i) {
                v += a * noise(x);
                x = rot * x * 2.0 + shift;
                a *= 0.5;
            }
            return v;
        }
        
        
        void main() {
          vec2 st = gl_FragCoord.xy / u_resolution.xy;
          st *= 2.;
          st.x += 3.1;
          st.y += 6.1;
          float t = u_time * 0.04;
          vec2 mousePos = u_mouse / u_resolution * 2.0 - 1.0;
          

          vec2 q = vec2(0.0);
          q.x = fbm(st + vec2(2.0, 1.0) + 0.126 * t);
          q.y = fbm(st + vec2(3.2, 1.3) + 0.126 * t);
        
          vec2 r = vec2(0.0);
          r.x = fbm(st + q * 3.0 + vec2(1.7, 9.2) + 0.7 * t - mousePos.x * 0.04);
          r.y = fbm(st + q * 5.0 + vec2(8.3, 2.8) + 0.9 * t + mousePos.y * 0.08);

        
          float f = fbm(r);
        
          float pastelAmount = 0.3;
        
          vec3 color0 = mix(vec3(0.0, 0.0, 0.0), vec3(0.0), pastelAmount);       
          vec3 color3 = mix(vec3(0.0, 0.0588, 0.3529), vec3(0.0), pastelAmount); 
          vec3 color2 = mix(vec3(0.5608, 0.0, 0.4), vec3(0.0), pastelAmount);  
          vec3 color1 = mix(vec3(1.0, 1.0, 1.0), vec3(0.0), pastelAmount);  

          vec3 color;
          if (f < 0.15) {
            float m = smoothstep(0.0, 0.15, f);
            color = mix(color0, color1, m);
          } else if (f < 0.66) {
            float m = smoothstep(0.15, 0.66, f);
            color = mix(color1, color2, m);
          } else {
            float m = smoothstep(0.66, 1.0, f);
            color = mix(color2, color3, m);
          }
          f = fbm(st*0.4 - 0.126 * t);
        
          float m = smoothstep(0., 1., f);
          color += mix(color3, color, m);
        
          // m = smoothstep(0., 1.0, f);
          // color *= mix(color2, color, m);
          //color *= color2*1. + color1*0.3;
          gl_FragColor = vec4(color, 0.9);
    }`,
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending
    });

    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, -5);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.width = document.body.style.width;
    renderer.domElement.height = document.body.style.height;

    container.appendChild(renderer.domElement);

    onWindowResize();
    window.addEventListener('resize', onWindowResize, false);

    document.onmousemove = function (e) {
        uniforms.u_mouse.value.x = e.pageX
        uniforms.u_mouse.value.y = e.pageY
    }
}

function onWindowResize(event) {
    // container.clientHeight = window.innerHeight;
    // container.clientWidth = window.innerWidth;
    camera.aspect = document.body.clientWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(document.body.clientWidth, window.innerHeight);
    uniforms.u_resolution.value.x = renderer.domElement.width;
    uniforms.u_resolution.value.y = renderer.domElement.height;
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    uniforms.u_time.value += clock.getDelta();
    renderer.render(scene, camera);
}
