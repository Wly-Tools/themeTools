import { ColumnsType } from 'antd/lib/table';
const usedColums: ColumnsType<{
	id: string;
	component: string;
	group: string;
	status: string;
	attribute: string;
}> = [
	{ key: 'id', dataIndex: 'id', title: 'id', width: '64px' },
	{ key: 'id', dataIndex: 'component', title: 'component', width: '120px' },
	{ key: 'id', dataIndex: 'position', title: 'position', width: '120px' },
	{ key: 'id', dataIndex: 'group', title: 'group', width: '120px' },
	{ key: 'id', dataIndex: 'status', title: 'status', width: '120px' },
	{ key: 'id', dataIndex: 'attribute', title: 'attribute', ellipsis: true }
];
export { usedColums };
