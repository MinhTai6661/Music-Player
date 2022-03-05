
/**
    1. render song ==> 0k
    2. scroll Song ==> OK
    3. Play /pause / seek ==>OK
    4.cd rotate ==>OK
    5. Next/prev ==>OK
    6. random ==>OK
    7. next /repeat song when the song ended ==>OK
    8. active song  ==>OK
    9. scroll active song into view
    10. play song when click  ==>OK
    11.volume ==>OK
 */

/*
    UPDATE FEATURE

    1.smooth play/pause ==>OK
    2. opacity border cd ==>OK

*/
/**fix bug
    1.random ==>OK
    2. overflow text

 */


//nghiên cứu lại blured border

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

//declare
const MUSIC_PLAYER_STORAGE = 'PLAYER'

const playList = $('.play-list')
const cdThumb = $('.cd-thumb')
const nameSong = $('.info-name')
const audio = $('#audio')
const cd = $(".cd")
const togglePLay = $('.btn-toggle-play')
const songProgress = $('.progress-song')
const control = $('.control')

const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')

const volume = $('.volume')
const progressVolume = $('.progress-volume')
const toggleMuted = $('.volume-icon ')
const currentTime = $('.current-time')
const duration = $('.duration')
const dashboardBg = $('.dashboard-bg')


