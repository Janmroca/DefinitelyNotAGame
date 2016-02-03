#pragma strict

import UnityEngine.UI;

public var Life : Text;

private var life : int;

function Start () {
	life = 99;
}

function Update () {
	if(life <= 0) Application.LoadLevel(Application.loadedLevel);
}

function decreaseLife (num : int) {
	life -= num;
	if(life < 0) life = 0;
	Life.text = "" + life;
}

function increaseLife (num : int) {
	life += num;
}