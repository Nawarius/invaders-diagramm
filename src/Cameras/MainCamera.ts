import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

class MainCamera {
    private camera: THREE.PerspectiveCamera
    private orbit: OrbitControls

    constructor (renderer: THREE.WebGLRenderer) {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.position.set(0, 0, 10)

        this.orbit = new OrbitControls(this.camera, renderer.domElement)
        this.orbit.update()
    }

    getCamera () {
        return this.camera
    }

    getOrbit () {
        return this.orbit
    }

}

export default MainCamera