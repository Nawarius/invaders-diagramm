import * as THREE from 'three'

class RingRaycaster {

    private raycaster: THREE.Raycaster = new THREE.Raycaster()
    private pointer: THREE.Vector2 = new THREE.Vector2()

    public scene: THREE.Scene

    public onClickSector: Set<any> = new Set()

    constructor (scene: THREE.Scene) {
        this.scene = scene
    }

    checkIntersects (e: PointerEvent, camera: THREE.PerspectiveCamera) {
        this.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
        this.pointer.y = - (e.clientY / window.innerHeight) * 2 + 1

        this.raycaster.setFromCamera(this.pointer, camera)

        const intersects = this.raycaster.intersectObjects(this.scene.children)
        const isSectors = !!intersects.filter(i => i.object.name.includes('Sector_')).length
        
        if (!isSectors) return

        for (let intersect of intersects) this._notifyOnClickSector(intersect.object)
    }

    private _notifyOnClickSector (intersectObject: any) {
        for (let cb of this.onClickSector) cb(intersectObject)
    }
}

export default RingRaycaster