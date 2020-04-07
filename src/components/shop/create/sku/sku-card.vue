<template>
	<div class="card mb-3" style="line-height: 1.2;">
		<div class="card-header d-flex align-items-center">
			规格项：
			<el-input size="mini" style="width: 200px;"
			:value="item.name" @input="vModel('name',index,$event)">
				<el-button slot="append" 
				icon="el-icon-more"></el-button>
			</el-input>
			<el-radio-group size="mini" 
			:value="item.type" @input="vModel('type',index,$event)"
			style="margin-bottom: -10px;" class="ml-2">
				<el-radio :label="0">无</el-radio>
				<el-radio :label="1">颜色</el-radio>
				<el-radio :label="2">图片</el-radio>
			</el-radio-group>
			<!-- 上移 -->
			<el-button size="mini" class="ml-auto" 
			:disabled="index === 0"
			icon="el-icon-top" @click="sortCard('moveUp',index)"
			></el-button>
			<!-- 下移 -->
			<el-button size="mini" 
			:disabled="total === (index+1)"
			icon="el-icon-bottom"  @click="sortCard('moveDown',index)"
			></el-button>
			<!-- 删除 -->
			<el-button size="mini" @click="delSkuCard(index)"
			type="text">删除</el-button>
		</div>
		<div class="card-body">
			<!-- 规格属性列表 -->
			<div class="d-flex align-items-center flex-wrap">
				
				<sku-card-children :type="item.type"
				v-for="(item2,index2) in list"
				:key="index2" :item="item2"
				:index="index2" :cardIndex="index"
				v-dragging="{ item: item2, list: list, group: `skuItem${index}` }"></sku-card-children>
				
			</div>
			<!-- 增加规格属性 -->
			<div class="mt-2">
				<el-button type="text" size="mini"
				icon="el-icon-plus" @click="addSkuValue(index)">
					增加规格值
				</el-button>
			</div>
			
		</div>
	</div>
</template>

<script>
	import skuCardChildren from "./sku-card-children.vue"
	import {mapState,mapMutations} from "vuex"
	export default {
		components: {
			skuCardChildren
		},
		props: {
			item: Object,
			index:Number,
			total:Number
		},
		data() {
			return {
				list: this.item.list
			}
		},
		mounted() {
			// 监听拖拽过程
			// this.$dragging.$on('dragged', ({ value }) => {
			//   // console.log(JSON.stringify(value.list));
			// })
			// 监听拖拽结束
			this.$dragging.$on('dragend', (e) => {
				if (e.group === 'skuItem'+this.index) {
					this.sortSkuValue({
						index:this.index,
						value:this.list
					})
				}
			})
		},
		methods: {
			...mapMutations(['delSkuCard','vModelSkuCard','sortSkuCard','addSkuValue','sortSkuValue']),
			vModel(key,index,value){
				this.vModelSkuCard({key,index,value})
			},
			// 排序规格卡片
			sortCard(action,index){
				this.sortSkuCard({action,index})
			}
		},
	}
</script>

<style>
</style>
