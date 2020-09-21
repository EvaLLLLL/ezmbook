type RootState = {
	recordList: RecordItem[];
	tagList: Tag[];
	currentTag?: Tag;
}

type RecordItem = {
	tags: string[];
	notes: string;
	type: string;
	amount: number; // 数据类型
	createdAt?: string; // 类/构造函数
}

type Tag = {
	id: string;
	name: string;
}