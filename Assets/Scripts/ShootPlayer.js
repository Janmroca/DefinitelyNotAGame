#pragma strict

public var projectile : Rigidbody2D;
public var bulletSpeed : float = 0.0f;
public var shootSpawn: GameObject;

private var animator : Animator;
private var time : float;
private var dir : Vector3;

function Start () {
	animator = transform.parent.gameObject.transform.GetChild(1).gameObject.GetComponent.<Animator>();
}

function Update () {

	time += Time.deltaTime;
	if(Input.GetKeyDown(KeyCode.F) || Input.GetButtonDown("X")) {
		time = 0;
		animator.SetFloat("shoot", 1);

		if(animator.GetFloat("lookingAt") == 2.0f) {
			dir = Vector3(transform.position.x+1, transform.position.y-0.1, transform.position.z);
			if (animator.GetFloat("Crouching")) dir.y-= 0.7;
			Instantiate(shootSpawn, dir, transform.rotation);
			var bullet0 : Rigidbody2D = Rigidbody2D.Instantiate(projectile, dir,transform.rotation);
			bullet0.velocity = transform.right*bulletSpeed;
			bullet0.transform.GetChild(0).gameObject.GetComponent.<Animator>().SetFloat("dir", 2);
			Physics2D.IgnoreCollision(bullet0.GetComponent.<Collider2D>(), transform.parent.gameObject.GetComponent.<Collider2D>());
			Physics2D.IgnoreCollision(bullet0.GetComponent.<Collider2D>(), transform.parent.gameObject.GetComponent.<CircleCollider2D>());
		}
		else if(animator.GetFloat("lookingAt") == 1.0f) {
			dir = Vector3(transform.position.x-1, transform.position.y-0.1, transform.position.z);
			if (animator.GetFloat("Crouching")) dir.y-= 0.7;
			Instantiate(shootSpawn, dir, transform.rotation);
			var bullet1 : Rigidbody2D = Rigidbody2D.Instantiate(projectile,
										dir,transform.rotation);
			bullet1.velocity = -transform.right*bulletSpeed;
			bullet1.transform.GetChild(0).gameObject.GetComponent.<Animator>().SetFloat("dir", 1);
			Physics2D.IgnoreCollision(bullet1.GetComponent.<Collider2D>(), transform.parent.gameObject.GetComponent.<Collider2D>());
			Physics2D.IgnoreCollision(bullet1.GetComponent.<Collider2D>(), transform.parent.gameObject.GetComponent.<CircleCollider2D>());
		}
		else if(animator.GetFloat("lookingAt") == 0.75f || animator.GetFloat("lookingAt") == 1.75f) {
			dir = Vector3(transform.position.x-0.25, transform.position.y+1.5, transform.position.z);
			if (animator.GetFloat("lookingAt") == 1.75f) dir.x += 0.5;
			Instantiate(shootSpawn, dir, transform.rotation);
			var bullet2 : Rigidbody2D = Rigidbody2D.Instantiate(projectile,
										dir,transform.rotation);
			bullet2.velocity = transform.up*bulletSpeed;
			bullet2.transform.GetChild(0).gameObject.GetComponent.<Animator>().SetFloat("dir", 0.75);
			Physics2D.IgnoreCollision(bullet2.GetComponent.<Collider2D>(), transform.parent.gameObject.GetComponent.<Collider2D>());
			Physics2D.IgnoreCollision(bullet2.GetComponent.<Collider2D>(), transform.parent.gameObject.GetComponent.<CircleCollider2D>());
		}
		else if(animator.GetFloat("lookingAt") == 1.5f) {
			dir = Vector3(transform.position.x+1, transform.position.y+1, transform.position.z);
			if (animator.GetFloat("Crouching")) dir.y-= 0.7;
			Instantiate(shootSpawn, dir, transform.rotation);
			var bullet3 : Rigidbody2D = Rigidbody2D.Instantiate(projectile,
										dir,transform.rotation);
			bullet3.velocity = (transform.up+transform.right)*bulletSpeed;
			bullet3.transform.GetChild(0).gameObject.GetComponent.<Animator>().SetFloat("dir", 1.5);
			Physics2D.IgnoreCollision(bullet3.GetComponent.<Collider2D>(), transform.parent.gameObject.GetComponent.<Collider2D>());
			Physics2D.IgnoreCollision(bullet3.GetComponent.<Collider2D>(), transform.parent.gameObject.GetComponent.<CircleCollider2D>());
		}
		else if(animator.GetFloat("lookingAt") == 0.5f) {
			dir = Vector3(transform.position.x-1, transform.position.y+1, transform.position.z);
			if (animator.GetFloat("Crouching")) dir.y-= 0.7;
			Instantiate(shootSpawn, dir, transform.rotation);
			var bullet4 : Rigidbody2D = Rigidbody2D.Instantiate(projectile,
										dir,transform.rotation);
			bullet4.velocity = (transform.up-transform.right)*bulletSpeed;
			bullet4.transform.GetChild(0).gameObject.GetComponent.<Animator>().SetFloat("dir", 0.5);
			Physics2D.IgnoreCollision(bullet4.GetComponent.<Collider2D>(), transform.parent.gameObject.GetComponent.<Collider2D>());
			Physics2D.IgnoreCollision(bullet4.GetComponent.<Collider2D>(), transform.parent.gameObject.GetComponent.<CircleCollider2D>());
		}
		else if(animator.GetFloat("lookingAt") == 0.25f) {
			dir = Vector3(transform.position.x-1, transform.position.y-1, transform.position.z);
			if (animator.GetFloat("Crouching")) dir.y-= 0.7;
			Instantiate(shootSpawn, dir, transform.rotation);
			var bullet5 : Rigidbody2D = Rigidbody2D.Instantiate(projectile,
										dir,transform.rotation);
			bullet5.velocity = -(transform.up+transform.right)*bulletSpeed;
			bullet5.transform.GetChild(0).gameObject.GetComponent.<Animator>().SetFloat("dir", 0.25);
			Physics2D.IgnoreCollision(bullet5.GetComponent.<Collider2D>(), transform.parent.gameObject.GetComponent.<Collider2D>());
			Physics2D.IgnoreCollision(bullet5.GetComponent.<Collider2D>(), transform.parent.gameObject.GetComponent.<CircleCollider2D>());
		}
		else if(animator.GetFloat("lookingAt") == 1.25f) {
			dir = Vector3(transform.position.x+1, transform.position.y-1, transform.position.z);
			if (animator.GetFloat("Crouching")) dir.y-= 0.7;
			Instantiate(shootSpawn, dir, transform.rotation);
			var bullet6 : Rigidbody2D = Rigidbody2D.Instantiate(projectile,
										dir,transform.rotation);
			bullet6.velocity = (-transform.up+transform.right)*bulletSpeed;
			bullet6.transform.GetChild(0).gameObject.GetComponent.<Animator>().SetFloat("dir", 1.25);
			Physics2D.IgnoreCollision(bullet6.GetComponent.<Collider2D>(), transform.parent.gameObject.GetComponent.<Collider2D>());
			Physics2D.IgnoreCollision(bullet6.GetComponent.<Collider2D>(), transform.parent.gameObject.GetComponent.<CircleCollider2D>());
		}


	}

	if (time >= .5) animator.SetFloat("shoot", 0);


}
