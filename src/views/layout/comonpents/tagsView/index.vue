<template>
  <div class="box">
    <router-link
      v-for="tag in visitedViews"
      :key="tag.path"
      :to="{to:tag.path,query:tag.query}"
      tag="span"
      :class="[{active:isActive(tag)},'span','pointer']"
    >
      {{tag.meta.title}}
      <span
        class="el-icon-close"
        @click.prevent.stop="closeSelectedTag(tag)"
        v-if="!isAffix(tag)"
      />
    </router-link>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import path from "path";
export default {
  data() {
    return {
      affixTags: []
    };
  },
  computed: {
    ...mapGetters(["visitedViews", "asyncRoutes"])
  },
  watch: {
    $route() {
      this.addTags();
    }
  },
  created() {},
  mounted() {
    this.addTags();
    this.initTags();
  },
  methods: {
    ...mapActions("tagsView", [ 
      "addVisitedView",
      "delSelectView",
      "addCachedView",
      "delCachedView"
    ]),
    isActive(route) {
      return  route.path===this.$route.path
    },
    isAffix(tag) {
      return tag.meta && tag.meta.affix;
    },
    initTags() {
      const tags = (this.affixTags = this.filterTags(this.asyncRoutes));
      for (const tag of tags) {
        if (tag.name) {
          this.addVisitedView(tag);
        }
      }
    },
    addTags() {
      const { name } = this.$route;
      if (name) {
        this.addVisitedView(this.$route);
        this.addCachedView(this.$route);
      }
    },

    filterTags(routes, basePath = "/") {
      let tags = [];
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path);
          tags.push({
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          });
        }
        if (route.children) {
          const tempTags = this.filterTags(route.children, route.path);

          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags];
          }
        }
      });
      return tags;
    },

    //关闭选择中的tag
    closeSelectedTag(view) {
      this.delSelectView(view).then((visitedViews) => {
       this.toLastView(visitedViews,view)
      });
      this.delCachedView(view);
    },

    toLastView(visitedViews, view) {
      const latestView =visitedViews.slice(-1)[0]
      if(latestView) {
        this.$router.push(latestView.path)
      }else {
        this.$router.push('/')
      }
    }
  }
};
</script>
<style  lang="scss" scoped>


.active {
  background-color: #42b983;
  color: #fff;
  border-color: #42b983;
}

.box {
  width: 100%;
  height: 30px;
  border: 1px solid red;

  .span {
    position: relative;
    display: inline-block;
    margin: 2px 10px 0;
    height: 26px;
    padding: 0 16px 0 8px;
    line-height: 26px;
    font-size: 12px;
    border: 1px solid #ccc;

    span {
      position: absolute;
      padding-left: 5px;
      right: 0;
      top: 7px;
    }
  }
}
</style>


