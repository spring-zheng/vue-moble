<template>
  <div class="search-container">
    <div class="mui-input-row mui-search">
        <input type="search" class="mui-input-clear" placeholder="请输入要搜索的内容">
    </div>
    
    <p>
        <span>搜索记录</span>
        <span>清除记录</span>
    </p>
    <hr>
    <div>
        搜索历史
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
    .search-container {
        padding: 0 10px;
    }
    .mui-search {
        position: relative;
        width: 95%;
        margin: 10px auto;
    }
    .mui-input-clear {
        background-color: #eee;
        border-radius: 34px;
    }
 
</style>