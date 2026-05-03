uniform float uTime;
uniform sampler2D uCollisionMap;

attribute float aRandom;

const float sceneMinY = -5.0;
const float sceneMaxY = 5.0;
const float sceneWidth = 10.0;
const float sceneDepth = 10.0;

void main() {
    vec3 animatedPosition = position;

    // Slower, floatier fall — wider speed variance for depth
    float fallSpeed = 0.2 + aRandom * 0.35;
    float animationHeight = 10.0;
    animatedPosition.y = mod(animatedPosition.y - uTime * fallSpeed, animationHeight) - (animationHeight / 2.0);

    // Collision detection (sample before sway so UV stays stable)
    float repelRadius = 1.0;
    float repelStrength = 1.0;

    vec2 uv = vec2(
        (animatedPosition.x + sceneWidth / 2.0) / sceneWidth,
        (animatedPosition.z + sceneDepth / 2.0) / sceneDepth
    );

    vec4 surfaceData = texture2D(uCollisionMap, uv);

    vec3 surfaceNormal = surfaceData.rgb * 2.0 - 1.0;
    float surfaceHeight = surfaceData.a * (sceneMaxY - sceneMinY) + sceneMinY;

    vec3 surfacePoint = vec3(animatedPosition.x, surfaceHeight, animatedPosition.z);

    float dist = distance(animatedPosition, surfacePoint);

    float force = 1.0 - smoothstep(0.0, repelRadius, dist);

    vec3 displacement = surfaceNormal * force * repelStrength;

    animatedPosition += displacement;

    // Per-particle sway — unique phase and frequency so each flake drifts independently
    float phase = aRandom * 6.2832;
    float swayFreq = 0.4 + aRandom * 0.7;
    float swayAmp  = 0.06 + aRandom * 0.1;
    animatedPosition.x += sin(uTime * swayFreq + phase) * swayAmp;
    animatedPosition.z += cos(uTime * swayFreq * 0.6 + phase + 1.0) * swayAmp * 0.4;

    // Slow sinusoidal wind — shifts everything gently left/right over time
    animatedPosition.x += sin(uTime * 0.12) * 0.09;

    vec4 modelPosition = modelMatrix * vec4(animatedPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    gl_PointSize = 8.0 * aRandom + 3.0;
}
