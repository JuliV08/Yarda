import { useEffect, useRef } from 'react'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  SphereGeometry,
  MeshBasicMaterial,
  ShaderMaterial,
  Mesh,
  Color,
  AdditiveBlending,
  BackSide,
  AmbientLight,
} from 'three'

/* ─── Brand colors ─── */
const BRAND_COLORS = [
  new Color(0x42cad7), // accent-cyan
  new Color(0x33cc66), // accent-green
  new Color(0x4080e8), // accent-blue
]

/* ─── Shaders ─── */
const ATMOSPHERE_VERTEX = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const ATMOSPHERE_FRAGMENT = `
  uniform vec3 glowColor;
  varying vec3 vNormal;
  void main() {
    float intensity = pow(0.45 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
    gl_FragColor = vec4(glowColor, 0.35) * intensity;
  }
`

export default function Orb3D({ className = '' }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const container = mountRef.current
    const width = container.clientWidth
    const height = container.clientHeight
    if (width === 0 || height === 0) return

    /* ── Scene setup ── */
    const scene = new Scene()
    const camera = new PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 10

    const renderer = new WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    /* ── Atmospheric glow (outer halo) ── */
    const atmosGeo = new SphereGeometry(5.4, 32, 32)
    const atmosMat = new ShaderMaterial({
      vertexShader: ATMOSPHERE_VERTEX,
      fragmentShader: ATMOSPHERE_FRAGMENT,
      blending: AdditiveBlending,
      side: BackSide,
      transparent: true,
      uniforms: {
        glowColor: { value: BRAND_COLORS[0].clone() },
      },
    })
    const atmosMesh = new Mesh(atmosGeo, atmosMat)
    scene.add(atmosMesh)

    /* ── Second glow layer (softer, bigger) ── */
    const outerGlowGeo = new SphereGeometry(6.2, 24, 24)
    const outerGlowMat = new ShaderMaterial({
      vertexShader: ATMOSPHERE_VERTEX,
      fragmentShader: ATMOSPHERE_FRAGMENT,
      blending: AdditiveBlending,
      side: BackSide,
      transparent: true,
      uniforms: {
        glowColor: { value: BRAND_COLORS[0].clone() },
      },
    })
    const outerGlowMesh = new Mesh(outerGlowGeo, outerGlowMat)
    outerGlowMesh.scale.setScalar(1.15)
    scene.add(outerGlowMesh)

    /* ── Wireframe globe (blueprint aesthetic) ── */
    const wireGeo = new SphereGeometry(5, 40, 40)
    const wireMat = new MeshBasicMaterial({
      color: BRAND_COLORS[0].clone(),
      wireframe: true,
      transparent: true,
      opacity: 0.38,
    })
    const wireGlobe = new Mesh(wireGeo, wireMat)
    scene.add(wireGlobe)

    /* ── Inner wireframe (second layer for depth) ── */
    const innerWireGeo = new SphereGeometry(4.2, 24, 24)
    const innerWireMat = new MeshBasicMaterial({
      color: BRAND_COLORS[0].clone(),
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    })
    const innerWire = new Mesh(innerWireGeo, innerWireMat)
    scene.add(innerWire)

    /* ── Subtle inner solid core (removed — was washing out wireframe lines) ── */

    /* ── Ambient light ── */
    scene.add(new AmbientLight(0xffffff, 0.3))

    /* ── Color cycling ── */
    let colorIdx = 0
    let nextIdx = 1
    let colorT = 0
    const colorSpeed = 0.003
    const currentColor = new Color()

    /* ── Animation loop ── */
    let animationId: number

    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Cycle brand colors
      colorT += colorSpeed
      if (colorT >= 1) {
        colorT = 0
        colorIdx = nextIdx
        nextIdx = (nextIdx + 1) % BRAND_COLORS.length
      }

      currentColor.lerpColors(BRAND_COLORS[colorIdx], BRAND_COLORS[nextIdx], colorT)

      wireMat.color.copy(currentColor)
      innerWireMat.color.copy(currentColor)
      atmosMat.uniforms.glowColor.value.copy(currentColor)
      outerGlowMat.uniforms.glowColor.value.copy(currentColor)

      // Auto-rotate (respects reduced motion)
      if (!prefersReducedMotion) {
        wireGlobe.rotation.y += 0.0018
        wireGlobe.rotation.x += 0.0004
        innerWire.rotation.y -= 0.001
        innerWire.rotation.x += 0.0003
        atmosMesh.rotation.y += 0.0008
        outerGlowMesh.rotation.y += 0.0005
      }

      renderer.render(scene, camera)
    }
    animate()

    /* ── Resize ── */
    const handleResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      if (w === 0 || h === 0) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    /* ── Cleanup ── */
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      renderer.dispose()
      wireGeo.dispose()
      wireMat.dispose()
      innerWireGeo.dispose()
      innerWireMat.dispose()
      atmosGeo.dispose()
      atmosMat.dispose()
      outerGlowGeo.dispose()
      outerGlowMat.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} className={`h-full w-full ${className}`} />
}
