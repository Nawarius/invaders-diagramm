<script setup>
import ThreeScene from './components/ThreeScene.vue'
import { ref } from 'vue'
import { isEmptyInput, isValidInput } from './utils/input.utils'

const inputVal = ref('')
const inputRef = ref(null)

const numbersArr = ref([])
const toggleButton = ref(false)

function onChangeInput () {
    if (!inputRef.value) return

    const str = inputRef.value.value
    const isValid = isValidInput(str)

    if (!isValid) {
        inputRef.value.value = str.slice(0, -1)
        return
    }

    inputVal.value = inputRef.value.value
}

function recreateDiagramm () {
    const isEmpty = isEmptyInput(inputVal.value)

    if (isEmpty) {
        numbersArr.value = []
    } else {
        const arr = inputVal.value.split(',').map(item => Number(item))
        numbersArr.value = arr
    }

    toggleButton.value = !toggleButton.value
}

</script>

<template>
    <div class = 'input_class'>
        <input :value = "inputVal" @input="onChangeInput" ref = "inputRef" />
        <button @click="recreateDiagramm">Пуск</button>
    </div>
    <ThreeScene :numbersArr = "numbersArr" :toggleButton = "toggleButton" />
</template>

<style>
.input_class {
    position: absolute;
    top: 0px;
    left: 0px;
}
* {
    margin: 0px;
    padding: 0px;
}
#app {
    width: 100%;
    height: 100%;
}
html {
    width: 100%;
    height: 100%;
}
body {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
