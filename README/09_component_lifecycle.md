class App extends React.Component {
  constructor(props) {
    // Good for establishing the initial state of a component
    super(props)
    this.state = {}
  }
  componentDidMount(){
    // Invoked once the component is mounted to the DOM.
    // Good for making AJAX requests.
  }
  componentDidUpdate(){
    // Invoked immediately after updating occurs.
    // Good for AJAX requests based on changing props or DOM operations.
  }
  componentWillUnmount(){
    // Called right before a component is unmounted.
    // Good for cleaning up listeners.
  }
  render() {
    return ...
  }
}