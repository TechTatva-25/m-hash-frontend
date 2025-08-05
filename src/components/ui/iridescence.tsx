import { Renderer, Program, Mesh, Triangle } from "ogl";
import { useEffect, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";

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
  
  // Enhanced flowing iridescence effect for royal green theme
  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  for (float i = 0.0; i < 10.0; ++i) {
    a += cos(i - d - a * uv.x * 1.2);
    d += sin(uv.y * i + a * 0.8);
  }
  d += uTime * 0.5 * uSpeed;
  
  // Create enhanced gradient with more depth
  float gradientT = smoothstep(0.0, 1.0, 1.0 - vUv.y);
  vec3 baseColor = mixColors(uColor1, uColor2, uColor3, gradientT);
  
  // Enhanced glassmorphism iridescence with royal green undertones
  float iridescenceIntensity = sin(d + a) * 0.25 + 1.0;
  vec3 iridescenceShift = vec3(
    cos(d * 0.8) * 0.08,
    cos(a * 1.2) * 0.12,
    cos(d + a * 0.6) * 0.10
  );
  
  // Add depth and glassy effect
  float depthFactor = 1.0 + sin(d * 0.3 + a * 0.4) * 0.1;
  vec3 glassEffect = baseColor * depthFactor;
  
  // Apply royal green iridescence as additive overlay
  vec3 finalColor = glassEffect * iridescenceIntensity + iridescenceShift;
  
  // Add subtle edge enhancement for glassmorphism
  float edgeGlow = smoothstep(0.0, 0.1, vUv.x) * smoothstep(0.0, 0.1, 1.0 - vUv.x) *
                   smoothstep(0.0, 0.1, vUv.y) * smoothstep(0.0, 0.1, 1.0 - vUv.y);
  finalColor += edgeGlow * 0.05;
  
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
	darkTopColor?: [number, number, number];
	darkMiddleColor?: [number, number, number];
	darkBottomColor?: [number, number, number];
}

export default function Iridescence({
	speed = 0.8,
	amplitude = 0.15,
	mouseReact = true,
	// Light mode colors - Original
	topColor = [0.941, 1.0, 0.961], // Light green #F0FDF5
	middleColor = [0.863, 0.988, 0.906], // Soft green cream #DCF9E7
	bottomColor = [0.565, 0.859, 0.651], // Royal green #90DBA6
	// Dark mode colors - Deep Royal Green theme
	darkTopColor = [0.008, 0.071, 0.016], // Very dark green #021204
	darkMiddleColor = [0.012, 0.125, 0.129], // Dark royal green #032021
	darkBottomColor = [0.180, 0.800, 0.443], // Bright royal green #2ECC71
	...rest
}: IridescenceProps) {
	const { theme } = useTheme();
	const isDark = theme === "dark";
	const ctnDom = useRef<HTMLDivElement>(null);
	const mousePos = useRef({ x: 0.5, y: 0.5 });

	// Select colors based on theme
	const currentTopColor = isDark ? darkTopColor : topColor;
	const currentMiddleColor = isDark ? darkMiddleColor : middleColor;
	const currentBottomColor = isDark ? darkBottomColor : bottomColor;

	useEffect(() => {
		if (!ctnDom.current) return;
		const ctn = ctnDom.current;
		const renderer = new Renderer();
		const gl = renderer.gl;
		
		// Set clear color based on theme
		if (isDark) {
			gl.clearColor(0.0, 0.196, 0.129, 1); // Deep green #003221
		} else {
			gl.clearColor(1, 1, 1, 1); // White
		}

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
					uColor1: { value: [currentTopColor[0], currentTopColor[1], currentTopColor[2]] },
					uColor2: { value: [currentMiddleColor[0], currentMiddleColor[1], currentMiddleColor[2]] },
					uColor3: { value: [currentBottomColor[0], currentBottomColor[1], currentBottomColor[2]] },
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
	}, [speed, amplitude, mouseReact, currentTopColor, currentMiddleColor, currentBottomColor, isDark]);

	return <div ref={ctnDom} className="w-full h-full" {...rest} />;
}
