import React, { Component } from "react";
import styles from './style.scss';

export default class Progress extends Component {

	constructor(props) {
		super(props);
		this.state = {
			progress: props.progress / 1000
		};
		this.updateProgress();
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ progress: nextProps.progress / 1000 });
	}

	updateProgress() {
		setTimeout(() => {
			if (this.props.isPlaying) {
				this.setState({ progress: this.state.progress + 0.5 });
			}
			this.updateProgress();
		}, 500);
	}

	render() {
		return (
			<progress value={this.state.progress} max={this.props.duration / 1000} className={styles.progress}></progress>
		)
	}

}
