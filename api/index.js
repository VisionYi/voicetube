export default $axios => ({
  getVideoList: () => {
    return $axios.get('https://us-central1-lithe-window-713.cloudfunctions.net/frontendQuiz')
  }
})
