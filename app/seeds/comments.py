from app.models import db, Comment, environment,SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_comments():
    # Answers for post1
    comment1 = Comment(
        body="first comment for testing",
        user_id=1,
        post_id=1,
        is_primary=False
    )
    comment_1_2 = Comment(
        body="Testing for comments",
        user_id=3,
        post_id=1,
        is_primary=False
    )
    db.session.add(comment1)
    db.session.add(comment_1_2)
    db.session.commit()
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.answers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM postss"))

    db.session.commit()
