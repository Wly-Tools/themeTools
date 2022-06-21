import { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { WlyButton } from 'wlyUI';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const getColumns: (
	usedApi?: Function
) => ColumnsType<{ id: string; name: string; value: string }> = (usedApi) => [
	{
		key: 'id',
		title: 'id',
		dataIndex: 'id',
		width: '120px',
		ellipsis: { showTitle: false }
	},
	{
		key: 'id',
		title: 'name',
		width: '120px',
		dataIndex: 'name',
		ellipsis: { showTitle: false }
	},
	{
		key: 'id',
		title: 'value',
		dataIndex: 'value',
		ellipsis: { showTitle: true }
	},
	{
		key: 'id',
		title: 'priview',
		width: '120px',

		render(text, record) {
			if (record.name.includes('image')) {
				return (
					<span
						style={{
							backgroundImage: record.value,
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent'
						}}>
						ThemeTool
					</span>
				);
			}
			return '';
		},
		onCell(record) {
			if (record.name.includes('color')) {
				return { style: { backgroundColor: record.value } };
			}

			return {};
		}
	},
	...(usedApi
		? [
				{
					key: 'id',
					title: 'used',
					width: '100px',
					render(_text: any, record: any) {
						return (
							<WlyButton
								onClick={() => {
									const title = 'used';
									usedApi(record, title);
								}}>
								Look
							</WlyButton>
						);
					}
				},
				{
					key: 'id',
					title: 'operate',
					width: '100px',
					render(_text: any, record: any) {
						return (
							<div className='operacte'>
								<WlyButton
									className='edit'
									icon={<EditOutlined />}
									onClick={() => {
										const title = 'edit';
										usedApi(record, title);
									}}></WlyButton>
								<WlyButton
									className='delete'
									icon={<DeleteOutlined />}
									onClick={() => {
										const title = 'delete';
										usedApi(record, title);
									}}></WlyButton>
							</div>
						);
					}
				}
		  ]
		: [])
];
export { getColumns };
