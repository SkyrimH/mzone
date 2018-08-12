<template>
  <div>
    <el-container>
      <el-header style="text-align: left; font-size: 18px">
                  <img class="logo" src="static/logo.png">
        <div class="header-left">
          <el-menu
          :default-active="activeIndex"
          class="el-menu-header"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router>
            <el-menu-item index="/"> 主页 </el-menu-item>
            <el-menu-item index="/video"> 影视 </el-menu-item>      
            <el-menu-item index="/ebook">电子书</el-menu-item>
            <el-menu-item index="/game"> 游戏 </el-menu-item>
          </el-menu>
        </div>  
      </el-header>  
    </el-container>
  </div>
</template>
<script>
  export default {
    name: 'mainHeader',
    data() {
      return {
        activeIndex: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }

</script>
<style>
  .logo {
    position: absolute;
    z-index: 99;
    width: 60px;
    height: 60px;
    padding-left: 60px
  }
  .el-menu-item {
    width: 90px;
    text-align: center
  }
  .el-header {
    background-color: #545c64;
  }
  .header-left {
    float: left;
    padding-left: 140px
  }

</style>
