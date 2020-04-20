import React, { Component } from "react";
import T from "prop-types";

class SeacrhBar extends Component {
  static propTypes = {
    onSubmit: T.func.isRequired,
  };

  state = {
    value: "",
  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const { value } = this.state;
    onSubmit(value);
    this.setState({
      value: "",
    });
  };

  render() {
    const { value } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input value={value} onChange={this.handleChange} />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default SeacrhBar;
