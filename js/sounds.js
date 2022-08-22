// const soundRicochet = () => {
//   let audios = [
//     new Audio('../audio/ricochet.mp3'),
//     new Audio('../audio/ricochet2.mp3'),
//     new Audio('../audio/ricochet3.mp3')
//   ]
//   let audio = audios[Math.floor(Math.random() * 3)]
//   audio.volume = 0.6
//   audio.play()
// }

const soundRicochet = () => {
  let audio = new Audio('../audio/ricochet.mp3')
  audio.volume = 0.6
  audio.play()
}

export {soundRicochet}