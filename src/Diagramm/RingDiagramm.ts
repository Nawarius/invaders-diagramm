import * as THREE from 'three'

class RingDiagramm {

    public colors: any = []
    public meshes: Array<any> = []

    public sectorsCount: number = 0
    public diagrammNumbersArr: Array<number> = []

    private segments: number = 128
    private outerRadius: number = 5
    private innerRadius: number = 3

    public scene: THREE.Scene

    constructor (scene: THREE.Scene, diagrammNumbersArr: Array<number>) {
        this.scene = scene
        this.diagrammNumbersArr = diagrammNumbersArr
        this.sectorsCount = diagrammNumbersArr.length

        this.colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff]
    }

    createSectors () {
        for (let i = 0; i < this.sectorsCount; i++) {
            const startAngle = (i / this.sectorsCount) * Math.PI * 2
            const endAngle = ((i + 1) / this.sectorsCount) * Math.PI * 2

            const sector = this._createSectorMesh(startAngle, endAngle, this.colors[i])
            sector.name = `Sector_${i}`
            sector.userData.sectorArrNumber = this.diagrammNumbersArr[i]

            this.scene.add(sector)
        }
    }

    private _createSectorMesh (startAngle: number, endAngle: number, color: any) {
        const sectorShape = new THREE.Shape()

        for (let i = 0; i <= this.segments; i++) {
            const angle = startAngle + (i / this.segments) * (endAngle - startAngle)
            const x = Math.cos(angle) * this.outerRadius
            const y = Math.sin(angle) * this.outerRadius

            if (i === 0) sectorShape.moveTo(x, y)
            else sectorShape.lineTo(x, y)
        }

        for (let i = 0; i <= this.segments; i++) {
            const angle = endAngle - (i / this.segments) * (endAngle - startAngle)
            const x = Math.cos(angle) * this.innerRadius
            const y = Math.sin(angle) * this.innerRadius

            sectorShape.lineTo(x, y)
        }

        const extrudeSettings = { depth: 1, bevelEnabled: false }
        const geometry = new THREE.ExtrudeGeometry(sectorShape, extrudeSettings)

        const material = new THREE.MeshStandardMaterial({ color })

        const sectorMesh = new THREE.Mesh(geometry, material)
        this.meshes.push(sectorMesh)

        return sectorMesh
    }

    removeSectors () {
        for (let mesh of this.meshes) {
            mesh.geometry.dispose()
            mesh.material.dispose()
            this.scene.remove(mesh)
        }

        this.meshes = []
    }

}

export default RingDiagramm