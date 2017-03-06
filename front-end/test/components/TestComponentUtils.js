import React from 'react'
import TestUtils from 'react-addons-test-utils'

const renderer = TestUtils.createRenderer()
export default function getRenderOutput(componentViaProps) {
  renderer.render(componentViaProps)
  return renderer.getRenderOutput()
}
