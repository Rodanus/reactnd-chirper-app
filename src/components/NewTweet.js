import React, { Component } from "react";
import { handleAddTweet } from "../actions/tweets";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
class NewTweet extends Component {
  state = {
    text: "",
    toHome: false
  };

  handleChange = e => {
    const text = e.target.value;

    this.setState({ text });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { text } = this.state,
      { dispatch, id } = this.props;

    // todo: Add Tweet to Store
    dispatch(handleAddTweet(text, id));

    console.log(`new tweet: ${text}`);

    this.setState({ text: "", toHome: id ? false : true });
  };

  render() {
    const { text, toHome } = this.state;

    if (toHome) {
      return <Redirect to="/" />;
    }

    const tweetLeft = 280 - text.length;

    return (
      <div>
        <h3 className="center">Compose new Tweet</h3>
        <form className="new-tweet" onSubmit={this.handleSubmit}>
          <textarea
            className="textarea"
            placeholder="What's happening?"
            value={text}
            onChange={this.handleChange}
            maxLength={280}
          />
          {tweetLeft <= 100 && <div className="tweet-length">{tweetLeft}</div>}

          <button className="btn" type="submit" disabled={text === ""}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(NewTweet);
