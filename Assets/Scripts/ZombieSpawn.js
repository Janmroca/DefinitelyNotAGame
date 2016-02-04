#pragma strict

public var timeToSpawn : float = 0.0f;
public var zombie : GameObject;

private var triggered : boolean = false;
private var time : float = 0.0f;
private var time2 : float = 0.0f;

function Start() {
	time = 5.0f;
	time2 = 1.0f;
}

function Update () {
	time += Time.deltaTime;
	time2 += Time.deltaTime;
	if (time > timeToSpawn) {
		time = 0;
		var xoffset : float = Random.Range(transform.position.x+3, transform.position.x+10);
		if (xoffset < 39 && xoffset > -39) Instantiate(zombie, Vector3(xoffset, -4.1, 0), Quaternion());
	}
	if (time2 > timeToSpawn) {
		time2 = 0;
		var xoffset2: float = Random.Range(transform.position.x-5, transform.position.x-2);
		if (xoffset2 < 39 && xoffset2 > -39)Instantiate(zombie, Vector3(xoffset2, -4.1, 0), Quaternion());
	}

}