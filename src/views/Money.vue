<template>
	<Layout class-prefix="layout">
		<NumberPad :value.sync="record.amount" @submit="saveRecord"/>
		<Types :value.sync="record.type"/>
		<Notes @update:value="OnUpdateNotes"/>
		<Tags @update:value="OnUpdateTags" :data-source.sync="tags"/>
		{{recordList}}
		{{record}}
	</Layout>
</template>

<script lang="ts">
	import Vue from 'vue';
	import NumberPad from '@/components/Money/NumberPad.vue';
	import Types from '@/components/Money/Types.vue';
	import Notes from '@/components/Money/Notes.vue';
	import Tags from '@/components/Money/Tags.vue';
	import {Component, Watch} from 'vue-property-decorator';
	
	const recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]');
	const version = window.localStorage.getItem('version') || '0';
	if (version < '2.0') {
		if (version === '1.0') {
			// 数据库升级/数据迁移
			recordList.forEach((record => {
				record.createdAt = new Date(2020, 0, 1);
			}));
			// 保存数据
			window.localStorage.setItem('recordList', JSON.stringify(recordList));
		}
	}
	// 修改版本号
	window.localStorage.setItem('version', '2.0');
	
	type Record = {
		tags: string[];
		notes: string;
		type: string;
		amount: number; // 数据类型
		createdAt?: Date; // 类/构造函数
	}
	
	@Component({
		components: {Tags, Notes, Types, NumberPad}
	})
	export default class Money extends Vue {
		tags = ['衣', '食', '住', '行', '彩票'];
		recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]');
		record: Record = {tags: [], notes: '', type: '-', amount: 0};
		
		OnUpdateTags(value: string[]) {
			this.record.tags = value;
		}
		
		OnUpdateNotes(value: string) {
			this.record.notes = value;
		}
		
		saveRecord() {
			const record2: Record = JSON.parse(JSON.stringify(this.record));
			record2.createdAt = new Date();
			this.recordList.push(record2);
		}
		
		@Watch('recordList')
		onRecordListChanged() {
			window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
		}
	}
</script>

<style lang="scss">
	.layout-content {
		display: flex;
		flex-direction: column-reverse;
	}
</style>