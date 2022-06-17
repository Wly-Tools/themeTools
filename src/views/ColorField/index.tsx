import React, { FC, useEffect, useState } from 'react';
import SearchTable from 'src/components/business/SearchTable';
import { SearchInfoType } from 'src/types/';
import { WlyTabs, WlyHexColorPicker } from 'wlyUI';
import { WlyTableProps } from 'wlyUI/src/components/Types/WlyTable';
import { getThemeInfoById, qureyColorField } from 'src/api/colorField';
import { getColumns } from './colums';
import { UsedModal } from './Modal/';
import { EditModal } from './Modal/';
import { UsedTable } from './Modal/Used/usedTable';
const ColorField: FC<any> = (props) => {
	const WlyTabPanel = WlyTabs.WlyTabPane;
	const [usedModalVisible, setUsedModalVisible] = useState(false);
	const [editModalVisible, setEditModalVisible] = useState(false);
	const [usedTableDatasource, setUsedTableDatasource] = useState([]);
	const [color, setColor] = useState<string>();
	const [defaultColor, setDefaultColor] = useState<string>();
	const colorChange = (newColor: string) => {
		setColor(newColor);
	};
	const searchInfo: SearchInfoType = [
		{ key: 'id', type: 'input', prefix: 'id' },
		{ key: 'name', type: 'input', prefix: 'name' },
		{ key: 'value', type: 'input', onEnter: true, prefix: 'value' }
	];
	const [modalTitle, setModalTitle] = useState<any>();
	useEffect(() => {
		searchApi();
	}, []);
	const [dataSource, setDataSource] = useState([]);
	const columns = getColumns(
		({ id, name, value }: { id: string; name: string; value: string }, title: string) => {
			getThemeInfoById({ id }).then((res) => {
				setUsedTableDatasource(res.data.data);
				if (title === 'used') setUsedModalVisible(true);
				if (title == 'edit') {
					setDefaultColor(value);
					setColor(value);
					setEditModalVisible(true);
				}
			});
			setModalTitle(
				name.includes('image') ? (
					<span
						style={{
							backgroundImage: value,
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent'
						}}>{`${id}/${name} `}</span>
				) : (
					<>
						{`${id}/${name} `}
						<div
							style={{ display: 'inline-block', height: 16, width: 16, background: value }}></div>
					</>
				)
			);
		}
	);
	const tableSetting: WlyTableProps<any> = {
		bordered: true,
		// pagination: { pageSize: 1 },
		pagination: false,
		columns,
		dataSource,
		rowKey: 'id'
	};
	const searchApi = (params?: any) => {
		qureyColorField(params).then((res) => {
			setDataSource(res.data.data);
		});
	};
	return (
		<div className='div-container'>
			<WlyTabs defaultActiveKey='1'>
				<WlyTabPanel tab='colorField' key='1'>
					<SearchTable searchInfo={searchInfo} tableSetting={tableSetting} searchApi={searchApi} />
				</WlyTabPanel>
			</WlyTabs>
			<UsedModal
				title={modalTitle}
				visible={usedModalVisible}
				onCancel={() => {
					setUsedModalVisible(false);
				}}
				footer={false}>
				<UsedTable dataSource={usedTableDatasource} />
			</UsedModal>
			<EditModal
				title={modalTitle}
				visible={editModalVisible}
				onCancel={() => {
					setEditModalVisible(false);
				}}>
				<WlyHexColorPicker
					defaultColor={defaultColor}
					color={color as string}
					onChange={colorChange}
				/>
			</EditModal>
		</div>
	);
};
export default ColorField;
