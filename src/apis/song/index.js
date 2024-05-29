import request from '~/utils/request.js';


export const getSongAPI = async (SongId=2049420307,level='exhigh') => {
  return request({
    methods: 'GET',
    url: `/song/url/v1?id=${SongId}&level=${level}`
  })
}
