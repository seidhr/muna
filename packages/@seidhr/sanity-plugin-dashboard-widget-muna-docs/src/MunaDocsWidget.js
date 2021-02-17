import React from 'react'
import styles from './MunaDocs.css'
import {SeidhrLogo} from '@seidhr/react-muna-logo'

const MunaDocsWidget = (props) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>ᛗᚢᚾᚨ | MUNA</h2>
      </header>
      <div className={styles.content}>
        <SeidhrLogo style={{display: 'block', margin: 'auto'}} width="8em" height="8em" />
        <p>
          Muna or ᛗᚢᚾᚨ means remember in norse. Muna is a schema for Sanity that
          enables detailed descriptions of cultural heritage objects and knowledge about their
          contexts. Muna is based on the <a href="https://cidoc-crm.org/" target="_blank">CIDOC-CRM model</a> 
          and <a href="https://linked.art/" target="_blank">linked.art</a>.
        </p>
        <p>
          <a href="https://muna.xyz/docs/model/introduction" target="_blank">
            Muna documentation
          </a>
        </p>
      </div>
    </div>
  )
}

export default MunaDocsWidget
