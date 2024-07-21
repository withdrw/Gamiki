from app.models import db, Comment, environment,SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_comments():
    # Answers for post1
    comment1 = Comment(
        body="Yooo , I feel bad for the other guy . Need to see a clip of this or something loll",
        user_id=2,
        post_id=1,
        is_primary=False
    )
    comment2 = Comment(
        body="Bro that was funny af , what was the dude with the wrench thinking LMFAO .",
        user_id=3,
        post_id=1,
        is_primary=False
    )
    comment_1_2 = Comment(
        body="Bro is really him , 3K goes crazyyy",
        user_id=3,
        post_id=2,
        is_primary=False
    )
    comment_1_3 = Comment(
        body="Responding to the dude above , it was a 4K bud says in the title.",
        user_id=1,
        post_id=2,
        is_primary=False
    )
    comment3 = Comment(
        body="I went through the same experince but decided to keep that game and honestly it isnt so bad once you get how the game works.",
        user_id=1,
        post_id=3,
        is_primary=False
    )
    comment3_1 = Comment(
        body="I feel you , one of my friends told me about this game how it is so good and great . Lets just say me and him arent cool anymore bc of this game.",
        user_id=3,
        post_id=3,
        is_primary=False
    )
    comment4 = Comment(
        body="We have to play this , I miss playing this game been a while since I played whats your steam username or id ? ",
        user_id=1,
        post_id=4,
        is_primary=False
    )
    comment4_1 = Comment(
        body="Yea , add me too what's yalls discord or something I need people to play with right now.",
        user_id=2,
        post_id=4,
        is_primary=False
    )
    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment_1_2)
    db.session.add(comment_1_3)
    db.session.add(comment3)
    db.session.add(comment3_1)
    db.session.add(comment4)
    db.session.add(comment4_1)
    db.session.commit()
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.answers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM postss"))

    db.session.commit()