const app = {
    //Auxiliary variable
    //normal
    currentIndexSong: 0,
    listSongPlayed: [],
    currentVolume: 1,
    config: JSON.parse(localStorage.getItem(MUSIC_PLAYER_STORAGE)) || {},
    //boolean
    isPlaying: false,
    isTimeUpdate: true,
    isRandom: false,
    isRepeat: false,
    isMuted: false,

    //List song and render
    songs: [
        {
            name: "I Like You So Much",
            singer: "Ysabelle",
            path: "https://mp3-s1-zmp3.zadn.vn/edd20aadd9e930b769f8/2971806970040545113?authen=exp=1646657486~acl=/edd20aadd9e930b769f8/*~hmac=889e13a1756cedaac87aa164d45609e3&fs=MTY0NjQ4NDY4NjQ3Nnx3ZWJWNnwwfDE0LjI0MC45OC4xNDQ",
            image:
                " https://i1.sndcdn.com/artworks-000514246293-tnfsei-t500x500.jpg"
        },
        
        
        {
            name: "Unstoppable",
            singer: "Sia",
            path: "https://vnso-zn-23-tf-mp3-s1-zmp3.zadn.vn/d50ff48b56cfbf91e6de/5669456849702829973?authen=exp=1646656313~acl=/d50ff48b56cfbf91e6de/*~hmac=7c66fbcd290f50a3e4ef62bdaf516559&fs=MTY0NjQ4MzUxMzQ4Mnx3ZWJWNnwwfDEyMy4yNC4xNDMdUngMjmUsIC",
            image:
                " https://i.ytimg.com/vi/shLUsd7kQCI/maxresdefault.jpg"
        },
        
        
        {
            name: "колыбельная",
            singer: "Rauf & Faik ",
            path: "https://mp3-s1-zmp3.zadn.vn/88238c369b71722f2b60/1954646310395338664?authen=exp=1646662966~acl=/88238c369b71722f2b60/*~hmac=e7b004ee19d87c1334a95fc9baf94054&fs=MTY0NjQ5MDE2NjM0N3x3ZWJWNnw1MzUwMzYzMnwxNzEdUngMjQ5LjE3OS4yMDA",
            image:
                " https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/a/e/a/f/aeaf0ea7983a9582abac187a7ea7f09e.jpg"
        },
        
   
        {
            name: "Hello",
            singer: "OMFG",
            path: "https://vnso-zn-16-tf-mp3-s1-zmp3.zadn.vn/6355dce945adacf3f5bc/370262801456987038?authen=exp=1646656906~acl=/6355dce945adacf3f5bc/*~hmac=37bfd91c28ac6a9c79bfc79313a8a810&fs=MTY0NjQ4NDEwNjM1M3x3ZWJWNnwwfDE0LjI0MC45OC4xNDQ",
            image: "https://i1.sndcdn.com/artworks-000136224911-0qsug2-t500x500.jpg"

        },
        {
            name: "Fade",
            singer: "Alan Walker",
            path: "https://mp3-s1-zmp3.zadn.vn/15175e1f0b58e206bb49/1788040993047708896?authen=exp=1646656929~acl=/15175e1f0b58e206bb49/*~hmac=0cd92bafcdd31043b3b7ec93755a3a70&fs=MTY0NjQ4NDEyOTk2NHx3ZWJWNnwwfDExMy4xNjEdUngMTMyLjkz",
            image: "https://avatar-ex-swe.nixcdn.com/singer/avatar/2018/07/19/8/1/6/a/1531967352055.jpg"
        },
        {
            name: " Fade (Hell's Speaker Remix)  ",
            singer: "Raftaar x Nawazuddin Siddiqui",
            path: "https://mp3-s1-zmp3.zadn.vn/df6a7496add2448c1dc3/1098364174222460039?authen=exp=1646657051~acl=/df6a7496add2448c1dc3/*~hmac=75a727311a181df8a23815c08bdd6511&fs=MTY0NjQ4NDI1MTE0OXx3ZWJWNnwwfDE0LjI0MC45OC4xNDQ",
            image:
                "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
        },
  
     

    ],
    render() {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song  ${index === this.currentIndexSong ? 'active' : ''}">
              
                <div class="img-thumb" 
                  style="background-image: url('${song.image}');">
                </div>
                <div class="song-body">
                    <h3 class="song-name">
                       ${song.name}
                    </h3>
                    <span class="song-singer">
                    ${song.singer}  
                    </span>
                </div>
                <div class="song-option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div> 
            `
        })
        playList.innerHTML = htmls.join('')
    },

    //functions
    formatTime(time) {
        const hours = Math.floor(time / 3600)
        const minute = Math.floor((time - hours * 3600) / 60)
        const second = Math.floor(time - (hours * 3600 + minute * 60))
        if (Math.floor(hours)) {
            return ` ${hours}:${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`
        } else {
            return `${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`
        }
    },
    nextSong() {
        this.currentIndexSong++
        if (this.currentIndexSong > this.songs.length - 1) {
            this.currentIndexSong = 0
        }
        this.loadCurrentSong()

    },
    prevSong() {
        this.currentIndexSong--

        if (this.currentIndexSong < 0) {
            this.currentIndexSong = this.songs.length - 1
        }

        this.loadCurrentSong()
    },
    randomSong() {
        let randomIndex
        do {
            randomIndex = Math.floor(Math.random() * this.songs.length)
            console.log('looping...')
        } while (this.listSongPlayed.includes(randomIndex))
        this.currentIndexSong = randomIndex
        this.addToListSongPlayed(randomIndex)
        this.loadCurrentSong()


    },
    addToListSongPlayed(newSong) {

        if (this.listSongPlayed.length <= this.songs.length - 2) { //bo bai dang phat va bai trong list da phat
            this.listSongPlayed.push(newSong)
        } else {
            this.listSongPlayed = [newSong]
        }
        console.log('List song played: ', this.listSongPlayed)

    },
    setConfig(key, value) {
        this.config[key] = value;
        localStorage.setItem(MUSIC_PLAYER_STORAGE, JSON.stringify(this.config));
    },

    //load data when start app
    loadConfig() {

        if (typeof (this.config.currentIndexSong) !== 'undefined') {
            const currentTime = this.formatTime(Math.floor(this.config.currentTime)) || '0:00'
            const currentSong = this.songs[this.config.currentIndexSong].name || this.songs[0].name
            const questions = confirm(`Vừa rồi bạn đã nghe bài ${currentSong} tại phút thứ ${currentTime}. Bạn có muốn nghe tiếp không ? `)
            if (questions) {
                this.isRandom = this.config.isRandom || false
                this.isRepeat = this.config.isRepeat || false
                this.isMuted = this.config.isMuted || false

                this.currentIndexSong = this.config.currentIndexSong || 0
                this.currentVolume = this.config.currentVolume || 1
                audio.currentTime = this.config.currentTime || 0

                //load btn active
                repeatBtn.classList.toggle('active', this.isRepeat)
                randomBtn.classList.toggle('active', this.isRandom)
                volume.classList.toggle('muted', this.isMuted)


                if (this.isMuted) {
                    audio.volume = 0
                    progressVolume.value = 0
                } else {
                    audio.volume = this.currentVolume
                    progressVolume.value = this.currentVolume * 100
                }
            } else {
                localStorage.removeItem(MUSIC_PLAYER_STORAGE);
                localStorage.clear();
                sessionStorage.clear();

            }
        }

    },
    loadCurrentSong() {

        cdThumb.style.backgroundImage = `url('${this.songs[this.currentIndexSong].image}')  `
        nameSong.innerHTML = this.songs[this.currentIndexSong].name
        audio.src = this.songs[this.currentIndexSong].path
        dashboardBg.style.backgroundImage = `url('${this.songs[this.currentIndexSong].image}')`
        duration.innerHTML = '0:00'
    },

    //handle events
    handleEvents() {
        const _this = this
        
        let cliked = false
        const timeSmooth = 1500
        const listSong = $$('.song')
        _this.listSongPlayed = _this.isRandom && [_this.currentIndexSong] || []

        const handleChangeSong = () => {
            this.setConfig('currentIndexSong', this.currentIndexSong)
        }
        const cdRotate = cd.animate([
            {
                transform: 'rotate(360deg)',
            }
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdRotate.pause()

        // dieu chinh do nho va opacity cua cd
        const cdWidth = cd.offsetWidth
        document.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.documentElement.scrollY
            let newCdWidth = scrollTop ? cdWidth - scrollTop : cdWidth
            cd.style.width = (newCdWidth > 0) ? newCdWidth + "px" : 0
            cd.style.opacity = newCdWidth / cdWidth
        })

        //play hoac pause
        togglePLay.addEventListener('click', () => {
            if (_this.isPlaying) {
                if (!cliked) {
                    cliked = true
                    control.classList.remove('playing', _this.isPlaying)

                    let volume = _this.currentVolume
                    const intervalID = setInterval(() => {
                        if (!_this.isMuted) {
                            if (volume > 0) {
                                volume -= 0.01
                                if (volume >= 0) {
                                    audio.volume = volume
                                }
                            }
                            if (volume <= 0) {
                                clearInterval(intervalID)
                                audio.pause()
                                audio.volume = _this.currentVolume
                                _this.isPlaying = !_this.isPlaying
                                cliked = false
                            }
                            console.log('pausing...')
                        } else {
                            clearInterval(intervalID)

                            audio.pause()
                            audio.volume = _this.currentVolume
                            _this.isPlaying = !_this.isPlaying
                            cliked = false
                        }

                    }, timeSmooth / (1 / 0.01))
                }
            } else {
                let volume = 0.1
                if (!cliked) {
                    audio.currentTime -= 0.5
                    cliked = true
                    audio.volume = 0
                    audio.play()
                    const intervalID = setInterval(() => {
                        if (!_this.isMuted) {
                            if (volume <= _this.currentVolume) {
                                volume += 0.1
                                if (volume <= _this.currentVolume) {
                                    audio.volume = volume
                                }
                            }
                            if (volume >= _this.currentVolume || _this.isMuted) {
                                clearInterval(intervalID)

                                audio.volume = _this.currentVolume
                                _this.isPlaying = !_this.isPlaying

                                cliked = false
                            }
                            console.log('playing... ')
                        } else {
                            clearInterval(intervalID)

                            audio.volume = 0
                            _this.isPlaying = !_this.isPlaying

                            cliked = false
                            console.log('mute')
                        }

                    }, timeSmooth / (1 / 0.1))
                }
            }

            this.setConfig('currentIndexSong', this.currentIndexSong)
            console.log(!_this.isPlaying ? 'is Playing...' : 'not Playing')

        })
        // dieu dinh cd quay hay khong
        audio.addEventListener('play', () => {
            cdRotate.play()
            control.classList.add('playing', _this.isPlaying)
        })
        audio.addEventListener('pause', () => {
            control.classList.remove('playing', _this.isPlaying)
            cdRotate.pause()
        })

        //update value to songProgress
        audio.addEventListener('timeupdate', () => {
            if (_this.isTimeUpdate) {
                progressSongValue = (audio.currentTime / audio.duration) * 100
                songProgress.value = progressSongValue || 0

                _this.setConfig('currentTime', audio.currentTime)

                currentTime.innerHTML = _this.formatTime(audio.currentTime)
                duration.innerHTML = _this.formatTime(audio.duration) || '0:00'

            }
        })
        // console.log(_this.formatTime(34534567))

        //seek 

        songProgress.addEventListener('change', () => {

            let valueProgress = songProgress.value
            let timeUpdate = (valueProgress * audio.duration) / 100
            audio.currentTime = timeUpdate
            _this.isTimeUpdate = true

        })
        //use mouseDown event because click event include mouseDown and mouseOver.
        //between mouseDown and mouseOver, update event of audio will run
        songProgress.addEventListener('mousedown', () => {
            _this.isTimeUpdate = false
        })

        //ACTIVE
        const handleActive = () => {
            listSong.forEach((song, index) => {
                song.classList.remove('active')
                listSong[_this.currentIndexSong].classList.add('active')

            })
        }

        // NEXT AND PREV SONG 
        const handlesNext = () => {
            if (_this.isRandom) {
                _this.randomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            handleActive()
            handleChangeSong()

        }
        const handlesPrev = () => {
            if (_this.isRandom) {
                _this.randomSong()
            } else {
                _this.prevSong()
            }
            handleActive()

            audio.play()
            handleChangeSong()

        }
        nextBtn.addEventListener('click', handlesNext)
        prevBtn.addEventListener('click', handlesPrev)

        //RANDOM
        randomBtn.addEventListener('click', (e) => {
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active', _this.isRandom)
            _this.setConfig('isRandom', _this.isRandom)
            _this.listSongPlayed = _this.isRandom && [_this.currentIndexSong] || []
            console.log('List song played: ', _this.listSongPlayed)
        })
        repeatBtn.addEventListener('click', (e) => {
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle('active', _this.isRepeat)
            _this.setConfig('isRepeat', _this.isRepeat)

        })


        audio.addEventListener('ended', () => {
            if (_this.isRepeat) {
                audio.play()
            } else {
                handlesNext()
            }

        })

        //play song when click 
        listSong.forEach((song, index) => {
            song.addEventListener('click', (e) => {
                if (e.target.closest('.song:not(.active)')
                    && e.target.closest(' :not(.song-option)')) {
                    if (e.target.closest('.song:not(.active)')) {
                        _this.currentIndexSong = index
                        _this.loadCurrentSong()
                        audio.play()
                        handleActive()

                        if (_this.isRandom) {

                            _this.addToListSongPlayed(index)
                        } else {
                            _this.listSongPlayed = [index]
                        }

                        handleChangeSong()
                    }

                } else if (e.target.closest(' .song-option')) {

                    console.log('option')
                }

            })
        })


        //volume

        progressVolume.addEventListener('change', () => {
            if (progressVolume.value > 0) {
                const newVolumeValue = progressVolume.value / 100
                audio.volume = newVolumeValue
                _this.currentVolume = newVolumeValue
                _this.isMuted = false

            } else {
                _this.isMuted = !_this.isMuted
                console.log(progressVolume.value)
            }
            handleMuted()
            _this.setConfig('currentVolume', audio.volume)
        })

        const handleMuted = () => {
            if (_this.isMuted) {
                volume.classList.toggle('muted', _this.isMuted)
                audio.volume = 0
                progressVolume.value = 0
            } else {
                volume.classList.toggle('muted', _this.isMuted)
                audio.volume = _this.currentVolume
                progressVolume.value = _this.currentVolume * 100
            }
            _this.setConfig('currentVolume', audio.volume)

            _this.setConfig('isMuted', _this.isMuted)

        }
        toggleMuted.addEventListener('click', () => {
            if (_this.isMuted) {
                _this.isMuted = !_this.isMuted
                handleMuted()
            } else {
                _this.isMuted = !_this.isMuted
                handleMuted()

            }
        })
    },
    start() {
        this.loadConfig()
        this.loadCurrentSong()

        this.render();
        this.handleEvents()
    }

}
app.start()