var gl, shaderProgram, vertices;

initGL();
createShaders();
createVertices();
draw();

function initGL() {
  var canvas = document.getElementById("canvas");
  gl = canvas.getContext("webgl");
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1, 1, 1, 1);
}

function createShaders() {
  var vs = "";
  vs += "attribute vec3 coords;";
  vs += "attribute float pointSize;";
  vs += "void main(void) {";
  vs += "  gl_Position = vec4(coords, 1.0);";
  vs += "  gl_PointSize = pointSize;";
  vs += "}";

  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vs);
  gl.compileShader(vertexShader);

  var fs = "";
  fs += "precision mediump float;";
  fs += "uniform vec4 color;";
  fs += "void main(void) {";
  fs += "  gl_FragColor = color;";
  fs += "}";

  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fs);
  gl.compileShader(fragmentShader);

  shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);
}

function createVertices() {
  vertices = [
    -0.9, -0.9, 0.0,
     0.9, -0.9, 0.0,
     0.0,  0.9, 0.0
  ];

  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  
  var coordsLoc = gl.getAttribLocation(shaderProgram, "coords");
  gl.vertexAttribPointer(coordsLoc, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(coordsLoc);

  var pointSizeLoc = gl.getAttribLocation(shaderProgram, "pointSize");
  gl.vertexAttrib1f(pointSizeLoc, 40.0);

  var colorLoc = gl.getUniformLocation(shaderProgram, "color");
  gl.uniform4f(colorLoc, 0, 0, 0, 1); // magenta
}

function draw() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, 3);
}