uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uTime;
uniform float uStrength;
varying float vWobble;

void main() {
    float glowFactor = smoothstep(-1.0, 1.0, vWobble) * 2.0;
    vec3 glowColor = mix(uColorA, uColorB, glowFactor);

    float glowTimeEffect = sin(uTime * 0.5) * 0.5 + 0.5;
    glowColor = mix(glowColor, glowColor * glowTimeEffect, 0.5);

    csm_DiffuseColor.rgb = glowColor;
    csm_Roughness = 5.0 - glowFactor;
    csm_Roughness = 0.1 - glowFactor;
}