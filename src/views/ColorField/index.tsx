import React, { FC } from 'react';
import SearchTable from 'src/components/business/SearchTable';
import { SearchInfoType } from 'src/types/';
import { WlyTabs } from 'wlyUI';
import { ColumnsType } from 'antd/lib/table';
import { WlyTableProps } from 'wlyUI/src/components/Types/WlyTable';

const ColorField: FC<any> = (props) => {
	const WlyTabPanel = WlyTabs.WlyTabPane;
	const searchInfo: SearchInfoType = [
		{ key: 'id', type: 'input', prefix: 'id' },
		{ key: 'name', type: 'input', prefix: 'name' },
		{ key: 'value', type: 'input', onEnter: true, prefix: 'value' }
	];
	const columns: ColumnsType = [
		{
			key: 'id',
			title: 'id',
			dataIndex: 'id'
		},
		{
			key: 'id',
			title: 'name',
			dataIndex: 'name'
		},
		{
			key: 'id',
			title: 'value',
			dataIndex: 'value'
		}
	];
	const dataSource = [
		{ id: '1', name: '001', value: '一' },
		{ id: '2', name: '002', value: '二' }
	];
	const tableSetting: WlyTableProps<any> = {
		bordered: true,
		// pagination: { pageSize: 1 },
		pagination: false,
		columns,
		dataSource,
		rowKey: 'id'
	};
	const searchApi = (params: any) => {
		console.log(params);
	};
	return (
		<div className='div-container'>
			<WlyTabs defaultActiveKey='1'>
				<WlyTabPanel tab='colorField' key='1'>
					<SearchTable searchInfo={searchInfo} tableSetting={tableSetting} searchApi={searchApi} />
				</WlyTabPanel>
			</WlyTabs>
		</div>
	);
};
export default ColorField;
