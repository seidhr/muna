// React is installed in the studio and should be treated as a peer dependency
import React from 'react'
import { SeidhrIcon } from '@seidhr/react-muna-logo/'


// We recommend using SVGs as they have both a small footprint and scale well
const Logo = () => (
  <SeidhrIcon style={{ display: 'block' }} width="100%" height="100%" />
)

export default Logo
