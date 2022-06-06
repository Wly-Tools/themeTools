import React from 'react';
import { wlyNotiFiction } from 'wly-ui-react';
const Home = () => {
	return (
		<div
			onClick={() => {
				wlyNotiFiction['error']({
					message: 'err',
					duration: null
				});
			}}>
			home
		</div>
	);
};

export default Home;
