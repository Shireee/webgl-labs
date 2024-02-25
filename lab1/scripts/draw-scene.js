function drawScene(gl, programInfo, buffers, squareRotation) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0); // set default color of buffer 
    gl.clearDepth(1.0); // set default depth of buffer

    gl.enable(gl.DEPTH_TEST); // Enable z-index cheking 
    gl.depthFunc(gl.LEQUAL); // Determ an alghoritm of z-index cheking 

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // clear color and depth buffers 
  
    const fieldOfView = (45 * Math.PI) / 180;
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight; 
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();
  
    mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);   // Create a perspective matrix

    const modelViewMatrix = mat4.create();
  
    // Now move the drawing position a bit to where we want to start drawing the square.
    mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -6.0]); 
    mat4.rotate(modelViewMatrix, modelViewMatrix, squareRotation, [0, 0, 1]); // axis to rotate around

    setPositionAttribute(gl, buffers, programInfo); // set vertex pos 
    setColorAttribute(gl, buffers, programInfo); // set color

    gl.useProgram(programInfo.program); // use shaders
  
    // Set the shader uniforms
    gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix,
    );
    gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix,
    );
    {
      const offset = 0;
      const vertexCount = 4;
      gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
    }
}

// Tell WebGL how to pull out the positions from the position buffer into the vertexPosition attribute.
function setPositionAttribute(gl, buffers, programInfo) {
    const numComponents = 2; // pull out 2 values per iteration
    const type = gl.FLOAT; // the data in the buffer is 32bit floats
    const normalize = false; // don't normalize
    const stride = 0; // how many bytes to get from one set of values to the next
    const offset = 0; // how many bytes inside the buffer to start from
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      numComponents,
      type,
      normalize,
      stride,
      offset,
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
}

function setColorAttribute(gl, buffers, programInfo) {
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexColor,
      numComponents,
      type,
      normalize,
      stride,
      offset,
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
}

export { drawScene };
