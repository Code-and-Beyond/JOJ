import React from 'react';

interface ColumnData {
	head: string,
	entries: Array<any>
}

type TableProps = {
	dataList: Array<ColumnData>;
};


const Table: React.FC<TableProps> = (props) => {
	const { dataList } = props;
	const getEntries = (entries: Array<any>, columnNo: Number) => {
		return entries.map((item, rowNo:Number) => (
			<div className='table__item' key={columnNo + '-' + rowNo}>
				<p className='b b--2'>{item ? item : 0}</p>
			</div>
		));
	};

	return <div className='table'>
		{dataList.map((list, colIndex) => (
			<div className='table__column' key={colIndex}>
				<div className='table__column--head h h--4'>{list.head}</div>
				<div className='table__column--entries'>{getEntries(list.entries, colIndex)}</div>
			</div>
		))}
	</div>
};
export default Table;