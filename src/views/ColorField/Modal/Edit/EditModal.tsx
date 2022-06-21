import React, { FC, useEffect, useState } from 'react';
import { WlyForm, WlyFormItem, WlyHexColorPicker, WlyInput, WlyModal } from 'wlyUI';
import { SwapModal } from './Swap/SwapModal';
import { UsedTable } from '../Used/usedTable';
import { FormLayout } from 'src/utils/tools';
import { UsedTableDatasourceItemType } from '../Used/UsedModal';
import { SearchInfoType } from 'src/types';
import { qureyThemeInfo } from 'src/api/colorField';
interface EditModalProps {
	visible: boolean;
	modalTitle: string;
	cancelFun: Function;
	okFun: Function;
	record: { id: string; name: string; value: string };
	themeInfoDatasouce: UsedTableDatasourceItemType[];
	setThemeInfoDatasouce: (resData: any) => void;
	usedIdLists: string[];
	setAddUsedIdLists: (id: string) => void;
	setUsedIdLists: (params?: any) => void;
}
const EditModal: FC<EditModalProps> = (props: any) => {
	const {
		visible,
		modalTitle,
		cancelFun,
		okFun,
		record,
		themeInfoDatasouce,
		setThemeInfoDatasouce,
		setAddUsedIdLists,
		usedIdLists,
		setUsedIdLists
	} = props;
	const [form] = WlyForm.useForm();
	const [modalRecord, setModalRecord] = useState<{ id: string; name: string; value: string }>({
		...record
	});
	useEffect(() => {
		setModalRecord({ ...record });
	}, [props.record]);

	const [swapVisible, setSwapVisible] = useState(false);

	const [swapInfo, setSwapInfo] = useState<{ [key: string]: { to: string } }>({});
	const [operateId, setOperateId] = useState<string>('');
	const editSearchInfo: SearchInfoType = [
		{ key: 'id', type: 'input', prefix: 'id' },
		{ key: 'component', type: 'input', prefix: 'component' },
		{ key: 'group', type: 'input', onEnter: true, prefix: 'group' },
		{ key: 'status', type: 'input', onEnter: true, prefix: 'status' },
		{ key: 'status', type: 'input', onEnter: true, prefix: 'status' },
		{ key: 'attribute', type: 'input', onEnter: true, prefix: 'attribute' }
	];
	const colorChange = (newColor: string) => {
		setModalRecord((prev) => {
			return { ...prev, value: newColor };
		});
	};
	return (
		<WlyModal
			width='720px'
			destroyOnClose
			visible={visible}
			onCancel={cancelFun}
			onOk={() => {
				const params = {
					color: modalRecord.value,
					usedIdLists,
					swapInfo,
					id: modalRecord.id,
					name: modalRecord.name
				};
				okFun(params);
			}}
			title={modalTitle}>
			<WlyForm {...FormLayout(5)} form={form} layout='inline'>
				<WlyFormItem name={'value'} label='value' initialValue={modalRecord.value}>
					<WlyHexColorPicker
						defaultColor={modalRecord.value}
						color={modalRecord.value as string}
						onChange={colorChange}
					/>
				</WlyFormItem>
				<WlyFormItem name={'name'} label='name' initialValue={modalRecord.name}>
					<WlyInput
						value={modalRecord.name}
						onChange={(e) => {
							setModalRecord((prev) => {
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
						setSwapInfo((prev) => {
							const prevData = { ...prev };
							delete prevData[operateId];
							return { ...prevData };
						});
						setAddUsedIdLists(id);
					}
				}}
				usedLists={usedIdLists}
			/>
			<SwapModal
				visible={swapVisible}
				record={modalRecord}
				cancelFun={() => {
					setSwapVisible(false);
				}}
				okFun={() => {
					let resUsedListId = [];
					const setPrev = new Set(usedIdLists);

					// debugger;
					if (record.id === swapInfo[operateId]?.to || !swapInfo[operateId]?.to) {
						return;
					}
					setPrev.delete(operateId);
					resUsedListId = Array.from(setPrev);
					setUsedIdLists(resUsedListId);
					setSwapVisible(false);
				}}
				setSwapInfo={(data?: any) => {
					setSwapInfo((prev) => {
						return { ...prev, ...{ [operateId]: { to: data } } };
					});
				}}
				title={'ColorFileds-' + operateId}
			/>
		</WlyModal>
	);
};

export { EditModal };
