const faceActions = [
  {
    label: 'Front',
    value: 'F'
  },
  {
    label: 'Back',
    value: 'B'
  },
  {
    label: 'Left',
    value: 'L'
  },
  {
    label: 'Right',
    value: 'R'
  },
  {
    label: 'Up',
    value: 'U'
  },
  {
    label: 'Down',
    value: 'D'
  },
  // {
  //   label: 'Middle',
  //   value: 'M'
  // }
]

const magicCubeActions = [
  { label: 'RotateX', value: 'x' },
  { label: 'RotateY', value: 'y' },
  { label: 'RotateZ', value: 'z' },
]

function renderUIActions({ faceHandler, magicCubeHandler }) {
  const container = document.getElementById('ui-actions');
  renderMagicCubeActions(container.querySelector('.magic-cube-actions'), magicCubeHandler);
  renderFaceActions(container.querySelector('.face-actions'), faceHandler);
}

function renderFaceActions(container, handler) {
  container.innerHTML = [...faceActions, ...faceActions?.map(({ label, value }) => ({
    label: `${label}'`,
    value: `${value}`,
    direction: -1
  }))].map(({ label, value, direction }) => `<li data-value="${value}" data-direction="${direction ?? 1}">
  ${label}
</li>`).join('\n')

  container.addEventListener('click', event => {
    const { srcElement } = event
    if (srcElement.nodeName === 'LI') {
      handler?.(srcElement.getAttribute('data-value'), srcElement.getAttribute('data-direction'))
    }
  })
}

function renderMagicCubeActions(container, handler) {
  container.innerHTML = [...magicCubeActions, ...magicCubeActions?.map(({ label, value }) => ({
    label: `${label}'`,
    value: `${value}`,
    direction: -1
  }))].map(({ label, value, direction }) => `<li data-value="${value}" data-direction="${direction ?? 1}">
  ${label}
</li>`).join('\n')

  container.addEventListener('click', event => {
    const { srcElement } = event
    if (srcElement.nodeName === 'LI') {
      handler?.(srcElement.getAttribute('data-value'), srcElement.getAttribute('data-direction'))
    }
  })
}