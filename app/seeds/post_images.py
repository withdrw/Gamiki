from app.models import db, Post, environment,SCHEMA , PostImage
from sqlalchemy.sql import text
from datetime import datetime

def seed_images():
    image1 = PostImage(
        imageUrl = 'https://gamiki.s3.amazonaws.com/RUSTIMAGE.png',
        postId = 4,
    )
    image2 = PostImage(
        imageUrl = 'https://gamiki.s3.amazonaws.com/CSCLIP-ezgif.com-video-to-gif-converter.gif',
        postId = 2,
    )
    image3 = PostImage(
        imageUrl = 'https://gamiki.s3.amazonaws.com/FIVEMGIF.gif',
        postId = 1,
    )
    image4 = PostImage(
        imageUrl = 'https://gamiki.s3.amazonaws.com/ELDENRING.png',
        postId = 3,
    )


    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)

    db.session.commit()

def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
