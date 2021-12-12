import PropTypes from 'prop-types'
import React from 'react'
import FormField from 'part:@sanity/components/formfields/default'
import PatchEvent, {set, unset} from '@sanity/form-builder/PatchEvent'
import styles from './slider.css'

export default class Slider extends React.Component {
  static propTypes = {
    type: PropTypes.shape({
      title: PropTypes.string
    }).isRequired,
    level: PropTypes.number,
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
  }

  focus () {
    this._inputElement.focus()
  }

  handleChange = event => {
    const inputValue = event.target.value
    const patch = inputValue === '' ? unset() : set(Number(inputValue))
    this.props.onChange(PatchEvent.from(patch))
  }

  render () {
    const {type, value, level} = this.props
    const title = `${type.title}: ${value}`
    const {min, max, step} = type.options.range
    return (
      <div>
        <FormField label={title} level={level} description={type.description}>
          <input
            ref={element => this._inputElement = element}
            type='range'
            className={styles.slider}
            min={min}
            max={max}
            step={step}
            value={value === undefined ? '' : value}
            onChange={this.handleChange}
          />
        </FormField>
      </div>
    )
  }
}

Slider.defaultProps = {
  level: 1,
  value: 0
}