import React from 'react';
import { WlyNotiFiction, WlyInput, WlyButton } from 'wlyUI';
const Home = () => {
	return (
		<div
			onClick={() => {
				WlyNotiFiction['error']({
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
