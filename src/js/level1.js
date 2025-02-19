import { Actor, Engine, Vector, Label, FontUnit, Font, Physics, Scene, Color } from "excalibur";
//import { Resources, ResourceLoader } from './resources.js';

import { Bubbles } from './bubbles.js';
import { RedCrab } from './redcrab.js';
import { Bottom } from './bottomborder.js';
import { Left } from './leftborder.js';
import { Right } from './rightborder.js';
import { Platform } from './platform.js';
import { BackGround } from "./background.js";
import { Cloud } from "./cloud.js";
import { Bubs } from "./bubs.js";
import { UI } from "./pointsOnScreen.js";
import { BlueCrab } from "./bluecrab.js";

export class Level1 extends Scene {

    crabRed
    crabRed2
    crabRed3

    crabBlue

    bubbles

    point = 0;

    constructor(){
        super({
            width: 800, 
            height: 600 
        })

        Physics.useRealisticPhysics();
        Physics.gravity = new Vector(0, 800);
    
    }

    bubbleJump(x,y) {

        for(let i = 5; i < 15; i ++){

            this.add(new Bubs(x, y))

        }
    }

    points(amount) {

        this.point += amount;
        console.log("eyyy puntennn " + this.point);
        this.ui.updatePoints(this.point);                    //deze functie houd de punten bij en stuurt ze weer door naar de UI class

    }

    hearts(value){
        this.ui.updateHealth(value);                         //deze functies houd de hoeveelheid hartjes bij 
    }                                                        //(deze hoeveelheid word weer opgehaald vanuit de character class)

    onActivate(ctx){

        this.bubbles.pos = new Vector(10, 500);              //reset de positie van de character

        this.crabRed.pos = new Vector(625, 314);             //reset de posities van de rode crabs
        this.crabRed2.pos = new Vector(645, -855);
        this.crabRed3.pos = new Vector(565,  -245);         

        this.crabBlue.pos = new Vector(645, -1600)           //reset de positie van de blauwe crab

        this.bubbles.reset()                                 //reset functie van de character

        this.point = 0;                                      //dit reset het aantal punten wanneer je de game opnieuw doet
        
        this.ui = new UI();                                  //dit maakt een nieuwe geresette UI aan over je game
        this.add(this.ui);                                   //de oude word namelijk in de onDeactivate() verwijderd (zie helemaal onderaan de code)

    }

    onInitialize(engine){

        const background = new BackGround();
        this.add(background);

        const sand = new Bottom();
        this.add(sand);

        const wallLeft = new Left();
        this.add(wallLeft);

        const wallRight = new Right();
        this.add(wallRight);

        this.bubbles = new Bubbles();
        this.add(this.bubbles);
        this.bubbles.pos = new Vector (10, 500);

        this.crabRed = new RedCrab();
        this.add(this.crabRed);
        this.crabRed.pos = new Vector (625, 314);

        this.crabRed2 = new RedCrab();
        this.add(this.crabRed2);
        this.crabRed2.pos = new Vector (235, -855)

        this.crabRed3 = new RedCrab();
        this.add(this.crabRed3);
        this.crabRed3.pos = new Vector (565,  -245);

        this.crabBlue = new BlueCrab();
        this.add(this.crabBlue);
        this.crabBlue.pos = new Vector (645, -1600)

        const platform = new Platform();
        this.add(platform);
        platform.pos = new Vector(220, 390);

        const platform2 = new Platform();
        this.add(platform2);
        platform2.pos = new Vector(570, 320);

        const platform3 = new Platform();
        this.add(platform3);
        platform3.pos = new Vector(420, 110);

        const platform4 = new Platform();
        this.add(platform4);
        platform4.pos = new Vector(130, -30);

        const cloudPositions = [
            new Vector(530, -150),
            new Vector(400, -420),
            new Vector(200, -580),
            new Vector(610, -755),
            new Vector(300, -940),
            new Vector(155, -1230),
            new Vector(630, -1500),
            new Vector(360, -1760)
          ]
          
          for (let p of cloudPositions) {
            const cloud = new Cloud();
            cloud.pos = p;
            this.add(cloud);
          }

    }

    onDeactivate() {
        this.ui.kill();                         //dit verwijderd de oude UI
    }
}
