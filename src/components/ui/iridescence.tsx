import { Renderer, Program, Mesh, Color, Triangle } from "ogl";
import { useEffect, useRef } from "react";

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
#ifdef GL_ES
precision highp float;
#endif

uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;  
uniform vec3 uColor3;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

vec3 mixColors(vec3 color1, vec3 color2, vec3 color3, float t) {
  t = clamp(t, 0.0, 1.0);
  if (t < 0.5) {
    return mix(color1, color2, t * 2.0);
  } else {
    return mix(color2, color3, (t - 0.5) * 2.0);
  }
}

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;
  
  uv += (uMouse - vec2(0.5)) * uAmplitude;
  
  // Create the flowing iridescence effect
  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  for (float i = 0.0; i < 8.0; ++i) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
  }
  d += uTime * 0.5 * uSpeed;
  
  // Create base gradient that preserves your colors
  float gradientT = 1.0 - vUv.y;
  vec3 baseColor = mixColors(uColor1, uColor2, uColor3, gradientT);
  
  // Create subtle iridescence overlay instead of multiplication
  float iridescenceIntensity = sin(d + a) * 0.15 + 1.0;
  vec3 iridescenceShift = vec3(
    cos(d) * 0.05,
    cos(a) * 0.05,
    cos(d + a) * 0.05
  );
  
  // Apply iridescence as additive color shift rather than multiplication
  vec3 finalColor = baseColor * iridescenceIntensity + iridescenceShift;
  
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

interface IridescenceProps {
	speed?: number;
	amplitude?: number;
	mouseReact?: boolean;
	topColor?: [number, number, number];
	middleColor?: [number, number, number];
	bottomColor?: [number, number, number];
}

export default function Iridescence({
	speed = 0.8,
	amplitude = 0.15,
	mouseReact = true,
	topColor = [0.831, 0.847, 0.953], // Light lavender #D4D8F3
	middleColor = [0.976, 0.973, 0.988], // Soft cream #F9F8FC
	bottomColor = [0.576, 0.651, 0.89], // Periwinkle #93A6E3
	...rest
}: IridescenceProps) {
	const ctnDom = useRef<HTMLDivElement>(null);
	const mousePos = useRef({ x: 0.5, y: 0.5 });

	useEffect(() => {
		if (!ctnDom.current) return;
		const ctn = ctnDom.current;
		const renderer = new Renderer();
		const gl = renderer.gl;
		gl.clearColor(1, 1, 1, 1);

		let program: Program;

		function resize() {
			const scale = 1;
			renderer.setSize(ctn.offsetWidth * scale, ctn.offsetHeight * scale);
			if (program) {
				program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height];
			}
		}
		window.addEventListener("resize", resize, false);
		resize();

		const geometry = new Triangle(gl);

		try {
			program = new Program(gl, {
				vertex: vertexShader,
				fragment: fragmentShader,
				uniforms: {
					uTime: { value: 0 },
					uColor1: { value: [topColor[0], topColor[1], topColor[2]] },
					uColor2: { value: [middleColor[0], middleColor[1], middleColor[2]] },
					uColor3: { value: [bottomColor[0], bottomColor[1], bottomColor[2]] },
					uResolution: { value: [gl.canvas.width, gl.canvas.height] },
					uMouse: { value: [mousePos.current.x, mousePos.current.y] },
					uAmplitude: { value: amplitude },
					uSpeed: { value: speed },
				},
			});
		} catch (error) {
			console.error("Shader compilation error:", error);
			return;
		}

		const mesh = new Mesh(gl, { geometry, program });
		let animateId: number;

		function update(t: number) {
			animateId = requestAnimationFrame(update);
			program.uniforms.uTime.value = t * 0.001;
			renderer.render({ scene: mesh });
		}
		animateId = requestAnimationFrame(update);
		ctn.appendChild(gl.canvas);

		function handleMouseMove(e: MouseEvent) {
			if (!mouseReact) return;
			const rect = ctn.getBoundingClientRect();
			const x = (e.clientX - rect.left) / rect.width;
			const y = 1.0 - (e.clientY - rect.top) / rect.height;
			mousePos.current = { x, y };
			program.uniforms.uMouse.value = [x, y];
		}

		if (mouseReact) {
			ctn.addEventListener("mousemove", handleMouseMove);
		}

		return () => {
			cancelAnimationFrame(animateId);
			window.removeEventListener("resize", resize);
			if (mouseReact) {
				ctn.removeEventListener("mousemove", handleMouseMove);
			}
			if (ctn.contains(gl.canvas)) {
				ctn.removeChild(gl.canvas);
			}
			gl.getExtension("WEBGL_lose_context")?.loseContext();
		};
	}, [speed, amplitude, mouseReact, topColor, middleColor, bottomColor]);

	return <div ref={ctnDom} className="w-full h-full" {...rest} />;
}
