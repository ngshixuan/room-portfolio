void main()
{
    // Clean 0→1 falloff from center to edge of the point sprite circle
    float strength = 1.0 - distance(gl_PointCoord, vec2(0.5)) * 2.0;
    strength = clamp(strength, 0.0, 1.0);

    // Lower exponent = softer, more diffuse flake (was 10.0)
    strength = pow(strength, 3.5);

    gl_FragColor = vec4(vec3(strength), 1.0);
}
