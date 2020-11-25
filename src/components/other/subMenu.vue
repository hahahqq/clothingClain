<template>
  <div class="subMenu">
    <aside
      v-if="routesList.length > 0"
      :class="{ 'isFix innerbox': isFix }"
      :style="{
        width: width + 'px',
        color: textColor,
        'background-color': bgColor,
        'border-right': 'solid 1px #EBEDF0'
      }"
    >
      <div class="aTitle">
        <div v-if="activeTitle">{{ activeTitle }}</div>
      </div>
      <ul class="rList">
        <template v-for="(item, i) in routesList">
          <li
            :key="i"
            v-if="!item.hidden"
            class="title"
            :class="{ active: activePath == item.path }"
          >
            <a class="el-menu-item" @click="toFollowLink(item)">
              <div
                class="title"
                style="font-size: 12px"
                :style="activePath == item.path ? activeColor : ''"
              >
                <span>{{ item.name }}</span>
              </div>
            </a>

            <div
              v-if="item.meta.title"
              class="theHeight"
              :class="{ theLine: item.meta.line }"
            ></div>
          </li>
        </template>
      </ul>
    </aside>
  </div>
</template>
<script>
export default {
  props: {
    activePath: {
      type: String,
      default: ""
    },
    activeTitle: {
      type: String,
      default: ""
    },
    textColor: {
      type: String,
      default: "#757575"
    },
    bgColor: {
      type: String,
      default: "#fff"
    },
    routesList: {
      type: Array,
      default: []
    },
    width: {
      type: [String, Number],
      default: "100"
    },
    styleObject: {
      type: Object,
      default: function () {
        return {
          backgroundColor: "white",
          color: "#303133"
        };
      }
    },
    activeColor: {
      type: Object,
      default: function () {
        return {
          backgroundColor: "#ebedf0",
          color: "#444"
        };
      }
    }
  },
  data() {
    return {
      isFix: false
    };
  },
  methods: {
    toFollowLink(item) {
      this.$router.push({ path: item.path });
    }
  },
  mounted() {
    this.$store.dispatch("getmemberQRcodeurlstate", {}).then(() => {});
  }
};
</script>

<style scoped>
.isFix {
  position: fixed;
  top: 50px;
  overflow-x: hidden;
  overflow-y: auto;
  bottom: 0;
}
.innerbox::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.innerbox::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.1);
}
.innerbox::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 0;
  background-color: rgba(0, 0, 0, 0.05);
}
.subMenu {
  display: flex;
  position: absolute;
  top: 0px;
  bottom: 0px;
  overflow: hidden;
  height: 100%;
}
.subMenu aside {
  margin-top: 50px;
  flex: 0 0 100px;
  width: 100px;
  overflow-x: hidden;
  overflow-y: auto;
  border-right: 1px solid #ebedf0;
}
.title {
  position: relative;
  margin: 2px 0;
  text-align: center;
}
.title.active,
.title:not(.active) .el-menu-item:hover {
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
}
.el-menu-item {
  height: 30px;
  line-height: 30px;
  padding: 0 !important;
}

.theHeight {
  height: 10px;
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  position: relative;
}
.theHeight.theLine::after {
  content: "";
  position: absolute;
  left: 0;
  top: 7px;
  width: 100%;
  height: 1px;
  background-color: #ddd;
}

.aTitle {
  height: 50px;
  position: absolute;
  top: 0;
  border-right: 1px solid #ebedf0;
  width: 100%;
}
.aTitle > div {
  width: 100px;
  height: 50px;
  line-height: 50px;
  font-weight: bold;
  text-align: center;
  border-right: 1px solid #ebedf0;
  border-bottom: 1px solid #ebedf0;
  background: white;
}
ul.rList {
  display: block;
  margin-top: 10px;
}
ul.rList li > a {
  display: block;
}
</style>

