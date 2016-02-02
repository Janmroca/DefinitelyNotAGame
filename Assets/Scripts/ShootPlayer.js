#pragma strict

public var projectile : Rigidbody2D;
public var bulletSpeed : float = 0.0f;
public var x : float = 0.0f;

private var animator : Animator;


function Start () {
	animator = GetComponent.<Animator>();
}

function Update () {
	if(Input.GetKeyDown(KeyCode.F)) {
		
		if(/*animator.GetFloat("lookingAt")*/x == 2.0f) {
			var bullet0 : Rigidbody2D = Rigidbody2D.Instantiate(projectile,
										transform.position,transform.rotation);
			bullet0.velocity = transform.right*bulletSpeed;
			Physics2D.IgnoreCollision(bullet0.GetComponent.<Collider2D>(), GetComponent.<Collider2D>());
		}
		else if(/*animator.GetFloat("lookingAt")*/x == 1.0f) {
			var bullet1 : Rigidbody2D = Rigidbody2D.Instantiate(projectile,
										transform.position,transform.rotation);
			bullet1.velocity = -transform.right*bulletSpeed;
			Physics2D.IgnoreCollision(bullet1.GetComponent.<Collider2D>(), GetComponent.<Collider2D>());
		}
		else if(/*animator.GetFloat("lookingAt")*/x == 0.75f || /*animator.GetFloat("lookingAt")*/x == 1.75f) {
			var bullet2 : Rigidbody2D = Rigidbody2D.Instantiate(projectile,
										transform.position,transform.rotation);
			bullet2.velocity = transform.up*bulletSpeed;
			Physics2D.IgnoreCollision(bullet2.GetComponent.<Collider2D>(), GetComponent.<Collider2D>());
		}
		else if(/*animator.GetFloat("lookingAt")*/x == 1.5f) {
			var bullet3 : Rigidbody2D = Rigidbody2D.Instantiate(projectile,
										transform.position,transform.rotation);
			bullet3.velocity = (transform.up+transform.right)*bulletSpeed;
			Physics2D.IgnoreCollision(bullet3.GetComponent.<Collider2D>(), GetComponent.<Collider2D>());
		}
		else if(/*animator.GetFloat("lookingAt")*/x == 0.5f) {
			var bullet4 : Rigidbody2D = Rigidbody2D.Instantiate(projectile,
										transform.position,transform.rotation);
			bullet4.velocity = (transform.up-transform.right)*bulletSpeed;
			Physics2D.IgnoreCollision(bullet4.GetComponent.<Collider2D>(), GetComponent.<Collider2D>());
		}
		else if(/*animator.GetFloat("lookingAt")*/x == 0.25) {
			var bullet5 : Rigidbody2D = Rigidbody2D.Instantiate(projectile,
										transform.position,transform.rotation);
			bullet5.velocity = -(transform.up+transform.right)*bulletSpeed;
			Physics2D.IgnoreCollision(bullet5.GetComponent.<Collider2D>(), GetComponent.<Collider2D>());
		}
		else if(/*animator.GetFloat("lookingAt")*/x == 1.25) {
			var bullet6 : Rigidbody2D = Rigidbody2D.Instantiate(projectile,
										transform.position,transform.rotation);
			bullet6.velocity = (-transform.up+transform.right)*bulletSpeed;
			Physics2D.IgnoreCollision(bullet6.GetComponent.<Collider2D>(), GetComponent.<Collider2D>());
		}
	}


}