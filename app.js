function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; //min ile max arasında rakam veren
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logs: []
        };
    },
    computed: {
        monsterBarStyles() {
            if (this.monsterHealth < 0)
                return { width: '0%' };
            return { width: this.monsterHealth + '%' };
        },
        playerBarStyles() {
            if (this.playerHealth < 0)
                return { width: '0%' };
            return { width: this.playerHealth + '%' };
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0;
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                //a draw
                this.winner = 'draw';
            } else if (value <= 0) {
                //player lost
                this.winner = 'monster';
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                //a draw
                this.winner = 'draw';
            } else if (value <= 0) {
                //monster lost
                this.winner = 'player';
            }
        }
    },
    methods: {
        attackMonster() {
            this.currentRound++;
            const attackValue = getRandomValue(1, 10);
            this.monsterHealth -= attackValue;
            this.addLog('player','attack',attackValue);
            this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getRandomValue(5, 15);
            this.playerHealth -= attackValue;
            this.addLog('monster','attack',attackValue);
        },
        specialAttackMonster() {
            this.currentRound++;
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.addLog('player','special-attack',attackValue);
            this.attackPlayer();
        },
        healPlayer() {
            this.currentRound++;
            const healVal = getRandomValue(3, 15);
            this.playerHealth += healVal;
            if (this.playerHealth > 100) this.playerHealth = 100;
            this.addLog('player','heal',healVal);
            this.attackPlayer();
        },
        startNewGame() {
            this.currentRound = 0;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null;
            this.logs = [];
        },
        surrender() {
            // this.logs=[];
            // this.addLog('player','surrender',null);
            this.winner = 'monster';
        },
        addLog(who, action,value){
            this.logs.unshift({  //unshift başa ekler sona değil!!
                actionBy : who,
                actionType : action,
                actionValue : value
            });
        }
    }
});

app.mount('#game');