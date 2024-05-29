import request from '~/utils/request.js';


export const getSearchSongAPI = async (keywords='海阔天空') => {
  return request({
    methods: 'GET',
    url: `/search?keywords=${keywords}`
  })
}
