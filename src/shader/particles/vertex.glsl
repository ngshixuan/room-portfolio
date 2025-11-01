uniform float uTime;
uniform sampler2D uCollisionMap;

attribute float aRandom;

const float sceneMinY = -5.0;
const float sceneMaxY = 5.0;
const float sceneWidth = 10.0;
const float sceneDepth = 10.0;

void main() {
    vec3 animatedPosition = position;

    float fallSpeed = 0.5 + aRandom * 0.5;
    float animationHeight = 10.0;
    animatedPosition.y = mod(animatedPosition.y - uTime * fallSpeed, animationHeight) - (animationHeight / 2.0);

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

    float distance = distance(animatedPosition, surfacePoint);

    float force = 1.0 - smoothstep(0.0, repelRadius, distance);

    vec3 displacement = surfaceNormal * force * repelStrength;

    animatedPosition += displacement;

    // Project the vertex position into screen space
    vec4 modelPosition = modelMatrix * vec4(animatedPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    // Set the size of the points
    gl_PointSize = 8.0; // You can make this a uniform for dynamic control
}