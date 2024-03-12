function initBuffers(gl) {
  const positionBuffer = initPositionBuffer(gl);
  const colorBuffer = initColorBuffer(gl);

  return {
    position: positionBuffer,
    color: colorBuffer,
  };
  
}

function initPositionBuffer(gl) {
  const positionBuffer = gl.createBuffer(); // Create a buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); // Determ buffer type 

  // array of positions
  const positions = [-1.0, -1.0, 0, 1.0, 1.0, -1.0];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW); // Load buffer data

  return positionBuffer;
}


function initColorBuffer(gl) {
  const colors = [
    1.0,
    0.0,
    0.0,
    1.0, // red
    0.0,
    1.0,
    0.0,
    1.0, // green
    0.0,
    0.0,
    1.0,
    1.0, // blue
  ];

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  return colorBuffer;
}

export { initBuffers };
