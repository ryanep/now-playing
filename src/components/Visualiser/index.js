import React, { Component } from "react";
import styles from './style.scss';

export default class Visualiser extends Component {

	render() {
		const totalBars = 12;
		return (
			<div className={styles.visualiser}>
				{[...Array(totalBars)].map((x, i) => <div key={i} className={styles.bar}></div>)}
			</div>
		)
	}

}
