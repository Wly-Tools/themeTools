import React, { FC, useEffect, useState } from 'react';
import { SearchInfoItemType } from 'src/types';
import { WlyButton, WlyInput, WlyTable } from 'wlyUI';
import { WlyTableProps } from 'wlyUI/src/components/Types/WlyTable';

import { usedColums } from './usedColums';
interface usedTableProps<T> extends WlyTableProps<T> {
	operate?: {
		[key: string]: Function;
	};
	searchInfo?: SearchInfoItemType[];
	searchApi?: Function;
	usedLists?: string[];
}
const UsedTable: FC<usedTableProps<any>> = (props) => {
	const [params, setParams] = useState<{ [key: string]: string }>({});
	useEffect(() => {
		props.searchInfo &&
			props.searchInfo.forEach((item) => {
				if (!params[item.key]) {
					setParams((prev: any) => ({
						...prev,
						[item.key]: ''
					}));
				}
			});
	}, [props.searchInfo]);
	const handelSearch = () => {
		props.searchApi && props.searchApi(params);
	};
	return (
		<div>
			{props.searchInfo && (
				<div className='area-search'>
					{props.searchInfo &&
						props.searchInfo.map((item: SearchInfoItemType, index: number) => {
							const { key, type, onEnter, prefix } = item;
							if (type === 'input') {
								return (
									<WlyInput
										key={type + index}
										value={params[key]}
										addonBefore={prefix}
										onChange={(e) => {
											setParams((prev: any) => ({
												...prev,
												[key]: e.target.value
											}));
										}}
										onPressEnter={onEnter ? handelSearch : () => {}}
										style={{ width: 256, height: 26, margin: '0 10px' }}
									/>
								);
							}
						})}
					<WlyButton onClick={handelSearch}>查询</WlyButton>
				</div>
			)}
			<div style={{ maxHeight: '350px', overflow: 'auto' }}>
				<WlyTable
					{...props}
					dataSource={props.dataSource}
					columns={usedColums(props?.operate, props.usedLists)}
					bordered
					rowKey='id'
					pagination={false}
				/>
			</div>
		</div>
	);
};
export { UsedTable };
