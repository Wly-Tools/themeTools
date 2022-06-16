import React from 'react';
import { wlyNotiFiction, WlyInput, WlyButton } from 'wlyUI';
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
			<WlyInput />
			<WlyButton>aaaaaa</WlyButton>
		</div>
	);
};

export default Home;
