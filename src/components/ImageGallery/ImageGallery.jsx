import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import fetchPictures from '../../utils/fetchAPI';
import { Circles } from 'react-loader-spinner';
import Modal from '../Modal/Modal';
import { IMAGES_PER_PAGE } from '../../utils/constants';

export class ImageGallery extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
  };

  state = {
    images: [],
    page: 1,
    loading: false,
    totalPages: 1,
    isModalShown: false,
    modalImgUrl: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      this.setState({ loading: true });
      const data = await fetchPictures(this.props.query, 1);
      this.setState({
        images: [...data.hits],
        page: 1,
        loading: false,
        totalPages: Math.ceil(data.totalHits / IMAGES_PER_PAGE),
      });
    } else if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.setState({ loading: true });
      const data = await fetchPictures(this.props.query, this.state.page);
      this.setState({
        images: [...prevState.images, ...data.hits],
        loading: false,
      });
    }
  }

  nextPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onImageClick = imageId => {
    this.setState({
      isModalShown: true,
      modalImgUrl: this.state.images.find(({ id }) => id === imageId)
        .largeImageURL,
    });
  };

  modalClose = () => {
    this.setState({ isModalShown: false });
  };

  render() {
    return (
      <>
        {this.state.loading && (
          <Circles
            height="300"
            width="300"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass="spinner"
            visible={true}
          />
        )}

        <ul className="ImageGallery">
          {this.state.images.map(image => (
            <ImageGalleryItem
              key={image.id}
              id={image.id}
              img={image.webformatURL}
              onImageClick={this.onImageClick}
            />
          ))}
        </ul>
        {this.state.images.length > 0 &&
          this.state.page !== this.state.totalPages && (
            <button type="button" onClick={this.nextPage}>
              Load More
            </button>
          )}
        {this.state.isModalShown && (
          <Modal onClose={this.modalClose}>
            <img src={this.state.modalImgUrl} alt="" />
          </Modal>
        )}
      </>
    );
  }
}

export default ImageGallery;
