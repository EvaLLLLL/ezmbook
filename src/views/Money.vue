<template>
	<Layout class-prefix="layout">
		<NumberPad :value.sync="record.amount"
		           @submit="saveRecord"/>
		<Tabs :data-source="recordTypeList"
		      :value.sync="record.type"/>
		<div class="formWrapper">
			<FormItem @update:value="OnUpdateNotes"
			          field-name="备注"
			          placeholder="点击输入备注"/>
		</div>
		<Tags/>
	</Layout>
</template>

<script lang="ts">
	import Vue from 'vue';
	import NumberPad from '@/components/Money/NumberPad.vue';
	import FormItem from '@/components/Money/FormItem.vue';
	import Tags from '@/components/Money/Tags.vue';
	import {Component} from 'vue-property-decorator';
	import recordTypeList from '@/constants/reordTypeList';
	import Tabs from '@/components/Tabs.vue';
	
	@Component({
		components: {Tabs, Tags, FormItem, NumberPad},
	})
	export default class Money extends Vue {
		record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};
		recordTypeList = recordTypeList;
		
		get recordList() {
			return this.$store.state.recordList;
		}
		
		created() {
			this.$store.commit('fetchRecords');
		}
		
		OnUpdateNotes(value: string) {
			this.record.notes = value;
		}
		
		saveRecord() {
			this.$store.commit('createRecord', this.record);
		}
		
	}
</script>

<style lang="scss" scoped>
	::v-deep {
		.layout-content {
			display: flex;
			flex-direction: column-reverse;
		}
		.formWrapper {
			padding: 12px 0;
		}
	}
</style>