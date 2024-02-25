function initBuffers(gl) {
    const positionBuffer = initPositionBuffer(gl);
  
    return {
      position: positionBuffer,
    };
  }
  
function initPositionBuffer(gl) {
    const positionBuffer = gl.createBuffer(); // Create a buffer
  
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); // Determ buffer type 
 
    const positions = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0]; // Now create an array of positions
  
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW); // Load buffer data
  
    return positionBuffer;
  }
  
  export { initBuffers };
  