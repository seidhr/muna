// React is installed in the studio and should be treated as a peer dependency
import React from 'react'
import {SeidhrIcon} from '@seidhr/react-muna-logo'
import styles from './Logo.css'

// We recommend using SVGs as they have both a small footprint and scale well
// const Logo = () => 'ᛗᚢᚾᚨ'
const Logo = () => (
  <div>
    <SeidhrIcon className={styles.logo} /> seidhr-test-studio
  </div>
)

export default Logo
