import React, { FC } from 'react';
import { WlyModal } from 'wlyUI';
import { UsedTable } from './usedTable';
export declare interface UsedTableDatasourceItemType {
	id?: string | undefined;
	component?: string | undefined;
	group?: string | undefined;
	status?: string | undefined;
	attribute?: string | undefined;
}
interface UsedModalProps {
	usedTableDatasource: UsedTableDatasourceItemType[];
	modalTitle: string;
	visible: boolean;
	cancelFun: () => void;
}
const UsedModal: FC<UsedModalProps> = (props: any) => {
	const { usedTableDatasource, modalTitle, visible, cancelFun } = props;
	return (
		<WlyModal
			visible={visible}
			title={modalTitle}
			onCancel={cancelFun}
			footer={false}
			width='720px'>
			<UsedTable dataSource={usedTableDatasource} />
		</WlyModal>
	);
};

export { UsedModal };
