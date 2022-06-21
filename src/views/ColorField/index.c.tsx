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
import { UsedTable } from './Modal/Used/usedTable';
import { FormLayout } from 'src/utils/tools';
import { SwapModal } from './Modal/Swap/SwapModal';
import { AddModal } from './Modal/Add';
import { DeleteModal } from './Modal/Delete';
const ColorField: FC<any> = (props) => {
	const WlyTabPanel = WlyTabs.WlyTabPane;
	const [usedTableDatasource, setUsedTableDatasource] = useState<
		{ id?: string; component?: string; group?: string; status?: string; attribute?: string }[]
	>([]);
	const [themeInfoDatasouce, setThemeInfoDatasouce] = useState<
		{ id?: string; component?: string; group?: string; status?: string; attribute?: string }[]
	>([]);
	const [usedIdLists, setUsedIdLists] = useState<string[]>([]);
	const [operateId, setOperateId] = useState<string>('');
	const [swapInfo, setswapInfo] = useState<{ [key: string]: { to: string } }>({});
	const [record, setRecord] = useState({ id: '', name: '', value: '#ffffff' });
	const [usedModalVisible, setUsedModalVisible] = useState(false);
	const [editModalVisible, setEditModalVisible] = useState(false);
	const [addVisible, setAddVisible] = useState(false);
	const [swapVisible, setSwapVisible] = useState(false);
	const [deleteVisible, setDeleteVisible] = useState(false);
	const colorChange = (newColor: string) => {
		setRecord((prev) => {
			return { ...prev, value: newColor };
		});
	};
	const [form] = WlyForm.useForm();
	const searchInfo: SearchInfoType = [
		{ key: 'id', type: 'input', prefix: 'id' },
		{ key: 'name', type: 'input', prefix: 'name' },
		{ key: 'value', type: 'input', onEnter: true, prefix: 'value' }
	];
	const editSearchInfo: SearchInfoType = [
		{ key: 'id', type: 'input', prefix: 'id' },
		{ key: 'component', type: 'input', prefix: 'component' },
		{ key: 'group', type: 'input', onEnter: true, prefix: 'group' },
		{ key: 'status', type: 'input', onEnter: true, prefix: 'status' },
		{ key: 'status', type: 'input', onEnter: true, prefix: 'status' },
		{ key: 'attribute', type: 'input', onEnter: true, prefix: 'attribute' }
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

			// const setData = resData.map((item) => {
			// 	if (idLists.includes(item.id)) {
			// 		item.used = true;
			// 	} else {
			// 		item.used = false;
			// 	}
			// 	return item;
			// });
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
				title={modalTitle}
				visible={usedModalVisible}
				onCancel={() => {
					setUsedModalVisible(false);
				}}
				footer={false}>
				<UsedTable dataSource={usedTableDatasource} />
			</UsedModal>
			<EditModal
				destroyOnClose
				title={modalTitle}
				visible={editModalVisible}
				onCancel={() => {
					setEditModalVisible(false);
				}}
				onOk={() => {
					const params = {
						color: record.value,
						usedIdLists,
						swapInfo,
						id: record.id,
						name: record.name
					};

					updateColorField(params).then((res) => {
						if (res.data.code == 0) {
							searchApi();
							setEditModalVisible(false);
						}
					});
				}}>
				<WlyForm {...FormLayout(5)} form={form} layout='inline'>
					<WlyFormItem name={'value'} label='value' initialValue={record.value}>
						<WlyHexColorPicker
							defaultColor={record.value}
							color={record.value as string}
							onChange={colorChange}
						/>
					</WlyFormItem>
					<WlyFormItem name={'name'} label='name' initialValue={record.name}>
						<WlyInput
							value={record.name}
							onChange={(e) => {
								setRecord((prev) => {
									return { ...prev, name: e.target.value };
								});
							}}
						/>
					</WlyFormItem>
				</WlyForm>
				<UsedTable
					dataSource={themeInfoDatasouce}
					searchInfo={editSearchInfo}
					searchApi={(prarms: {
						id?: string;
						component?: string;
						group?: string;
						status?: string;
						attribute?: string;
					}) => {
						qureyThemeInfo(prarms).then((res) => {
							const resData = [...res.data.data];

							setThemeInfoDatasouce(resData);
						});
					}}
					operate={{
						swap(id: string, to: string) {
							setSwapVisible(true);
							setOperateId(id);
						},
						add(id: string) {
							setUsedIdLists((prev) => {
								const setPrev = new Set(prev);
								setPrev.add(id);
								return Array.from(setPrev);
							});
						}
					}}
					usedLists={usedIdLists}
				/>
				<SwapModal
					visible={swapVisible}
					title={'ColorFileds-' + operateId}
					onCancel={() => {
						setSwapVisible(false);
					}}
					onOk={() => {
						setUsedIdLists((prev) => {
							const setPrev = new Set(prev);
							console.log(operateId, record.id);

							// debugger;
							if (record.id === swapInfo[operateId]?.to || !swapInfo[operateId]?.to) {
								return [...prev];
							}
							setPrev.delete(operateId);
							return Array.from(setPrev);
						});
						setSwapVisible(false);
					}}>
					<SearchTable
						searchInfo={searchInfo}
						tableSetting={{
							...tableSetting,
							columns: getColumns(),
							rowSelection: {
								type: 'radio',
								defaultSelectedRowKeys: [record.id],
								onChange(selectedRowKeys: any) {
									setswapInfo((prev) => {
										return { ...prev, ...{ [operateId]: { to: selectedRowKeys } } };
									});
								}
							}
						}}
						searchApi={searchApi}
						add={false}
						maxHeight={'400px'}
					/>
				</SwapModal>
			</EditModal>
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
