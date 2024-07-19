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
    likes = db.relationship('Like', cascade="all, delete")
    comments= db.relationship('Comment', cascade = "all, delete")
    images = db.relationship('PostImage', cascade="all, delete")
    def to_dict(self):
        l = [x.to_dict()for x in self.likes]
        return {
            'id':self.id,
            'title': self.title,
            'body':self.body,
            'ownerId': self.user_id,
            'timeCreated': self.time_created,
            'likes': l,
            'comments': [comment.to_dict() for comment in self.comments]
        }
