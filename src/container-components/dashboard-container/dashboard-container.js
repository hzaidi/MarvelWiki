import React, { Component } 	from 'react';
import { compose } 				from 'redux';
import { connect } 				from 'react-redux';
import { withStyles } 			from '@material-ui/core/styles';
import Grid 					from '@material-ui/core/Grid';
import CharactersTeam			from '../characters-team/characters-team';

const styles = theme => ({
	container:{
		width: '90%',
		margin: '0 auto',
		padding: 20
	},
	flexBox:{
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	flexItem: {
		flexGrow: 1
	}
});

class DashboardContainer extends Component {

  	render() {
		const { classes } = this.props;
		return (
			<div className={ classes.container }>
				<Grid container spacing={24} direction="row">
					<Grid item xs={12} lg={6} md={6} className={ classes.flexBox }>
						<CharactersTeam />
					</Grid>
					<Grid item xs={12} lg={6} md={6} className={ classes.flexBox }>
					</Grid>
				</Grid>
			</div>
		);
  	}
}

const mapStateToProps = (state, props) => {

	return {

	}
}
const mapActionsToProp = {

}

export default compose(
	withStyles(styles, { name: 'DashboardContainer' }),
	connect(mapStateToProps, mapActionsToProp)
)(DashboardContainer);

