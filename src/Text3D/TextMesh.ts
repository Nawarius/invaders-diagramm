import * as THREE from 'three'
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

class TextMesh {

    public scene: THREE.Scene

    private loader: FontLoader = new FontLoader()
    private font: any = null

    private textMesh: any = null 

    constructor (scene: THREE.Scene) {
        this.scene = scene
    }

    async init () {
        this.font = await this.loader.loadAsync('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json')

        this._createTextMesh('Click')
        this.updateTextMesh()
    }

    _createTextMesh (text: string) {
        if (!this.font) return
        
        const geometry = new TextGeometry(text, { font: this.font, depth: 5 })
        geometry.computeBoundingBox()

        this.textMesh = new THREE.Mesh(geometry)
        this.textMesh.position.set(0, 0, 0)
        this.textMesh.scale.set(0.01, 0.01, 0.01)
        this.textMesh.name = 'textMesh'

        this.scene.add(this.textMesh)
    }

    updateTextMesh () {
        const bbox = new THREE.Box3().setFromObject(this.textMesh)
        
        const sizes = {
            width: Math.abs(bbox.min.x - bbox.max.x),
            height: Math.abs(bbox.min.y - bbox.max.y),
        }

        this.textMesh.position.x -= sizes.width / 2
        this.textMesh.position.y -= sizes.height / 2
    }
}

export default TextMesh