import { WlyTableProps } from 'wlyUI/src/components/Types/WlyTable';

type searchType = 'input' | 'search';
interface SearchInfoItemType {
	key: string;
	type: searchType;
	onEnter?: boolean;
	prefix: string;
}

type SearchInfoType = SearchInfoItemType[];
interface SeachTableType {
	searchInfo: SearchInfoType;
	tableSetting: WlyTableProps<any>;
	searchApi: (params?: any) => void;
}

export { searchType, SearchInfoItemType, SearchInfoType, SeachTableType };
