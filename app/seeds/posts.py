from app.models import db, Post, environment,SCHEMA
from sqlalchemy.sql import text

def seed_posts():
    post1 = Post(
        title = "first post",
        body = 'this is the bodyyyy',
        userId = 1
    )
    post2 = Post(
        title = "second post",
        body = 'this is the bodyyyy',
        userId = 2
    )
    post3 = Post(
        title = "third post",
        body = 'this is the bodyyyy',
        userId = 3
    )

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)

    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
