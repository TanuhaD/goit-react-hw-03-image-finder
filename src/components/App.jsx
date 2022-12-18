import { nanoid } from 'nanoid';
import React, { Component } from 'react';
import { Searchbar, ImageGallery, ImageGalleryItem } from './';

export class App extends Component {
  state = {
    query: '',
  };

  componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {}

  setQuery = query => {
    this.setState({ query });
  };

  render() {
    return (
      <div>
        <Searchbar setQuery={this.setQuery} />
        <ImageGallery query={this.state.query} />
      </div>
    );
  }
}

export default App;
