from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Post(db.Model):
    __tablename__ = 'posts'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer,primary_key=True)
    title = db.Column(db.String, nullable = False)
    body = db.Column(db.String, nullable= False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')),nullable = False)
    time_created = db.Column(db.DateTime(timezone = True),server_default = db.func.now())
    post_image = db.Column(db.String, nullable = False)
    likes = db.relationship('Like', backref='post', lazy=True)
    def to_dict(self):
        return {
            'id':self.id,
            'title': self.title,
            'body':self.body,
            'userId': self.user_id,
            'timeCreated': self.time_created,
            'imageUrl': self.post_image,
            'likes': len(self.likes)
        }


class PostImage(db.Model):
    __tablename__ = 'postImage'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer,primary_key=True)
    image_url = db.Column(db.String,nullable = False)
    post_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('post_id')),nullable = False)
    def to_dict(self):
        return {
            'id': self.id,
            'imageUrl' : self.image_url,
            'postId' : self.post_id
        }
