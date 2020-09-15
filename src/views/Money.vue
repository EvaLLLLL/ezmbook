<template>
	<Layout class-prefix="layout">
		<NumberPad :value.sync="record.amount" @submit="saveRecord"/>
		<Types :value.sync="record.type"/>
		<div class="formWrapper">
			<FormItem @update:value="OnUpdateNotes" field-name="备注" placeholder="点击输入备注"/>
		</div>
		<Tags @update:value="OnUpdateTags" :data-source.sync="tags"/>
	</Layout>
</template>

<script lang="ts">
	import Vue from 'vue';
	import NumberPad from '@/components/Money/NumberPad.vue';
	import Types from '@/components/Money/Types.vue';
	import FormItem from '@/components/Money/FormItem.vue';
	import Tags from '@/components/Money/Tags.vue';
	import {Component, Watch} from 'vue-property-decorator';
	import recordListModel from '@/models/recordListModel';
	
	const recordList = recordListModel.fetch();
	
	@Component({
		components: {Tags, FormItem, Types, NumberPad}
	})
	export default class Money extends Vue {
		tags = window.tagList;
		recordList: RecordItem[] = recordList;
		record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};
		
		OnUpdateTags(value: string[]) {
			this.record.tags = value;
		}
		
		OnUpdateNotes(value: string) {
			this.record.notes = value;
		}
		
		saveRecord() {
			recordListModel.create(this.record);
		}
		
		@Watch('recordList')
		onRecordListChanged() {
			recordListModel.save();
		}
	}
</script>

<style lang="scss">
	.layout-content {
		display: flex;
		flex-direction: column-reverse;
	}
	.formWrapper {
		padding: 12px 0;
	}
</style>