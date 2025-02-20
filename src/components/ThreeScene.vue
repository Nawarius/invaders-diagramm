<script setup>
    import MainCamera from '@/Cameras/MainCamera'
    import RingDiagramm from '@/Diagramm/RingDiagramm'
    import * as THREE from 'three'
    import { ref, onMounted } from 'vue'

    const target = ref()

    const scene = new THREE.Scene()

    const renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setAnimationLoop(animate)

    const geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
    const cube = new THREE.Mesh(geometry);
    
    const pos = new THREE.Vector3(0, 0, 0)
    cube.position.set(pos.x, pos.y, pos.z)

    scene.add(cube)

    const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 5 )
    scene.add(light)

    const MainCameraInst = new MainCamera(renderer)
    MainCameraInst.getOrbit().target = new THREE.Vector3(0, 0, 0)

    const str = '16,22,58,2,7'
    const arr = str.trim().split(',').map(item => Number(item))

    const RingDiagrammInst = new RingDiagramm(scene, arr)
    RingDiagrammInst.createSectors()

    function animate () {
        renderer.render(scene, MainCameraInst.getCamera())
        MainCameraInst.getOrbit().update()
    }

    onMounted(() => {
        target.value.appendChild(renderer.domElement)
        animate()
    })
    
</script>

<template>
    <div ref="target" id = "three_container"></div>
</template>

<style>

</style>