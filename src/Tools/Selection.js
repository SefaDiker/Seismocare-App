import React from 'react'

function Selection(props) {
  const { 
    selectedOption,
    onChangeSelection,
  } = props

  return (
    <div>
      <select value={selectedOption} onChange={onChangeSelection}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
      </select>
    </div>
  )
}

export default Selection;