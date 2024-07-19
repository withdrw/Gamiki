from app.models import db, Post, environment,SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_posts():
    post1 = Post(
        title = "GTA V",
        body = 'Was just chilling in someones car (it was stolen and I didnt want to leave ), he told me to get out and I am glad I didnt because this was the outcome of that.',
        user_id = 1,
    )
    post2 = Post(
        title = "CSGO",
        body = 'Slight 4K none too big ya feel me , let me know in the comments what yall think about the clip, all heads btw .',
        user_id = 1,
    )
    post3 = Post(
        title = "Elden Ring",
        body = 'I bought this game thinking oh this would be so easy , I promise you not even 30 mins into it I quit and uninstalled the game. NEVER TOUCHING THIS GAME AGAIN. -10/10, please if anyone wants to buy this from me let me know my email is demo@aa.io.',
        user_id = 2,
    )
    post4 = Post(
        title = "Rust",
        body = 'Overall great game, you can meet some great people or some not so great people. Like in this image below you can see the base that I built alone and it got raided that night I was pretty upset but still a great game 8/10 ',
        user_id = 3,
    )

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)

    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
