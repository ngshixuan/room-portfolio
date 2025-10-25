varying vec3 vWorldPosition;
varying vec3 vNormal;

const float sceneMinY = -5.0;
const float sceneMaxY = 5.0;

void main()
{
    vec3 encodedNormal = normalize(vNormal) * 0.5 + 0.5;
    float encodedHeight = (vWorldPosition.y - sceneMinY) / (sceneMaxY - sceneMinY);
    gl_FragColor = vec4(encodedNormal, encodedHeight);
}