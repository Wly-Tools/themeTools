import React, { FC, useEffect, useState } from 'react';
import SearchTable from 'src/components/business/SearchTable';
import { SearchInfoType } from 'src/types/';
import { WlyTabs, WlyHexColorPicker, WlyForm, WlyFormItem, WlySelect, WlyInput } from 'wlyUI';
import { WlyTableProps } from 'wlyUI/src/components/Types/WlyTable';
import {
	addColorField,
	deleteColorFiled,
	getThemeInfoById,
	qureyColorField,
	qureyThemeInfo,
	updateColorField
} from 'src/api/colorField';
import { getColumns } from './colums';
import { UsedModal } from './Modal';
import { EditModal } from './Modal';
import { AddModal } from './Modal/Add';
import { DeleteModal } from './Modal/Delete';
import { UsedTableDatasourceItemType } from './Modal/Used/UsedModal';
import { setCss } from 'src/utils/tools';
const ColorField: FC<any> = (props) => {
	const WlyTabPanel = WlyTabs.WlyTabPane;
	const [usedTableDatasource, setUsedTableDatasource] = useState<UsedTableDatasourceItemType[]>([]);
	const [themeInfoDatasouce, setThemeInfoDatasouce] = useState<UsedTableDatasourceItemType[]>([]);
	const [usedIdLists, setUsedIdLists] = useState<string[]>([]);
	const [record, setRecord] = useState({ id: '', name: '', value: '#ffffff' });
	const [usedModalVisible, setUsedModalVisible] = useState(false);
	const [editModalVisible, setEditModalVisible] = useState(false);
	const [addVisible, setAddVisible] = useState(false);
	const [deleteVisible, setDeleteVisible] = useState(false);

	const searchInfo: SearchInfoType = [
		{ key: 'id', type: 'input', prefix: 'id' },
		{ key: 'name', type: 'input', prefix: 'name' },
		{ key: 'value', type: 'input', onEnter: true, prefix: 'value' }
	];

	const [modalTitle, setModalTitle] = useState<any>();
	useEffect(() => {
		searchApi();
	}, []);
	useEffect(() => {
		initApi();
	}, [usedTableDatasource]);
	const [dataSource, setDataSource] = useState([]);
	const columns = getColumns(
		({ id, name, value }: { id: string; name: string; value: string }, title: string) => {
			getThemeInfoById({ id }).then((res) => {
				setUsedTableDatasource(res.data.data);
				setRecord({ id, name, value });
				if (title === 'used') setUsedModalVisible(true);
				if (title == 'edit') {
					// debugger;
					initApi();
					setEditModalVisible(true);
				}
				if (title === 'delete') {
					setDeleteVisible(true);
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
	const initApi = () => {
		const idLists = usedTableDatasource.map((item) => {
			const id = item.id as string;
			return id;
		});
		setUsedIdLists(idLists);
		qureyThemeInfo().then((res) => {
			const resData = [...res.data.data];
			setThemeInfoDatasouce(resData);
		});
	};

	return (
		<div className='div-container'>
			<WlyTabs defaultActiveKey='1'>
				<WlyTabPanel tab='colorField' key='1'>
					<SearchTable
						searchInfo={searchInfo}
						tableSetting={tableSetting}
						searchApi={searchApi}
						add={true}
						addFun={() => {
							setAddVisible(true);
						}}
					/>
				</WlyTabPanel>
			</WlyTabs>
			<UsedModal
				modalTitle={modalTitle}
				visible={usedModalVisible}
				cancelFun={() => {
					setUsedModalVisible(false);
				}}
				usedTableDatasource={usedTableDatasource}
			/>
			<EditModal
				modalTitle={modalTitle}
				visible={editModalVisible}
				cancelFun={() => {
					setEditModalVisible(false);
				}}
				okFun={(params: {
					color: string;
					usedIdLists: string[];
					swapInfo: { [key: string]: { to: string } };
					id: string;
					name: string;
				}) => {
					updateColorField({ ...params, theme: 'light', platform: 'theme-tool' }).then((res) => {
						if (res.data.code == 0) {
							searchApi();
							setEditModalVisible(false);
							setCss(res.data.data);
						}
					});
				}}
				record={record}
				themeInfoDatasouce={themeInfoDatasouce}
				setThemeInfoDatasouce={(data) => {
					setThemeInfoDatasouce(data);
				}}
				usedIdLists={usedIdLists}
				setUsedIdLists={(data) => {
					setUsedIdLists(data);
				}}
				setAddUsedIdLists={(data) => {
					setUsedIdLists((prev) => {
						const setPrev = new Set(prev);
						setPrev.add(data);
						return Array.from(setPrev);
					});
				}}></EditModal>
			<AddModal
				visible={addVisible}
				okFun={addColorField}
				cancelFun={async () => {
					await searchApi();
					setAddVisible(false);
				}}
			/>
			<DeleteModal
				visible={deleteVisible}
				okFunc={deleteColorFiled}
				cancelFun={async (isOk?: boolean) => {
					if (isOk) {
						await searchApi();
					}
					setDeleteVisible(false);
				}}
				record={record}
			/>
		</div>
	);
};
export default ColorField;
