import Registry from '@/Registry.js' 

import * as THREE from 'three'

class Camera
{
    constructor(_options)
    {
        // Options
        this.engine = new Registry.Engine.Engine()
        this.view = new Registry.View.View()
        this.scene = this.view.scene
        this.viewport = this.engine.viewport

        this.setInstance()
    }

    setInstance()
    {
        // Set up
        this.instance = new THREE.PerspectiveCamera(45, this.viewport.width / this.viewport.height, 0.1, 5000)
        this.instance.rotation.reorder('YXZ')

        this.scene.add(this.instance)
    }

    resize()
    {
        this.instance.aspect = this.viewport.width / this.viewport.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        const playerSate = this.engine.player

        // Apply coordinates from view
        this.instance.position.set(playerSate.view.position[0], playerSate.view.position[1], playerSate.view.position[2])
        this.instance.quaternion.set(playerSate.view.quaternion[0], playerSate.view.quaternion[1], playerSate.view.quaternion[2], playerSate.view.quaternion[3])
        // this.instance.updateMatrixGame() // To be used in projection
    }

    destroy()
    {
    }
}

Registry.register('View', 'Camera', Camera)
export default Camera