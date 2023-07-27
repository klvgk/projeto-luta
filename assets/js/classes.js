//Knight or Sorcerer;

//Little Monster or BigMonster;

class Character {

    _life = 1;
    maxLife = 1;
    attack = 0;
    defense = 0;

    constructor(name) {
        this.name = name;
    }

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

class Knight extends Character {
    constructor(name) {
        super(name);
        this.life = 100;
        this.attack = 10;
        this.defense = 8;
        this.maxLife = this.life;
    }
}

class Sorcerer extends Character {
    constructor(name) {
        super(name);
        this.life = 80;
        this.attack = 15;
        this.defense = 3;
        this.maxLife = this.life;
    }
}