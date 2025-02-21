<script setup>
    import MainCamera from '@/Cameras/MainCamera'
    import RingDiagramm from '@/Diagramm/RingDiagramm'
    import RingRaycaster from '@/Raycast/RingRaycaster'
    import TextMesh from '@/Text3D/TextMesh'
    import * as THREE from 'three'
    import { ref, onMounted, watch } from 'vue'

    const props = defineProps({
        numbersArr: Array,
        toggleButton: Boolean
    })

    const target = ref()

    const scene = new THREE.Scene()

    const renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setAnimationLoop(animate)

    const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 5 )
    scene.add(light)

    const MainCameraInst = new MainCamera(renderer)
    MainCameraInst.getOrbit().target = new THREE.Vector3(0, 0, 0)

    const str = '16,22,58,2,7'
    const arr = str.trim().split(',').map(item => Number(item))

    const RingDiagrammInst = new RingDiagramm(scene)
    RingDiagrammInst.createSectors(arr)

    const TextMeshInst = new TextMesh(scene)
    TextMeshInst.init()

    const RingRaycasterInst = new RingRaycaster(scene)
    RingRaycasterInst.onClickSector.add(sectorMesh => {
        const sectorArrNumber = sectorMesh.userData.sectorArrNumber

        TextMeshInst.setNewText(sectorArrNumber.toString())
    })

    window.addEventListener('pointerdown', e => {
        RingRaycasterInst.checkIntersects(e, MainCameraInst.getCamera())
    })

    function animate () {
        renderer.render(scene, MainCameraInst.getCamera())
        MainCameraInst.getOrbit().update()
    }

    onMounted(() => {
        target.value.appendChild(renderer.domElement)
        animate()
    })

    watch(() => props.toggleButton, () => {
        if (!props.numbersArr.length) TextMeshInst.setNewText('Oh no, so sad :(')
        else TextMeshInst.setNewText('Click')

        RingDiagrammInst.removeSectors()
        RingDiagrammInst.createSectors(props.numbersArr)
    })

</script>

<template>
    <div ref="target" id = "three_container"></div>
</template>

<style>

</style>