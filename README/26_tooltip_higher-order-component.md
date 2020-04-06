*** 
Our issue is that we have completely coupled our mouseOver and mouseOut logic (hovering logic) to our tooltip. What that means is that if we wanted to add this hovering logic anywhere in our application, whether it's for another type of tooltip or an image gallery, then again what we would have to do is to duplicate this logic over to that new component. Our problem right now is that we are coupling our hovering logic in Tooltip component. What we want to do is to decouple those two things. So that anywhere in our application we want to use the hovering logic we can use it without any duplication.
***

# withHover.js #
<!--
import React from 'react'

export default function withHover (Component, propName = 'hovering') {
  return class WithHover extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        hovering: false,
      }

      this.mouseOver = this.mouseOver.bind(this)
      this.mouseOut = this.mouseOut.bind(this)
    }
    mouseOver() {
      this.setState({
        hovering: true
      })
    }
    mouseOut() {
      this.setState({
        hovering: false
      })
    }
    render () {
      console.log('WithHover props : ', this.props)
        
      const props = {
        [propName]: this.state.hovering,
        ...this.props
      }

      return (
        <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
          <Component {...props} />
        </div>
      )
    }
  }
}
-->

# Tooltip.js #
<!--
import React from 'react'
import PropTypes from 'prop-types'
import withHover from './withHover'

const styles = {
  container: {
    position: 'relative',
    display: 'flex'
  },
  tooltip: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '160px',
    bottom: '100%',
    left: '50%',
    marginLeft: '-80px',
    borderRadius: '3px',
    backgroundColor: 'hsla(0, 0%, 20%, 0.9)',
    padding: '7px',
    marginBottom: '5px',
    color: '#fff',
    textAlign: 'center',
    fontSize: '14px',
  }
}

function Tooltip ({ text, children, hovering }) {
  return (
    <div style={styles.container}>
      {hovering === true && <div style={styles.tooltip}>{text}</div>}
      {children}
    </div>
  )
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  hovering: PropTypes.bool.isRequired,
}

export default withHover(Tooltip)
-->