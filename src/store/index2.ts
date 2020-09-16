import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';

const store = {
	//record store
	recordList: recordListModel.fetch(),
	createRecord: (record: RecordItem) => {
		return recordListModel.create(record);
	},
	// tag store
	tagList: tagListModel.fetch(),
	findTag(id: string) {
		return this.tagList.filter(t => t.id === id)[0];
	},
	createTag: (name: string) => {
		const message = tagListModel.create(name);
		if (message === 'duplicated') {
			window.alert(`已经创建过${name}标签了`);
		} else if (message === 'success') {
			window.alert(`添加${name}标签成功`);
		}
	},
	removeTag: (id: string) => {
		return tagListModel.remove(id);
	},
	updateTag: (id: string, name: string) => {
		return tagListModel.update(id, name);
	}
};

export default store;