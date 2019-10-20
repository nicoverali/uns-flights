
class login extends React.Component {

}

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    /* return React.createElement('button', { onClick: () => this.setState({ liked: true }) }, 'Like'); */

    return (
      <button onClick={() => this.setState({ liked: true })}>
          Like
        <p>Hola que tal Juan Jose?</p>
      </button>
    );
  }
}

const domContainer = document.getElementById('like_button_container');
ReactDOM.render(React.createElement(LikeButton), domContainer);
