//##################
//####Characters####
//##################

//Classe inicial que todo personagem irá herdar;
class Character {

    _life = 1;
    maxLife = 1;
    attack = 0;
    defense = 0;

    constructor(name) {
        this.name = name;
    }

    //Getters and Setters
    get life() {
        return this._life;
    }
    set life(newLife) {
        /*
        O novo valor de vida é menor que 0?
        Se sim, _life recebe o valor de 0.
        Se não, _life recebe o novo valor de vida.
        */
        this._life = newLife < 0 ? 0 : newLife;

    }
}

//Knight
class Knight extends Character {
    constructor(name) {
        super(name);
        //Valor de HP do Knight passado para o Setter _life em Character;
        this.life = 100;
        this.attack = 10;
        this.defense = 8;
        //A vida maxima do Knight será inicializado, atualizado e verificado pelo Setter _life em Character;
        this.maxLife = this.life;
    }
}

//Sorcerer
class Sorcerer extends Character {
    constructor(name) {
        super(name);
        //Valor de HP do Sorcerer passado para o Setter _life em Character;
        this.life = 80;
        this.attack = 15;
        this.defense = 3;
        //A vida maxima do Sorcerer será inicializado, atualizado e verificado pelo Setter _life em Character;
        this.maxLife = this.life;
    }
}

//LittleMonster
class LittleMonster extends Character {
    constructor() {
        super('Little Monster');
        //Valor de HP do LittleMonster passado para o Setter _life em Character;
        this.life = 40;
        this.attack = 4;
        this.defense = 4;
        //A vida maxima do LittleMonster será inicializado, atualizado e verificado pelo Setter _life em Character;
        this.maxLife = this.life;
    }
}

class BigMonster extends Character {
    constructor() {
        super('Big Monster');
        //Valor de HP do BigMonster passado para o Setter _life em Character;
        this.life = 120;
        this.attack = 16;
        this.defense = 6;
        //A vida maxima do BigMonster será inicializado, atualizado e verificado pelo Setter _life em Character;
        this.maxLife = this.life
    }
}

//#####################################
//####Elementos que compõem a arena####
//#####################################
class Stage {
    /*
    A arena vai receber os dados de 2Personagens e 2 Elementos dos personagens.
    Os Elementos serão a parte visual da personagens na tela, que será atualizada
    ao decorrer da batalha;
    */
    constructor(fighter1, fighter2, fighter1El, fighter2El) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
    }

    //Inicializa o jogo;
    start() {
        //Atualiza a tela;
        this.update();

        /*
        Seleção dos botões de Attack, com EventListener que irá disparar
        a função doAttack() quando houver click;
        */
        this.fighter1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
        this.fighter2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));
    }

    //Atualiza os elementos da tela;
    update() {
        //Fighter1;
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`;
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife * 100);
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`;
        //Fighter2;
        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP`;
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife * 100);
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`;
    }

    //Lógica por trás do calculo de Ataque e Defesa;
    doAttack(attacking, attacked) {

        //Verifica se o ataque foi feito em um personagem que já morreu;
        if(attacking.life <= 0 || attacked.life <= 0){
            console.log('Respeite os mortos!');
            return;
        }

        //Algoritmo que calcula o Fator de Ataque/Defesa dos personagens;
        let attackFactor = (Math.random() *2).toFixed(2);
        let defenseFactor = (Math.random() * 2).toFixed(2);

        /*
        Ataque e Defesa atuais, que são o Ataque/Defesa dos personagens,
        multiplicados pelo Fator de Ataque/Defesa dos personagens;
        */
        let actualAttack = attacking.attack * attackFactor;
        let actualDefense = attacked.defense * defenseFactor;
        console.log("Attack: " + actualAttack);
        console.log("Defense: " + actualDefense);

        //Verificação se o Ataque foi Defendido ou teve Exito;
        if(actualAttack > actualDefense) {
            attacked.life -= actualAttack;
            console.log(`${attacking.name} causou ${actualAttack}`);
        }else{
            console.log(`${attacked.name} conseguiu defender..`);
        }

        //Atualiza os elementos da tela com os novos status.
        this.update();
    }
}