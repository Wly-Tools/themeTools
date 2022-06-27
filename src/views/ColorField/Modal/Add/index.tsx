import React, { FC, useState } from 'react';
import { FormLayout, setCss } from 'src/utils/tools';
import { WlyForm, WlyFormItem, WlyHexColorPicker, WlyInput, WlyModal } from 'wlyUI';
interface AddProps {
	okFun: (prarms?: any) => Promise<any>; //确定执行发发
	cancelFun: () => void; //取消方法
	visible: boolean; //显隐控制
}
const { useForm } = WlyForm;
const AddModal: FC<AddProps> = (props: any) => {
	const [prarms, setPrarms] = useState({ name: '', color: '#ffffff' }); //form表单数据绑定
	const [form] = useForm(); //相当于form的ref
	//确定方法
	const handelOk = (prarms?: any) => {
		form.validateFields().then((value) => {
			props.okFun(prarms).then((res: { data: { code: number; data: any } }) => {
				if (res.data.code == 0) {
					setCss(res.data.data);
					props.cancelFun();
				}
			});
		});
	};
	//修改颜色方法
	const colorChange = (newcolor: string) => {
		setPrarms((prev) => {
			return { ...prev, color: newcolor };
		});
	};
	return (
		<WlyModal
			visible={props.visible}
			title='Add'
			onCancel={props.cancelFun}
			onOk={() => {
				handelOk({ ...prarms, theme: 'light', platform: 'theme-tool' });
			}}
			width='720px'>
			<WlyForm form={form} {...FormLayout(3)} name='prarms'>
				<WlyFormItem
					name='name'
					label='name'
					rules={[{ required: true, message: 'name is required!' }]}>
					<WlyInput
						value={prarms.name}
						onChange={(e) => {
							setPrarms((prev) => {
								return { ...prev, name: e.target.value };
							});
						}}
					/>
				</WlyFormItem>
				<WlyFormItem
					name='value'
					label='value'
					initialValue={prarms.color}
					rules={[{ required: true, message: 'value is required!' }]}>
					<WlyHexColorPicker color={prarms.color} onChange={colorChange} />
				</WlyFormItem>
			</WlyForm>
		</WlyModal>
	);
};

export { AddModal };
