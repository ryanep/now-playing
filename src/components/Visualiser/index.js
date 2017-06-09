import React, { Component } from "react";
import styles from './style.scss';

export default class Visualiser extends Component {

	render() {
		const totalBars = 10;
		return (
			<div className={styles.visualiser}>
				{[...Array(totalBars)].map((x, i) => <div className={styles.bar}></div>)}
			</div>
		)
	}

}
