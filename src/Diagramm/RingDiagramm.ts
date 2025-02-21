import * as THREE from 'three'

class RingDiagramm {

    public colors: Array<any> = []
    public meshes: Array<any> = []

    private segments: number = 128
    private outerRadius: number = 5
    private innerRadius: number = 3

    public scene: THREE.Scene

    constructor (scene: THREE.Scene) {
        this.scene = scene
    }

    createSectors (diagrammArr: Array<number>) {
        const sectorsCount = diagrammArr.length
        this._createRandomColors(sectorsCount)

        for (let i = 0; i < sectorsCount; i++) {
            const startAngle = (i / sectorsCount) * Math.PI * 2
            const endAngle = ((i + 1) / sectorsCount) * Math.PI * 2

            const sector = this._createSectorMesh(startAngle, endAngle, this.colors[i])
            sector.name = `Sector_${i}`
            sector.userData.sectorArrNumber = diagrammArr[i]

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
        this.colors = []
    }

    private _createRandomColors (colorsCount: number) {
        for (let i = 0; i < colorsCount; i++) {
            const r = Math.random()
            const g = Math.random()
            const b = Math.random()

            this.colors.push(new THREE.Color(r, g, b))
        }
    }

}

export default RingDiagramm