#pragma strict

public var up : AudioSource;
public var down : AudioSource;
public var left : AudioSource;
public var right : AudioSource;
public var a : AudioSource;
public var pp1 : AudioSource;
public var pp2 : AudioSource;
public var pp3 : AudioSource;
public var ppSong: AudioSource;
public var background : GameObject;
public var c : BoxCollider2D;

private var onPlace : boolean;
private var playing : boolean;
private var player : GameObject;
private var count : int;
private var stat : int;

function Start () {
	onPlace = playing = false;
	player = GameObject.FindWithTag("Player");
	count = 0;
	stat = 0;
}

function Update () {

	if (onPlace && Input.GetKeyDown(KeyCode.E)) {
		if (playing) {
			playing = false;
			player.GetComponent.<AudioSource>().Play();
			if (count <= 3) player.GetComponent.<MovementPlayer>().enabled = true;
		} else {
			count = 0;
			playing = true;
			player.GetComponent.<AudioSource>().Pause();
			player.GetComponent.<MovementPlayer>().enabled = false;
			player.transform.GetChild(1).GetComponent.<Animator>().SetFloat("lookingAt", 0);
			player.transform.GetChild(1).GetComponent.<Animator>().SetFloat("Crouching", 0);
		}
	}

	if (playing) {
		if (Input.GetKeyDown(KeyCode.F)) {
			a.Play();
			if (stat == 1 || stat == 4) ++stat;
			else stat = 0;
		} else if (Input.GetKeyDown(KeyCode.RightArrow)) {
			right.Play();
			if (stat == 3) ++stat;
			else stat = 1;
		} else if (Input.GetKeyDown(KeyCode.LeftArrow)) {
			left.Play();
			stat = 0;
		} else if (Input.GetKeyDown(KeyCode.UpArrow)) {
			up.Play();
			stat = 0;
		} else if (Input.GetKeyDown(KeyCode.DownArrow)) {
			down.Play();
			if (stat == 2 || stat == 5) ++stat;
			else stat = 0;
		} else if (Input.GetKeyDown(KeyCode.P)) {
			if (count == 0) pp1.Play();
			else if (count == 1) pp2.Play();
			else if (count == 2) pp1.Play();
			else if (count == 3) {
				pp3.Play();
				ppSong.Play();
			}
			++count;

		}
	}

	if (stat == 6) {
		playing = false;
		++stat;
		background.GetComponent.<SpriteRenderer>().enabled = true;
		c.enabled = true;
		background.GetComponent.<AudioSource>().Play();
		player.GetComponent.<AudioSource>().Play();
		if (count <= 3) player.GetComponent.<MovementPlayer>().enabled = true;
	}

}

function OnTriggerEnter2D(col: Collider2D) {
	if (col.gameObject.tag == "Player") {
		onPlace = true;
	}
}

function OnTriggerExit2D(col: Collider2D) {
	if (col.gameObject.tag == "Player") onPlace = false;
}