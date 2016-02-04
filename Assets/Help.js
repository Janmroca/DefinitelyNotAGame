#pragma strict

public var text : Text;

private var time: float;

function Start () {
	time = 0.0f;
}

function Update () {
	time += Time.deltaTime;
	if (time >= 5 && time <= 5.1) {
		GetComponent.<AudioSource>().Play();
		text.text = "¡EL TEMPLO DEL TIEMPO! COMO ERA ESA CANCIÓN...   \n" +
						"Recuerda usar los items pulsando E";
	}
	if (time >= 30 && time <= 30.1) {
		text.text = "¡YA LO RECUERDO! ¡TOCA LA CANCIÓN DEL TIEMPO!";
		GetComponent.<AudioSource>().Play();
	}
}