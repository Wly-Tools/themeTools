import React, { FC, useEffect, useState } from 'react';
import SearchTable from 'src/components/business/SearchTable';
import { SearchInfoType } from 'src/types';
import { WlyModal } from 'wlyUI';
import { getColumns } from 'src/views/ColorField/colums';
import { qureyColorField } from 'src/api/colorField';

interface SwapModalProps {
	record: { id: string; name: string; value: string };
	setSwapInfo: (params: any) => void;
	visible: boolean;
	title: string;
	cancelFun: () => void;
	okFun: Function;
}
const SwapModal: FC<SwapModalProps> = (props: any) => {
	const { record, setSwapInfo, visible, title, cancelFun, okFun } = props;
	const searchInfo: SearchInfoType = [
		{ key: 'id', type: 'input', prefix: 'id' },
		{ key: 'name', type: 'input', prefix: 'name' },
		{ key: 'value', type: 'input', onEnter: true, prefix: 'value' }
	];
	const [dataSource, setDataSource] = useState([]);
	const searchApi = (params?: any) => {
		qureyColorField(params).then((res) => {
			setDataSource(res.data.data);
		});
	};
	useEffect(() => {
		searchApi();
	}, []);
	return (
		<WlyModal
			destroyOnClose
			title={title}
			visible={visible}
			onCancel={cancelFun}
			onOk={okFun}
			width='1020px'>
			<SearchTable
				searchInfo={searchInfo}
				tableSetting={{
					bordered: true,
					rowKey: 'id',
					pagination: false,
					columns: getColumns(),
					dataSource,
					rowSelection: {
						type: 'radio',
						defaultSelectedRowKeys: [record.id],
						onChange(selectedRowKeys: any) {
							setSwapInfo(selectedRowKeys[0]);
						}
					}
				}}
				searchApi={searchApi}
				add={false}
				maxHeight={'400px'}
			/>
		</WlyModal>
	);
};

export { SwapModal };
