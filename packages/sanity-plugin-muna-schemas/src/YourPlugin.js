import React from 'react'
import PropTypes from 'prop-types'

const MyPlugin = (props) => {
  return <div>This is a {props.thing}!</div>
}

MyPlugin.propTypes = {
  thing: PropTypes.string,
}

MyPlugin.defaultProps = {
  thing: 'plugin',
}

export default MyPlugin