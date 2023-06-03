import { Color } from "@/ts/draw-mode/Theme"
import { Bodies, Body, Engine } from "matter-js"
import * as EndCondition from "@/ts/draw-mode/EndCondition"
import type { LevelSpec } from "@/ts/draw-mode/Level"

const level: LevelSpec = {
  generateBodies(engine: Engine, onEnd: () => any) {

    const target = Bodies.circle(30, 30, 20)

    const ramp = Body.create({
      isStatic: true,
      parts: [
        Bodies.rectangle(25, 100, 50, 10),
        Bodies.rectangle(135, 147.5, 200, 10, {
          angle: 0.5
        }),
        Bodies.rectangle(500, 400, 300, 10, {
          angle: 0.5
        })
      ]
    })

    const noDraw = {
      body: Bodies.rectangle(400, 350, 800, 500, {
        isStatic: true,
        collisionFilter: {
          category: 2,
          mask: 2,
        }
      }),
      color: Color.NO_DRAW,
      opacity: 0.2
    }

    EndCondition.onCondition(engine, () => target.position.x > 820, onEnd)

    return [
      ramp,
      noDraw,
      { body: target, color: Color.TARGET }
    ]
  },
  id: 'NoDrawRamp',
  text: "<p>Make the ball fall off the right side</p>"
}

export default level