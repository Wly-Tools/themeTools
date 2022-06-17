import React, { FC } from 'react';
import { WlyTable } from 'wlyUI';
import { WlyTableProps } from 'wlyUI/src/components/Types/WlyTable';

import { usedColums } from './usedColums';
const UsedTable: FC<WlyTableProps<any>> = (props) => {
	return (
		<div style={{ maxHeight: '550px', overflow: 'auto' }}>
			<WlyTable {...props} columns={usedColums} bordered rowKey='id' pagination={false} />
		</div>
	);
};
export { UsedTable };
