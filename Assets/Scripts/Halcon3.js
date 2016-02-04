#pragma strict

public var spawnAnim : GameObject;
private var colliding : boolean = false;
private var tiempo : float = 0.0f;
private var llegada : boolean = false;
private var spawn : boolean = false;

function Update() {
	tiempo += Time.deltaTime;
	if(!llegada) {
		GameObject.FindWithTag("Navi").gameObject.transform.GetChild(0).GetComponent.<ParticleSystem>().Stop();
		transform.position += Vector2(1,-1)*Time.deltaTime;
	}
	else if(!spawn){
		spawn = true;
		transform.GetChild(0).gameObject.GetComponent.<ParticleSystem>().Stop();
		GameObject.FindWithTag("Player").gameObject.transform.GetChild(1).GetComponent.<SpriteRenderer>().enabled = true;
		GameObject.FindWithTag("Player").gameObject.GetComponent.<MovementPlayer>().enabled = true;
		GameObject.FindWithTag("Navi").gameObject.GetComponent.<SpriteRenderer>().enabled = true;
		GameObject.FindWithTag("Navi").gameObject.transform.GetChild(0).GetComponent.<ParticleSystem>().Play();
		spawnAnim = Instantiate(spawnAnim,GameObject.FindWithTag("Player").gameObject.transform.position,
										GameObject.FindWithTag("Player").gameObject.transform.rotation);
	}
	if(tiempo > 5)
		llegada = true;
	if(tiempo > 6) Destroy(spawnAnim);
}