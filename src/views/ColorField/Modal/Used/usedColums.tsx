import { PlusOutlined, SwapOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { WlyButton } from 'wlyUI';
interface OperateType {
	[key: string]: Function;
}
const usedColums: (
	operate?: OperateType,
	usedLists?: string[]
) => ColumnsType<{
	id: string;
	component: string;
	group: string;
	status: string;
	attribute: string;
	// used?: boolean;
}> = (operate, usedLists) => [
	{ key: 'id', dataIndex: 'id', title: 'id', width: '64px' },
	{ key: 'id', dataIndex: 'component', title: 'component', width: '120px' },
	{ key: 'id', dataIndex: 'position', title: 'position', width: '100px' },
	{ key: 'id', dataIndex: 'group', title: 'group', width: '100px' },
	{ key: 'id', dataIndex: 'status', title: 'status', width: '100px' },
	{ key: 'id', dataIndex: 'attribute', title: 'attribute', ellipsis: true },
	...(operate
		? [
				{
					key: 'id',
					title: 'operate',
					dataIndex: 'used',
					width: '100px',
					filters: [
						{ text: <span>true</span>, value: true },
						{ text: <span>false</span>, value: false }
					],
					onFilter: (filterValue: boolean | number | string, record: any) => {
						return record.used == filterValue;
					},
					render(_text: any, record: any) {
						record.used = usedLists?.includes(record.id);
						return (
							<div className='operacte'>
								{usedLists?.includes(record.id) ? (
									<WlyButton
										className='swap'
										icon={<SwapOutlined />}
										onClick={() => {
											operate.swap(record.id);
										}}></WlyButton>
								) : (
									<WlyButton
										className='add'
										icon={<PlusOutlined />}
										onClick={() => {
											operate.add(record.id);
										}}></WlyButton>
								)}
							</div>
						);
					}
				}
		  ]
		: [])
];
export { usedColums };
