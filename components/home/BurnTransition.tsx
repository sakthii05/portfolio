// components/BurnTransition.tsx
// PaperFire.tsx
"use client";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0); // Directly map to screen space [-1, 1]
  }
`;

const fragmentShader = `
  uniform float uProgress;
  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    float n = noise(vUv * 8.0);
    n += noise(vUv * 16.0) * 0.5;
    n += noise(vUv * 32.0) * 0.25;
    n /= 1.75;

    float burn = smoothstep(uProgress - 0.1, uProgress, n);
    float edge = smoothstep(uProgress - 0.05, uProgress, n) - burn;

    vec3 black = vec3(0.0);
    vec3 orange = vec3(1.0, 0.3, 0.0);
    vec3 red = vec3(0.8, 0.1, 0.0);

    vec3 edgeColor = mix(red, orange, edge * 4.0);
    vec3 finalColor = mix(black, edgeColor, edge * 6.0);

    float alpha = 1.0 - burn;

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

function BurnPlane({ progress }: { progress: number }) {
  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uProgress: { value: progress },
        }}
        transparent
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function BurnTransition({ progress = 0 }: { progress: number }) {
  return (
    <div className="fixed inset-0 z-30 pointer-events-none">
      <Canvas style={{ width: "100%", height: "100%" }}>
        <BurnPlane progress={progress} />
      </Canvas>
    </div>
  );
}