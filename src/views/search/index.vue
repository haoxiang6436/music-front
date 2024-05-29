<template>
  <div class="container">
    <el-card style="width: 100%;" >
      <template #header>
        <div class="header">
          <el-input size="large" v-model="searchQuery" placeholder="搜索歌曲" clearable @clear="handleClear"
            @keyup.enter="handleSearch">
          </el-input>
          <el-button type="primary" size="large" @click="handleSearch">搜索</el-button>
        </div>
      </template>
      <div class="content" v-auto-animate v-loading="LoadingState">
        <div v-if="!LoadingState" v-for="item in songs" :key="item.id" class="item" @dblclick="DownloadSong(item.id)" >
          <span class="SongName">{{ item.name }}</span>
          -
          <span class="artists" v-for="item in item.artists" :key="item.id">{{ item.name }}</span>
          <!-- <el-button @click="">播放</el-button> -->
          <el-button type="primary" class="playBtn" @click="DownloadSong(item.id)" :icon="CaretRight" circle />
        </div>
      </div>
    </el-card>
    <audio ref="audio" controls :src="MusicUrl"></audio>
  </div>
</template>

<script setup>

import { CaretRight } from '@element-plus/icons-vue';
import { ElButton } from 'element-plus';
import { nextTick, ref } from 'vue';
import {getSearchSongAPI} from '~/apis/search';
import {getSongAPI} from '~/apis/song';
const searchQuery = ref('');
const songs = ref([]);
const MusicUrl = ref('')
const audio = ref(null)
const LoadingState = ref(false)

const handleSearch = async () => {
  if (searchQuery.value==='') {
    ElMessage('内容空')
    return
  }
  if (searchQuery.value==='') {
    ElMessage('内容空')
    return
  }
  LoadingState.value = true
  const getSearchSong = await getSearchSongAPI(searchQuery.value);
  console.log(getSearchSong);
  songs.value = getSearchSong.songs
  LoadingState.value = false
  searchQuery.value=''
};
const DownloadSong = async (id) => {
  const song = await getSongAPI(id)
  console.log(song[0].url);
  MusicUrl.value = song[0].url
  console.log(audio.value);
  await nextTick()
  audio.value.play()
}
const handleClear = () => {
  songs.value = [];
};
</script>

<style lang="scss">
.container {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: start;
  height: 100vh;
  max-width: 1000px;
  padding: 20px;
  margin: 0 auto;

  .header {
    width: 100%; // 调整为黄金分割比例
    display: flex;
    flex-flow: row nowrap;
    gap: 10px;
  }

  .content {
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    gap: 10px;
    width: 100%;
    min-height: 50px;
    max-height: 75vh;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 20 10px;
    .item {
      // margin-bottom: 5px;
      padding: 10px 20px;
      background-color: #dfdfdf50;
      // transition: all 0.2s ;
      border-radius: 5px;
      cursor: pointer;
      display: flex;
      align-items: center;
      .playBtn {
        margin-left: auto;
      }
      &:hover {
      background-color: #dfdfdf80;
        // transform: scale(1.01) ;
      }
    }
  }
  audio {
    position: fixed;
    left: 50%;
    bottom: 10px;
    transform: translateX(-50%);
  }
}
</style>