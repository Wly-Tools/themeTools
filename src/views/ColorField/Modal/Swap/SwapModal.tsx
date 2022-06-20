import React, { FC } from 'react';
import { WlyModal } from 'wlyUI';
import { WlyModalProps } from 'wlyUI/src/components/Types/WlyModal';
const SwapModal: FC<WlyModalProps> = (props: any) => {
	return <WlyModal {...props} width='1020px'></WlyModal>;
};

export { SwapModal };
