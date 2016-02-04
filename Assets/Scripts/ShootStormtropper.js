#pragma strict

public var projectile : Rigidbody2D;
public var bulletSpeed : float = 0.0f;
public var rateOfFire : float = 0.0f;

private var counter : float = 0;
private var player : GameObject;

function Start () {
	counter = -1.0f;
	player = GameObject.FindWithTag("Player");
}

function Update () {
	counter += Time.deltaTime;
	if(counter >= 1/rateOfFire) {
		counter = 0;
		var bullet : Rigidbody2D = Rigidbody2D.Instantiate(projectile,
												transform.position,transform.rotation);
		bullet.velocity = transform.right * bulletSpeed;
		Physics2D.IgnoreCollision(bullet.GetComponent.<Collider2D>(),transform.parent.gameObject.GetComponent.<Collider2D>());
	}
}