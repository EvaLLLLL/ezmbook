type RecordItem = {
	tags: string[];
	notes: string;
	type: string;
	amount: number; // 数据类型
	createdAt?: Date; // 类/构造函数
}

type TagListModel = {
	data: Tag[];
	fetch: () => Tag[];
	create: (name: string) => 'success' | 'duplicated';
	update: (id: string, name: string) => 'success' | 'not found' | 'duplicated';
	remove: (id: string) => boolean;
	save: () => void;
}

type Tag = {
	id: string;
	name: string;
}

interface Window {
	tagList: Tag[];
	createTag: (name: string) => void;
	removeTag: TagListModel['remove'];
	updateTag: TagListModel['update'];
	findTag: (id: string) => Tag | undefined;
	recordList: RecordItem[];
	createRecord: (record: RecordItem) => void;
}