import * as THREE from 'three'
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

class TextMesh {

    public scene: THREE.Scene

    private loader: FontLoader = new FontLoader()
    private font: any = null

    private textMesh: any = null 

    public defaultPos: any = { x: 0, y: 0, z: 1.5 }

    constructor (scene: THREE.Scene) {
        this.scene = scene
    }

    async init () {
        this.font = await this.loader.loadAsync('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json')

        this._createTextMesh('Click')
        this._updateTextDimensions()
    }

    _createTextMesh (text: string) {
        if (!this.font) return
        
        const geometry = new TextGeometry(text, { font: this.font, depth: 5 })
        geometry.computeBoundingBox()

        this.textMesh = new THREE.Mesh(geometry)
        this.textMesh.name = 'textMesh'

        this.textMesh.scale.set(0.01, 0.01, 0.01)
        
        this._setDefaultPosition()
        this.scene.add(this.textMesh)
    }

    public setNewText (text: string) {
        this.textMesh.geometry.dispose()

        this.textMesh.geometry = new TextGeometry(text, { font: this.font, depth: 5 })
        this.textMesh.geometry.computeBoundingBox()

        this._setDefaultPosition()
        this._updateTextDimensions()
    }

    private _updateTextDimensions () {
        const bbox = new THREE.Box3().setFromObject(this.textMesh)
        
        const sizes = {
            width: Math.abs(bbox.min.x - bbox.max.x),
            height: Math.abs(bbox.min.y - bbox.max.y),
        }

        this.textMesh.position.x -= sizes.width / 2
        this.textMesh.position.y -= sizes.height / 2
    }

    private _setDefaultPosition () {
        const {x, y, z} = this.defaultPos
        this.textMesh.position.set(x, y, z)
    }
}

export default TextMesh