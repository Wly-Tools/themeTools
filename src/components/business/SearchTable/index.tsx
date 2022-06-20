import React, { FC, useEffect, useState } from 'react';
import { SeachTableType, SearchInfoItemType } from 'src/types/SearchTable';
import { WlyTable, WlyInput, WlyButton } from 'wlyUI';
import './index.less';
const SearchTable: FC<SeachTableType> = (props) => {
	const [params, setParams] = useState<any>({});
	useEffect(() => {
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
		props.searchApi(params);
	};
	return (
		<div className='searchTable'>
			<div className='top'>
				<div className='area-search'>
					{props.searchInfo &&
						props.searchInfo.map((item: SearchInfoItemType, index) => {
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
				{props?.add && (
					<div className='area-operaction'>
						<WlyButton>新增</WlyButton>
					</div>
				)}
			</div>
			<div className='split-line'></div>
			<div className='area-table' style={{ maxHeight: props.maxHeight }}>
				<WlyTable {...props.tableSetting} />
			</div>
		</div>
	);
};

export default SearchTable;
