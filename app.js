function getRandomValue(min,max){
    return Math.floor(Math.random() * (max - min)) + min; //min ile max arasında rakam veren
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100
        };
    },
    methods: {
        attackMonster() {
            const attackValue = getRandomValue(1,10);
            this.monsterHealth-=attackValue;
            this.attackPlayer();
        },
        attackPlayer(){
            const attackValue = getRandomValue(5,15);
            this.playerHealth-=attackValue;
        }
    }
});

app.mount('#game');