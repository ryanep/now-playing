import React, { Component } from "react";
import styles from './style.scss';

export default class Progress extends Component {

	constructor() {
		super();
		this.state = {
			progress: 0
		};

		this.updateProgress();
	}

	updateProgress() {
		setTimeout(() => {
			this.setState({ progress: this.state.progress + 1 });
			this.updateProgress();
		}, 500);
	}

	render() {
		return (
			<progress value={this.state.progress} max="200" className={styles.progress}></progress>
		)
	}

}
