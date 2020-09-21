<template>
	<Layout>
		<Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="recordType"/>
		<ol>
			<li v-for="(group, index) in groupedList"
			    :key="index">
				<h3 class="title">{{beautify(group.title)}}</h3>
				<ol v-for="item in group.items"
				    :key="item.id"
				    class="record">
					<span>{{tagString(item.tags)}}</span>
					<span class="notes">{{item.notes}}</span>
					<span>￥{{item.amount}}</span>
				</ol>
			</li>
		</ol>
	</Layout>
</template>

<script lang="ts">
	import Vue from 'vue';
	import {Component} from 'vue-property-decorator';
	import Tabs from '@/components/Tabs.vue';
	import recordTypeList from '@/constants/reordTypeList';
	import dayjs from 'dayjs';
	import clone from '@/lib/clone.ts';
	
	@Component({
		components: {Tabs},
	})
	export default class Statistics extends Vue {
		beautify(string: string) {
			const day = dayjs(string);
			const now = dayjs();
			if (day.isSame(now, 'day')) {
				return '今天';
			} else if (day.isSame(now.subtract(1, 'day'), 'day')) {
				return '昨天';
			} else if (day.isSame(now.subtract(2, 'day'), 'day')) {
				return '前天';
			} else if (day.isSame(now, 'year')) {
				return day.format('M月D日');
			} else {
				return day.format('YYYY年M月D日');
			}
		}
		
		tagString(tags: Tag[]) {
			return tags.length === 0 ? '无' : tags.join(',');
		}
		
		get recordList() {
			return (this.$store.state as RootState).recordList;
		}
		
		get groupedList() {
			const {recordList} = this;
			if (recordList.length === 0) {
				return [];
			}
			
			const newList = clone(recordList).sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
			
			const result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
			for (let i = 0; i < newList.length; i++) {
				const current = newList[i];
				const last = result[result.length - 1];
				if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
					last.items.push(newList[i]);
				} else {
					result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
				}
			}
			return result;
		}
		
		beforeCreate() {
			this.$store.commit('fetchRecords');
		}
		
		recordType = '-';
		recordTypeList = recordTypeList;
	}
</script>

<style lang="scss" scoped>
	::v-deep {
		.type-tabs-item {
			background: #c4c4c4;
			&.selected {
				background: white;
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