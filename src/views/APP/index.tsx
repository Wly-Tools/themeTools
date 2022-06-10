import React, { FC } from 'react';
import { Outlet, useParams } from 'react-router-dom';

const App: FC<any> = (props) => {
	return (
		<div className='div-container'>
			<Outlet />
		</div>
	);
};
export default App;
