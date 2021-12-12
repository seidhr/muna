import React from 'react'
import PropTypes from 'prop-types'
import { FaExternalLinkAlt } from 'react-icons/fa'

const ExternalLinkRenderer = props => (
  <span>
    {props.children} <FaExternalLinkAlt />
  </span>
)

ExternalLinkRenderer.propTypes = {
  children: PropTypes.node.isRequired
}

export default ExternalLinkRenderer