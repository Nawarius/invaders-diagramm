<script setup>
    import * as THREE from 'three'
    import { ref, onMounted } from 'vue'

    const target = ref()

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setAnimationLoop(animate)

    const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 )
    scene.add(light)

    function animate () {
        renderer.render(scene, camera)
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