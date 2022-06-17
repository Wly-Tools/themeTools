import React, { FC } from 'react';
import { WlyModal } from 'wlyUI';
import { WlyModalProps } from 'wlyUI/src/components/Types/WlyModal';
const EditModal: FC<WlyModalProps> = (props: any) => {
	return <WlyModal {...props} width='720px'></WlyModal>;
};

export { EditModal };
