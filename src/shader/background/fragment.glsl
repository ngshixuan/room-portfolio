uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

// Smooth gradient function
float smoothGradient(float edge0, float edge1, float x) {
  return smoothstep(edge0, edge1, x);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  
  // Strong horizontal movement
  float horizontalShift = sin(uTime * 0.8) * 0.03;
  uv.x += horizontalShift * 0.8;
  
  // Obvious three-color wave pattern
  float wave1 = sin(uv.x * 5.0 - uTime * 1.5) * 0.5 + 0.5;
  float wave2 = cos(uv.x * 3.0 + uTime * 2.0) * 0.5 + 0.5;
  
  vec3 gradient = mix(uColor1, uColor2, wave1);
  gradient = mix(gradient, uColor3, wave2);
  
  // Pulsing brightness
  float brightnessPulse = sin(uTime * 3.0) * 0.15 + 0.85;
  gradient *= brightnessPulse;
  
  gl_FragColor = vec4(gradient, 1.0);
}