import React, { FC } from 'react';
import { WlyModal } from 'wlyUI';
interface DeleteModalProps<T> {
	visible: boolean;
	okFunc: (params: any) => Promise<T>;
	cancelFun: (isOk?: boolean) => void;
	record: { id: string; name: string };
}
const DeleteModal: FC<DeleteModalProps<any>> = (props) => {
	const { visible, okFunc, cancelFun, record } = props;
	const { id, name } = record;
	const handelOk = (id: string) => {
		okFunc({ id }).then((res) => {
			if (res.data.code == 0) {
				cancelFun(true);
			}
		});
	};
	return (
		<WlyModal
			visible={visible}
			title='delete'
			onOk={() => {
				handelOk(id);
			}}
			onCancel={() => {
				cancelFun();
			}}>
			确定要删除{name}吗？
		</WlyModal>
	);
};

export { DeleteModal };
