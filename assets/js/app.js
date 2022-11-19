const delay = (milliseconds = 700) => new Promise(resolve => setTimeout(resolve, milliseconds))
const notyf = new Notyf({
    position: {
        x: 'right',
        y: 'top'
    }
});
const game = () => {
    return {
        isStarted: false,
        isEnded: false,
        seconds: 60,
        countdownInterval: null,
        score: 0,
        cards: [{
                key: 'abbey-road',
                isFlipped: false,
                isCleared: false,
                animated: ''
            },
            {
                key: 'abbey-road',
                isFlipped: false,
                isCleared: false,
                animated: ''
            },
            {
                key: 'semut-hitam',
                isFlipped: false,
                isCleared: false,
                animated: ''
            },
            {
                key: 'semut-hitam',
                isFlipped: false,
                isCleared: false,
                animated: ''
            },
            {
                key: 'led-zeppelin-1',
                isFlipped: false,
                isCleared: false,
                animated: ''
            },
            {
                key: 'led-zeppelin-1',
                isFlipped: false,
                isCleared: false,
                animated: ''
            },
            {
                key: 'beggars-banquet',
                isFlipped: false,
                isCleared: false,
                animated: ''
            },
            {
                key: 'beggars-banquet',
                isFlipped: false,
                isCleared: false,
                animated: ''
            },
            {
                key: 'a-hard-road',
                isFlipped: false,
                isCleared: false,
                animated: ''
            },
            {
                key: 'a-hard-road',
                isFlipped: false,
                isCleared: false,
                animated: ''
            },
            {
                key: 'bold-as-love',
                isFlipped: false,
                isCleared: false,
                animated: ''
            },
            {
                key: 'bold-as-love',
                isFlipped: false,
                isCleared: false,
                animated: ''
            },
        ].sort(() => Math.random() - .5),

        get flippedCards() {
            return this.cards.filter(card => card.isFlipped)
        },

        get clearedCards() {
            return this.cards.filter(card => !card.isCleared)
        },

        async resetGame() {
            this.isEnded = false
            this.cards.sort(() => Math.random() - .5)
            this.score = 0
            this.seconds = 60
            this.isStarted = false
            this.cards.forEach(card => {
                card.isFlipped = false
                card.isCleared = false
                card.animated = ''
            })
        },

        start() {
            this.isStarted = true
            const endTime = moment(new Date()).add(1, 'minutes').toDate()
            this.countdownInterval = setInterval(() => {
                const timer = countdown(new Date(), new Date(endTime))
                this.seconds = timer.seconds
                if (this.seconds <= 0) {
                    this.isEnded = true;
                    if (this.score < 100) {
                        notyf.error('Game Over')
                    } else {
                        notyf.success('You win the game');
                    }
                    clearInterval(this.countdownInterval)
                    return false;
                }
            }, 1000)
        },

        async flipCard(card) {
            if (this.isStarted && !this.isEnded) {
                if (this.flippedCards.length === 2) return;
                card.isFlipped = !card.isFlipped

                // Check if two cards reavealed
                if (this.flippedCards.length === 2) {
                    if (this.flippedCards[0].key === this.flippedCards[1].key) {
                        this.score += 16.6
                        this.flippedCards.forEach(card => card.animated = 'animate__animated animate__flash')
                        await delay()
                        this.flippedCards.forEach(card => card.isCleared = true)
                        // If Finish
                        if (this.clearedCards.length === 0) {
                            notyf.success('You win the game');
                            clearInterval(this.countdownInterval)
                            this.isEnded = true
                            if(this.isEnded) {
                                this.cards.forEach(card => card.isFlipped = true)
                                this.cards.forEach(card => card.isCleared = false)
                            }
                            return false;
                        }
                    }
                    // Close all cards
                    this.flippedCards.forEach(card => card.animated =
                        'animate__animated animate__jello')
                    await delay();
                    this.clearedCards.forEach(card => card.animated = '')
                    this.flippedCards.forEach(card => card.isFlipped = false);
                }
            }
        }
    }
}