function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; //min ile max arasında rakam veren
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0
        };
    },
    computed: {
        monsterBarStyles() {
            return { width: this.monsterHealth + '%' };
        },
        playerBarStyles() {
            return { width: this.playerHealth + '%' };
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0;
        }
    },
    methods: {
        attackMonster() {
            this.currentRound++;
            const attackValue = getRandomValue(1, 10);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getRandomValue(5, 15);
            this.playerHealth -= attackValue;
        },
        specialAttackMonster() {
            this.currentRound++;
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
        },
        healPlayer() {
            this.currentRound++;
            const healVal = getRandomValue(3, 15);
            this.playerHealth += healVal;
            if (this.playerHealth > 100) this.playerHealth = 100;
            this.attackPlayer();
        }
    }
});

app.mount('#game');