**
  -- If you’re updating the current state based on the previous state, use the
  function setState. For everything else, use the object setState.
    --> The reason for this is because state updates may be asynchronous.
    There’s a lot of work happening under the hood when you call setState, so
    for React to guarantee that the state value is what you’d expect it to be,
    they have you pass them a function that receives state rather than relying
    on referencing state from the component instance. 
**


*** object setState ***

<!--
class Container extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mode: 'light'
    }

    this.handleLightMode = this.handleLightMode.bind(this);
    this.handleDarkMode = this.handleDarkMode.bind(this);
  }
  handleLightMode() {
    // Change 'mode' on the component's state to 'light'
    this.setState({
      mode: 'light'
    })
  }
  handleDarkMode() {
    // Change 'mode' on the component's state to 'dark'
    this.setState({
      mode: 'dark'
    })
  }
  render() {
    const { mode } = this.state

    return (
      <div style={{
        height: '100%',
        background: mode === 'light' ? '#fff' : '#000'
      }}>
        {mode === 'light'
          ? <button onClick={this.handleDarkMode}>Dark Mode</button>
          : <button onClick={this.handleLightMode}>Light Mode</button>}
      </div>
    )
  }
}

ReactDOM.render(
  <Container />,
  document.getElementById('app')
);
-->


*** function setState ***
<!--
class Count extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      count: 0
    }
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);

  }
  increment() {
    // Increment count by 1
    this.setState( ( {count} ) => (
      {
       count: count + 1
      }
    ))
  }
  decrement() {
    // Decrement count by 1
    this.setState( ( {count} ) => (
      {
       count: count - 1
      }
    ))
  }
  render() {
    return (
      <div>
        <button onClick={this.decrement}>-</button>
        <span>{this.state.count}</span>
        <button onClick={this.increment}>+</button>
      </div>
    )
  }
}

ReactDOM.render(
  <Count />,
  document.getElementById('app')
);
-->
