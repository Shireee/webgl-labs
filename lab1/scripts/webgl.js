import { initBuffers } from "./init-buffers.js";
import { drawScene } from "./draw-scene.js";

window.onload = () => {
    // getting webgl context 
    const canvas = document.querySelector("#canvas");
    const gl = canvas.getContext("webgl");
  
    // Vertex shader program
    const vsSource = `
        attribute vec4 aVertexPosition;
        attribute vec4 aVertexColor;

        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;

        varying lowp vec4 vColor;

        void main(void) {
          gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
          vColor = aVertexColor;
        }
      `;

    // Fragment shader program
    const fsSource = `
      varying lowp vec4 vColor;

      void main(void) {
        gl_FragColor = vColor;
      }
    `;
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource); // Initialize a shader program

    // Create a program info with all attribute and uniforms
    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
        vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor"),
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
        modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
      },
    };
    
    // Create buffers
    const buffers = initBuffers(gl);

    // cube rotation params
    let then = 0; 
    let cubeRotation = 0.0;
    let deltaTime = 0;

    // Add loop 
    function render(now) {
      now *= 0.002; // convert to seconds
      deltaTime = now - then;
      then = now;
    
      drawScene(gl, programInfo, buffers, cubeRotation);
      cubeRotation += deltaTime;      
    
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
    
}


// Initialize a shader program, so WebGL knows how to draw our data
function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource); // load a vertex shader
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource); // load a fragment shader
    const shaderProgram = gl.createProgram(); // Create the shader program
    
    // attach shaders to instance of programm and link it to webgl context
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader); 
    gl.linkProgram(shaderProgram);
  
    return shaderProgram;
}
  

// creates a shader of the given type, uploads the source and compiles it.
function loadShader(gl, type, source) {
    const shader = gl.createShader(type); // create a pure instance of determed shader type 
    
    gl.shaderSource(shader, source); // Send the source to the shader object
    gl.compileShader(shader); // Compile the shader program
  
    return shader;
}
  