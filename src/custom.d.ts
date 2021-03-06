type RootState = {
	recordList: RecordItem[];
	createRecordError: Error | null;
	tagList: Tag[];
	currentTag?: Tag;
}

type RecordItem = {
	tags: Tag[];
	notes: string;
	type: string;
	amount: number; // 数据类型
	createdAt?: string; // 类/构造函数
}

type Tag = {
	id: string;
	name: string;
}