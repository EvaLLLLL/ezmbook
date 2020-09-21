<template>
	<Layout>
		<Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="recordType"/>
		<Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
		<ol>
			<li v-for="(group,index) in result"
			    :key="index">
				<h3 class="title">{{group.title}}</h3>
				<ol v-for="item in group.items"
				    :key="item.id"
				    class="record">
					<span>{{tagString(item.tags)}}</span>
					<span class="notes">{{item.notes}}</span>
					<span>￥{{item.amount}}</span>
				</ol>
			</li>
			<!--	下面是用来测试的		-->
			<li v-for="(group,index) in result"
			    :key="index">
				<h3 class="title">{{group.title}}</h3>
				<ol v-for="item in group.items"
				    :key="item.id"
				    class="record">
					<span>{{tagString(item.tags)}}</span>
					<span class="notes">{{item.notes}}</span>
					<span>￥{{item.amount}}</span>
				</ol>
			</li>
			<!--	上面是用来测试的		-->
		</ol>
	</Layout>
</template>

<script lang="ts">
	import Vue from 'vue';
	import {Component} from 'vue-property-decorator';
	import Tabs from '@/components/Tabs.vue';
	import intervalList from '@/constants/intervalList';
	import recordTypeList from '@/constants/reordTypeList';
	
	@Component({
		components: {Tabs},
	})
	export default class Statistics extends Vue {
		tagString(tags: Tag[]) {
			return tags.length === 0 ? '无' : tags.join(',');
		}
		
		get recordList() {
			return (this.$store.state as RootState).recordList;
		}
		
		get result() {
			const {recordList} = this;
			type HashTableValue = { title: string; items: RecordItem[] };
			
			const hashTable: { [key: string]: HashTableValue } = {};
			for (let i = 0; i < recordList.length; i++) {
				const [date] = recordList[i].createdAt!.split('T');
				hashTable[date] = hashTable[date] || {title: date, items: []};
				//TODO
				hashTable[date].items.push(recordList[i]);
			}
			console.log(hashTable);
			return hashTable;
		}
		
		beforeCreate() {
			this.$store.commit('fetchRecords');
		}
		
		recordType = '-';
		interval = 'day';
		intervalList = intervalList;
		recordTypeList = recordTypeList;
	}
</script>

<style lang="scss" scoped>
	::v-deep {
		.type-tabs-item {
			background: white;
			&.selected {
				background: #c4c4c4;
				&::after {
					display: none;
				}
			}
		}
		li.interval-tabs-item {
			height: 48px;
		}
	}
	%item {
		padding: 8px 16px;
		line-height: 24px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.title {
		@extend %item;
	}
	.record {
		@extend %item;
		background: white;
	}
	.notes {
		margin-right: auto;
		margin-left: 16px;
		color: #999;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

</style>