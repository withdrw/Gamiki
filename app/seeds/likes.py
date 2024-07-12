from app.models import db, Like, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_likes():
    post1 = Like(
        post_id=1,
        user_id=1
        )
    post4 = Like(
        post_id=1,
        user_id=2
        )
    post2 = Like(
        post_id=2,
        user_id=1
    )
    post3 = Like(
        post_id=3,
        user_id=1
    )
    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.commit()

def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.saves RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
