import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Carousel from 'nuka-carousel';


const styles = theme => ({
	container: {

	}
});


const ImageSlider = (props) => {
	const { classes, imagesUrl } = props;
	let _handleLoadImage = () => {
		this.carousel.setDimensions()
	}
	return (
		<div className={ classes.container }>
			 <Carousel autoplay={ imagesUrl.length === 1 ? false : true }
				 ref={c => this.carousel = c}
				 speed={ 300 }
				 easing="easeQuadInOut"
				 framePadding="0 20px"
				 wrapAround={ imagesUrl.length === 1 ? false : true }>
				{
					imagesUrl.map((url, index) => {
						return <img key={ index } src={ url } onLoad={_handleLoadImage} />
					})
				}
			</Carousel>
		</div>
	)
}


ImageSlider.propTypes = {
	classes: PropTypes.object.isRequired,
	imagesUrl: PropTypes.array.isRequired
  };

  export default withStyles(styles)(ImageSlider);